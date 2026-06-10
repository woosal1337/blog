"use server";

import { unstable_cache as cache } from "next/cache";

const CACHE_DURATION = 15;

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
	"https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
	"https://api.spotify.com/v1/me/player/recently-played?limit=1";

export interface SpotifyTrack {
	name: string;
	artist: string;
	album: string;
	albumImageUrl: string;
	songUrl: string;
	isPlaying: boolean;
}

const DEFAULT_SPOTIFY_RESPONSE: SpotifyTrack | null = null;

async function getAccessToken(): Promise<string | null> {
	const clientId = process.env.SPOTIFY_CLIENT_ID;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

	if (!clientId || !clientSecret || !refreshToken) {
		return null;
	}

	const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

	const res = await fetch(SPOTIFY_TOKEN_URL, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}),
	});

	const data = await res.json();
	return data.access_token ?? null;
}

export const getSpotifyNowPlaying = cache(
	async (): Promise<SpotifyTrack | null> => {
		try {
			const accessToken = await getAccessToken();
			if (!accessToken) return DEFAULT_SPOTIFY_RESPONSE;

			const res = await fetch(SPOTIFY_NOW_PLAYING_URL, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			if (res.status === 204) {
				const recentRes = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});

				if (!recentRes.ok) return DEFAULT_SPOTIFY_RESPONSE;

				const recentData = await recentRes.json();
				const track = recentData.items?.[0]?.track;
				if (!track) return DEFAULT_SPOTIFY_RESPONSE;

				return {
					name: track.name,
					artist: track.artists.map((a: { name: string }) => a.name).join(", "),
					album: track.album.name,
					albumImageUrl: track.album.images?.[0]?.url ?? "",
					songUrl: track.external_urls.spotify,
					isPlaying: false,
				};
			}

			if (!res.ok) return DEFAULT_SPOTIFY_RESPONSE;

			const data = await res.json();

			if (data.currently_playing_type !== "track" || !data.item) {
				return DEFAULT_SPOTIFY_RESPONSE;
			}

			const track = data.item;
			return {
				name: track.name,
				artist: track.artists.map((a: { name: string }) => a.name).join(", "),
				album: track.album.name,
				albumImageUrl: track.album.images?.[0]?.url ?? "",
				songUrl: track.external_urls.spotify,
				isPlaying: data.is_playing,
			};
		} catch {
			return DEFAULT_SPOTIFY_RESPONSE;
		}
	},
	["woosal1337-spotify-now-playing"],
	{
		revalidate: CACHE_DURATION,
	},
);
