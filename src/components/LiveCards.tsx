import formatDistanceStrict from "date-fns/formatDistanceStrict";
import { useEffect, useState } from "preact/hooks";
import useSWR from "swr";

import { Stint } from "../data/career";
import { weatherDescriptions } from "../data/weather";
import { dates, length } from "../lib/career";
import { fetcher } from "../lib/fetcher";
import type { GitHubResponseSuccess } from "../pages/api/github";
import type { WeatherResponseSuccess } from "../pages/api/weather";
import Card, { Tag } from "./Card";

const clock = new Intl.DateTimeFormat("en-GB", {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
	timeZone: "Europe/Istanbul"
});

/** the time here; `at` keeps the server and the first client render on the same minute */
export function useIstanbulTime(at?: number) {
	const [now, setNow] = useState(at ?? null);

	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 10_000);
		return () => clearInterval(id);
	}, []);

	return now === null ? null : clock.format(now);
}

export function IstanbulCard({ at }: { at: number }) {
	const { data } = useSWR<WeatherResponseSuccess>("/api/weather", fetcher);
	const time = useIstanbulTime(at);

	return (
		<Card label="Now · Istanbul" className="type-card">
			<div className="type-body">
				{data && (
					<p className="tags">
						<Tag color="sky">{weatherDescriptions[data.code] ?? "Unusual weather"}</Tag>
					</p>
				)}
				<h2 className="t-xl">{data ? `Istanbul, ${Math.round(data.temp)}°` : "Istanbul"}</h2>
				<p className="meta">41.0082° N, 28.9784° E</p>
				<p className="line">It&apos;s {time} here</p>
			</div>
		</Card>
	);
}

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export function GitHubCard({ at }: { at: number }) {
	const { data } = useSWR<GitHubResponseSuccess>("/api/github", fetcher);
	const last = data?.events[0];

	return (
		<Card label="Now · GitHub" href={last?.repoUrl ?? "https://github.com/denizwp"} className="type-card">
			<div className="type-body">
				<h2 className="t-md">{last ? `${capitalise(last.text)} ${last.repo.split("/")[1] ?? last.repo}` : "On GitHub as denizwp"}</h2>
				{last && <p className="meta">{formatDistanceStrict(new Date(last.date), at, { addSuffix: true })}</p>}
				{data && (
					<p className="excerpt">
						{data.repos} public repos and {data.followers} followers.
					</p>
				)}
			</div>
		</Card>
	);
}

/** a job or a school; `href` overrides its own link when the card should lead somewhere else */
export function StintCard({ stint, kind, at, href }: { stint: Stint; kind: string; at: number; href?: string }) {
	const running = !stint.end;
	const span = length(stint, at);

	return (
		<Card label={`${kind} · ${running ? "Now" : "Before"}`} href={href ?? stint.url} className="type-card">
			<div className="type-body">
				{stint.role && (
					<p className="tags">
						<Tag color={running ? "lime" : "stone"}>{stint.role}</Tag>
					</p>
				)}
				<h2 className="t-lg">{stint.name}</h2>
				<p className="meta">
					{dates(stint)}
					{span ? ` · ${span}` : ""}
				</p>
			</div>
		</Card>
	);
}
