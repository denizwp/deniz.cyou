import {
	CloudIcon,
	LightningBoltIcon,
	MoonIcon,
	SunIcon
} from "@heroicons/react/solid";
import { useEffect, useState } from "preact/hooks";

import type { WeatherResponseSuccess } from "../pages/api/weather";

// WMO weather interpretation codes, worded like the rest of the page
const descriptions: Record<number, string> = {
	0: "clear skies",
	1: "mostly clear skies",
	2: "a few clouds",
	3: "overcast skies",
	45: "fog",
	48: "freezing fog",
	51: "light drizzle",
	53: "drizzle",
	55: "heavy drizzle",
	56: "freezing drizzle",
	57: "freezing drizzle",
	61: "light rain",
	63: "rain",
	65: "heavy rain",
	66: "freezing rain",
	67: "freezing rain",
	71: "light snow",
	73: "snow",
	75: "heavy snow",
	77: "snow grains",
	80: "rain showers",
	81: "rain showers",
	82: "heavy rain showers",
	85: "snow showers",
	86: "heavy snow showers",
	95: "thunderstorms",
	96: "thunderstorms with hail",
	99: "thunderstorms with hail"
};

function Icon({ code, isDay }: { code: number; isDay: boolean }) {
	if (code >= 95) {
		return <LightningBoltIcon className="w-4 h-4 text-amber-300" />;
	}

	if (code <= 1) {
		return isDay ? (
			<SunIcon className="w-4 h-4 text-amber-400" />
		) : (
			<MoonIcon className="w-4 h-4 text-indigo-300" />
		);
	}

	return <CloudIcon className="w-4 h-4 text-sky-300" />;
}

export function Weather() {
	const [data, setData] = useState<WeatherResponseSuccess | null>(null);

	useEffect(() => {
		fetch("/api/weather")
			.then(res => res.json())
			.then(res => {
				if (res.error) return;
				setData(res);
			})
			.catch(console.error);
	}, []);

	return (
		<p className="mt-2 flex text-sm gap-2 items-center text-gray-300">
			{data ? (
				<>
					<Icon code={data.code} isDay={data.isDay} />

					<span>
						It&apos;s{" "}
						<b className="font-semibold text-white">
							{Math.round(data.temp)} °C
						</b>{" "}
						with {descriptions[data.code] ?? "unusual weather"} in{" "}
						<b className="font-semibold text-white">{data.name}</b>.
					</span>
				</>
			) : (
				<>
					<CloudIcon className="w-4 h-4 text-sky-300" />

					<span>
						In{" "}
						<b className="font-semibold text-white">Istanbul</b>
					</span>
				</>
			)}
		</p>
	);
}
