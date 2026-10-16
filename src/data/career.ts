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
	{ name: "Retro Store", role: "Developer", url: "https://retrostore.dev", start: "2026-09" },
	{ name: "GTA World", role: "Web Developer", url: "https://gta.world/", start: "2026-07" },
	{ name: "VORP", role: "Developer", url: "https://vorp.gg/", start: "2025-03", end: "2025-09" },
	{ name: "teamCloud", role: "Project Manager & Developer", start: "2023-07", end: "2024-09" },
];

export const school: Stint[] = [{ name: "Bahçeşehir University", role: "English Language Teaching", start: "2026" }];
