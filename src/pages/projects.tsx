import PageHead from "../components/PageHead";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
	return (
		<>
			<PageHead title="projects">
				I build web apps for real and made-up companies, mostly in React, Node.js and MySQL. Here&apos;s everything that&apos;s out so far.
			</PageHead>
			<div className="grid grid-projects">
				{projects.map(p => (
					<ProjectCard key={p.id} project={p} wide />
				))}
			</div>
		</>
	);
}
