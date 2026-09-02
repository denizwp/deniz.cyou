import { DesktopComputerIcon } from "@heroicons/react/solid";

import GenericMeta from "../components/GenericMeta";
import { uses } from "../data/uses";

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

					<ul className="mt-4 grid sm:grid-cols-2 gap-3">
						{items.map(({ name, description, url }) => (
							<li
								key={name}
								className="rounded-xl bg-ink-900 p-4 transition"
							>
								{url ? (
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="font-semibold border-b border-transparent transition hv:border-current"
									>
										{name}
									</a>
								) : (
									<span className="font-semibold">
										{name}
									</span>
								)}

								<p className="mt-1 text-sm text-gray-400">
									{description}
								</p>
							</li>
						))}
					</ul>
				</section>
			))}
		</main>
	);
}
