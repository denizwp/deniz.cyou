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
	}
];
