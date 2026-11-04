import formatDistanceStrict from "date-fns/formatDistanceStrict";
import { useEffect, useRef, useState } from "preact/hooks";
import useSWR from "swr";

import { weatherDescriptions } from "../data/weather";
import type { DiscordPresence } from "../lib/discord";
import { fetcher } from "../lib/fetcher";
import type { GitHubResponseSuccess } from "../pages/api/github";
import type { NowPlayingResponseSuccess } from "../pages/api/nowPlaying";
import type { WeatherResponseSuccess } from "../pages/api/weather";
import { external } from "./Card";
import { activityOf, avatarOf, profile, usePresence } from "./DiscordCard";
import { useIstanbulTime } from "./LiveCards";

const useSong = () => useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: 5000 }).data;

function Clock({ at }: { at: number }) {
	const { data } = useSWR<WeatherResponseSuccess>("/api/weather", fetcher);
	const time = useIstanbulTime(at);

	return (
		<p>
			It&apos;s <b>{time}</b> in <b>Istanbul</b>
			{data && (
				<>
					, <b>{Math.round(data.temp)}°</b> with {weatherDescriptions[data.code] ?? "unusual weather"}
				</>
			)}
			.
		</p>
	);
}

function Listening() {
	const data = useSong();
	const track = data?.track;
	if (!data) return null;
	if (!track) return <p>Nothing&apos;s playing right now.</p>;

	const opening = !data.isPlayingNow ? "The last thing I played was" : data.isPaused ? "I paused" : "I'm listening to";

	return (
		<p>
			{opening}{" "}
			<a href={track.external_urls.spotify} {...external}>
				{track.name}
			</a>{" "}
			by{" "}
			{track.artists.map((artist, i) => (
				<span key={artist.id}>
					{i > 0 && ", "}
					<a href={artist.external_urls.spotify} {...external}>
						{artist.name}
					</a>
				</span>
			))}
			.
		</p>
	);
}

const discordStates: Record<string, string> = {
	online: "online",
	idle: "idle",
	dnd: "on do not disturb",
	offline: "offline"
};

function Discord({ initial, at }: { initial: DiscordPresence | null; at: number }) {
	const { presence, now } = usePresence(initial, at);
	if (!presence) return null;

	const avatar = avatarOf(presence);
	const activity = activityOf(presence, now);
	const custom = presence.activities.find(a => a.type === 4)?.state;

	return (
		<p>
			On{" "}
			<a href={profile} {...external}>
				Discord
			</a>
			{avatar && (
				// eslint-disable-next-line @next/next/no-img-element
				<img className="face" src={avatar} alt="" width={64} height={64} />
			)}{" "}
			I&apos;m <b>{discordStates[presence.discord_status] ?? "offline"}</b>
			{activity && <>, {activity}</>}.{custom && <> My status says “{custom}”.</>}
		</p>
	);
}

function GitHub({ at }: { at: number }) {
	const { data } = useSWR<GitHubResponseSuccess>("/api/github", fetcher);
	const last = data?.events[0];

	if (!last) {
		return (
			<p>
				On GitHub I&apos;m{" "}
				<a href="https://github.com/denizwp" {...external}>
					denizwp
				</a>
				.
			</p>
		);
	}

	return (
		<p>
			On GitHub I last {last.text}{" "}
			<a href={last.repoUrl} {...external}>
				{last.repo.split("/")[1] ?? last.repo}
			</a>
			, {formatDistanceStrict(new Date(last.date), at, { addSuffix: true })}.
		</p>
	);
}

/** the whole moment, written out as sentences that keep themselves up to date */
export function NowWords({ discord, at }: { discord: DiscordPresence | null; at: number }) {
	return (
		<div className="say">
			<Clock at={at} />
			<Listening />
			<Discord initial={discord} at={at} />
			<GitHub at={at} />
		</div>
	);
}

const minutes = (ms: number) => {
	const s = Math.max(0, Math.floor(ms / 1000));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/** the bar and its two times; only means something while a song is playing or paused */
function Progress({ data, at }: { data: NowPlayingResponseSuccess; at: number }) {
	const [anchor, setAnchor] = useState({ ms: data.progessMs, at });
	const [now, setNow] = useState(at);

	// the snapshot the page came with was taken at `at`; anything newer was taken just now
	const first = useRef(data);
	useEffect(() => {
		if (data !== first.current) setAnchor({ ms: data.progessMs, at: Date.now() });
	}, [data]);
	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const total = data.track!.duration_ms;
	const played = Math.min(total, anchor.ms + (data.isPaused ? 0 : now - anchor.at));

	return (
		<div className="progress">
			<div className="bar" aria-hidden="true">
				<span style={{ transform: `scaleX(${played / total})` }} />
			</div>
			<p>
				<span>{minutes(played)}</span>
				<span>{minutes(total)}</span>
			</p>
		</div>
	);
}

/** the album, large, with how far along the song is */
export function NowCover({ at }: { at: number }) {
	const data = useSong();
	const track = data?.track;
	if (!track) return null;

	return (
		<div className="now-cover">
			<a href={track.album.external_urls.spotify} {...external} aria-label={`${track.album.name} on Spotify`}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={track.album.images[0]?.url} alt="" width={640} height={640} />
			</a>
			{data.isPlayingNow && <Progress data={data} at={at} />}
		</div>
	);
}
