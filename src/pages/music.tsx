import { MusicNoteIcon } from "@heroicons/react/solid";
import Image from "next/future/image";
import { useEffect, useState } from "preact/hooks";

import GenericMeta from "../components/GenericMeta";
import type { TopMusicResponseSuccess } from "./api/topMusic";

type Range = keyof TopMusicResponseSuccess;

const options: { name: string; value: Range }[] = [
	{ name: "Past Month", value: "short" },
	{ name: "Past 6 Months", value: "medium" },
	{ name: "All Time", value: "long" }
];

export default function Music() {
	const [topMusic, setTopMusic] = useState<TopMusicResponseSuccess | null>(
		null
	);
	const [range, setRange] = useState<Range>("short");

	useEffect(() => {
		fetch("/api/topMusic")
			.then(res => res.json())
			.then(info => {
				if (info.error) return;
				setTopMusic(info);
			})
			.catch(console.error);
	}, []);

	const tracks = topMusic?.[range].items;

	return (
		<main>
			<GenericMeta
				title="Music"
				description="Tracks I've listened to the most on Spotify."
			/>

			<div className="wrapper fade">
				<h1 className="header">
					Music{" "}
					<MusicNoteIcon className="ml-4 h-10 w-10 text-violet-400" />
				</h1>

				<p className="mt-4 text-gray-400">
					Tracks I&apos;ve listened to the most on Spotify.
				</p>

				<div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-gray-400">
					{options.map(({ name, value }) => (
						<label
							key={value}
							className={`transition cursor-pointer hf:text-gray-300 ${
								range === value ? "!text-white" : ""
							}`}
						>
							<input
								type="radio"
								name="time_range"
								value={value}
								checked={range === value}
								onChange={() => setRange(value)}
								className="sr-only"
							/>
							{name}
						</label>
					))}
				</div>
			</div>

			<div
				key={range}
				className="fade fade-fast fade-delay mt-8 mx-auto max-w-screen-xl px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-flow-dense"
			>
				{tracks
					? tracks.map((track, i) => (
							<a
								key={track.id}
								href={track.external_urls.spotify}
								target="_blank"
								rel="noopener noreferrer"
								className={`group aspect-square relative rounded-xl overflow-hidden transition ${
									i % 10 === 0
										? "sm:col-span-2 sm:row-span-2"
										: ""
								}`}
							>
								<Image
									src={track.album.images[0].url}
									alt={track.name}
									width={512}
									height={512}
									priority={i < 5}
									className="w-full h-full object-cover rounded-xl bg-ink-800 transition duration-300 group-hv:brightness-50 group-hv:scale-[1.02]"
								/>

								<div
									className={`z-20 absolute inset-4 flex flex-col justify-end transition duration-300 scale-95 opacity-0 group-hv:scale-100 group-hv:opacity-100 ${
										i % 10 === 0 ? "sm:scale-[0.975]" : ""
									}`}
								>
									<p className="mb-1 font-bold sm:text-xl line-clamp-3 !leading-tight">
										{track.name}
									</p>

									{track.artists.map(artist => (
										<p
											key={artist.id}
											className="text-xs sm:text-sm text-gray-200 !leading-tight"
										>
											{artist.name}
										</p>
									))}
								</div>
							</a>
					  ))
					: [...new Array(20)].map((_, i) => (
							<div
								key={i}
								className="aspect-square rounded-xl bg-ink-900 animate-pulse"
							/>
					  ))}
			</div>
		</main>
	);
}
