import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Image from "next/future/image";
import useSWR from "swr";

import type {
	GitHubResponseError,
	GitHubResponseSuccess
} from "../pages/api/github";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const shortRepo = (repo: string) => repo.split("/")[1] ?? repo;

export default function GitHub() {
	const { data } = useSWR<GitHubResponseSuccess, GitHubResponseError>(
		"/api/github",
		fetcher
	);

	return (
		<div className="mt-4 flex rounded-2xl bg-ink-900">
			<div className="w-20 h-20 shrink-0">
				{data?.avatar ? (
					<Image
						src={data.avatar}
						alt="GitHub Avatar"
						width={256}
						height={256}
						className="w-20 h-20 rounded-2xl bg-ink-800 object-cover"
					/>
				) : (
					<div className="w-20 h-20 rounded-2xl bg-ink-800" />
				)}
			</div>

			<div className="min-w-0 pl-4 py-2 pr-4 text-base leading-snug">
				<p className="line-clamp-1 break-all text-gray-400">
					{data ? (
						<>
							<a
								href={data.url}
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold text-white border-b border-transparent transition hv:border-current"
							>
								{data.login}
							</a>

							<span className="ml-2 text-sm">
								{data.repos} repos &middot; {data.followers}{" "}
								followers
							</span>
						</>
					) : (
						"Loading..."
					)}
				</p>

				{data?.events.length ? (
					data.events.map(({ id, text, repo, repoUrl, date }) => (
						<p
							key={id}
							className="line-clamp-1 break-all text-sm text-gray-400"
						>
							{text}{" "}
							<a
								href={repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-200 border-b border-transparent transition hv:border-current"
							>
								{shortRepo(repo)}
							</a>{" "}
							{formatDistanceToNowStrict(new Date(date), {
								addSuffix: true
							})}
						</p>
					))
				) : (
					<p className="text-sm text-gray-400">
						{data ? "No recent public activity" : ""}
					</p>
				)}
			</div>
		</div>
	);
}
