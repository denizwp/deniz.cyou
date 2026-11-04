import type { Stint } from "../data/career";

const month = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** months since year 0, so ranges are plain subtraction; a bare year counts from january */
const index = (ym: string) => {
	const [y, m = 1] = ym.split("-").map(Number);
	return y * 12 + (m - 1);
};

const hasMonth = (ym?: string) => !!ym && ym.includes("-");

const label = (ym: string) => (hasMonth(ym) ? month.format(Date.UTC(Math.floor(index(ym) / 12), index(ym) % 12, 1)) : ym);

const currentMonth = (at: number) => {
	const today = new Date(at);
	return today.getUTCFullYear() * 12 + today.getUTCMonth();
};

function duration(months: number) {
	const y = Math.floor(months / 12);
	const m = months % 12;
	const part = (n: number, word: string) => (n ? `${n} ${word}${n === 1 ? "" : "s"}` : "");
	return [part(y, "year"), part(m, "month")].filter(Boolean).join(" ");
}

export function dates(stint: Stint) {
	if (!stint.start) return "Now";
	return `${label(stint.start)} – ${stint.end ? label(stint.end) : "now"}`;
}

/** a length only makes sense when both ends are known to the month */
export function length(stint: Stint, at: number) {
	if (!hasMonth(stint.start) || (stint.end && !hasMonth(stint.end))) return null;
	return duration((stint.end ? index(stint.end) : currentMonth(at)) - index(stint.start!) + 1);
}

/**
 * One shared ruler for every stint: from the january of the earliest start up to this month.
 * Returns the years with their share of the ruler, and where a stint sits on it, both in percent.
 */
export function ruler(stints: Stint[], at: number) {
	const starts = stints.filter(s => s.start).map(s => index(s.start!));
	const from = Math.floor(Math.min(...starts) / 12) * 12;
	const to = currentMonth(at) + 1;
	const total = to - from;

	const years = [];
	for (let start = from; start < to; start += 12) {
		years.push({ year: start / 12, share: ((Math.min(start + 12, to) - start) / total) * 100 });
	}

	const place = (stint: Stint) => {
		const start = index(stint.start ?? `${from / 12}`);
		const end = stint.end ? index(stint.end) + 1 : to;
		return { left: ((start - from) / total) * 100, width: ((end - start) / total) * 100 };
	};

	return { years, place };
}
