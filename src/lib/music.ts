/** one album on the page, with only the fields a card needs */
export interface AlbumTile {
	id: string;
	cover: string;
	track: string;
	trackUrl: string;
	artists: { id: string; name: string; url: string }[];
	album: string;
	albumUrl: string;
}

/** one tile per album, captioned with the most played track from it */
export function toTiles(tracks: SpotifyApi.TrackObjectFull[]): AlbumTile[] {
	const seen = new Set<string>();
	return tracks
		.filter(t => !seen.has(t.album.id) && seen.add(t.album.id))
		.map(t => ({
			id: t.id,
			cover: t.album.images[0]?.url ?? "",
			track: t.name,
			trackUrl: t.external_urls.spotify,
			artists: t.artists.map(a => ({ id: a.id, name: a.name, url: a.external_urls.spotify })),
			album: t.album.name,
			albumUrl: t.album.external_urls.spotify
		}));
}
