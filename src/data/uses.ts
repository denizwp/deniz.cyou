export interface UsesIconItem {
	name: string;
	url?: string;
	/** a skillicons.dev slug */
	icon: string;
	src?: never;
}

export interface UsesCustomItem {
	name: string;
	url?: string;
	icon?: never;
	/** a full image url, for anything skillicons.dev doesn't have */
	src?: string;
}

export type UsesItem = UsesIconItem | UsesCustomItem;

export interface UsesGroup {
	title: string;
	items: UsesItem[];
}

export const uses: UsesGroup[] = [
	{
		title: "Editor",
		items: [
			{
				name: "VS Code",
				icon: "vscode",
				url: "https://code.visualstudio.com/"
			},
			{
				name: "Slack Theme",
				url: "https://marketplace.visualstudio.com/items?itemName=felipe-mendes.slack-theme"
			},
			{
				name: "Prettier",
				url: "https://prettier.io/"
			},
			{
				name: "Tailwind CSS IntelliSense",
				url: "https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
			},
			{
				name: "Intelephense",
				url: "https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client"
			},
			{
				name: "vscord",
				url: "https://marketplace.visualstudio.com/items?itemName=LeonardSSH.vscord"
			}
		]
	},
	{
		title: "Development",
		items: [
			{
				name: "TypeScript",
				icon: "ts",
				url: "https://www.typescriptlang.org/"
			},
			{
				name: "React",
				icon: "react",
				url: "https://react.dev/"
			},
			{
				name: "Next.js",
				icon: "nextjs",
				url: "https://nextjs.org/"
			},
			{
				name: "Tailwind CSS",
				icon: "tailwind",
				url: "https://tailwindcss.com/"
			},
			{
				name: "Node.js",
				icon: "nodejs",
				url: "https://nodejs.org/"
			},
			{
				name: "MySQL",
				icon: "mysql",
				url: "https://www.mysql.com/"
			},
			{
				name: "MongoDB",
				icon: "mongodb",
				url: "https://www.mongodb.com/"
			},
			{
				name: "PHP",
				icon: "php",
				url: "https://www.php.net/"
			}
		]
	},
	{
		title: "Everything Else",
		items: [
			{
				name: "Figma",
				icon: "figma",
				url: "https://www.figma.com/@denizwp"
			},
			{
				name: "Blender",
				icon: "blender",
				url: "https://www.blender.org/"
			},
			{
				name: "Spotify",
				src: "/images/spotify.png",
				url: "https://open.spotify.com/user/szviltwriiiu23qzw5uriwtw7"
			},
			{
				name: "Cloudflare",
				icon: "cloudflare",
				url: "https://www.cloudflare.com/"
			}
		]
	}
];
