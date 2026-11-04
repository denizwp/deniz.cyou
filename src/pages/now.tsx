import type { GetStaticProps } from "next";

import { NowCover, NowWords } from "../components/NowLive";
import PageHead from "../components/PageHead";
import Timeline from "../components/Timeline";
import { getLive, LiveProps } from "../lib/live";

// built ahead and refreshed at most every 30s, so the page opens at once with a recent
// snapshot; swr and the discord socket bring it up to the second right after
export const getStaticProps: GetStaticProps<LiveProps> = async () => ({
	props: await getLive(),
	revalidate: 30
});

export default function Now({ at, discord }: LiveProps) {
	return (
		<>
			<div className="now-top">
				<div className="now-words">
					<PageHead title="now" />
					<NowWords discord={discord} at={at} />
				</div>
				<NowCover at={at} />
			</div>
			<Timeline at={at} />
		</>
	);
}
