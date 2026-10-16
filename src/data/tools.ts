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
				name: "Lua",
				icon: "lua",
				url: "https://www.lua.org/"
			},
			{
				name: "Python",
				icon: "py",
				url: "https://www.python.org/"
			},
			{
				name: "PHP",
				icon: "php",
				url: "https://www.php.net/"
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
				name: "Vite",
				icon: "vite",
				url: "https://vite.dev/"
			},
			{
				name: "Tailwind CSS",
				icon: "tailwind",
				url: "https://tailwindcss.com/"
			},
			{
				name: "three.js",
				icon: "threejs",
				url: "https://threejs.org/"
			},
			{
				name: "Electron",
				icon: "electron",
				url: "https://www.electronjs.org/"
			},
			{
				name: "Node.js",
				icon: "nodejs",
				url: "https://nodejs.org/"
			},
			{
				name: "Express",
				icon: "express",
				url: "https://expressjs.com/"
			},
			{
				name: "Fastify",
				domain: "fastify.dev",
				url: "https://fastify.dev/"
			},
			{
				name: "Prisma",
				icon: "prisma",
				url: "https://www.prisma.io/"
			},
			{
				name: "MySQL",
				icon: "mysql",
				url: "https://www.mysql.com/"
			},
			{
				name: "PostgreSQL",
				icon: "postgres",
				url: "https://www.postgresql.org/"
			},
			{
				name: "MongoDB",
				icon: "mongodb",
				url: "https://www.mongodb.com/"
			},
			{
				name: "Redis",
				icon: "redis",
				url: "https://redis.io/"
			}
		]
	},
	{
		title: "Hosting",
		items: [
			{
				name: "Docker",
				icon: "docker",
				url: "https://www.docker.com/"
			},
			{
				name: "nginx",
				icon: "nginx",
				url: "https://nginx.org/"
			},
			{
				name: "GitHub Actions",
				icon: "githubactions",
				url: "https://github.com/features/actions"
			},
			{
				name: "Cloudflare",
				icon: "cloudflare",
				url: "https://www.cloudflare.com/"
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
