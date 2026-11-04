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

const shot = (id: string, height = 1000) => ({ src: `/images/shots/${id}.webp`, width: 1600, height });

export const projects: Project[] = [
	{ id: "wychwood", name: "Wychwood", url: "https://ucp.wychwood.world/", mark: "/images/marks/wychwood.png" },
	{ id: "wasteland", name: "WASTELAND", url: "https://ucp.wastelandgta.me/", mark: "/images/marks/wasteland.png" },
	{ id: "tools", name: "deniz's tools", url: "https://tools.deniz.cyou/", mark: "/images/marks/tree.png" },
	{ id: "azuki", name: "azuki", url: "https://azuki.deniz.cyou/", shot: shot("azuki") },
	{ id: "matchup", name: "matchup", url: "https://matchup-tr.gta.world/", shot: shot("matchup") },
	{ id: "klutchr", name: "klutchr", url: "https://nood.deniz.cyou/", shot: shot("klutchr") },
	{ id: "lschat", name: "ls chat", url: "https://chat-tr.gta.world/", shot: shot("lschat", 756) },
	{ id: "mazebank", name: "Maze Bank Championship", url: "https://mazebankchampionship.pro/", shot: shot("mazebank") },
	{ id: "sanmail", name: "sanmail", url: "https://mail-tr.gta.world/", shot: shot("sanmail", 756) },
	{ id: "handshake", name: "handshake", url: "https://handshake.deniz.cyou/", shot: shot("handshake", 755) },
	{ id: "deadhorizon", name: "Dead Horizon", mark: "/images/marks/deadhorizon.png" },
	{ id: "ulsahub", name: "ulsahub", url: "https://ulsahub-tr.gta.world/", shot: shot("ulsahub") },
	{ id: "cookie", name: "buy me a cookie", url: "https://buymeacookie.xyz/", shot: shot("cookie") },
	{ id: "soundloop", name: "soundloop v2", url: "https://soundloop.app/", shot: shot("soundloop") },
	{ id: "capture", name: "Capture Assistant", url: "https://github.com/denizwp/captureassistant/releases", mark: "/images/marks/tree.png" },
	{ id: "vetric", name: "vetric", url: "https://vetric.online/", shot: shot("vetric", 900) }
];

/** throws on a typo, so a missing card fails the build instead of leaving a hole in the grid */
export function project(id: string): Project {
	const found = projects.find(p => p.id === id);
	if (!found) throw new Error(`no project called ${id}`);
	return found;
}
