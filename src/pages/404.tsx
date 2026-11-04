import Link from "next/link";

import PageHead from "../components/PageHead";

export default function Custom404() {
	return (
		<PageHead title="404">
			This page doesn&apos;t exist. Go back{" "}
			<Link href="/">
				<a>home</a>
			</Link>{" "}
			or pick somewhere from the menu.
		</PageHead>
	);
}
