import { DesktopComputerIcon } from "@heroicons/react/solid";
import Image from "next/future/image";

import GenericMeta from "../components/GenericMeta";
import { uses } from "../data/uses";

const skillIconsEndpoint = "https://skillicons.dev/icons?theme=dark&i=";

export default function Uses() {
	return (
		<main className="wrapper fade">
			<GenericMeta
				title="Uses 🛠️"
				description="The software and tools I use every day."
			/>

			<h1 className="header">
				Uses{" "}
				<DesktopComputerIcon className="ml-4 h-10 w-10 text-rose-400" />
			</h1>

			<p className="mt-4 mb-8 text-gray-400">
				the software and tools i use every day.
			</p>

			{uses.map(({ title, items }) => (
				<section key={title} className="mt-8">
					<h2 className="font-bold text-2xl">{title}</h2>

					<ul className="mt-4 flex flex-wrap gap-2">
						{items.map(({ name, url, icon, src }) => {
							const logo = icon
								? `${skillIconsEndpoint}${icon}`
								: src;

							const content = (
								<>
									{logo && (
										<Image
											src={logo}
											alt=""
											width={64}
											height={64}
											quality={100}
											className="w-5 h-5 rounded-[25%]"
										/>
									)}
									{name}
								</>
							);

							const className =
								"flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl bg-ink-900 text-gray-300 transition";

							return (
								<li key={name}>
									{url ? (
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className={`${className} hf:bg-ink-800 hf:text-white`}
										>
											{content}
										</a>
									) : (
										<span className={className}>
											{content}
										</span>
									)}
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</main>
	);
}
