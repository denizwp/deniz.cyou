import { NextApiRequest, NextApiResponse } from "next";

const USERNAME = "denizwp";
const EVENT_LIMIT = 4;

export interface GitHubEvent {
	id: string;
	text: string;
	repo: string;
	repoUrl: string;
	date: string;
}

export type GitHubResponseSuccess = {
	login: string;
	name: string | null;
	avatar: string;
	url: string;
	repos: number;
	followers: number;
	events: GitHubEvent[];
};
export type GitHubResponseError = { error: unknown };
export type GitHubResponse = GitHubResponseSuccess | GitHubResponseError;

let cachedTime = 0;
let cached: GitHubResponseSuccess | undefined;

/**
 * Turns a raw GitHub event into a sentence. Returns null for event types that
 * aren't worth showing, so the caller can drop them before slicing.
 */
function describe(event: any): string | null {
	const payload = event.payload ?? {};

	switch (event.type) {
		// the public events API no longer sends commit counts, so don't claim one
		case "PushEvent":
			return "pushed to";
		case "CreateEvent":
			return payload.ref_type === "repository"
				? "created"
				: `created a ${payload.ref_type} in`;
		case "WatchEvent":
			return "starred";
		case "ForkEvent":
			return "forked";
		case "PublicEvent":
			return "open sourced";
		case "ReleaseEvent":
			return `released ${payload.release?.tag_name ?? "a version"} of`;
		case "PullRequestEvent":
			return `${payload.action ?? "updated"} a pull request in`;
		case "IssuesEvent":
			return `${payload.action ?? "updated"} an issue in`;
		case "IssueCommentEvent":
			return "commented on an issue in";
		default:
			return null;
	}
}

/**
 * A burst of pushes to one repo is one piece of news, not four. Keeps the
 * newest event per action + repo pair, in the order GitHub returned them.
 */
function dedupe(events: any[]): any[] {
	const seen = new Set<string>();

	return events.filter(event => {
		const key = `${event.type}:${event.repo?.name}`;

		if (seen.has(key)) return false;

		seen.add(key);
		return true;
	});
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GitHubResponse>
) {
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed." });
		return;
	}

	try {
		if (!cached || Date.now() > cachedTime) {
			const headers = {
				Accept: "application/vnd.github+json",
				"User-Agent": USERNAME
			};

			const [user, events] = await Promise.all([
				fetch(`https://api.github.com/users/${USERNAME}`, {
					headers
				}).then(res => res.json()),
				fetch(
					`https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
					{ headers }
				).then(res => res.json())
			]);

			if (user.message) throw new Error(user.message);

			cached = {
				login: user.login,
				name: user.name,
				avatar: user.avatar_url,
				url: user.html_url,
				repos: user.public_repos,
				followers: user.followers,
				events: dedupe(Array.isArray(events) ? events : [])
					.map((event: any) => {
						const text = describe(event);
						if (!text) return null;

						return {
							id: event.id,
							text,
							repo: event.repo.name,
							repoUrl: `https://github.com/${event.repo.name}`,
							date: event.created_at
						};
					})
					.filter(Boolean)
					.slice(0, EVENT_LIMIT) as GitHubEvent[]
			};

			cachedTime = Date.now() + 10 * 60 * 1000;
		}

		res.setHeader(
			"Cache-Control",
			"public, max-age=0, s-maxage=300, stale-while-revalidate=600"
		);
		res.status(200).json(cached);
	} catch (err) {
		res.status(500).json({ error: (err as any)?.message });
	}
}
