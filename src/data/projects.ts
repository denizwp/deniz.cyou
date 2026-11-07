export interface Project {
	id: string;
	name: string;
	/** empty when there's nothing public to open */
	url?: string;
	/**
	 * What the card shows, and the only place to change it.
	 * `shot` is a screenshot shown whole, at the size it was taken; `mark` is a logo standing on the card's bottom edge.
	 */
	shot?: { src: string; width: number; height: number };
	mark?: string;
}

const shot = (id: string, width: number, height: number) => ({ src: `/images/shots/${id}.webp`, width, height });

export const projects: Project[] = [
	{ id: "latch", name: "Latch", url: "https://heylatch.app/", shot: shot("latch", 1920, 855) },
	{ id: "tools", name: "deniz's tools", url: "https://tools.deniz.cyou/", shot: shot("tools", 1919, 1079) },
	{ id: "azuki", name: "azuki", url: "https://azuki.deniz.cyou/", shot: shot("azuki", 3840, 2160) },
	{ id: "matchup", name: "matchup", url: "https://matchup-tr.gta.world/", shot: shot("matchup", 1919, 908) },
	{ id: "klutchr", name: "klutchr", url: "https://nood.deniz.cyou/", shot: shot("klutchr", 3840, 2160) },
	{ id: "lschat", name: "ls chat", url: "https://chat-tr.gta.world/", shot: shot("lschat", 1917, 906) },
	{ id: "sanmail", name: "sanmail", url: "https://mail-tr.gta.world/", shot: shot("sanmail", 1917, 906) },
	{ id: "handshake", name: "handshake", url: "https://handshake.deniz.cyou/", shot: shot("handshake", 1919, 905) },
	{ id: "ulsahub", name: "ulsahub", url: "https://ulsahub-tr.gta.world/", shot: shot("ulsahub", 3840, 2160) },
	{ id: "cookie", name: "buy me a cookie", url: "https://buymeacookie.xyz/", shot: shot("cookie", 3840, 2160) },
	{ id: "soundloop", name: "soundloop v2", url: "https://soundloop.app/", shot: shot("soundloop", 1919, 1079) },
	{ id: "capture", name: "Capture Assistant", url: "https://github.com/denizwp/captureassistant/releases", mark: "/images/marks/tree.png" },
	{ id: "vetric", name: "vetric", url: "https://vetric.online/", shot: shot("vetric", 1920, 855) }
];

/** throws on a typo, so a missing card fails the build instead of leaving a hole in the grid */
export function project(id: string): Project {
	const found = projects.find(p => p.id === id);
	if (!found) throw new Error(`no project called ${id}`);
	return found;
}
