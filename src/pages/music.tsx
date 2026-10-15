import Image from "next/future/image";
import { useEffect, useState } from "preact/hooks";

import GenericMeta from "../components/GenericMeta";
import Sidebar from "../components/Sidebar";
import type { TopMusicResponseSuccess } from "./api/topMusic";

type Range = keyof TopMusicResponseSuccess;

const options: { name: string; value: Range }[] = [
	{ name: "Past month", value: "short" },
	{ name: "Past 6 months", value: "medium" },
	{ name: "All time", value: "long" }
];

export default function Music() {
	const [topMusic, setTopMusic] = useState<TopMusicResponseSuccess | null>(null);
	const [range, setRange] = useState<Range>("short");

	useEffect(() => {
		fetch("/api/topMusic")
			.then(res => res.json())
			.then(info => {
				if (info.error) return;
				setTopMusic(info);
			})
			.catch(console.error);
	}, []);

	// one cover per album, captioned with the most played track from it
	const seen = new Set<string>();
	const tracks = topMusic?.[range].items.filter(t => !seen.has(t.album.id) && seen.add(t.album.id)).slice(0, 24);

	return (
		<>
			<GenericMeta title="Music – deniz" description="Tracks deniz has listened to the most on Spotify." />
			<Sidebar links={["Spotify"]}>listens to a lot of turkish pop, k-pop and whatever adéla put out last.</Sidebar>
			<h1 className="sr-only">Music</h1>

			<div className="ranges" role="radiogroup" aria-label="Time range">
				{options.map(({ name, value }) => (
					<button
						key={value}
						role="radio"
						aria-checked={range === value}
						onClick={() => setRange(value)}
					>
						{name.toUpperCase()}
					</button>
				))}
			</div>

			<div className="tiles" key={range}>
				{tracks
					? tracks.map((track, i) => (
							<a
								key={track.id}
								className="work-item"
								href={track.external_urls.spotify}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src={track.album.images[0].url}
									alt=""
									width={640}
									height={640}
									sizes="(max-width: 860px) 50vw, 22vw"
									priority={i < 8}
								/>
								<div className="cap">
									<b>{track.name}</b>
									{track.artists.map(a => a.name).join(", ")} —— {track.album.name}
								</div>
							</a>
					  ))
					: [...new Array(12)].map((_, i) => <div key={i} className="tile-empty" />)}
			</div>
		</>
	);
}
