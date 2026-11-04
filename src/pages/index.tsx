import type { GetStaticProps } from "next";
import Link from "next/link";

import AlbumCard from "../components/AlbumCard";
import { external, MarkCard } from "../components/Card";
import DiscordCard from "../components/DiscordCard";
import GenericMeta from "../components/GenericMeta";
import { GitHubCard, IstanbulCard, StintCard } from "../components/LiveCards";
import ProjectCard from "../components/ProjectCard";
import SpotifyCard from "../components/SpotifyCard";
import { school, work } from "../data/career";
import { project } from "../data/projects";
import { getLive, getTiles, LiveProps } from "../lib/live";
import type { AlbumTile } from "../lib/music";

interface HomeProps extends LiveProps {
	albums: AlbumTile[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const [live, tiles] = await Promise.all([getLive(), getTiles()]);
	return { props: { ...live, albums: tiles?.short.slice(0, 3) ?? [] }, revalidate: 30 };
};

const Page = ({ href, children }: React.PropsWithChildren<{ href: string }>) => (
	<Link href={href}>
		<a>{children}</a>
	</Link>
);

function Hero() {
	return (
		<div className="hero">
			<h1>
				Hey, I&apos;m <Page href="/now">Deniz</Page>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/images/marks/tree.png" alt="" width={214} height={256} /> I&apos;m 18, I live in <Page href="/now">Istanbul</Page> and I
				like building <Page href="/projects">things</Page> for real and made-up companies.
			</h1>
			<p>
				These days I&apos;m a developer at{" "}
				<a href="https://retrostore.dev" {...external}>
					Retro Store
				</a>{" "}
				and a web developer at{" "}
				<a href="https://gta.world/" {...external}>
					GTA World
				</a>
				, while studying <Page href="/now">English teaching</Page> at Bahçeşehir.
			</p>
			<p>
				I design in <Page href="/tools">Figma</Page>, model in <Page href="/tools">Blender</Page> and listen to a lot of{" "}
				<Page href="/music">Turkish pop</Page>, <Page href="/music">K-pop</Page> and whatever Adéla put out last.
			</p>
		</div>
	);
}

// four columns: wide cards take two, the hero takes two by two. every row adds up to four.
export default function Home({ at, discord, albums }: HomeProps) {
	return (
		<>
			<GenericMeta title="deniz" />
			<div className="grid">
				<Hero />
				<ProjectCard project={project("soundloop")} wide />
				<SpotifyCard at={at} />
				<ProjectCard project={project("capture")} />

				<IstanbulCard at={at} />
				<ProjectCard project={project("cookie")} wide />
				<StintCard stint={work[1]} kind="Work" at={at} href="/now" />

				<AlbumCard tile={albums[0]} priority />
				<MarkCard label="Tools · Everything Else" title="Figma" image="https://skillicons.dev/icons?theme=light&i=figma" tag="Design" tagColor="purple" href="/tools" />
				<ProjectCard project={project("ulsahub")} wide />

				<ProjectCard project={project("klutchr")} wide />
				<DiscordCard initial={discord} at={at} />
				<AlbumCard tile={albums[1]} />

				<GitHubCard at={at} />
				<MarkCard label="Tools · Everything Else" title="Blender" image="https://skillicons.dev/icons?theme=light&i=blender" tag="3D" tagColor="orange" href="/tools" />
				<ProjectCard project={project("azuki")} wide />

				<ProjectCard project={project("matchup")} wide />
				<StintCard stint={school[0]} kind="School" at={at} href="/now" />
				<AlbumCard tile={albums[2]} />
			</div>
		</>
	);
}
