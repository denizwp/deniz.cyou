import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "preact/hooks";
import useSWR from "swr";

import { socials } from "../data/socials";
import { fetcher } from "../lib/fetcher";
import type { NowPlayingResponseSuccess } from "../pages/api/nowPlaying";
import { startSmoothScroll } from "../lib/smoothScroll";
import Balloons from "./Balloons";
import PageTransition from "./PageTransition";

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

/** one plain line about the music, where a copyright notice usually goes */
function Playing() {
	const { data } = useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: 15_000 });
	const track = data?.track;
	if (!data) return <p>&nbsp;</p>;
	if (!track) return <p>not listening to anything right now.</p>;

	const verb = !data.isPlayingNow ? "last played" : data.isPaused ? "paused" : "listening to";
	return (
		<p>
			{verb}{" "}
			<a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
				{track.name}
			</a>{" "}
			by {track.artists.map(a => a.name).join(", ")}
		</p>
	);
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

	useEffect(() => {
		startSmoothScroll();
	}, []);

	return (
		<div className={home ? "site is-home" : "site"}>
			<nav className="pills" aria-label="Pages">
				{pages.map(({ href, title }) => (
					<Link key={href} href={href}>
						<a aria-current={pathname === href ? "page" : undefined}>{title}</a>
					</Link>
				))}
			</nav>

			<Elsewhere />

			<main className="page">
				<PageTransition route={pathname}>{children}</PageTransition>
			</main>

			<Balloons home={home} />

			<footer className="foot">
				<p>
					<b>deniz, Istanbul, Türkiye</b> (41.0082° N, 28.9784° E, <IstanbulTime />)
				</p>
				<Playing />
			</footer>
		</div>
	);
}
