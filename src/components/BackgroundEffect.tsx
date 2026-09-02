import { useEffect, useRef, useState } from "preact/hooks";

const AMOUNT = 20;

// deep jade -> teal, kept dark so it reads as green-black over gray-950
const HUE_MIN = 140;
const HUE_RANGE = 40;
const LIGHTNESS = 40;
const POINTER_HUE = 155;

interface Boid {
	x: number;
	y: number;
	vx: number;
	vy: number;
	base: number;
	hue: number;
}

/**
 * A field of slow, soft blobs that drift apart from each other, plus a
 * gradient that follows the pointer. Everything is written straight to the
 * DOM inside the animation frame so the rest of the page never re-renders.
 */
export default function BackgroundEffect() {
	const [hues, setHues] = useState<number[] | null>(null);

	const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
	const mouseRef = useRef<SVGCircleElement | null>(null);
	const mouseStopRef = useRef<SVGStopElement | null>(null);

	useEffect(() => {
		const boids: Boid[] = [];

		let width = window.innerWidth;
		let height = window.innerHeight;

		const radius = (base: number) =>
			(base * width * height * window.devicePixelRatio) / 8000;

		for (let i = 0; i < AMOUNT; i++) {
			boids.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: 0,
				vy: 0,
				base: Math.random() + 1,
				hue: Math.random() * HUE_RANGE + HUE_MIN
			});
		}

		setHues(boids.map(boid => boid.hue));

		const mouse = { x: width / 2, y: height / 2 };
		const target = { x: mouse.x, y: mouse.y };
		let strength = 0;
		let pressed = 0;

		function resize() {
			const dw = window.innerWidth / width;
			const dh = window.innerHeight / height;

			for (const boid of boids) {
				boid.x *= dw;
				boid.y *= dh;
			}

			width = window.innerWidth;
			height = window.innerHeight;
		}

		function onMove(x: number, y: number) {
			target.x = x;
			target.y = y;
			strength = 1;
		}

		const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
		const onTouchMove = (e: TouchEvent) =>
			onMove(e.touches[0].clientX, e.touches[0].clientY);
		const onDown = () => (pressed = 1);
		const onUp = () => (pressed = 0);

		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("touchmove", onTouchMove);
		window.addEventListener("mousedown", onDown);
		window.addEventListener("touchstart", onDown);
		window.addEventListener("mouseup", onUp);
		window.addEventListener("touchend", onUp);
		window.addEventListener("mouseleave", onUp);
		window.addEventListener("blur", onUp);

		let frame = 0;

		function loop() {
			for (const boid of boids) {
				const r = radius(boid.base);

				boid.x += boid.vx;
				boid.y += boid.vy;

				if (boid.x < -r) boid.x += width + 2 * r;
				else if (boid.x > width + r) boid.x -= width + 2 * r;

				if (boid.y < -r) boid.y += height + 2 * r;
				else if (boid.y > height + r) boid.y -= height + 2 * r;

				for (const other of boids) {
					if (boid === other) continue;

					const dx = boid.x - other.x;
					const dy = boid.y - other.y;
					const dist = Math.hypot(dx, dy) || 1;

					if (dist < 200) {
						boid.vx += (dx / dist / dist) * 0.5;
						boid.vy += (dy / dist / dist) * 0.5;
					}
				}

				boid.vx *= 0.99;
				boid.vy *= 0.99;
			}

			// cheap stand-in for the spring the original uses
			mouse.x += (target.x - mouse.x) * 0.1;
			mouse.y += (target.y - mouse.y) * 0.1;

			strength *= pressed < 0.01 ? 0.9 : 0.99;

			for (let i = 0; i < boids.length; i++) {
				const circle = circleRefs.current[i];
				if (!circle) continue;

				circle.setAttribute("cx", boids[i].x.toString());
				circle.setAttribute("cy", boids[i].y.toString());
				circle.setAttribute("r", radius(boids[i].base).toString());
			}

			if (mouseRef.current) {
				mouseRef.current.setAttribute("cx", mouse.x.toString());
				mouseRef.current.setAttribute("cy", mouse.y.toString());
				mouseRef.current.setAttribute(
					"r",
					(strength * 100).toString()
				);
			}

			if (mouseStopRef.current) {
				mouseStopRef.current.setAttribute(
					"stop-color",
					`hsla(${POINTER_HUE}, 100%, ${LIGHTNESS}%, ${
						strength * (pressed * 0.125 + 0.125)
					})`
				);
			}

			frame = requestAnimationFrame(loop);
		}

		frame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(frame);

			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("mousedown", onDown);
			window.removeEventListener("touchstart", onDown);
			window.removeEventListener("mouseup", onUp);
			window.removeEventListener("touchend", onUp);
			window.removeEventListener("mouseleave", onUp);
			window.removeEventListener("blur", onUp);
		};
	}, []);

	if (!hues) return null;

	return (
		<svg
			aria-hidden="true"
			className="w-screen h-screen fixed -z-10 top-0 left-0 pointer-events-none"
		>
			<defs>
				{hues.map((hue, i) => (
					<radialGradient
						key={i}
						id={`boidGradient${i}`}
						cx="50%"
						cy="50%"
						r="50%"
						fx="50%"
						fy="50%"
					>
						<stop
							offset="0%"
							stop-color={`hsla(${hue}, 100%, ${LIGHTNESS}%, 0.12)`}
						/>
						<stop
							offset="100%"
							stop-color={`hsla(${hue}, 100%, ${LIGHTNESS}%, 0)`}
						/>
					</radialGradient>
				))}

				<radialGradient
					id="mouseGradient"
					cx="50%"
					cy="50%"
					r="50%"
					fx="50%"
					fy="50%"
				>
					<stop
						ref={mouseStopRef}
						offset="0%"
						stop-color={`hsla(${POINTER_HUE}, 100%, ${LIGHTNESS}%, 0)`}
					/>
					<stop
						offset="100%"
						stop-color={`hsla(${POINTER_HUE}, 100%, ${LIGHTNESS}%, 0)`}
					/>
				</radialGradient>
			</defs>

			{hues.map((_, i) => (
				<circle
					key={i}
					ref={el => (circleRefs.current[i] = el)}
					r="0"
					fill={`url(#boidGradient${i})`}
				/>
			))}

			<circle ref={mouseRef} r="0" fill="url(#mouseGradient)" />
		</svg>
	);
}
