import { MarkCard } from "../components/Card";
import PageHead from "../components/PageHead";
import { tools } from "../data/tools";

const skillIconsEndpoint = "https://skillicons.dev/icons?theme=light&i=";

// publishable key: it ships to the browser inside the image url by design.
// restrict it by domain in the logo.dev dashboard rather than hiding it.
const logoDevToken = "pk_Yb0fJ73UST2bOQAxWsv8ag";
const logoDevEndpoint = (domain: string) => `https://img.logo.dev/${domain}?token=${logoDevToken}&size=128&format=png`;

export default function Tools() {
	return (
		<>
			<PageHead title="tools">I work in VS Code with the Slack theme, design in Figma and model in Blender. This is everything else I reach for.</PageHead>
			<div className="grid">
				{tools.flatMap(({ title, items }) =>
					items.map(({ name, url, icon, domain, src }) => (
						<MarkCard
							key={name}
							label={`Tools · ${title}`}
							title={name}
							image={icon ? `${skillIconsEndpoint}${icon}` : domain ? logoDevEndpoint(domain) : src!}
							href={url}
						/>
					))
				)}
			</div>
		</>
	);
}
