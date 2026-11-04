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

const verbs = ["Playing", "Streaming", "Listening to", "Watching", "", "Competing in"];

const profile = `https://discord.com/users/${DISCORD_ID}`;

/** starts from the snapshot the server fetched, then follows lanyard's socket */
export default function DiscordCard({ initial, at }: { initial: DiscordPresence | null; at: number }) {
	const { status } = useLanyard({ userId: DISCORD_ID, socket: true });
	const presence = (status as DiscordPresence | undefined) ?? initial;
	const [now, setNow] = useState(at);

	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 30_000);
		return () => clearInterval(id);
	}, []);

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
	const avatar = user.avatar
		? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "webp"}?size=128`
		: null;
	const custom = presence.activities.find(a => a.type === 4);
	// spotify has its own card
	const activity = presence.activities.find(a => a.type !== 2 && a.type !== 4);
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
				<p className="line">
					{activity
						? `${verbs[activity.type]} ${activity.name} for ${formatDistanceStrict(now, activity.timestamps?.start ?? activity.created_at)}`
						: presence.listening_to_spotify
						? "Listening to Spotify"
						: `@${user.username}`}
				</p>
			</div>
		</Card>
	);
}
