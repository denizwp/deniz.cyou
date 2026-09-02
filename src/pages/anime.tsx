import { SparklesIcon } from "@heroicons/react/solid";
import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import { anime } from "../data/anime";

export default function Anime() {
	return (
		<main className="wrapper fade">
			<GenericMeta title="Anime ✨" description="Some anime I've watched." />

			<h1 className="header">
				Anime{" "}
				<SparklesIcon className="ml-4 h-10 w-10 text-yellow-300" />
			</h1>

			<p className="mt-4 mb-8 text-gray-400">
				Some anime I&apos;ve watched.
			</p>

			{anime.map(({ name, description, image, url }, i) => (
				<div key={name} className="mt-4">
					<a
						href={url}
						target="_blank"
						rel="noreferrer noopener"
						className="group relative flex items-center h-40 px-6 md:px-8 overflow-hidden rounded-xl bg-gray-900 transition duration-300 hf:scale-[1.02]"
					>
						<Image
							src={image}
							alt={name}
							width={1200}
							height={240}
							priority={i < 3}
							className="absolute top-0 left-0 w-full h-full object-cover transition duration-300 group-hv:brightness-50"
						/>

						<div className="z-20 w-full transition duration-300 scale-95 opacity-0 group-hv:scale-100 group-hv:opacity-100">
							<h2 className="font-bold text-2xl">{name}</h2>
							<p className="mt-1 text-base text-gray-200">
								{description}
							</p>
						</div>
					</a>
				</div>
			))}
		</main>
	);
}
