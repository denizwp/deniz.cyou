import { CollectionIcon } from "@heroicons/react/solid";
import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import { projects } from "../data/projects";

const skillIconsEndpoint = "https://skillicons.dev/icons?theme=dark&i=";

export default function Projects() {
	return (
		<main className="wrapper fade">
			<GenericMeta title="Projects 📙" description="Some of my projects." />

			<h1 className="header">
				Projects{" "}
				<CollectionIcon className="ml-4 h-10 w-10 text-blue-400" />
			</h1>

			<p className="mt-4 mb-8 text-gray-400">
				things i&apos;ve built and maintain &mdash; {projects.length} of
				them so far.
			</p>

			{projects.map(({ name, description, image, url, stack }) => (
				<div key={name} className="mt-4">
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="group grid sm:grid-cols-2 rounded-xl overflow-hidden bg-gray-900 hf:scale-[1.02] transition duration-300"
					>
						<div className="p-6 md:p-8 max-sm:row-start-2">
							<h2 className="font-bold text-2xl">{name}</h2>

							{description && (
								<p className="mt-2 text-base text-gray-400">
									{description}
								</p>
							)}

							<div className="mt-4 flex flex-wrap gap-2">
								{stack.map(({ name, icon, src }) => (
									<div
										key={name}
										className="w-7 h-7 rounded-[25%] bg-gray-800 relative group/icon"
										title={name}
									>
										<Image
											src={
												icon !== undefined
													? `${skillIconsEndpoint}${icon}`
													: src
											}
											width={120}
											height={120}
											alt={name}
											quality={100}
											className="w-full h-full rounded-[25%] bg-[#242938]"
										/>

										<span className="absolute mb-1 px-2 py-1 text-sm text-white bg-gray-800 opacity-0 group-hover/icon:opacity-100 transition pointer-events-none bottom-full left-1/2 -translate-x-1/2 rounded-lg w-max">
											{name}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="relative overflow-hidden max-sm:h-32">
							<Image
								src={image}
								alt=""
								width={1200}
								height={800}
								priority={true}
								className="absolute top-0 left-0 w-full h-full object-cover object-center"
							/>
						</div>
					</a>
				</div>
			))}
		</main>
	);
}
