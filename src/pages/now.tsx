import type { GetStaticProps } from "next";

import AlbumCard from "../components/AlbumCard";
import DiscordCard from "../components/DiscordCard";
import { GitHubCard, IstanbulCard, StintCard } from "../components/LiveCards";
import PageHead from "../components/PageHead";
import SpotifyCard from "../components/SpotifyCard";
import { school, work } from "../data/career";
import { getLive, getTiles, LiveProps } from "../lib/live";
import type { AlbumTile } from "../lib/music";

interface NowProps extends LiveProps {
	album: AlbumTile | null;
}

// built ahead and refreshed at most every 30s, so the page opens at once with a recent
// snapshot; swr and the discord socket bring it up to the second right after
export const getStaticProps: GetStaticProps<NowProps> = async () => {
	const [live, tiles] = await Promise.all([getLive(), getTiles()]);
	return { props: { ...live, album: tiles?.short[0] ?? null }, revalidate: 30 };
};

export default function Now({ at, discord, album }: NowProps) {
	return (
		<>
			<PageHead title="now">
				What I&apos;m up to at this very moment, straight from Spotify, Discord and GitHub, and where I work and study.
			</PageHead>
			<div className="grid">
				<SpotifyCard at={at} wide />
				<DiscordCard initial={discord} at={at} />
				<IstanbulCard at={at} />
				<GitHubCard at={at} />
				{work.map(stint => (
					<StintCard key={stint.name} stint={stint} kind="Work" at={at} />
				))}
				{school.map(stint => (
					<StintCard key={stint.name} stint={stint} kind="School" at={at} />
				))}
				{/* the month's most played, which also closes the last row */}
				<AlbumCard tile={album ?? undefined} />
			</div>
		</>
	);
}
