import { useEffect, useState } from "preact/hooks";

// short enough to never feel like a wait, long enough not to flash
const MIN_MS = 500;
// if the balloons never come (no webgl, a worker failed), don't trap the visitor
const MAX_MS = 9000;
// the balloon lets go, and the page fades in behind it while it's still climbing
const FLY_BEFORE_FADE_MS = 700;
const FADE_MS = 500;

// two shapes for the string to sway between
const STRING_A = "M12 0 C 4 22, 20 40, 10 62 S 6 96, 13 118";
const STRING_B = "M12 0 C 20 24, 4 42, 14 64 S 18 98, 9 118";

/** a single balloon on a string floats in the middle until the real ones are built, then flies off */
export default function Loader() {
	const [state, setState] = useState<"floating" | "flying" | "leaving" | "gone">("floating");

	useEffect(() => {
		const started = performance.now();
		let done = false;

		const finish = () => {
			if (done) return;
			done = true;
			setTimeout(() => {
				setState("flying");
				// the letters start inflating underneath, so they're full by the time the cover clears
				window.dispatchEvent(new Event("loader:lift"));
				setTimeout(() => {
					setState("leaving");
					setTimeout(() => setState("gone"), FADE_MS);
				}, FLY_BEFORE_FADE_MS);
			}, Math.max(0, MIN_MS - (performance.now() - started)));
		};

		window.addEventListener("balloons:ready", finish);
		const bail = setTimeout(finish, MAX_MS);
		return () => {
			window.removeEventListener("balloons:ready", finish);
			clearTimeout(bail);
		};
	}, []);

	if (state === "gone") return null;

	return (
		<div className={`loader is-${state}`} role="status" aria-label="Loading">
			<div className="loader-fly" aria-hidden="true">
				<div className="loader-float">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img className="loader-balloon" src="/images/loader-balloon.webp" alt="" width={260} height={318} />
					<svg className="loader-string" viewBox="0 0 24 120" width="24" height="120">
						<path d={STRING_A} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
							<animate
								attributeName="d"
								dur="2.6s"
								repeatCount="indefinite"
								values={`${STRING_A};${STRING_B};${STRING_A}`}
								calcMode="spline"
								keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
							/>
						</path>
					</svg>
				</div>
			</div>
		</div>
	);
}
