import { CubeIcon } from "@heroicons/react/solid";
import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import { skills } from "../data/skills";

const skillIconsEndpoint = "https://skillicons.dev/icons?theme=dark&i=";

export default function Skills() {
	return (
		<main className="wrapper fade">
			<GenericMeta
				title="Skills 💻"
				description="Skills I've picked up over the years."
			/>

			<h1 className="header">
				Skills <CubeIcon className="ml-4 h-10 w-10 text-rose-400" />
			</h1>

			<p className="mt-4 mb-8 text-gray-400">
				Skills and technologies I use to build things.
			</p>

			<div className="fade fade-fast fade-delay grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-4">
				{skills.map(({ name, icon, href, bg }) => (
					<a
						key={icon}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative aspect-square rounded-xl overflow-hidden transition"
						style={{ backgroundColor: bg ?? "#252938" }}
					>
						<Image
							src={`${skillIconsEndpoint}${icon}`}
							alt={name}
							width={256}
							height={256}
							priority={true}
							className="w-full h-full object-cover transition duration-300 group-hv:brightness-50 group-hv:scale-[1.02]"
						/>

						<div className="z-10 absolute inset-3 flex flex-col justify-end transition duration-300 scale-95 opacity-0 group-hv:scale-100 group-hv:opacity-100">
							<p className="font-bold text-base !leading-tight">
								{name}
							</p>
						</div>
					</a>
				))}
			</div>
		</main>
	);
}
