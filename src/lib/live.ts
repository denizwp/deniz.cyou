import { getGitHub } from "../pages/api/github";
import { getNowPlaying } from "../pages/api/nowPlaying";
import { getTopMusic } from "../pages/api/topMusic";
import { getWeather } from "../pages/api/weather";
import { DiscordPresence, getDiscord } from "./discord";
import { AlbumTile, toTiles } from "./music";

export interface LiveProps {
	/** when the server fetched everything, so clocks start from the same moment */
	at: number;
	discord: DiscordPresence | null;
	/** swr's starting data, keyed by api route */
	fallback: Record<string, unknown>;
}

// a slow service shouldn't hold the build; its card fills in on the client instead
const within = <T,>(promise: Promise<T>, ms = 4000) =>
	Promise.race([promise, new Promise<null>(resolve => setTimeout(() => resolve(null), ms))]).catch(() => null);

/** a recent snapshot of everything live, so pages open full and swr takes over from there */
export async function getLive(): Promise<LiveProps> {
	const [nowPlaying, weather, github, discord] = await Promise.all([
		within(getNowPlaying()),
		within(getWeather()),
		within(getGitHub()),
		within(getDiscord())
	]);

	const fallback: Record<string, unknown> = {};
	if (nowPlaying) fallback["/api/nowPlaying"] = nowPlaying;
	if (weather) fallback["/api/weather"] = weather;
	if (github) fallback["/api/github"] = github;

	return { at: Date.now(), discord, fallback };
}

export type Ranges = Record<"short" | "medium" | "long", AlbumTile[]>;

export async function getTiles(): Promise<Ranges | null> {
	const top = await within(getTopMusic());
	if (!top) return null;
	return { short: toTiles(top.short.items), medium: toTiles(top.medium.items), long: toTiles(top.long.items) };
}
