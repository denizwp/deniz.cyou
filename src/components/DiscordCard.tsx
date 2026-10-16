import formatDistanceStrict from "date-fns/formatDistanceStrict";
import { useEffect, useState } from "preact/hooks";
import { useLanyard } from "react-use-lanyard";

import { DISCORD_ID, DiscordPresence } from "../lib/discord";

const states: Record<string, string> = {
	online: "Online",
	idle: "Idle",
	dnd: "Do not disturb",
	offline: "Offline"
};

const verbs = ["playing", "streaming", "listening to", "watching", "", "competing in"];

/**
 * Discord presence as a card. Starts from the snapshot the server fetched,
 * then follows lanyard's socket for live changes.
 */
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
			<div className="card card-discord is-empty">
				<div className="card-avatar" />
				<div className="card-body">
					<p className="card-caption">Discord</p>
					<p className="card-title">{" "}</p>
				</div>
			</div>
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

	const profile = `https://discord.com/users/${DISCORD_ID}`;

	return (
		<div className="card card-discord">
			<a className="card-avatar" href={profile} target="_blank" rel="noopener noreferrer" aria-label={`${name} on Discord`}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				{avatar && <img src={avatar} alt="" width={128} height={128} />}
				<span className={`card-dot is-${presence.discord_status}`} />
			</a>
			<div className="card-body">
				<p className="card-caption">{states[presence.discord_status] ?? "Discord"}</p>
				<p className="card-title">
					<a href={profile} target="_blank" rel="noopener noreferrer">
						{name}
					</a>
					{name !== user.username && <span className="card-handle"> {user.username}</span>}
				</p>
				<p className="card-sub">{custom?.state ?? " "}</p>
				<p className="card-sub is-quiet">
					{activity
						? `${verbs[activity.type]} ${activity.name} for ${formatDistanceStrict(now, activity.timestamps?.start ?? activity.created_at)}`
						: presence.listening_to_spotify
						? "listening to spotify"
						: " "}
				</p>
			</div>
		</div>
	);
}
