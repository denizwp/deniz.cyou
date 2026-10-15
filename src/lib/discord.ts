import type { LanyardData } from "react-use-lanyard";

export const DISCORD_ID = "317004664002576386";

// lanyard sends these, the library's types just don't list them yet
export type DiscordPresence = LanyardData & {
	discord_user: LanyardData["discord_user"] & {
		display_name?: string | null;
		global_name?: string | null;
	};
};

/** one presence snapshot from lanyard's rest api, for the first render */
export async function getDiscord(): Promise<DiscordPresence> {
	const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
	const body = await res.json();
	if (!body.success) throw new Error(body.error?.message ?? "lanyard failed");
	return body.data;
}
