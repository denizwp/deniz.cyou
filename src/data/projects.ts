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

export interface ProjectInfo {
	name: string;
	description: React.ReactNode;
	image: string;
	/** the picture's own size in pixels */
	width: number;
	height: number;
	/** crop used in the index, as a css aspect-ratio */
	ratio: string;
	/** which part of the picture the crop keeps */
	position?: string;
	url: string;
	stack: (StackIconItem | StackCustomItem)[];
}

export const projects: ProjectInfo[] = [
	{
		name: "Wychwood",
		description: "a turkish roleplay server for hogwarts legacy: the gamemode, the in-game ui and the player panel",
		image: "/images/projects/wm/wychwood.png",
		width: 1920,
		height: 1080,
		ratio: "4 / 5",
		url: "https://ucp.wychwood.world/",
		stack: [{ name: "TypeScript", icon: "ts" }, { name: "React", icon: "react" }, { name: "Fastify", src: "https://img.logo.dev/fastify.dev?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }, { name: "MariaDB", src: "https://img.logo.dev/mariadb.org?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }]
	},
	{
		name: "WASTELAND",
		description: "a zombie survival roleplay server on fivem: the gamemode, the in-game ui and the player panel",
		image: "/images/projects/wm/wasteland.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://ucp.wastelandgta.me/",
		stack: [{ name: "Lua", icon: "lua" }, { name: "React", icon: "react" }, { name: "Fastify", src: "https://img.logo.dev/fastify.dev?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "deniz's tools",
		description: "a multi-purpose toolbox — a proxy, a story creator, a mesh viewer and more",
		image: "/images/projects/wm/movie.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://tools.deniz.cyou/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MongoDB", icon: "mongodb" }]
	},
	{
		name: "azuki",
		description: "a fictional technology company",
		image: "/images/projects/wm/azuki.png",
		width: 1920,
		height: 1080,
		ratio: "1910 / 716",
		url: "https://azuki.deniz.cyou/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "matchup",
		description: "a dating app",
		image: "/images/projects/wm/matchup.png",
		width: 1920,
		height: 1080,
		ratio: "4 / 5",
		url: "https://matchup-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "klutchr",
		description: "faceit-style matchmaking for valorant, built with muratcan kıyanç",
		image: "/images/projects/wm/klutchr.png",
		width: 1920,
		height: 1080,
		ratio: "1 / 1",
		url: "https://nood.deniz.cyou/",
		stack: [{ name: "Next.js", icon: "nextjs" }, { name: "Prisma", icon: "prisma" }, { name: "PostgreSQL", icon: "postgres" }, { name: "Redis", icon: "redis" }]
	},
	{
		name: "ls chat",
		description: "a discord-like chat app",
		image: "/images/projects/wm/chat.png",
		width: 1920,
		height: 1080,
		ratio: "1917 / 906",
		url: "https://chat-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Maze Bank Championship",
		description: "fc26 leagues and teams for the gta world community",
		image: "/images/projects/wm/mazebank.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://mazebankchampionship.pro/",
		stack: [{ name: "Next.js", icon: "nextjs" }, { name: "Prisma", icon: "prisma" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MariaDB", src: "https://img.logo.dev/mariadb.org?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }]
	},
	{
		name: "sanmail",
		description: "a webmail service",
		image: "/images/projects/wm/mail.png",
		width: 1920,
		height: 1080,
		ratio: "1917 / 906",
		url: "https://mail-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "handshake",
		description: "a linkedin-like professional network",
		image: "/images/projects/wm/handshake.png",
		width: 1920,
		height: 1080,
		ratio: "1919 / 905",
		url: "https://handshake.deniz.cyou/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Dead Horizon",
		description: "the player panel for a project zomboid roleplay server",
		image: "/images/projects/wm/deadhorizon.png",
		width: 1920,
		height: 1080,
		ratio: "4 / 3",
		url: "",
		stack: [{ name: "TypeScript", icon: "ts" }, { name: "React", icon: "react" }, { name: "Fastify", src: "https://img.logo.dev/fastify.dev?token=pk_Yb0fJ73UST2bOQAxWsv8ag&size=128&format=png" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "ulsahub",
		description: "a campus hub for ulsa, a fictional university",
		image: "/images/projects/wm/ulsahub.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://ulsahub-tr.gta.world/",
		stack: [{ name: "React", icon: "react" }, { name: "Node.js", icon: "nodejs" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "buy me a cookie",
		description: "a marketplace for buying and selling things",
		image: "/images/projects/cookie.png",
		width: 1920,
		height: 1080,
		ratio: "1 / 1",
		url: "https://buymeacookie.xyz/",
		stack: [{ name: "React", icon: "react" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "soundloop v2",
		description: "a music streaming service, in the style of apple music",
		image: "/images/projects/wm/music.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://soundloop.app/",
		stack: [{ name: "React", icon: "react" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Capture Assistant",
		description: "a windows screen recorder that keeps the last few minutes and saves them on a hotkey",
		image: "/images/projects/wm/capture.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://github.com/denizwp/captureassistant/releases",
		stack: [{ name: "Electron", icon: "electron" }, { name: "React", icon: "react" }, { name: "TypeScript", icon: "ts" }, { name: "C++", icon: "cpp" }]
	},
	{
		name: "vetric",
		description: "a sports betting website",
		image: "/images/projects/wm/vetric.png",
		width: 1920,
		height: 1080,
		ratio: "16 / 9",
		url: "https://vetric.online/",
		stack: [{ name: "React", icon: "react" }, { name: "Tailwind CSS", icon: "tailwind" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }]
	},
	{
		name: "Los Santos Tennis Club",
		description: "a site for a tennis club in los santos",
		image: "/images/projects/wm/tennis.png",
		width: 1920,
		height: 1080,
		ratio: "4 / 3",
		url: "",
		stack: [{ name: "React", icon: "react" }, { name: "Vite", icon: "vite" }]
	},
	{
		name: "agac project",
		description: "a community of developers",
		image: "/images/projects/agacproject.gif",
		width: 540,
		height: 289,
		ratio: "540 / 289",
		url: "https://github.com/agacproject",
		stack: [{ name: "GitHub", icon: "github" }]
	},
	{
		name: "povs.live",
		description: "multiple streamer povs, side by side",
		image: "/images/projects/povs.png",
		width: 1920,
		height: 1080,
		ratio: "4 / 3",
		position: "0% 0%",
		url: "",
		stack: []
	}
];
