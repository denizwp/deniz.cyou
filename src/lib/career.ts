import type { Stint } from "../data/career";

const month = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** months since year 0, so ranges are plain subtraction; a bare year counts from january */
const index = (ym: string) => {
	const [y, m = 1] = ym.split("-").map(Number);
	return y * 12 + (m - 1);
};

const hasMonth = (ym?: string) => !!ym && ym.includes("-");

const label = (ym: string) => (hasMonth(ym) ? month.format(Date.UTC(Math.floor(index(ym) / 12), index(ym) % 12, 1)) : ym);

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
	const today = new Date(at);
	const current = today.getUTCFullYear() * 12 + today.getUTCMonth();
	return duration((stint.end ? index(stint.end) : current) - index(stint.start!) + 1);
}
