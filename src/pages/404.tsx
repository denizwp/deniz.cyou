import Link from "next/link";

import GenericMeta from "../components/GenericMeta";

export default function Custom404() {
	return (
		<>
			<GenericMeta title="404 – deniz" />
			<div className="now">
				<div>
					<h1 className="now-title">404</h1>
					<div className="now-lead">
						<p>
							this page doesn&apos;t exist. go back{" "}
							<Link href="/">
								<a>home</a>
							</Link>
							, or pick a letter below.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
