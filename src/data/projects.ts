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
	url: string;
	stack: (StackIconItem | StackCustomItem)[];
}

export const projects: ProjectInfo[] = [
	{
		name: "agac project",
		description:
			"wip",
		image: "/images/projects/agacproject.gif",
		url: "https://discord.gg/agac",
		stack: [
			{
				name: "TailwindCSS",
				icon: "tailwindcss"
			}
		]
	},
	{
		name: "bbcode generator",
		description:
			"bbcode generator for gtaw:tr sadcr",
		image: "",
		url: "https://denizwpsadcr.vercel.app/",
		stack: [
			{
				name: "TailwindCSS",
				icon: "tailwindcss"
			},
			{
				name: "React",
				icon: "react"
			}
		]
	},
	{
		name: "povs.live",
		description:
			"Follow the FiveM servers, twitch streamers playing on the server, and don't miss instant content.",
		image: "/images/projects/povs.png",
		url: "https://povs.live",
		stack: [
			{
				name: "TailwindCSS",
				icon: "tailwindcss"
			},
			{
				name: "React",
				icon: "react"
			}
		]
	},
];
