export interface ToolItem {
	name: string;
	url?: string;
	/** a skillicons.dev slug */
	icon?: string;
	/** a domain, resolved to a logo through logo.dev */
	domain?: string;
	/** a full image url, for anything the other two don't cover */
	src?: string;
}

export interface ToolGroup {
	title: string;
	items: ToolItem[];
}

export const tools: ToolGroup[] = [
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
				domain: "slack.com",
				url: "https://marketplace.visualstudio.com/items?itemName=felipe-mendes.slack-theme"
			},
			{
				name: "Prettier",
				domain: "prettier.io",
				url: "https://prettier.io/"
			},
			{
				name: "Tailwind CSS IntelliSense",
				domain: "tailwindcss.com",
				url: "https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
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
				url: "https://www.figma.com/"
			},
			{
				name: "Blender",
				icon: "blender",
				url: "https://www.blender.org/"
			}
		]
	}
];
