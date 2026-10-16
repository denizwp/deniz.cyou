import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "preact/hooks";
import useSWR from "swr";

import Career from "../components/Career";
import DiscordCard from "../components/DiscordCard";
import GenericMeta from "../components/GenericMeta";
import Sidebar from "../components/Sidebar";
import SpotifyCard from "../components/SpotifyCard";
import { weatherDescriptions } from "../data/weather";
import { DiscordPresence, getDiscord } from "../lib/discord";
import { fetcher } from "../lib/fetcher";
import { getGitHub, GitHubResponseSuccess } from "./api/github";
import { getNowPlaying } from "./api/nowPlaying";
import { getWeather, WeatherResponseSuccess } from "./api/weather";

interface NowProps {
	/** when the server fetched everything, so clocks start from the same moment */
	at: number;
	discord: DiscordPresence | null;
	/** swr's starting data, keyed by api route */
	fallback: Record<string, unknown>;
}

// a slow service shouldn't hold the page; its card fills in on the client instead
const within = <T,>(promise: Promise<T>, ms: number) =>
	Promise.race([promise, new Promise<null>(resolve => setTimeout(() => resolve(null), ms))]).catch(() => null);

export const getServerSideProps: GetServerSideProps<NowProps> = async ({ res }) => {
	const [nowPlaying, weather, github, discord] = await Promise.all([
		within(getNowPlaying(), 1500),
		within(getWeather(), 1500),
		within(getGitHub(), 1500),
		within(getDiscord(), 1500)
	]);

	res.setHeader("Cache-Control", "private, no-store");

	const fallback: Record<string, unknown> = {};
	if (nowPlaying) fallback["/api/nowPlaying"] = nowPlaying;
	if (weather) fallback["/api/weather"] = weather;
	if (github) fallback["/api/github"] = github;

	return { props: { at: Date.now(), discord, fallback } };
};

const clock = new Intl.DateTimeFormat("en-GB", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
	timeZone: "Europe/Istanbul"
});

function Istanbul({ at }: { at: number }) {
	const { data } = useSWR<WeatherResponseSuccess>("/api/weather", fetcher);
	const [now, setNow] = useState(at);

	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 10_000);
		return () => clearInterval(id);
	}, []);

	return (
		<p>
			it&apos;s {clock.format(now)} in istanbul
			{data ? `, ${Math.round(data.temp)}° with ${weatherDescriptions[data.code] ?? "unusual weather"}.` : "."}
		</p>
	);
}

function GitHub() {
	const { data } = useSWR<GitHubResponseSuccess>("/api/github", fetcher);
	if (!data) return <p>on github as denizwp.</p>;

	const last = data.events[0];
	return (
		<p>
			{last ? (
				<>
					last on github: {last.text}{" "}
					<a href={last.repoUrl} target="_blank" rel="noopener noreferrer">
						{last.repo.split("/")[1] ?? last.repo}
					</a>
					, {formatDistanceToNowStrict(new Date(last.date), { addSuffix: true })}.{" "}
				</>
			) : (
				"nothing public on github lately. "
			)}
			{data.repos} repos, {data.followers} followers.
		</p>
	);
}

export default function Now({ at, discord }: NowProps) {
	return (
		<>
			<GenericMeta title="Now – deniz" description="What deniz is up to right now." />
			<Sidebar>is an 18-year-old developer from turkiye. everything on this page is live, straight from spotify, discord and github.</Sidebar>
			<div className="live">
				<h1 className="now-title">right now</h1>
				<div className="now-cards">
					<SpotifyCard at={at} />
					<DiscordCard initial={discord} at={at} />
				</div>
				<div className="live-text">
					<Istanbul at={at} />
					<GitHub />
				</div>
				<Career at={at} />
			</div>
		</>
	);
}
