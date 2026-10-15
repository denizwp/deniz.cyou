import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import Sidebar from "../components/Sidebar";
import { tools } from "../data/tools";

const skillIconsEndpoint = "https://skillicons.dev/icons?theme=light&i=";

// publishable key: it ships to the browser inside the image url by design.
// restrict it by domain in the logo.dev dashboard rather than hiding it.
const logoDevToken = "pk_Yb0fJ73UST2bOQAxWsv8ag";
const logoDevEndpoint = (domain: string) =>
	`https://img.logo.dev/${domain}?token=${logoDevToken}&size=128&format=png`;

export default function Tools() {
	return (
		<>
			<GenericMeta title="Tools – deniz" description="The software and tools deniz uses every day." />
			<Sidebar>works in vs code with the slack theme, designs in figma and models in blender.</Sidebar>
			<h1 className="sr-only">Tools</h1>

			<div className="tiles">
				{tools.flatMap(({ title, items }) =>
					items.map(({ name, url, icon, domain, src }) => {
						const logo = icon ? `${skillIconsEndpoint}${icon}` : domain ? logoDevEndpoint(domain) : src;
						const body = (
							<>
								<div className="tool">
									{logo && <Image src={logo} alt="" width={128} height={128} quality={100} />}
								</div>
								<div className="cap">
									<b>{name}</b>
									{title}
								</div>
							</>
						);
						return url ? (
							<a key={name} className="work-item" href={url} target="_blank" rel="noopener noreferrer">
								{body}
							</a>
						) : (
							<div key={name} className="work-item">
								{body}
							</div>
						);
					})
				)}
			</div>
		</>
	);
}
