export interface StackIconItem {
	name: string;
	icon: string;
	src?: never;
}

export interface StackCustomItem {
	name: string;
	icon?: never;
	src: string;
}

/** a logo repeated on a plain ground, drawn at whatever size the card is */
export interface Pattern {
	mark: string;
	ground: string;
	/** the mark's box on screen, in css pixels */
	width: number;
	height: number;
}

export interface ProjectInfo {
	name: string;
	description: React.ReactNode;
	/** crop used in the index, as a css aspect-ratio */
	ratio: string;
	pattern?: Pattern;
	/** a screenshot instead of a pattern, with its own size in pixels */
	image?: string;
	width?: number;
	height?: number;
	/** which part of the screenshot the crop keeps */
	position?: string;
	url: string;
	stack: (StackIconItem | StackCustomItem)[];
}

export const projects: ProjectInfo[] = [
	{
		name: "Wychwood",
		description: "a turkish roleplay server for hogwarts legacy: the gamemode, the in-game ui and the player panel",
		pattern: { mark: "/images/projects/marks/wychwood.png", ground: "#2A1C12", width: 59, height: 58 },
		ratio: "4 / 5",
		url: "https://ucp.wychwood.world/",
		stack: [{ name: "TypeScript", icon: "ts" }, { name: "React", icon: "react" }, { name: "Fastify", src: "https://img.logo.dev/fastify.dev?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }, { name: "MariaDB", src: "https://img.logo.dev/mariadb.org?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }]
	},
	{
		name: "WASTELAND",
		description: "a zombie survival roleplay server on fivem: the gamemode, the in-game ui and the player panel",
		pattern: { mark: "/images/projects/marks/wasteland.png", ground: "#7A1712", width: 50, height: 60 },
		ratio: "16 / 9",
		url: "https://ucp.wastelandgta.me/",
		stack: [{ name: "Lua", icon: "lua" }, { name: "React", icon: "react" }, { name: "Fastify", src: "https://img.logo.dev/fastify.dev?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "deniz's tools",
		description: "a multi-purpose toolbox — a proxy, a story creator, a mesh viewer and more",
		pattern: { mark: "/images/projects/marks/tree.png", ground: "#f3f3f3", width: 45, height: 54 },
		ratio: "16 / 9",
		url: "https://tools.deniz.cyou/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MongoDB", icon: "mongodb" }]
	},
	{
		name: "azuki",
		description: "a fictional technology company",
		pattern: { mark: "/images/projects/marks/azuki.svg", ground: "#f3f3f3", width: 48, height: 48 },
		ratio: "1910 / 716",
		url: "https://azuki.deniz.cyou/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "matchup",
		description: "a dating app",
		pattern: { mark: "/images/projects/marks/matchup.svg", ground: "#f3f3f3", width: 46, height: 46 },
		ratio: "4 / 5",
		url: "https://matchup-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "klutchr",
		description: "faceit-style matchmaking for valorant",
		pattern: { mark: "/images/projects/marks/klutchr.png", ground: "#0e0e10", width: 84, height: 18 },
		ratio: "1 / 1",
		url: "https://nood.deniz.cyou/",
		stack: [{ name: "Next.js", icon: "nextjs" }, { name: "Prisma", icon: "prisma" }, { name: "PostgreSQL", icon: "postgres" }, { name: "Redis", icon: "redis" }]
	},
	{
		name: "ls chat",
		description: "a discord-like chat app",
		pattern: { mark: "/images/projects/marks/lschat.svg", ground: "#f3f3f3", width: 46, height: 46 },
		ratio: "1917 / 906",
		url: "https://chat-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Maze Bank Championship",
		description: "fc26 leagues and teams for the gta world community",
		pattern: { mark: "/images/projects/marks/mazebank.png", ground: "#f3f3f3", width: 44, height: 45 },
		ratio: "16 / 9",
		url: "https://mazebankchampionship.pro/",
		stack: [{ name: "Next.js", icon: "nextjs" }, { name: "Prisma", icon: "prisma" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MariaDB", src: "https://img.logo.dev/mariadb.org?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }]
	},
	{
		name: "sanmail",
		description: "a webmail service",
		pattern: { mark: "/images/projects/marks/sanmail.png", ground: "#f3f3f3", width: 46, height: 46 },
		ratio: "1917 / 906",
		url: "https://mail-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "handshake",
		description: "a linkedin-like professional network",
		pattern: { mark: "/images/projects/marks/handshake.svg", ground: "#f3f3f3", width: 46, height: 46 },
		ratio: "1919 / 905",
		url: "https://handshake.deniz.cyou/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Dead Horizon",
		description: "the player panel for a project zomboid roleplay server",
		pattern: { mark: "/images/projects/marks/deadhorizon.png", ground: "#141110", width: 64, height: 57 },
		ratio: "4 / 3",
		url: "",
		stack: [{ name: "TypeScript", icon: "ts" }, { name: "React", icon: "react" }, { name: "Fastify", src: "https://img.logo.dev/fastify.dev?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "ulsahub",
		description: "a campus hub for ulsa, a fictional university",
		pattern: { mark: "/images/projects/marks/ulsa.png", ground: "#f3f3f3", width: 48, height: 48 },
		ratio: "16 / 9",
		url: "https://ulsahub-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "buy me a cookie",
		description: "a marketplace for buying and selling things",
		pattern: { mark: "/images/projects/marks/cookie.png", ground: "#f3f3f3", width: 54, height: 54 },
		ratio: "1 / 1",
		url: "https://buymeacookie.xyz/",
		stack: [{ name: "React", icon: "react" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "soundloop v2",
		description: "a music streaming service, in the style of apple music",
		pattern: { mark: "/images/projects/marks/soundloop.png", ground: "#f3f3f3", width: 72, height: 36 },
		ratio: "16 / 9",
		url: "https://soundloop.app/",
		stack: [{ name: "React", icon: "react" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Capture Assistant",
		description: "a windows screen recorder that keeps the last few minutes and saves them on a hotkey",
		pattern: { mark: "/images/projects/marks/tree.png", ground: "#121412", width: 45, height: 54 },
		ratio: "16 / 9",
		url: "https://github.com/denizwp/captureassistant/releases",
		stack: [{ name: "Electron", icon: "electron" }, { name: "React", icon: "react" }, { name: "TypeScript", icon: "ts" }, { name: "C++", icon: "cpp" }]
	},
	{
		name: "vetric",
		description: "a sports betting website",
		pattern: { mark: "/images/projects/marks/vetric.png", ground: "#f3f3f3", width: 44, height: 45 },
		ratio: "16 / 9",
		url: "https://vetric.online/",
		stack: [{ name: "React", icon: "react" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }]
	}
];
