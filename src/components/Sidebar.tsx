import { socials } from "../data/socials";

interface SidebarProps {
	/** what follows the name, as one sentence */
	children: React.ReactNode;
	links?: string[];
}

const byName = (name: string) => socials.find(s => s.name === name);

/** the name and a sentence on the left, the way a printed index keeps it */
export default function Sidebar({ children, links = ["GitHub", "Figma"] }: SidebarProps) {
	const coffee = byName("Buy Me a Coffee");

	return (
		<aside className="side">
			<div>
				<p className="side-bio">
					deniz
					<br />
					{children}
				</p>
				<ul className="side-list">
					{links.map(name => {
						const s = byName(name);
						return s ? (
							<li key={name}>
								<a href={s.url} target="_blank" rel="noopener noreferrer">
									{name.toUpperCase()}
								</a>
							</li>
						) : null;
					})}
				</ul>
			</div>
			<ul className="side-list">
				<li className="is-grey">CONTACT</li>
				<li>
					<a href="https://discord.com/users/317004664002576386" target="_blank" rel="noopener noreferrer">
						DISCORD
					</a>
				</li>
				{coffee && (
					<li>
						<a href={coffee.url} target="_blank" rel="noopener noreferrer">
							BUY ME A COFFEE
						</a>
					</li>
				)}
			</ul>
		</aside>
	);
}
