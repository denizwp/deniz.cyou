import {
	CollectionIcon,
	CubeIcon,
	HomeIcon,
	MusicNoteIcon,
	SparklesIcon
} from "@heroicons/react/solid";

import ActiveLink from "./ActiveLink";

interface PageData {
	href: string;
	title: string;
	Icon: (props: { className?: string }) => JSX.Element;
	color: string;
}

const pages: PageData[] = [
	{
		href: "/",
		title: "Home",
		Icon: HomeIcon,
		color: "text-orange-400"
	},
	{
		href: "/projects",
		title: "Projects",
		Icon: CollectionIcon,
		color: "text-blue-400"
	},
	{
		href: "/skills",
		title: "Skills",
		Icon: CubeIcon,
		color: "text-rose-400"
	},
	//{
		//href: "/anime",
		//title: "Anime",
		//Icon: SparklesIcon,
		//color: "text-yellow-300"
	//},
	{
		href: "/music",
		title: "Music",
		Icon: MusicNoteIcon,
		color: "text-violet-400"
	}
];

export default function Navbar() {
	return (
		<nav className="wrapper mt-20 md:mt-32 text-gray-400">
			<ul className="flex flex-wrap gap-x-10 gap-y-2">
				{pages.map(({ href, title, Icon, color }) => (
					<li key={href}>
						<ActiveLink
							href={href}
							activeClass="text-white"
							nonActiveClass="hf:text-gray-300"
						>
							<a className="flex items-center gap-2 transition">
								{title}
								<Icon className={`w-5 h-5 ${color}`} />
							</a>
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
