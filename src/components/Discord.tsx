import formatDistanceStrict from "date-fns/formatDistanceStrict";
import Image from "next/future/image";
import { useEffect, useState } from "preact/hooks";
import { Activity, useLanyard } from "react-use-lanyard";

declare module "react-use-lanyard" {
	interface DiscordUser {
		display_name: string;
	}
}

const USER_ID = "317004664002576386";

const statusColors: Record<string, string> = {
	online: "bg-emerald-500",
	idle: "bg-amber-400",
	dnd: "bg-rose-400",
	offline: "bg-gray-600"
};

const getStatusColor = (
	status: "online" | "idle" | "dnd" | "offline" | undefined
) => statusColors[status ?? ""] ?? "bg-gray-600";

export default function Discord() {
	const { status: lanyard } = useLanyard({
		userId: USER_ID,
		socket: true
	});

	// 2: listening, 4: custom status
	const otherActivities = lanyard?.activities.filter(
		activity => activity.type !== 2 && activity.type !== 4
	);

	const customStatus = lanyard?.activities.find(
		activity => activity.type === 4
	);

	const avatar = lanyard?.discord_user.avatar;

	return (
		<div className="mt-8 flex items-center rounded-2xl bg-gray-900">
			<div className="relative w-20 h-20 shrink-0">
				{avatar ? (
					<>
						<Image
							src={`https://cdn.discordapp.com/avatars/${USER_ID}/${avatar}.${
								avatar.startsWith("a_") ? "gif" : "webp"
							}?size=256`}
							alt="Discord Avatar"
							width={256}
							height={256}
							priority={true}
							className="w-20 h-20 rounded-2xl bg-gray-800 object-cover"
						/>

						<span
							className={`z-10 absolute w-4 h-4 bottom-1 right-1 rounded-full ring-4 ring-gray-900 ${getStatusColor(
								lanyard?.discord_status
							)}`}
						/>
					</>
				) : (
					<div className="w-20 h-20 rounded-2xl bg-gray-800" />
				)}
			</div>

			<div className="min-w-0 pl-4 py-2 pr-6 text-base leading-snug">
				<p className="line-clamp-1 break-all text-gray-400">
					{lanyard ? (
						<>
							<span className="font-semibold text-white">
								{lanyard.discord_user.display_name}
							</span>
							<span className="ml-2">
								{lanyard.discord_user.username}
							</span>
						</>
					) : (
						"Loading..."
					)}
				</p>

				{customStatus?.state && (
					<p className="line-clamp-1 break-all text-sm text-gray-400">
						{customStatus.state}
					</p>
				)}

				<OtherActivities activities={otherActivities} />
			</div>
		</div>
	);
}

const activityTypes = [
	"Playing",
	"Streaming",
	"Listening to",
	"Watching",
	"Custom Status: ",
	"Competing in"
];

interface OtherActivitiesProps {
	activities: Activity[] | undefined;
}

function OtherActivities({ activities }: OtherActivitiesProps) {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{activities?.map(activity => (
				<p
					key={activity.id}
					className="line-clamp-1 break-all text-sm text-gray-400"
				>
					{activityTypes[activity.type]}{" "}
					<span className="text-gray-200">{activity.name}</span> for{" "}
					{formatDistanceStrict(
						now,
						activity.timestamps?.start ?? activity.created_at
					)}
				</p>
			))}
		</>
	);
}
