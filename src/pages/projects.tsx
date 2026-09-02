import { CollectionIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import { projects } from "../data/projects";

const skillIconsEndpoint = "https://skillicons.dev/icons?theme=dark&i=";

export default function Projects() {
	return (
		<>
			<GenericMeta
				title="Projects 📙"
				description="Some of my projects."
			/>

			<h1 className="heading mb-3">
				Projects{" "}
				<CollectionIcon className="ml-4 h-12 w-12 text-blue-400" />
			</h1>

			<p className="mb-8 text-lg text-gray-300">
				things i&apos;ve built &mdash; {projects.length} of them so far.
			</p>

			<div className="fade-in grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
				{projects.map(({ name, description, image, url, stack }) => (
					<div
						key={name}
						className="group flex h-full flex-col overflow-hidden rounded-xl bg-slate-900/80 ring-1 ring-white/5 transition duration-300 hover:bg-slate-900 hover:ring-white/10 hover:-translate-y-1"
					>
						<div className="relative aspect-[16/10] overflow-hidden">
							<Image
								src={image}
								alt=""
								width={1200}
								height={800}
								priority={true}
								className="absolute top-0 left-0 w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
							/>

							<div className="flex absolute bottom-2 right-2 gap-1.5">
								{stack.map(({ name, icon, src }) => (
									<div
										key={name}
										className="w-6 h-6 md:w-8 md:h-8 rounded-[25%] bg-slate-900 relative group/icon cursor-pointer flex justify-center"
									>
										<Image
											key={name}
											src={
												icon !== undefined
													? `${skillIconsEndpoint}${icon}`
													: src
											}
											width={120}
											height={120}
											alt={name}
											className="w-full h-full rounded-[25%] bg-[#242938]"
											quality={100}
										/>
										<div className="absolute mb-1 px-2 py-1 text-white text-sm bg-slate-900 opacity-0 group-hover/icon:opacity-100 transition pointer-events-none bottom-full rounded-lg w-max">
											{name}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-1 items-start gap-3 p-5">
							<div className="min-w-0">
								<h2 className="mb-1.5 font-heading font-bold text-xl leading-tight tracking-tight">
									{name}
								</h2>
								{description && (
									<p className="text-base text-gray-300 leading-snug">
										{description}
									</p>
								)}
							</div>
							{url && (
								<a
									href={url}
									target="_blank"
									rel="noreferrer noopener"
									title={`Visit ${name}`}
									className="ml-auto shrink-0 text-gray-400 transition hover:text-white"
								>
									<ExternalLinkIcon className="w-6 h-6" />
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
