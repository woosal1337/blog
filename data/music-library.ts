import data from "./music-library.json";

export type Song = {
	title: string;
	artist: string;
	album: string;
	duration: string;
	cover: string;
	sources: string[];
	spotifyId?: string;
	spotifyUrl?: string;
	previewUrl?: string | null;
	addedAt?: string;
};

export type ArtistEntry = {
	artist: string;
	artistImage: string;
	artistId?: string;
	songs: Song[];
};

export type MusicLibraryMeta = {
	generatedAt: string;
	totalArtists: number;
	totalSongs: number;
	source: string;
};

export const musicLibrary: ArtistEntry[] = data.library as ArtistEntry[];

export const musicLibraryMeta: MusicLibraryMeta = {
	generatedAt: data.generatedAt,
	totalArtists: data.totalArtists,
	totalSongs: data.totalSongs,
	source: data.source,
};
