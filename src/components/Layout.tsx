import Link from "next/link";
import { useRouter } from "next/router";

import { socials } from "../data/socials";
import { external } from "./Card";
import { useIstanbulTime } from "./LiveCards";
import ThemeSwitch from "./ThemeSwitch";

const pages = [
	{ href: "/", title: "Deniz" },
	{ href: "/projects", title: "Projects" },
	{ href: "/music", title: "Music" },
	{ href: "/now", title: "Now" },
	{ href: "/tools", title: "Tools" }
];

function Elsewhere({ className }: { className: string }) {
	return (
		<nav className={className} aria-label="Elsewhere">
			{socials.map(({ name, url }) => (
				<a key={name} href={url} {...external}>
					{name}
				</a>
			))}
		</nav>
	);
}

function Foot() {
	const time = useIstanbulTime();

	return (
		<footer className="foot">
			<p>
				Deniz, Istanbul, Türkiye <span>(41.0082° N, 28.9784° E{time && `, ${time}`})</span>
			</p>
			<Elsewhere className="foot-links" />
			<ThemeSwitch />
		</footer>
	);
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	const { pathname } = useRouter();

	return (
		<div className="site">
			<a className="skip" href="#content">
				Skip to content
			</a>
			<header className="top">
				<nav className="pill" aria-label="Pages">
					{pages.map(({ href, title }) => (
						<Link key={href} href={href}>
							<a aria-current={pathname === href ? "page" : undefined}>{title}</a>
						</Link>
					))}
				</nav>
			</header>
			<Elsewhere className="elsewhere" />
			<main id="content">{children}</main>
			<Foot />
		</div>
	);
}
