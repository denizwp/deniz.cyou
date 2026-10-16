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
	/** the screenshot's own size in pixels */
	width: number;
	height: number;
	/** crop used in the index, as a css aspect-ratio */
	ratio: string;
	/** which part of the screenshot the crop keeps */
	position?: string;
	url: string;
	stack: (StackIconItem | StackCustomItem)[];
}

export const projects: ProjectInfo[] = [
  {
    name: "deniz's tools",
    description: "a multi-purpose toolbox — a proxy, a story creator, a mesh viewer and more",
    image: "/images/projects/movie.png",
    width: 1914,
    height: 375,
    ratio: "1914 / 375",
    url: "https://tools.deniz.cyou/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MongoDB",
        icon: "mongodb",
      },
    ],
  },
  {
    name: "azuki",
    description: "a fictional technology company",
    image: "/images/projects/azuki.png",
    width: 1910,
    height: 716,
    ratio: "1910 / 716",
    url: "https://azuki.deniz.cyou/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "matchup",
    description: "a dating app",
    image: "/images/projects/matchup.png",
    width: 1919,
    height: 908,
    ratio: "1919 / 908",
    url: "https://matchup-tr.gta.world/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "ls chat",
    description: "a discord-like chat app",
    image: "/images/projects/chat.png",
    width: 1917,
    height: 906,
    ratio: "1917 / 906",
    url: "https://chat-tr.gta.world/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "sanmail",
    description: "a webmail service",
    image: "/images/projects/mail.png",
    width: 1917,
    height: 906,
    ratio: "1917 / 906",
    url: "https://mail-tr.gta.world/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "handshake",
    description: "a linkedin-like professional network",
    image: "/images/projects/handshake.png",
    width: 1919,
    height: 905,
    ratio: "1919 / 905",
    url: "https://handshake.deniz.cyou/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "ulsahub",
    description: "a campus hub for ulsa, a fictional university",
    image: "/images/projects/ulsahub.png",
    width: 1919,
    height: 635,
    ratio: "1919 / 635",
    url: "https://ulsahub-tr.gta.world/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Node.js",
        icon: "nodejs",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "buy me a cookie",
    description: "a marketplace for buying and selling things",
    image: "/images/projects/cookie.png",
    width: 1920,
    height: 1080,
    ratio: "4 / 3",
    url: "https://buymeacookie.xyz/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "PHP",
        icon: "php",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "soundloop v2",
    description: "a music streaming service, in the style of apple music",
    image: "/images/projects/music.png",
    width: 1920,
    height: 1080,
    ratio: "16 / 9",
    url: "https://soundloop.app/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "PHP",
        icon: "php",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "vetric",
    description: "a sports betting website",
    image: "/images/projects/vetric.png",
    width: 1920,
    height: 1080,
    ratio: "16 / 9",
    url: "https://vetric.online/",
    stack: [
      {
        name: "React",
        icon: "react",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
      },
      {
        name: "PHP",
        icon: "php",
      },
      {
        name: "MySQL",
        icon: "mysql",
      },
    ],
  },
  {
    name: "agac project",
    description: "a community of developers",
    image: "/images/projects/agacproject.gif",
    width: 540,
    height: 289,
    ratio: "540 / 289",
    url: "https://github.com/agacproject",
    stack: [
      {
        name: "GitHub",
        icon: "github",
      },
    ],
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
    stack: [],
  },
];
