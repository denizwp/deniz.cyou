import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import Sidebar from "../components/Sidebar";
import { ProjectInfo, projects } from "../data/projects";

// the narrow and the wide column, as shares of the content width
const COLUMNS = [0.4, 0.6];
// a caption's height, in the same units
const CAPTION = 0.05;

const ratioOf = (r: string) => {
	const [w, h] = r.split("/").map(Number);
	return w / h;
};

/** keeps reading order while filling whichever column is shorter */
function intoColumns(items: ProjectInfo[]) {
	const cols: ProjectInfo[][] = COLUMNS.map(() => []);
	const heights = COLUMNS.map(() => 0);
	for (const item of items) {
		const ratio = ratioOf(item.ratio);
		// on a tie, wide shots go to the wide column
		let c = heights[0] < heights[1] ? 0 : heights[1] < heights[0] ? 1 : ratio > 1.3 ? 1 : 0;
		cols[c].push(item);
		heights[c] += COLUMNS[c] / ratio + CAPTION;
	}
	return cols;
}

const host = (url: string) => {
	try {
		return new URL(url).host + new URL(url).pathname.replace(/\/$/, "");
	} catch {
		return "";
	}
};

/**
 * Tells the browser how wide the picture really gets drawn. A crop zooms in,
 * so a cropped shot needs more pixels than the box it sits in, or it blurs.
 */
function sizesFor({ width, height, ratio }: ProjectInfo, share: number) {
	const zoom = Math.max(1, width / height / ratioOf(ratio));
	const z = zoom.toFixed(2);
	return `(max-width: 860px) calc((100vw - 20px) * ${z}), calc((100vw - 268px) * ${share * zoom})`;
}

function Work({ share, ...project }: ProjectInfo & { share: number }) {
	const { name, description, image, width, height, ratio, position, url, stack } = project;
	const caption = (
		<div className="cap">
			<b>{name}</b>
			{description}
			{stack.length > 0 && <> —— {stack.map(s => s.name).join(", ")}</>}
			{url && (
				<>
					<br />
					<span className="is-grey">{host(url)}</span>
				</>
			)}
		</div>
	);
	const picture = (
		<Image
			src={image}
			alt=""
			width={width}
			height={height}
			sizes={sizesFor(project, share)}
			quality={90}
			// never stretch a small source past its own size
			style={{ aspectRatio: ratio, objectPosition: position ?? "50% 50%", maxWidth: width }}
			priority
		/>
	);

	return url ? (
		<a className="work-item" href={url} target="_blank" rel="noopener noreferrer">
			{picture}
			{caption}
		</a>
	) : (
		<div className="work-item">
			{picture}
			{caption}
		</div>
	);
}

export default function Projects() {
	const [narrow, wide] = intoColumns(projects);

	return (
		<>
			<GenericMeta title="Projects – deniz" description="Things deniz has built and still looks after." />
			<Sidebar>
				is an 18-year-old developer from turkiye, building web apps for real and made-up companies, mostly
				in react, node.js and mysql.
			</Sidebar>
			<h1 className="sr-only">Projects</h1>
			<div className="works">
				<div className="works-col">
					{narrow.map(p => (
						<Work key={p.name} share={COLUMNS[0]} {...p} />
					))}
				</div>
				<div className="works-col">
					{wide.map(p => (
						<Work key={p.name} share={COLUMNS[1]} {...p} />
					))}
				</div>
			</div>
		</>
	);
}
