export interface Project {
	id: string;
	name: string;
	/** empty when there's nothing public to open */
	url?: string;
	/**
	 * What the card shows, and the only place to change it.
	 * `shot` is a screenshot in a browser frame; `mark` is a logo or mascot standing on the card's bottom edge.
	 */
	shot?: { src: string; width: number; height: number };
	mark?: string;
}

const shot = (id: string, height = 1000, width = 1600) => ({ src: `/images/shots/${id}.webp`, width, height });

export const projects: Project[] = [
	{ id: "tools", name: "deniz's tools", url: "https://tools.deniz.cyou/", shot: shot("tools", 900) },
	{ id: "azuki", name: "azuki", url: "https://azuki.deniz.cyou/", shot: shot("azuki") },
	{ id: "matchup", name: "matchup", url: "https://matchup-tr.gta.world/", shot: shot("matchup", 757) },
	{ id: "klutchr", name: "klutchr", url: "https://nood.deniz.cyou/", shot: shot("klutchr") },
	{ id: "lschat", name: "ls chat", url: "https://chat-tr.gta.world/", shot: shot("lschat", 756) },
	{ id: "sanmail", name: "sanmail", url: "https://mail-tr.gta.world/", shot: shot("sanmail", 756) },
	{ id: "handshake", name: "handshake", url: "https://handshake.deniz.cyou/", shot: shot("handshake", 755) },
	{ id: "ulsahub", name: "ulsahub", url: "https://ulsahub-tr.gta.world/", shot: shot("ulsahub") },
	{ id: "cookie", name: "buy me a cookie", url: "https://buymeacookie.xyz/", shot: shot("cookie") },
	{ id: "soundloop", name: "soundloop v2", url: "https://soundloop.app/", shot: shot("soundloop", 900) },
	{ id: "capture", name: "Capture Assistant", url: "https://github.com/denizwp/captureassistant/releases", mark: "/images/marks/tree.png" },
	{ id: "vetric", name: "vetric", url: "https://vetric.online/", shot: shot("vetric", 698, 1568) }
];

/** throws on a typo, so a missing card fails the build instead of leaving a hole in the grid */
export function project(id: string): Project {
	const found = projects.find(p => p.id === id);
	if (!found) throw new Error(`no project called ${id}`);
	return found;
}
