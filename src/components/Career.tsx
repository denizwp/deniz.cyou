import { school, Stint, work } from "../data/career";

const month = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** months since year 0, so ranges are plain subtraction; a bare year counts from january */
const index = (ym: string) => {
	const [y, m = 1] = ym.split("-").map(Number);
	return y * 12 + (m - 1);
};
const hasMonth = (ym?: string) => !!ym && ym.includes("-");
const label = (ym: string) => (hasMonth(ym) ? month.format(Date.UTC(Math.floor(index(ym) / 12), index(ym) % 12, 1)) : ym);

function length(months: number) {
	const y = Math.floor(months / 12);
	const m = months % 12;
	const part = (n: number, word: string) => (n ? `${n} ${word}${n === 1 ? "" : "s"}` : "");
	return [part(y, "year"), part(m, "month")].filter(Boolean).join(" ");
}

function Row({ stint, current }: { stint: Stint; current: number }) {
	const end = stint.end ? index(stint.end) : current;
	// a length only makes sense when both ends are known to the month
	const months = hasMonth(stint.start) && (!stint.end || hasMonth(stint.end)) ? end - index(stint.start!) + 1 : null;
	const now = <span className="is-now">now</span>;

	return (
		<li className="stint">
			<div>
				<p className="stint-name">
					{stint.url ? (
						<a href={stint.url} target="_blank" rel="noopener noreferrer">
							{stint.name}
						</a>
					) : (
						stint.name
					)}
				</p>
				{stint.role && <p className="stint-role">{stint.role}</p>}
			</div>
			<div className="stint-when">
				<p>
					{stint.start ? (
						<>
							{label(stint.start)} – {stint.end ? label(stint.end) : now}
						</>
					) : (
						now
					)}
				</p>
				{months !== null && <p className="is-grey">{length(months)}</p>}
			</div>
		</li>
	);
}

/** where you've worked and studied, newest first */
export default function Career({ at }: { at: number }) {
	const today = new Date(at);
	const current = today.getUTCFullYear() * 12 + today.getUTCMonth();

	const group = (title: string, items: Stint[]) => (
		<div className="career-group">
			<h3 className="career-label">{title}</h3>
			<ul>
				{items.map(s => (
					<Row key={s.name} stint={s} current={current} />
				))}
			</ul>
		</div>
	);

	return (
		<section className="career" aria-labelledby="career-title">
			<h2 id="career-title" className="career-title">
				work &amp; school
			</h2>
			{group("Work", work)}
			{group("School", school)}
		</section>
	);
}
