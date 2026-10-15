import { NextApiRequest, NextApiResponse } from "next";

// Istanbul
const LATITUDE = 41.0082;
const LONGITUDE = 28.9784;

export type WeatherResponseSuccess = {
	name: string;
	temp: number;
	code: number;
	isDay: boolean;
};
export type WeatherResponseError = { error: unknown };
export type WeatherResponse = WeatherResponseSuccess | WeatherResponseError;

let cachedTime = 0;
let cached: WeatherResponseSuccess | undefined;

/** current weather in istanbul, cached for ten minutes */
export async function getWeather(): Promise<WeatherResponseSuccess> {
	if (!cached || Date.now() > cachedTime) {
		const data = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code,is_day&timezone=Europe%2FIstanbul`
		).then(res => res.json());

		cached = {
			name: "Istanbul",
			temp: data.current.temperature_2m,
			code: data.current.weather_code,
			isDay: data.current.is_day === 1
		};

		cachedTime = Date.now() + 10 * 60 * 1000;
	}

	return cached;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<WeatherResponse>
) {
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed." });
		return;
	}

	try {
		const data = await getWeather();

		res.setHeader(
			"Cache-Control",
			"public, max-age=0, s-maxage=300, stale-while-revalidate=600"
		);
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: (err as any)?.message });
	}
}
