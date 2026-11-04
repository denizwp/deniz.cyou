import Image from "next/future/image";

import type { AlbumTile } from "../lib/music";
import Card, { external } from "./Card";

/** a cover filling the whole cell; the song, each artist and the album keep their own links */
export default function AlbumCard({ tile, priority }: { tile?: AlbumTile; priority?: boolean }) {
	// spotify didn't answer: keep the cell so the rows stay whole
	if (!tile) return <Card label="Music · Spotify" />;

	return (
		<Card className="album-card">
			<Image
				src={tile.cover}
				alt={`${tile.album} cover`}
				width={640}
				height={640}
				sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
				priority={priority}
			/>
			<div className="album-text">
				<p className="album-track">
					<a className="stretch" href={tile.trackUrl} {...external}>
						{tile.track}
					</a>
				</p>
				<p>
					{tile.artists.map((artist, i) => (
						<span key={artist.id}>
							{i > 0 && ", "}
							<a href={artist.url} {...external}>
								{artist.name}
							</a>
						</span>
					))}
					{" · "}
					<a href={tile.albumUrl} {...external}>
						{tile.album}
					</a>
				</p>
			</div>
		</Card>
	);
}
