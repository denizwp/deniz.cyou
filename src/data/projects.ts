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
    name: "deniz's tools",
    description: "a multi-purpose tool website (like a proxy, a story creator, mesh viewer and more)",
    image: "/images/projects/movie.png",
    url: "https://proxy.deniz.cyou/",
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
    description: "a dating app for gtaw turkiye",
    image: "/images/projects/matchup.png",
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
    description: "a discord-like chat app for gtaw turkiye",
    image: "/images/projects/chat.png",
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
    description: "a mail service for gtaw turkiye/spain",
    image: "/images/projects/mail.png",
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
    description: "a linkedin-like website for gtaw turkiye",
    image: "/images/projects/handshake.png",
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
    description: "a hub for ulsa (a fictional university in gtaw turkiye)",
    image: "/images/projects/ulsahub.png",
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
    description: "a website where you can sell things on gtaw turkiye",
    image: "/images/projects/cookie.png",
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
    description: "apple music but for gtaw turkiye",
    image: "/images/projects/music.png",
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
    description: "a betting website for gtaw turkiye",
    image: "/images/projects/vetric.png",
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
    description: "multiple povs for gta rp streamers",
    image: "/images/projects/povs.png",
    url: "",
    stack: [],
  },
];
