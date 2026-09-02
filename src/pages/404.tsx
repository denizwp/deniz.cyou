import Link from "next/link";

import GenericMeta from "../components/GenericMeta";

export default function Custom404() {
	return (
		<main className="wrapper fade">
			<GenericMeta
				title="404 – deniz"
				description="This page doesn't exist."
			/>

			<h1 className="header">404 &ndash; Not Found</h1>

			<p className="mt-4 text-gray-400">
				Seems like this page doesn&apos;t exist. Let&apos;s go back{" "}
				<Link href="/">
					<a className="text-white border-b border-transparent transition hv:border-current">
						home
					</a>
				</Link>
				.
			</p>
		</main>
	);
}
