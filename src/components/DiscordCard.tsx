import formatDistanceStrict from "date-fns/formatDistanceStrict";
import { useEffect, useState } from "preact/hooks";
import { useLanyard } from "react-use-lanyard";

import { DISCORD_ID, DiscordPresence } from "../lib/discord";
import Card, { Tag, TagColor } from "./Card";

const states: Record<string, [string, TagColor]> = {
	online: ["Online", "lime"],
	idle: ["Idle", "amber"],
	dnd: ["Do not disturb", "orange"],
	offline: ["Offline", "stone"]
};

const verbs = ["playing", "streaming", "listening to", "watching", "", "competing in"];

export const profile = `https://discord.com/users/${DISCORD_ID}`;

/** starts from the snapshot the server fetched, then follows lanyard's socket */
export function usePresence(initial: DiscordPresence | null, at: number) {
	const { status } = useLanyard({ userId: DISCORD_ID, socket: true });
	const [now, setNow] = useState(at);

	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 30_000);
		return () => clearInterval(id);
	}, []);

	return { presence: (status as DiscordPresence | undefined) ?? initial, now };
}

/** what's running right now, like "playing Valorant for 2 hours"; spotify has its own place */
export function activityOf(presence: DiscordPresence, now: number) {
	const activity = presence.activities.find(a => a.type !== 2 && a.type !== 4);
	if (!activity) return null;
	return `${verbs[activity.type]} ${activity.name} for ${formatDistanceStrict(now, activity.timestamps?.start ?? activity.created_at)}`;
}

export function avatarOf(presence: DiscordPresence) {
	const { id, avatar } = presence.discord_user;
	return avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.${avatar.startsWith("a_") ? "gif" : "webp"}?size=128` : null;
}

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export default function DiscordCard({ initial, at }: { initial: DiscordPresence | null; at: number }) {
	const { presence, now } = usePresence(initial, at);

	if (!presence) {
		return (
			<Card label="Now · Discord" href={profile} className="type-card">
				<div className="type-body">
					<h2 className="t-lg">Discord</h2>
				</div>
			</Card>
		);
	}

	const user = presence.discord_user;
	const avatar = avatarOf(presence);
	const custom = presence.activities.find(a => a.type === 4);
	const activity = activityOf(presence, now);
	const name = user.global_name ?? user.display_name ?? user.username;
	const [state, color] = states[presence.discord_status] ?? states.offline;

	return (
		<Card label="Now · Discord" href={profile} className="type-card">
			<div className="type-body">
				{avatar && (
					// eslint-disable-next-line @next/next/no-img-element
					<img className="avatar" src={avatar} alt="" width={64} height={64} />
				)}
				<p className="tags">
					<Tag color={color}>{state}</Tag>
				</p>
				<h2 className="t-lg">{name}</h2>
				{custom?.state && <p className="meta">{custom.state}</p>}
				<p className="line">{activity ? capitalise(activity) : presence.listening_to_spotify ? "Listening to Spotify" : `@${user.username}`}</p>
			</div>
		</Card>
	);
}
