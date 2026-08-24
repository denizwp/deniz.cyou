import { NextApiRequest, NextApiResponse } from "next";
import Spotify from "spotify-web-api-node";

export type TopMusicResponseSuccess = {
	short: SpotifyApi.UsersTopTracksResponse;
	medium: SpotifyApi.UsersTopTracksResponse;
	long: SpotifyApi.UsersTopTracksResponse;
};
export type TopMusicResponseError = { error: unknown };
export type TopMusicResponse = TopMusicResponseSuccess | TopMusicResponseError;

const api = new Spotify({
	clientId: 'f91c8a8166064b5b81f065f0c6b86c64',
	clientSecret: '054d95eb48ea4e29958384e95f7b961a',
	refreshToken: 'AQA2i6fF5DU152uPbbcRjjUktVlfHuxaSLYzAzxLS79NVoi54ds4FiYcUVarukbAw3oGVsnieoo2sL92BsxPZgGEJAuZ2xflk_4sk1qRc2MhEOtrtAVrc5VlxwkbjAZ5Ohk'
});
let expirationTime = 0;
let cachedTime = 0;
let cached: TopMusicResponseSuccess | undefined;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TopMusicResponse>
) {
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed." });
		return;
	}

	try {
		if (!cached || Date.now() > cachedTime) {
			if (Date.now() > expirationTime) {
				const response = await api.refreshAccessToken();
				api.setAccessToken(response.body.access_token);

				expirationTime = Date.now() + response.body.expires_in * 1000;
			}

			const short = await api.getMyTopTracks({
				limit: 24,
				time_range: "short_term"
			});
			const medium = await api.getMyTopTracks({
				limit: 24,
				time_range: "medium_term"
			});
			const long = await api.getMyTopTracks({
				limit: 24,
				time_range: "long_term"
			});

			cached = {
				short: short.body,
				medium: medium.body,
				long: long.body
			};

			cachedTime = Date.now() + 24 * 60 * 60 * 1000;
		}

		res.status(200).json(cached);
	} catch (err) {
		res.status(500).json({ error: (err as any)?.message });
	}
}
