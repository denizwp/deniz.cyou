import { useEffect, useRef, useState } from "preact/hooks";
import useSWR from "swr";

import { fetcher } from "../lib/fetcher";
import type { NowPlayingResponseSuccess } from "../pages/api/nowPlaying";

const minutes = (ms: number) => {
	const s = Math.max(0, Math.floor(ms / 1000));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * The song as a card: cover, title, who, and a bar that fills as it plays.
 * `at` is when the data was fetched, so the bar starts in the right place
 * on the server and the client renders the same thing on first paint.
 */
export default function SpotifyCard({ at }: { at: number }) {
	const { data } = useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: 5000 });
	const [anchor, setAnchor] = useState({ ms: data?.progessMs ?? 0, at });
	const [now, setNow] = useState(at);

	// the snapshot the page came with was taken at `at`; anything newer was taken just now
	const first = useRef(data);
	useEffect(() => {
		if (data !== first.current) setAnchor({ ms: data?.progessMs ?? 0, at: Date.now() });
	}, [data]);
	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const track = data?.track;
	if (!track) {
		return (
			<div className="card card-song is-empty">
				<div className="card-art" />
				<div className="card-body">
					<p className="card-caption">Spotify</p>
					<p className="card-title">{data ? "nothing playing" : " "}</p>
				</div>
			</div>
		);
	}

	const live = data.isPlayingNow;
	const running = live && !data.isPaused;
	const played = Math.min(track.duration_ms, anchor.ms + (running ? now - anchor.at : 0));
	const share = live ? played / track.duration_ms : 0;

	const link = { target: "_blank", rel: "noopener noreferrer" };

	return (
		<div className="card card-song">
			<a className="card-art-link" href={track.album.external_urls.spotify} {...link} aria-label={`${track.album.name} on Spotify`}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className="card-art" src={track.album.images[1]?.url ?? track.album.images[0]?.url} alt="" width={300} height={300} />
			</a>
			<div className="card-body">
				<p className="card-caption">{running ? "Listening now" : live ? "Paused" : "Last played"}</p>
				<p className="card-title">
					<a href={track.external_urls.spotify} {...link}>
						{track.name}
					</a>
				</p>
				<p className="card-sub">
					{track.artists.map((artist, i) => (
						<span key={artist.id}>
							{i > 0 && ", "}
							<a href={artist.external_urls.spotify} {...link}>
								{artist.name}
							</a>
						</span>
					))}
				</p>
				{/* a bar only means something while the song is playing or paused */}
				{live && (
					<>
						<div className="card-bar" aria-hidden="true">
							<span style={{ transform: `scaleX(${share})` }} />
						</div>
						<p className="card-times">
							<span>{minutes(played)}</span>
							<span>{minutes(track.duration_ms)}</span>
						</p>
					</>
				)}
			</div>
		</div>
	);
}
