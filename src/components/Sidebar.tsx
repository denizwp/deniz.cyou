/**
 * The name and a sentence on the left, the way a printed index keeps it.
 * The social links already sit top right, so only discord lives here.
 */
export default function Sidebar({ children }: React.PropsWithChildren<{}>) {
	return (
		<aside className="side">
			<p className="side-bio">
				deniz
				<br />
				{children}
			</p>
			<ul className="side-list">
				<li className="is-grey">CONTACT</li>
				<li>
					<a href="https://discord.com/users/317004664002576386" target="_blank" rel="noopener noreferrer">
						DISCORD
					</a>
				</li>
			</ul>
		</aside>
	);
}
