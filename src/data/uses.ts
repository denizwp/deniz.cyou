export interface UsesItem {
	name: string;
	description: string;
	url?: string;
}

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
				description: "i write everything here.",
				url: "https://code.visualstudio.com/"
			},
			{
				name: "Slack Theme",
				description: "dark mode, the one i keep coming back to.",
				url: "https://marketplace.visualstudio.com/items?itemName=felipe-mendes.slack-theme"
			},
			{
				name: "Prettier",
				description: "my default formatter for html and typescript.",
				url: "https://prettier.io/"
			},
			{
				name: "Tailwind CSS IntelliSense",
				description: "class autocomplete, hard to work without it.",
				url: "https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
			},
			{
				name: "Intelephense",
				description: "php language support for the older projects.",
				url: "https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client"
			},
			{
				name: "vscord",
				description:
					"puts what i'm editing on my discord status — the card on the home page.",
				url: "https://marketplace.visualstudio.com/items?itemName=LeonardSSH.vscord"
			}
		]
	},
	{
		title: "Development",
		items: [
			{
				name: "TypeScript",
				description: "the default language for anything i start now.",
				url: "https://www.typescriptlang.org/"
			},
			{
				name: "React & Next.js",
				description: "the skeleton of most of my projects, this site included.",
				url: "https://nextjs.org/"
			},
			{
				name: "Tailwind CSS",
				description: "styling in 10 of the 12 projects on this site.",
				url: "https://tailwindcss.com/"
			},
			{
				name: "Node.js",
				description: "backends and small tools.",
				url: "https://nodejs.org/"
			},
			{
				name: "MySQL & MongoDB",
				description: "whichever the project asks for.",
				url: "https://www.mysql.com/"
			},
			{
				name: "PHP",
				description: "still shows up in a few of the older ones.",
				url: "https://www.php.net/"
			}
		]
	},
	{
		title: "Everything Else",
		items: [
			{
				name: "Figma",
				description: "where interfaces get drawn before they get coded.",
				url: "https://www.figma.com/@denizwp"
			},
			{
				name: "Blender",
				description: "for when i'm messing with 3d.",
				url: "https://www.blender.org/"
			},
			{
				name: "Spotify",
				description: "always open while coding — live on the home page.",
				url: "https://open.spotify.com/user/szviltwriiiu23qzw5uriwtw7"
			},
			{
				name: "Cloudflare",
				description: "dns and everything sitting in front of deniz.cyou.",
				url: "https://www.cloudflare.com/"
			}
		]
	}
];
