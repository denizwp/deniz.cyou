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
					<Image
						src={shot.src}
						alt={`${name} screenshot`}
						width={shot.width}
						height={shot.height}
						quality={85}
						loading="lazy"
						sizes={wide ? "(max-width: 640px) 90vw, (max-width: 1100px) 70vw, 36vw" : "(max-width: 640px) 110vw, (max-width: 1100px) 60vw, 28vw"}
					/>
				</div>
			) : (
				// eslint-disable-next-line @next/next/no-img-element
				<img className="logo" src={mark} alt={`${name} logo`} loading="lazy" />
			)}
		</Card>
	);
}
