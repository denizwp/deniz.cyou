import type { GetStaticProps } from "next";
import { useState } from "preact/hooks";

import AlbumCard from "../components/AlbumCard";
import PageHead from "../components/PageHead";
import { getTiles, Ranges } from "../lib/live";

type Range = keyof Ranges;

const options: { name: string; value: Range }[] = [
	{ name: "Past month", value: "short" },
	{ name: "Past 6 months", value: "medium" },
	{ name: "All time", value: "long" }
];

export const getStaticProps: GetStaticProps<{ ranges: Ranges | null }> = async () => ({
	props: { ranges: await getTiles() },
	revalidate: 3600
});

export default function Music({ ranges }: { ranges: Ranges | null }) {
	const [range, setRange] = useState<Range>("short");

	// whole rows only, so the grid ends flush
	const all = ranges?.[range] ?? [];
	const tiles = all.slice(0, Math.min(24, all.length - (all.length % 4)));

	return (
		<>
			<PageHead title="music">
				I listen to a lot of Turkish pop, K-pop and whatever Adéla put out last. These are my most played, straight from Spotify.
			</PageHead>

			<div className="pill ranges" role="group" aria-label="Time range">
				{options.map(({ name, value }) => (
					<button key={value} aria-pressed={range === value} onClick={() => setRange(value)}>
						{name}
					</button>
				))}
			</div>

			{ranges ? (
				<div className="grid" key={range}>
					{tiles.map((tile, i) => (
						<AlbumCard key={tile.id} tile={tile} priority={i < 4} />
					))}
				</div>
			) : (
				<p className="empty">Spotify isn&apos;t answering right now, so there&apos;s nothing to show. Try again in a bit.</p>
			)}
		</>
	);
}
