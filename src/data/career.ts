export interface Stint {
	name: string;
	/** your position there, shown under the name */
	role?: string;
	url?: string;
	/** "YYYY-MM", or just "YYYY" when the month doesn't matter */
	start?: string;
	/** same format, inclusive; leave it out while it's still going */
	end?: string;
}

export const work: Stint[] = [
	{ name: "Retro Store", start: "2026-09" },
	{ name: "GTA World", start: "2026-07" },
	{ name: "Vorp", start: "2025-03", end: "2025-09" },
	{ name: "Cloud Developers", start: "2024-07", end: "2025-01" }
];

export const school: Stint[] = [{ name: "Bahçeşehir University", role: "English Language Teaching", start: "2026" }];
