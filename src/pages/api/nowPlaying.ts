import { NextApiRequest, NextApiResponse } from "next";
import Spotify from "spotify-web-api-node";

export interface NowPlayingResponseSuccess {
	/**
	 * Whether the track is from recently played or currently playing.
	 */
	isPlayingNow: boolean;
	isPaused: boolean;
	progessMs: number;
	track: SpotifyApi.TrackObjectFull | null;
}
export type NowPlayingResponseError = { error: unknown };
export type NowPlayingResponse =
	| NowPlayingResponseSuccess
	| NowPlayingResponseError;

const api = new Spotify({
	clientId: 'f91c8a8166064b5b81f065f0c6b86c64',
	clientSecret: '054d95eb48ea4e29958384e95f7b961a',
	refreshToken: 'AQA2i6fF5DU152uPbbcRjjUktVlfHuxaSLYzAzxLS79NVoi54ds4FiYcUVarukbAw3oGVsnieoo2sL92BsxPZgGEJAuZ2xflk_4sk1qRc2MhEOtrtAVrc5VlxwkbjAZ5Ohk'
});
let expirationTime = 0;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NowPlayingResponse>
) {
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed." });
		return;
	}

	try {
		if (Date.now() > expirationTime) {
			const response = await api.refreshAccessToken();
			api.setAccessToken(response.body.access_token);

			expirationTime = Date.now() + response.body.expires_in * 1000;
		}

		let response: NowPlayingResponseSuccess = {
			isPlayingNow: false,
			isPaused: false,
			progessMs: 0,
			track: null
		};
		const playing = await api.getMyCurrentPlayingTrack();

		if (playing.body?.item && "album" in playing.body.item) {
			response.isPlayingNow = true;
			response.track = playing.body.item;
			response.isPaused = !playing.body.is_playing;
			response.progessMs = playing.body.progress_ms ?? 0;
		} else {
			const lastPlayed = await api.getMyRecentlyPlayedTracks({
				limit: 1
			});

			if (lastPlayed.body?.items[0]?.track) {
				response.track = lastPlayed.body.items[0]
					.track as SpotifyApi.TrackObjectFull;
			}
		}

		console.log(response);

		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ error: (err as any)?.message });
	}
}
