import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "preact/hooks";

import { socials } from "../data/socials";
import Balloons, { letters } from "./Balloons";

const pages = [
	{ href: "/", title: "Home" },
	{ href: "/projects", title: "Projects" },
	{ href: "/music", title: "Music" },
	{ href: "/now", title: "Now" },
	{ href: "/tools", title: "Tools" }
];

const clock = new Intl.DateTimeFormat("en-GB", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
	timeZone: "Europe/Istanbul"
});

function IstanbulTime() {
	const [now, setNow] = useState<string | null>(null);

	useEffect(() => {
		const tick = () => setNow(clock.format(Date.now()));
		tick();
		const id = setInterval(tick, 10_000);
		return () => clearInterval(id);
	}, []);

	return <>{now ?? "--:--"}</>;
}

function Elsewhere() {
	return (
		<nav className="elsewhere" aria-label="Elsewhere">
			{socials.map(({ name, url }) => (
				<a key={name} href={url} target="_blank" rel="noopener noreferrer">
					{name === "Buy Me a Coffee" ? "COFFEE" : name.toUpperCase()}
				</a>
			))}
		</nav>
	);
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
	const { pathname } = useRouter();
	const home = pathname === "/";

	return (
		<div className={home ? "site is-home" : "site"}>
			{home ? (
				// the letters are the menu at home; this list is for keyboards and screen readers
				<nav className="letter-nav" aria-label="Pages">
					{letters.map(({ label, href }) => (
						<Link key={href} href={href}>
							<a>{label}</a>
						</Link>
					))}
				</nav>
			) : (
				<nav className="pills" aria-label="Pages">
					{pages.map(({ href, title }) => (
						<Link key={href} href={href}>
							<a aria-current={pathname === href ? "page" : undefined}>{title}</a>
						</Link>
					))}
				</nav>
			)}

			<Elsewhere />

			<main className="page">{children}</main>

			<Balloons home={home} />

			<footer className="foot">
				<p>
					<b>deniz, Istanbul, Türkiye</b> (41.0082° N, 28.9784° E, <IstanbulTime />)
				</p>
				<p className="foot-caps">
					Copyright © {new Date().getFullYear()} deniz. All rights reserved.{" "}
					<a href="https://github.com/denizwp" target="_blank" rel="noopener noreferrer">
						GitHub
					</a>{" "}
					<a href="https://www.figma.com/@denizwp" target="_blank" rel="noopener noreferrer">
						Figma
					</a>
				</p>
			</footer>
		</div>
	);
}
