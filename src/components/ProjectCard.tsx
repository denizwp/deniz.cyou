import Image from "next/future/image";

import { Project } from "../data/projects";
import Card from "./Card";

/** the name in the corner and a picture; nothing else */
export default function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
	const { name, url, shot, mark } = project;

	return (
		<Card label={`Projects · ${name}`} wide={wide} href={url} className={shot ? "shot-card" : "logo-card"}>
			{shot ? (
				<div className="shot">
					{/* screenshots are full of small text, so they go out exactly as they are, with no recompressing */}
					<Image src={shot.src} alt={`${name} screenshot`} width={shot.width} height={shot.height} loading="lazy" unoptimized />
				</div>
			) : (
				// eslint-disable-next-line @next/next/no-img-element
				<img className="logo" src={mark} alt={`${name} logo`} loading="lazy" />
			)}
		</Card>
	);
}
