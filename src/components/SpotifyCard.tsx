import useSWR from "swr";

import { fetcher } from "../lib/fetcher";
import type { NowPlayingResponseSuccess } from "../pages/api/nowPlaying";
import Card, { external, Tag, TagColor } from "./Card";

/** the song, cover on the left and the words beside it */
export default function SpotifyCard() {
	const { data } = useSWR<NowPlayingResponseSuccess>("/api/nowPlaying", fetcher, { refreshInterval: 15_000 });
	const track = data?.track;

	if (!track) {
		return (
			<Card label="Music · Spotify" className="song-card">
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
		<Card label="Music · Spotify" arrow className="song-card">
			<div className="song">
				<a className="cover" href={track.album.external_urls.spotify} {...external} aria-label={`${track.album.name} on Spotify`}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={track.album.images[1]?.url ?? track.album.images[0]?.url} alt="" width={300} height={300} />
				</a>
				<div className="song-text">
					<p className="tags">
						<Tag color={state[1]}>{state[0]}</Tag>
					</p>
					<h2 className="song-title">
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
				</div>
			</div>
		</Card>
	);
}
