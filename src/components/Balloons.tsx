import { useRouter } from "next/router";
import { useEffect, useRef } from "preact/hooks";

import type { BalloonScene, LetterDef } from "../lib/balloon/scene";

interface Letter extends LetterDef {
	label: string;
	href: string;
}

// every letter of the name is a way in
const letters: Letter[] = [
	{ char: "d", tilt: -0.035, label: "Projects", href: "/projects" },
	{ char: "e", tilt: 0.05, label: "Music", href: "/music" },
	{ char: "n", tilt: -0.02, label: "Now", href: "/now" },
	// the dot sits close to the stem in Inter, so this one is inflated less
	{ char: "i", tilt: 0.055, label: "Tools", href: "/tools", options: { round: 3, fat: 0 } },
	{ char: "z", tilt: -0.045, label: "GitHub", href: "https://github.com/denizwp" }
];

export default function Balloons({ home }: { home: boolean }) {
	const router = useRouter();
	const hostRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<BalloonScene | null>(null);
	const routerRef = useRef(router);
	routerRef.current = router;

	useEffect(() => {
		const host = hostRef.current;
		if (!host) return;
		let scene: BalloonScene | null = null;
		let cancelled = false;

		import("../lib/balloon/scene").then(({ BalloonScene }) => {
			if (cancelled) return;
			scene = new BalloonScene(host, {
				letters,
				color: "#0e5a36",
				font: '"Inter"',
				reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
				onHover: i => {
					const label = labelRef.current;
					if (label && i !== null) label.textContent = letters[i].label;
					label?.classList.toggle("is-shown", i !== null);
					host.classList.toggle("is-hovering", i !== null);
				},
				onDrag: dragging => host.classList.toggle("is-dragging", dragging),
				onPick: i => {
					const { href } = letters[i];
					if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
					else routerRef.current.push(href);
				}
			});
			scene.setMode(routerRef.current.pathname === "/" ? "home" : "strip");
			sceneRef.current = scene;
			scene.build().catch(console.error);
		});

		// the label rides along with the pointer
		const onMove = (e: PointerEvent) => {
			if (labelRef.current) {
				labelRef.current.style.left = `${e.clientX + 24}px`;
				labelRef.current.style.top = `${e.clientY - 50}px`;
			}
		};
		window.addEventListener("pointermove", onMove);

		return () => {
			cancelled = true;
			window.removeEventListener("pointermove", onMove);
			scene?.dispose();
			sceneRef.current = null;
		};
	}, []);

	useEffect(() => {
		sceneRef.current?.setMode(home ? "home" : "strip");
	}, [home]);

	return (
		<>
			<div className="scene" ref={hostRef} aria-hidden="true" />
			<div className="scene-label" ref={labelRef} aria-hidden="true" />
		</>
	);
}
