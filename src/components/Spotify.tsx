import { MusicNoteIcon, PauseIcon, PlayIcon } from "@heroicons/react/solid";
import Image from "next/future/image";
import { useEffect, useState } from "preact/hooks";
import useSWR from "swr";

import type {
	NowPlayingResponseError,
	NowPlayingResponseSuccess
} from "../pages/api/nowPlaying";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const clamp = (n: number) => Math.max(Math.min(n, 1), 0);

export default function Spotify() {
	const { data } = useSWR<NowPlayingResponseSuccess, NowPlayingResponseError>(
		"/api/nowPlaying",
		fetcher,
		{ refreshInterval: 5000 }
	);

	const [time, setTime] = useState(0);

	useEffect(() => {
		if (data?.progessMs === undefined || !data.track) return;

		const started = Date.now();

		const interval = setInterval(() => {
			setTime(
				data.isPaused
					? data.progessMs!
					: Math.min(
							data.progessMs! + Date.now() - started,
							data.track!.duration_ms
					  )
			);
		}, 100);

		return () => clearInterval(interval);
	}, [data]);

	const progress = data?.track ? clamp(time / data.track.duration_ms) : 0;

	return (
		<div className="mt-4 flex items-center rounded-2xl bg-gray-900">
			<div className="w-20 h-20 shrink-0">
				<Image
					src={
						data?.track?.album.images[0]?.url ??
						"/images/emptysong.jpg"
					}
					alt="Spotify Album Art"
					width={256}
					height={256}
					priority={true}
					className="w-20 h-20 object-cover object-center rounded-2xl bg-gray-800"
				/>
			</div>

			<div className="min-w-0 pl-4 py-2 pr-4 text-base leading-snug">
				<p className="line-clamp-1 break-all text-gray-400">
					{data?.track ? (
						<>
							<a
								href={data.track.external_urls.spotify}
								target="_blank"
								rel="noopener noreferrer"
								className="mr-1 font-semibold text-white border-b border-transparent transition hv:border-current"
							>
								{data.track.name}
							</a>

							{data.track.artists.map((artist, i) => (
								<span key={artist.id}>
									{i !== 0 && ", "}
									<a
										href={artist.external_urls.spotify}
										target="_blank"
										rel="noopener noreferrer"
										className="border-b border-transparent transition hv:border-current"
									>
										{artist.name}
									</a>
								</span>
							))}
						</>
					) : (
						"Not Listening to Anything"
					)}
				</p>

				<p className="flex items-center gap-1 text-sm text-gray-400">
					<MusicNoteIcon className="w-4 h-4 shrink-0 text-emerald-400" />

					<span className="line-clamp-1 break-all">
						{data?.isPlayingNow
							? "Listening Now"
							: data?.track
							? "Last Played on Spotify"
							: "Spotify"}
					</span>
				</p>
			</div>

			{data?.isPlayingNow && (
				<div
					className="ml-auto shrink-0 w-12 h-12 mr-4 rounded-full"
					style={{
						background: `conic-gradient(#374151 ${
							progress * 100
						}%, #1f2937 0)`
					}}
				>
					<div className="w-10 h-10 mt-1 ml-1 rounded-full bg-gray-900 grid place-items-center text-gray-400">
						{data.isPaused ? (
							<PlayIcon className="w-4 h-4" />
						) : (
							<PauseIcon className="w-4 h-4" />
						)}
					</div>
				</div>
			)}
		</div>
	);
}
