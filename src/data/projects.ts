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
    name: "vetric",
    description: "a betting website for gtaw turkiye",
    image: "/images/projects/vetric.png",
    url: "https://vetric.online/",
    stack: [
      {
        name: "GitHub",
        icon: "github",
      },
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
    name: "buy me a cookie",
    description: "a website where you can buy people a cookie :) on gtaw turkiye",
    image: "/images/projects/cookie.png",
    url: "https://buymeacookie.xyz/",
    stack: [
      {
        name: "GitHub",
        icon: "github",
      },
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
    name: "music app",
    description: "apple music but for gtaw turkiye",
    image: "/images/projects/music.png",
    url: "",
    stack: [
      {
        name: "GitHub",
        icon: "github",
      },
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
    name: "movie proxy",
    description: "a movie proxy that converts every movie link to a proxied one for gtaw turkiye",
    image: "/images/projects/movie.png",
    url: "https://proxy.deniz.cyou/",
    stack: [
      {
        name: "PHP",
        icon: "php",
      },
    ],
  },
  {
    name: "agac project",
    description: "a community of developers",
    image: "/images/projects/agacproject.gif",
    url: "",
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
