import { useEffect, useState } from "preact/hooks";

import { resetScroll } from "../lib/smoothScroll";

const LEAVE_MS = 180;

/**
 * Holds the old page for a moment while it fades out, then brings the new one in.
 * Only opacity runs on this wrapper: a transform or filter here would pin the
 * fixed sidebar to the wrapper instead of the window.
 */
export default function PageTransition({ route, children }: React.PropsWithChildren<{ route: string }>) {
	const [shown, setShown] = useState({ route, children });
	const [leaving, setLeaving] = useState(false);

	useEffect(() => {
		if (route === shown.route) {
			setShown({ route, children });
			return;
		}
		setLeaving(true);
		const id = setTimeout(() => {
			resetScroll();
			setShown({ route, children });
			setLeaving(false);
		}, LEAVE_MS);
		return () => clearTimeout(id);
	}, [route, children]);

	return (
		<div key={shown.route} className={leaving ? "route is-leaving" : "route is-entering"}>
			{shown.children}
		</div>
	);
}
