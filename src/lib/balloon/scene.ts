import {
	BackSide,
	BufferAttribute,
	BufferGeometry,
	Color,
	DirectionalLight,
	DoubleSide,
	Euler,
	Group,
	MathUtils,
	Mesh,
	MeshBasicMaterial,
	MeshPhysicalMaterial,
	NeutralToneMapping,
	PerspectiveCamera,
	PlaneGeometry,
	PMREMGenerator,
	Quaternion,
	Raycaster,
	Scene,
	SphereGeometry,
	SRGBColorSpace,
	Vector2,
	Vector3,
	WebGLRenderer
} from "three";

import type { InflateOptions, InflateResult } from "./inflate";

export interface LetterDef {
	char: string;
	/** tilt in radians, so the word doesn't sit like a ruler */
	tilt: number;
	options?: Partial<InflateOptions>;
}

export type SceneMode = "home" | "strip";

export interface BalloonSceneOptions {
	letters: LetterDef[];
	color: string;
	font: string;
	onHover: (index: number | null) => void;
	onPick: (index: number) => void;
	reducedMotion: boolean;
}

interface Letter {
	pivot: Group;
	hit: Mesh;
	rest: Vector3;
	width: number;
	restQ: Quaternion;
	q: Quaternion;
	w: Vector3;
	s: number;
	sv: number;
	z: number;
	zv: number;
	off: Vector3;
	offV: Vector3;
	/** 0 flat, 1 full; the word inflates when it first arrives */
	puff: number;
	puffV: number;
	puffAt: number;
}

const MASK = 1024;
const PICK_MASK = 512;

/** draws one glyph into a square mask, baseline at 78% */
function rasterize(char: string, font: string, S: number) {
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = S;
	const g = canvas.getContext("2d", { willReadFrequently: true })!;
	const size = S * 0.62;
	g.font = `900 ${size}px ${font}`;
	g.textAlign = "center";
	g.textBaseline = "alphabetic";
	g.fillStyle = "#fff";
	const baseX = S / 2;
	const baseY = S * 0.78;
	g.fillText(char, baseX, baseY);
	const data = g.getImageData(0, 0, S, S).data;
	const mask = new Uint8Array(S * S);
	for (let i = 0; i < S * S; i++) mask[i] = data[i * 4 + 3] > 127 ? 1 : 0;
	return { mask, S, size, baseX, baseY };
}

function runJobs(jobs: { char: string; S: number; options: InflateOptions }[], font: string) {
	const count = Math.min(jobs.length, Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1)));
	const workers = Array.from(
		{ length: count },
		() => new Worker(new URL("./inflate.worker.ts", import.meta.url))
	);
	const results: InflateResult[] = new Array(jobs.length);
	let next = 0;

	return new Promise<InflateResult[]>((resolve, reject) => {
		let done = 0;
		const feed = (worker: Worker) => {
			if (next >= jobs.length) return;
			const id = next++;
			const { char, S, options } = jobs[id];
			const r = rasterize(char, font, S);
			worker.postMessage({ id, ...r, options }, [r.mask.buffer]);
		};
		workers.forEach(worker => {
			worker.onmessage = (e: MessageEvent<InflateResult & { id: number }>) => {
				const { id, ...out } = e.data;
				results[id] = out;
				done++;
				if (done === jobs.length) {
					workers.forEach(w => w.terminate());
					resolve(results);
				} else feed(worker);
			};
			worker.onerror = err => {
				workers.forEach(w => w.terminate());
				reject(err);
			};
			feed(worker);
		});
	});
}

function toGeometry({ positions, normals, index }: InflateResult) {
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(positions, 3));
	geo.setAttribute("normal", new BufferAttribute(normals, 3));
	geo.setIndex(new BufferAttribute(index, 1));
	geo.computeBoundingBox();
	return geo;
}

/** a grey room with softboxes; only ever seen in the reflections */
function studio(renderer: WebGLRenderer) {
	const room = new Scene();
	room.add(
		new Mesh(
			new SphereGeometry(10, 32, 16),
			new MeshBasicMaterial({ color: new Color(0.3, 0.31, 0.3), side: BackSide })
		)
	);
	const softbox = (w: number, h: number, p: [number, number, number], k: number) => {
		const m = new Mesh(
			new PlaneGeometry(w, h),
			new MeshBasicMaterial({ color: new Color(k, k, k), side: DoubleSide })
		);
		m.position.set(...p);
		m.lookAt(0, 0, 0);
		room.add(m);
	};
	softbox(9, 3, [0, 7, 3], 5);
	softbox(1.6, 7, [-7, 1, 3], 3.5);
	softbox(1.2, 6, [6, 2, 5], 2.5);
	softbox(10, 3, [0, -6, 2], 1.6);
	const pmrem = new PMREMGenerator(renderer);
	const env = pmrem.fromScene(room, 0.03).texture;
	pmrem.dispose();
	return env;
}

export class BalloonScene {
	private host: HTMLElement;
	private opts: BalloonSceneOptions;
	private renderer: WebGLRenderer;
	private scene = new Scene();
	private camera = new PerspectiveCamera(26, 1, 0.1, 100);
	private group = new Group();
	private letters: Letter[] = [];
	private raycaster = new Raycaster();
	private ndc = new Vector2(9, 9);
	private hovered = -1;
	private dragging: { i: number; x: number; y: number; moved: number } | null = null;
	private mode: SceneMode = "home";
	private word = { w: 1, h: 1, cy: 0 };
	private size = { w: 0, h: 0 };
	private frame = 0;
	private last = 0;
	private disposed = false;
	private ready = false;

	constructor(host: HTMLElement, opts: BalloonSceneOptions) {
		this.host = host;
		this.opts = opts;
		this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.toneMapping = NeutralToneMapping;
		this.renderer.outputColorSpace = SRGBColorSpace;
		host.appendChild(this.renderer.domElement);

		this.scene.environment = studio(this.renderer);
		const key = new DirectionalLight("#ffffff", 1.6);
		key.position.set(-2, 3, 4);
		this.scene.add(key, this.group);

		this.renderer.domElement.addEventListener("pointerdown", this.onDown);
		window.addEventListener("pointermove", this.onMove);
		window.addEventListener("pointerup", this.onUp);
		window.addEventListener("pointercancel", this.onUp);

		this.last = performance.now();
		this.frame = requestAnimationFrame(this.loop);
	}

	async build() {
		const { letters, font } = this.opts;
		await document.fonts.load(`900 100px ${font}`);
		if (this.disposed) return;

		// phones get a coarser skin; it is still far finer than the screen
		const small = Math.min(window.innerWidth, window.innerHeight) < 700;
		const k = MASK / 1024;
		const jobs = letters.flatMap(l => [
			{
				char: l.char,
				S: MASK,
				options: { res: small ? 130 : 200, round: 9 * k, fat: 5 * k, wrinkles: 1, ...l.options }
			},
			{
				char: l.char,
				S: PICK_MASK,
				options: { res: 36, round: 4.5, fat: 2.5, wrinkles: 0 }
			}
		]);
		const out = await runJobs(jobs, font);
		if (this.disposed) return;

		const material = new MeshPhysicalMaterial({
			color: this.opts.color,
			roughness: 0.22,
			clearcoat: 1,
			clearcoatRoughness: 0.05
		});
		const hidden = new MeshBasicMaterial({ visible: false });

		let cursor = 0;
		this.letters = letters.map((def, i) => {
			const geo = toGeometry(out[i * 2]);
			const pick = toGeometry(out[i * 2 + 1]);
			const bb = geo.boundingBox!;
			const c = new Vector3();
			bb.getCenter(c);
			geo.translate(-c.x, -c.y, 0);
			pick.translate(-c.x, -c.y, 0);

			const pivot = new Group();
			const hit = new Mesh(pick, hidden);
			hit.userData.i = i;
			pivot.add(new Mesh(geo, material), hit);
			this.group.add(pivot);

			const width = bb.max.x - bb.min.x;
			const rest = new Vector3(cursor + width / 2, c.y, 0);
			// neighbours overlap a touch, the way inflated letters press together
			cursor += width - 0.025;
			const restQ = new Quaternion().setFromEuler(new Euler(0, 0, def.tilt));
			return {
				pivot,
				hit,
				rest,
				width,
				restQ,
				q: restQ.clone(),
				w: new Vector3(),
				s: 1,
				sv: 0,
				z: 0,
				zv: 0,
				off: new Vector3(),
				offV: new Vector3(),
				puff: this.opts.reducedMotion ? 1 : 0.02,
				puffV: 0,
				puffAt: performance.now() / 1000 + i * 0.09
			};
		});

		let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
		for (const l of this.letters) {
			l.rest.x -= cursor / 2 + 0.0125;
			const bb = (l.pivot.children[0] as Mesh).geometry.boundingBox!;
			minX = Math.min(minX, l.rest.x + bb.min.x);
			maxX = Math.max(maxX, l.rest.x + bb.max.x);
			minY = Math.min(minY, l.rest.y + bb.min.y);
			maxY = Math.max(maxY, l.rest.y + bb.max.y);
		}
		this.word = { w: maxX - minX, h: maxY - minY, cy: (maxY + minY) / 2 };
		this.ready = true;
	}

	setMode(mode: SceneMode) {
		this.mode = mode;
		if (mode !== "home") this.setHover(-1);
	}

	dispose() {
		this.disposed = true;
		cancelAnimationFrame(this.frame);
		this.renderer.domElement.removeEventListener("pointerdown", this.onDown);
		window.removeEventListener("pointermove", this.onMove);
		window.removeEventListener("pointerup", this.onUp);
		window.removeEventListener("pointercancel", this.onUp);
		this.scene.traverse(o => {
			if (o instanceof Mesh) {
				o.geometry.dispose();
				(Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose());
			}
		});
		this.scene.environment?.dispose();
		this.renderer.dispose();
		this.renderer.domElement.remove();
	}

	private setHover(i: number) {
		if (i === this.hovered) return;
		this.hovered = i;
		this.opts.onHover(i >= 0 ? i : null);
	}

	private fit() {
		const w = this.host.clientWidth;
		const h = this.host.clientHeight;
		if (!w || !h) return;
		if (w !== this.size.w || h !== this.size.h) {
			this.size = { w, h };
			this.renderer.setSize(w, h, false);
		}
		const cam = this.camera;
		cam.aspect = w / h;
		const home = this.mode === "home";
		// at home the word fills the width; in the strip it fills the height
		const tan = Math.tan(MathUtils.degToRad(cam.fov / 2));
		const byH = (this.word.h * (home ? 1.18 : 1.25)) / 2 / tan;
		const byW = (this.word.w * (home ? 1.09 : 1.15)) / 2 / tan / cam.aspect;
		const dist = home ? Math.max(byH, byW) : byH;
		cam.position.set(0, this.word.cy, dist + 0.2);
		cam.lookAt(0, this.word.cy, 0);
		cam.updateProjectionMatrix();
	}

	private onDown = (e: PointerEvent) => {
		if (this.hovered < 0) return;
		this.dragging = { i: this.hovered, x: e.clientX, y: e.clientY, moved: 0 };
		this.renderer.domElement.setPointerCapture(e.pointerId);
	};

	private onMove = (e: PointerEvent) => {
		const r = this.renderer.domElement.getBoundingClientRect();
		const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
		if (inside) this.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
		else this.ndc.set(9, 9);

		const d = this.dragging;
		if (!d) return;
		const L = this.letters[d.i];
		const dx = e.clientX - d.x;
		const dy = e.clientY - d.y;
		d.x = e.clientX;
		d.y = e.clientY;
		d.moved += Math.abs(dx) + Math.abs(dy);
		// pixels to world units at the letter's depth
		const k = (this.camera.position.z * Math.tan(MathUtils.degToRad(this.camera.fov / 2)) * 2) / r.height;
		L.off.x += dx * k;
		L.off.y -= dy * k;
		L.offV.set(dx * k * 60, -dy * k * 60, 0);
		L.w.y += dx * 0.02;
		L.w.x += dy * 0.02;
	};

	private onUp = () => {
		const d = this.dragging;
		if (!d) return;
		this.dragging = null;
		if (d.moved < 6) {
			// a squeeze, then go
			this.letters[d.i].sv -= 4;
			this.opts.onPick(d.i);
		}
	};

	private pick() {
		if (this.dragging || !this.ready) return;
		this.raycaster.setFromCamera(this.ndc, this.camera);
		const hits = this.raycaster.intersectObjects(
			this.letters.map(l => l.hit),
			false
		);
		this.setHover(hits.length ? (hits[0].object.userData.i as number) : -1);
	}

	private step(dt: number, t: number) {
		const tq = new Quaternion();
		const spin = new Quaternion();
		const axis = new Vector3();
		const hovered = this.hovered;

		this.letters.forEach((L, i) => {
			const hot = i === hovered || this.dragging?.i === i;

			// arrive flat, then fill with air
			if (t >= L.puffAt) {
				L.puffV += ((1 - L.puff) * 120 - L.puffV * 9) * dt;
				L.puff += L.puffV * dt;
			}

			L.sv += ((hot ? 1.17 : 1) - L.s) * 190 * dt - L.sv * 11 * dt;
			L.s += L.sv * dt;
			L.zv += ((hot ? 0.35 : 0) - L.z) * 120 * dt - L.zv * 12 * dt;
			L.z += L.zv * dt;

			// neighbours make room for the one you're holding
			let push = 0;
			if (hovered >= 0 && hovered !== i) {
				const H = this.letters[hovered];
				push = (Math.sign(i - hovered) * Math.max(0, H.s - 1) * 0.9 * (H.width / 2)) / Math.abs(i - hovered);
			}
			if (this.dragging?.i !== i) {
				L.offV.x += ((push - L.off.x) * 40 - L.offV.x * 6.5) * dt;
				L.offV.y += (-L.off.y * 40 - L.offV.y * 6.5) * dt;
				L.off.x += L.offV.x * dt;
				L.off.y += L.offV.y * dt;
			}

			// spin freely, then wobble back upright
			tq.copy(L.q).invert().premultiply(L.restQ);
			if (tq.w < 0) tq.set(-tq.x, -tq.y, -tq.z, -tq.w);
			const ang = 2 * Math.acos(Math.min(1, tq.w));
			if (ang > 1e-4) {
				axis.set(tq.x, tq.y, tq.z).normalize();
				L.w.addScaledVector(axis, ang * 26 * dt);
			}
			L.w.multiplyScalar(1 - Math.min(1, 4.2 * dt));
			const wl = L.w.length();
			if (wl > 1e-5) {
				spin.setFromAxisAngle(axis.copy(L.w).divideScalar(wl), wl * dt);
				L.q.premultiply(spin).normalize();
			}

			const bob = this.opts.reducedMotion ? 0 : Math.sin(t * 1.3 + i * 1.7) * 0.012;
			L.pivot.position.set(L.rest.x + L.off.x, L.rest.y + L.off.y + bob, L.z);
			L.pivot.quaternion.copy(L.q);
			const puff = Math.max(0.02, L.puff);
			L.pivot.scale.set(L.s * (0.85 + 0.15 * puff), L.s * (0.85 + 0.15 * puff), L.s * puff);
		});
	}

	private loop = (now: number) => {
		this.frame = requestAnimationFrame(this.loop);
		const dt = Math.min(0.033, (now - this.last) / 1000);
		this.last = now;
		if (!this.ready) return;
		this.fit();
		this.pick();
		this.step(dt, now / 1000);
		this.renderer.render(this.scene, this.camera);
	};
}
