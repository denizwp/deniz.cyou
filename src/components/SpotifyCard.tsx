import { useEffect, useRef, useState } from "preact/hooks";
import useSWR from "swr";

import { fetcher } from "../lib/fetcher";
import type { NowPlayingResponseSuccess } from "../pages/api/nowPlaying";
import Card, { external, Tag, TagColor } from "./Card";

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

/**
 * The song, cover on the left and the words beside it.
 * The wide one is the now page's, with a bar that fills as it plays.
 */
export default function SpotifyCard({ at, wide }: { at: number; wide?: boolean }) {
	const { data } = useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: wide ? 5000 : 15_000 });
	const track = data?.track;

	if (!track) {
		return (
			<Card label="Music · Spotify" wide={wide} className="song-card">
				<div className="song">
					<div className="cover is-empty" />
					<div className="song-text">
						<p className="song-title">{data ? "Nothing playing" : "Checking Spotify"}</p>
					</div>
				</div>
			</Card>
		);
	}

	const state: [string, TagColor] = !data.isPlayingNow
		? ["Last played", "stone"]
		: data.isPaused
		? ["Paused", "amber"]
		: ["Listening now", "lime"];

	return (
		<Card label="Music · Spotify" wide={wide} arrow className="song-card">
			<div className="song">
				<a className="cover" href={track.album.external_urls.spotify} {...external} aria-label={`${track.album.name} on Spotify`}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={track.album.images[1]?.url ?? track.album.images[0]?.url} alt="" width={300} height={300} />
				</a>
				<div className="song-text">
					<p className="tags">
						<Tag color={state[1]}>{state[0]}</Tag>
					</p>
					<h2 className={wide ? "t-lg" : "song-title"}>
						<a className="stretch" href={track.external_urls.spotify} {...external}>
							{track.name}
						</a>
					</h2>
					<p className="song-artists">
						{track.artists.map((artist, i) => (
							<span key={artist.id}>
								{i > 0 && ", "}
								<a href={artist.external_urls.spotify} {...external}>
									{artist.name}
								</a>
							</span>
						))}
					</p>
					{wide && data.isPlayingNow && <Progress data={data} at={at} />}
				</div>
			</div>
		</Card>
	);
}
