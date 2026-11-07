import type Lenis from "lenis";

let lenis: Lenis | null = null;

/** smooth wheel scrolling, tuned the same as the music app */
export async function startSmoothScroll() {
	if (lenis || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const { default: Lenis } = await import("lenis");
	lenis = new Lenis({
		duration: 1.1,
		easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		wheelMultiplier: 0.9,
		touchMultiplier: 1.5
	});

	const tick = (time: number) => {
		lenis?.raf(time);
		requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
}

/** jumps to the top without easing, for when a new page comes in */
export function resetScroll() {
	if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
	else window.scrollTo(0, 0);
}
