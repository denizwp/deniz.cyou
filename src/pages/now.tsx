import formatDistanceStrict from "date-fns/formatDistanceStrict";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { useEffect, useState } from "preact/hooks";
import { useLanyard } from "react-use-lanyard";
import useSWR from "swr";

import GenericMeta from "../components/GenericMeta";
import { weatherDescriptions } from "../data/weather";
import type { GitHubResponseSuccess } from "./api/github";
import type { NowPlayingResponseSuccess } from "./api/nowPlaying";
import type { WeatherResponseSuccess } from "./api/weather";

const DISCORD_ID = "317004664002576386";

const fetcher = (url: string) =>
	fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data?.error) throw data.error;
			return data;
		});

const clock = new Intl.DateTimeFormat("en-GB", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
	timeZone: "Europe/Istanbul"
});

const minutes = (ms: number) => {
	const s = Math.floor(ms / 1000);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

const discordStates: Record<string, string> = {
	online: "online on discord",
	idle: "idle on discord",
	dnd: "do not disturb on discord",
	offline: "offline on discord"
};

const activityVerbs = ["playing", "streaming", "listening to", "watching", "", "competing in"];

function useNow(intervalMs: number) {
	const [now, setNow] = useState<number | null>(null);
	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), intervalMs);
		return () => clearInterval(id);
	}, [intervalMs]);
	return now;
}

function Listening() {
	const { data } = useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: 5000 });
	const now = useNow(1000);
	const [fetchedAt, setFetchedAt] = useState(0);
	useEffect(() => setFetchedAt(Date.now()), [data]);

	const track = data?.track;
	if (!track) return <p>not listening to anything.</p>;

	const who = track.artists.map(a => a.name).join(" and ");
	const song = (
		<a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
			{track.name}
		</a>
	);
	if (!data.isPlayingNow) return <p>last played {song} by {who}.</p>;
	if (data.isPaused) return <p>paused {song} by {who}.</p>;

	const at = Math.min(track.duration_ms, data.progessMs + (now && fetchedAt ? now - fetchedAt : 0));
	return (
		<p>
			listening to {song} by {who}, {minutes(at)} of {minutes(track.duration_ms)}.
		</p>
	);
}

function Discord() {
	const { status } = useLanyard({ userId: DISCORD_ID, socket: true });
	const now = useNow(30_000);
	if (!status) return null;

	const custom = status.activities.find(a => a.type === 4)?.state;
	// spotify is already covered above
	const others = status.activities.filter(a => a.type !== 2 && a.type !== 4);

	return (
		<p>
			{discordStates[status.discord_status] ?? "on discord"}
			{custom ? `, status ${custom}` : ""}.
			{now &&
				others.map(a => (
					<span key={a.id}>
						{" "}
						{activityVerbs[a.type]} {a.name} for {formatDistanceStrict(now, a.timestamps?.start ?? a.created_at)}.
					</span>
				))}
		</p>
	);
}

function Istanbul() {
	const { data } = useSWR<WeatherResponseSuccess>("/api/weather", fetcher);
	const now = useNow(10_000);
	if (!now) return <p>in istanbul.</p>;

	return (
		<p>
			it&apos;s {clock.format(now)} in istanbul
			{data
				? `, ${Math.round(data.temp)}° with ${weatherDescriptions[data.code] ?? "unusual weather"}.`
				: "."}
		</p>
	);
}

function GitHub() {
	const { data } = useSWR<GitHubResponseSuccess>("/api/github", fetcher);
	if (!data) return null;

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

function Cover() {
	const { data } = useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: 5000 });
	const image = data?.track?.album.images[0]?.url;
	if (!image) return null;

	return (
		<a className="now-cover" href={data.track!.external_urls.spotify} target="_blank" rel="noopener noreferrer">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={image} alt={`${data.track!.album.name} cover`} width={300} height={300} />
		</a>
	);
}

export default function Now() {
	return (
		<>
			<GenericMeta title="Now – deniz" description="What deniz is up to right now." />
			<div className="now">
				<div>
					<h1 className="now-title">right now</h1>
					<div className="now-lead">
						<Listening />
						<Discord />
						<Istanbul />
					</div>
				</div>
				<div className="now-side">
					<GitHub />
					<p>hi... this is deniz, an 18-year-old developer from turkiye.</p>
					<a className="now-button" href="https://github.com/denizwp" target="_blank" rel="noopener noreferrer">
						GITHUB
					</a>
					<Cover />
				</div>
			</div>
		</>
	);
}
