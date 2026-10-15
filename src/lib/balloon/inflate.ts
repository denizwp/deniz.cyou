/**
 * Inflates a rasterised glyph the way a foil balloon inflates: the outline is
 * the seam, and the surface is a membrane under pressure (a Poisson solve), so
 * thick parts swell more than thin ones and every edge rolls over smoothly.
 *
 * Pure math with no DOM access, so it can run inside a worker.
 */

export interface InflateOptions {
	/** grid cells along the glyph's longer side */
	res: number;
	/** blur radius in mask pixels; rounds every corner */
	round: number;
	/** how far the skin bulges past the drawn outline, in mask pixels */
	fat: number;
	/** 0 turns off the creases around counters */
	wrinkles: number;
}

export interface InflateJob {
	mask: Uint8Array;
	/** the mask is S × S */
	S: number;
	/** font size the glyph was drawn at, in mask pixels */
	size: number;
	/** where the glyph's baseline and centre sit in the mask */
	baseX: number;
	baseY: number;
	options: InflateOptions;
}

export interface InflateResult {
	positions: Float32Array;
	normals: Float32Array;
	index: Uint32Array;
}

const INF = 1e20;

function edt1d(f: Float64Array, n: number, d: Float64Array, v: Int32Array, z: Float64Array) {
	let k = 0;
	v[0] = 0;
	z[0] = -INF;
	z[1] = INF;
	for (let q = 1; q < n; q++) {
		let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
		while (s <= z[k]) {
			k--;
			s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
		}
		k++;
		v[k] = q;
		z[k] = s;
		z[k + 1] = INF;
	}
	k = 0;
	for (let q = 0; q < n; q++) {
		while (z[k + 1] < q) k++;
		d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
	}
}

/** squared distance to the nearest pixel where `feature` is set */
function edt(feature: Uint8Array, w: number, h: number) {
	const g = new Float64Array(w * h);
	for (let i = 0; i < w * h; i++) g[i] = feature[i] ? 0 : INF;
	const n = Math.max(w, h);
	const f = new Float64Array(n);
	const d = new Float64Array(n);
	const v = new Int32Array(n);
	const z = new Float64Array(n + 1);
	for (let x = 0; x < w; x++) {
		for (let y = 0; y < h; y++) f[y] = g[y * w + x];
		edt1d(f, h, d, v, z);
		for (let y = 0; y < h; y++) g[y * w + x] = d[y];
	}
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) f[x] = g[y * w + x];
		edt1d(f, w, d, v, z);
		for (let x = 0; x < w; x++) g[y * w + x] = d[x];
	}
	return g;
}

function boxBlur(src: Float32Array, S: number, r: number, passes: number) {
	const tmp = new Float32Array(S * S);
	const span = 2 * r + 1;
	const clamp = (v: number) => Math.min(S - 1, Math.max(0, v));
	for (let pass = 0; pass < passes; pass++) {
		for (let y = 0; y < S; y++) {
			let acc = 0;
			for (let x = -r; x <= r; x++) acc += src[y * S + clamp(x)];
			for (let x = 0; x < S; x++) {
				tmp[y * S + x] = acc / span;
				acc += src[y * S + clamp(x + r + 1)] - src[y * S + clamp(x - r)];
			}
		}
		for (let x = 0; x < S; x++) {
			let acc = 0;
			for (let y = -r; y <= r; y++) acc += tmp[clamp(y) * S + x];
			for (let y = 0; y < S; y++) {
				src[y * S + x] = acc / span;
				acc += tmp[clamp(y + r + 1) * S + x] - tmp[clamp(y - r) * S + x];
			}
		}
	}
}

interface Counter {
	x: number;
	y: number;
	r: number;
}

/** outside regions the border flood can't reach are the glyph's counters */
function findCounters(sd: Float32Array, S: number): Counter[] {
	const seen = new Uint8Array(S * S);
	const out = (i: number) => sd[i] <= 0;
	const stack: number[] = [];
	for (let x = 0; x < S; x++) stack.push(x, (S - 1) * S + x);
	for (let y = 0; y < S; y++) stack.push(y * S, y * S + S - 1);
	while (stack.length) {
		const i = stack.pop()!;
		if (seen[i] || !out(i)) continue;
		seen[i] = 1;
		const x = i % S;
		const y = (i / S) | 0;
		if (x > 0) stack.push(i - 1);
		if (x < S - 1) stack.push(i + 1);
		if (y > 0) stack.push(i - S);
		if (y < S - 1) stack.push(i + S);
	}
	const counters: Counter[] = [];
	for (let i = 0; i < S * S; i++) {
		if (seen[i] || !out(i)) continue;
		let sx = 0;
		let sy = 0;
		let n = 0;
		const st = [i];
		while (st.length) {
			const k = st.pop()!;
			if (seen[k] || !out(k)) continue;
			seen[k] = 1;
			n++;
			sx += k % S;
			sy += (k / S) | 0;
			st.push(k - 1, k + 1, k - S, k + S);
		}
		if (n > 200 * (S / 1024) ** 2) counters.push({ x: sx / n, y: sy / n, r: Math.sqrt(n / Math.PI) });
	}
	return counters;
}

const hash = (n: number) => {
	const x = Math.sin(n * 127.1) * 43758.5453;
	return x - Math.floor(x);
};
const smooth = (a: number, b: number, v: number) => {
	const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
	return t * t * (3 - 2 * t);
};

export function inflate({ mask, S, size, baseX, baseY, options }: InflateJob): InflateResult {
	const { res, round, fat, wrinkles } = options;
	// lengths below were tuned on a 1024 mask
	const k1024 = S / 1024;

	let x0 = S, y0 = S, x1 = 0, y1 = 0;
	for (let y = 0; y < S; y++) {
		for (let x = 0; x < S; x++) {
			if (!mask[y * S + x]) continue;
			if (x < x0) x0 = x;
			if (x > x1) x1 = x;
			if (y < y0) y0 = y;
			if (y > y1) y1 = y;
		}
	}

	// signed distance to the outline, positive inside
	const outside = new Uint8Array(S * S);
	for (let i = 0; i < S * S; i++) outside[i] = mask[i] ? 0 : 1;
	const dIn = edt(outside, S, S);
	const dOut = edt(mask, S, S);
	const sd = new Float32Array(S * S);
	for (let i = 0; i < S * S; i++) {
		sd[i] = mask[i] ? Math.sqrt(dIn[i]) - 0.5 : -(Math.sqrt(dOut[i]) - 0.5);
	}
	// soften every corner, then let the skin bulge past the drawn outline
	if (round > 0) boxBlur(sd, S, Math.round(round), 3);
	for (let i = 0; i < S * S; i++) sd[i] += fat;

	const sdAt = (x: number, y: number) => {
		x = Math.max(0, Math.min(S - 1.001, x));
		y = Math.max(0, Math.min(S - 1.001, y));
		const ix = Math.floor(x);
		const iy = Math.floor(y);
		const fx = x - ix;
		const fy = y - iy;
		const a = sd[iy * S + ix];
		const b = sd[iy * S + ix + 1];
		const c = sd[(iy + 1) * S + ix];
		const d = sd[(iy + 1) * S + ix + 1];
		return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
	};

	// a grid over the ink box
	const pad = 6 + fat + 4;
	x0 -= pad;
	y0 -= pad;
	x1 += pad;
	y1 += pad;
	const step = Math.max(x1 - x0, y1 - y0) / res;
	const nx = Math.ceil((x1 - x0) / step) + 1;
	const ny = Math.ceil((y1 - y0) / step) + 1;
	const N = nx * ny;
	const px = new Float32Array(N);
	const py = new Float32Array(N);
	const sv = new Float32Array(N);
	for (let j = 0; j < ny; j++) {
		for (let i = 0; i < nx; i++) {
			const k = j * nx + i;
			px[k] = x0 + i * step;
			py[k] = y0 + j * step;
			sv[k] = sdAt(px[k], py[k]);
		}
	}
	const isIn = (k: number) => sv[k] > 0;

	// membrane under pressure: laplacian(u) = -1 inside, u = 0 on the seam (SOR)
	const u = new Float32Array(N);
	for (let it = 0; it < 900; it++) {
		for (let j = 1; j < ny - 1; j++) {
			for (let i = 1; i < nx - 1; i++) {
				const k = j * nx + i;
				if (!isIn(k)) continue;
				const nb = u[k - 1] + u[k + 1] + u[k - nx] + u[k + nx];
				u[k] += 1.92 * ((nb + 1) / 4 - u[k]);
			}
		}
	}

	// cells that become surface
	const used = new Uint8Array(N);
	const cells: number[] = [];
	for (let j = 0; j < ny - 1; j++) {
		for (let i = 0; i < nx - 1; i++) {
			const a = j * nx + i;
			if (isIn(a) || isIn(a + 1) || isIn(a + nx) || isIn(a + nx + 1)) {
				cells.push(a);
				used[a] = used[a + 1] = used[a + nx] = used[a + nx + 1] = 1;
			}
		}
	}

	// seam vertices slide onto the true outline
	for (let k = 0; k < N; k++) {
		if (!used[k] || isIn(k)) continue;
		for (let t = 0; t < 4; t++) {
			const s = sdAt(px[k], py[k]);
			const gx = (sdAt(px[k] + 0.75, py[k]) - sdAt(px[k] - 0.75, py[k])) / 1.5;
			const gy = (sdAt(px[k], py[k] + 0.75) - sdAt(px[k], py[k] - 0.75)) / 1.5;
			const gl = gx * gx + gy * gy || 1;
			px[k] -= (s * gx) / gl;
			py[k] -= (s * gy) / gl;
		}
	}

	// where the skin is held in around a counter it gathers into radial creases
	const counters = wrinkles ? findCounters(sd, S) : [];
	const pinch = (k: number) => {
		if (!counters.length) return 1;
		const x = px[k];
		const y = py[k];
		const d = sv[k] / k1024;
		let best = counters[0];
		let bd = Infinity;
		for (const c of counters) {
			const dd = Math.abs(Math.hypot(x - c.x, y - c.y) - c.r) / k1024;
			if (dd < bd) {
				bd = dd;
				best = c;
			}
		}
		const near = smooth(d + 26, d + 4, bd) * smooth(56, 20, d);
		if (near <= 0) return 1;
		const ang = Math.atan2(y - best.y, x - best.x);
		const count = Math.max(12, Math.round((2 * Math.PI * best.r) / (15 * k1024)));
		const along = ((ang + Math.PI) / (2 * Math.PI)) * count;
		const cell = Math.floor(along);
		const ph = along - cell;
		// folds run different lengths
		const len = 9 + hash(cell + best.x) * 15;
		const fold = Math.exp(-Math.pow((ph - 0.5) * 3.2, 2));
		const amt = Math.exp(-d / len) * wrinkles * near;
		return 1 - 0.22 * amt * fold - 0.08 * amt;
	};

	// world units: the em is 1 tall; sqrt rolls the edge over like a filled balloon
	const scale = 1 / size;
	const depth = (k: number) => (isIn(k) ? Math.sqrt(u[k]) * step * scale * 1.45 * pinch(k) : 0);

	const pos: number[] = [];
	const front = new Int32Array(N).fill(-1);
	const back = new Int32Array(N).fill(-1);
	for (let k = 0; k < N; k++) {
		if (!used[k]) continue;
		const X = (px[k] - baseX) * scale;
		const Y = (baseY - py[k]) * scale;
		const Z = depth(k);
		front[k] = pos.length / 3;
		pos.push(X, Y, Z);
		if (Z > 0) {
			back[k] = pos.length / 3;
			pos.push(X, Y, -Z);
		} else back[k] = front[k];
	}
	const index: number[] = [];
	for (const a of cells) {
		const b = a + 1;
		const c = a + nx;
		const d = c + 1;
		// mask y grows downward, so this winding faces +z on the front
		index.push(front[a], front[c], front[b], front[b], front[c], front[d]);
		index.push(back[a], back[b], back[c], back[b], back[d], back[c]);
	}

	const positions = new Float32Array(pos);
	const idx = new Uint32Array(index);
	const normals = new Float32Array(positions.length);
	for (let t = 0; t < idx.length; t += 3) {
		const ia = idx[t] * 3, ib = idx[t + 1] * 3, ic = idx[t + 2] * 3;
		const abx = positions[ib] - positions[ia], aby = positions[ib + 1] - positions[ia + 1], abz = positions[ib + 2] - positions[ia + 2];
		const acx = positions[ic] - positions[ia], acy = positions[ic + 1] - positions[ia + 1], acz = positions[ic + 2] - positions[ia + 2];
		const nx_ = aby * acz - abz * acy, ny_ = abz * acx - abx * acz, nz_ = abx * acy - aby * acx;
		for (const i of [ia, ib, ic]) {
			normals[i] += nx_;
			normals[i + 1] += ny_;
			normals[i + 2] += nz_;
		}
	}
	for (let i = 0; i < normals.length; i += 3) {
		const l = Math.hypot(normals[i], normals[i + 1], normals[i + 2]) || 1;
		normals[i] /= l;
		normals[i + 1] /= l;
		normals[i + 2] /= l;
	}
	return { positions, normals, index: idx };
}
