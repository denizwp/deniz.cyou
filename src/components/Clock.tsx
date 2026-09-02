import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "preact/hooks";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	year: "numeric",
	month: "long",
	timeZone: "Turkey"
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
	hour12: false,
	timeZone: "Turkey",
	timeZoneName: "short"
});

const hourFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	hour12: false,
	timeZone: "Turkey"
});

export function Clock() {
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		setNow(Date.now());

		const id = setInterval(() => setNow(Date.now()), 1000);

		return () => clearInterval(id);
	}, []);

	if (now === null) return <p className="mt-2 h-5 text-sm" />;

	const hour = Number(hourFormatter.format(now));
	const isDay = hour >= 6 && hour < 18;

	return (
		<p className="mt-2 flex text-sm gap-2 items-center text-gray-300">
			{isDay ? (
				<SunIcon className="w-4 h-4 text-amber-400" />
			) : (
				<MoonIcon className="w-4 h-4 text-indigo-300" />
			)}

			{dateFormatter.format(now)} &middot; {timeFormatter.format(now)}
		</p>
	);
}
