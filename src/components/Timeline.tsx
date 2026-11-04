import { school, Stint, work } from "../data/career";
import { dates, length, ruler } from "../lib/career";
import { external } from "./Card";

type Place = ReturnType<ReturnType<typeof ruler>["place"]>;
type Year = ReturnType<typeof ruler>["years"][number];

function Track({ years, place }: { years: Year[]; place: Place }) {
	return (
		<div className="track" aria-hidden="true">
			{years.map(({ year, share }) => (
				<span key={year} style={{ width: `${share}%` }} />
			))}
			<i style={{ left: `${place.left}%`, width: `${place.width}%` }} />
		</div>
	);
}

function Row({ stint, years, place, at }: { stint: Stint; years: Year[]; place: Place; at: number }) {
	const span = length(stint, at);

	return (
		<li className={stint.end ? "stint" : "stint is-running"}>
			<h3>
				{stint.url ? (
					<a className="stretch" href={stint.url} {...external}>
						{stint.name}
					</a>
				) : (
					stint.name
				)}
			</h3>
			<p className="stint-info">
				{stint.role && (
					<>
						{stint.role}
						<br />
					</>
				)}
				<span>
					{dates(stint)}
					{span ? ` · ${span}` : ""}
				</span>
			</p>
			<Track years={years} place={place} />
		</li>
	);
}

/** where i've worked and studied, every row on the same ruler so the years and the overlaps are visible */
export default function Timeline({ at }: { at: number }) {
	const { years, place } = ruler([...work, ...school], at);

	const group = (title: string, stints: Stint[]) => (
		<section className="stints">
			<h2>{title}.</h2>
			<ul>
				{stints.map(stint => (
					<Row key={stint.name} stint={stint} years={years} place={place(stint)} at={at} />
				))}
			</ul>
		</section>
	);

	return (
		<div className="timeline">
			<div className="years" aria-hidden="true">
				{years.map(({ year, share }) => (
					<span key={year} style={{ width: `${share}%` }}>
						{year}
					</span>
				))}
			</div>
			{group("work", work)}
			{group("school", school)}
		</div>
	);
}
