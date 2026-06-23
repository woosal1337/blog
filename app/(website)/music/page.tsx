"use client";

import { Button } from "@/components/ds/button";
import { Gallery, GalleryItem } from "@/components/ds/gallery";
import { PageHero } from "@/components/ds/page-hero";
import { SearchInput } from "@/components/ds/search-input";
import {
	SheetDialog,
	SheetDialogContent,
	SheetDialogDescription,
	SheetDialogTitle,
} from "@/components/ds/sheet-dialog";
import { Section, Shell } from "@/components/ds/shell";
import {
	type ArtistEntry,
	type Song,
	musicLibrary,
} from "@/data/music-library";
import { Shuffle } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const PAGE_SIZE = 100;

function TrackRow({ song }: { song: Song }) {
	const inner = (
		<>
			{song.cover && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={song.cover}
					alt=""
					loading="lazy"
					className="size-10 shrink-0 border border-line object-cover"
				/>
			)}
			<span className="min-w-0 flex-1">
				<span className="block truncate text-footnote text-foreground">
					{song.title}
				</span>
				<span className="block truncate text-caption text-ink-soft">
					{song.artist} <span className="text-line">·</span> {song.album}
				</span>
			</span>
			<span className="shrink-0 text-caption text-ink-mute tabular-nums">
				{song.duration}
			</span>
		</>
	);
	const rowClasses =
		"flex items-center gap-4 px-3 py-2.5 transition-colors duration-240 ease-house hover:bg-paper-2";
	if (song.spotifyUrl) {
		return (
			<a
				href={song.spotifyUrl}
				target="_blank"
				rel="noopener noreferrer"
				className={rowClasses}
			>
				{inner}
			</a>
		);
	}
	return <div className={rowClasses}>{inner}</div>;
}

export default function MusicPage() {
	const [search, setSearch] = useState("");
	const [visible, setVisible] = useState(PAGE_SIZE);
	const [selectedArtist, setSelectedArtist] = useState<ArtistEntry | null>(
		null,
	);
	const [shuffled, setShuffled] = useState<Song | null>(null);

	const allSongs = useMemo(() => {
		const songs = musicLibrary.flatMap((entry) => entry.songs);
		return songs.sort((a, b) => {
			if (a.addedAt && b.addedAt) {
				return +new Date(b.addedAt) - +new Date(a.addedAt);
			}
			return 0;
		});
	}, []);

	const handleShuffle = useCallback(() => {
		if (!allSongs.length) return;
		setShuffled(allSongs[Math.floor(Math.random() * allSongs.length)]);
	}, [allSongs]);

	const query = search.trim().toLowerCase();

	const filteredArtists = useMemo(() => {
		if (!query) return musicLibrary;
		return musicLibrary.filter(
			(entry) =>
				entry.artist.toLowerCase().includes(query) ||
				entry.songs.some((song) => song.title.toLowerCase().includes(query)),
		);
	}, [query]);

	const filteredSongs = useMemo(() => {
		if (!query) return allSongs;
		return allSongs.filter(
			(song) =>
				song.title.toLowerCase().includes(query) ||
				song.artist.toLowerCase().includes(query) ||
				song.album.toLowerCase().includes(query),
		);
	}, [allSongs, query]);

	const shownSongs = filteredSongs.slice(0, visible);
	const remaining = filteredSongs.length - shownSongs.length;

	return (
		<>
			<PageHero
				title="Music"
				eyebrow="music"
				caption={`${musicLibrary.length} artists · ${allSongs.length} tracks in the library`}
			/>

			<Section tint>
				<Shell>
					<p className="oak-label mb-3 text-ink-mute">// artists</p>
					<h2 className="text-headline">Artists</h2>
				</Shell>
				<Gallery ariaLabel="Artists" className="mt-8">
					{filteredArtists.map((entry) => (
						<GalleryItem key={entry.artist}>
							<button
								type="button"
								onClick={() => setSelectedArtist(entry)}
								className="group w-[140px] text-left sm:w-[160px]"
							>
								<img
									src={entry.artistImage}
									alt=""
									loading="lazy"
									className="aspect-square w-full border border-line object-cover transition-colors duration-240 ease-house group-hover:border-line-strong"
								/>
								<span className="mt-3 block truncate text-footnote text-foreground">
									{entry.artist}
								</span>
								<span className="block text-caption text-ink-mute">
									{entry.songs.length} track
									{entry.songs.length !== 1 ? "s" : ""}
								</span>
							</button>
						</GalleryItem>
					))}
					{filteredArtists.length === 0 && (
						<GalleryItem>
							<p className="py-8 text-footnote text-ink-soft">
								<span className="text-ink-mute">$</span> no artists match
							</p>
						</GalleryItem>
					)}
				</Gallery>
			</Section>

			<Section>
				<Shell>
					<p className="oak-label mb-3 text-ink-mute">// library</p>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<h2 className="text-headline">Songs</h2>
						<SearchInput
							placeholder="$ grep library"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setVisible(PAGE_SIZE);
							}}
							className="sm:w-64"
							aria-label="Find in library"
						/>
					</div>

					<div className="mt-8 flex items-center gap-4 border border-line bg-paper p-3">
						{shuffled ? (
							<>
								{shuffled.cover && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={shuffled.cover}
										alt=""
										className="size-10 shrink-0 border border-line object-cover"
									/>
								)}
								<span className="min-w-0 flex-1">
									<span className="block truncate text-footnote text-foreground">
										{shuffled.title}
									</span>
									<span className="block truncate text-caption text-ink-soft">
										{shuffled.artist} <span className="text-line">·</span>{" "}
										{shuffled.album}
									</span>
								</span>
							</>
						) : (
							<span className="flex-1 px-1 text-footnote text-ink-soft">
								<span className="text-ink-mute">$</span> shuffle --random
							</span>
						)}
						<Button variant="secondary" size="sm" onClick={handleShuffle}>
							<Shuffle
								size={14}
								strokeWidth={1.5}
								aria-hidden="true"
								className="mr-1.5"
							/>
							Shuffle
						</Button>
					</div>

					<div className="mt-8 flex items-center justify-between border-b border-line px-3 pb-2">
						<span className="oak-label text-ink-mute">track</span>
						<span className="oak-label text-ink-mute">time</span>
					</div>
					<ul className="divide-y divide-line">
						{shownSongs.map((song, index) => (
							<li key={`${song.title}-${song.artist}-${index}`}>
								<TrackRow song={song} />
							</li>
						))}
					</ul>

					{filteredSongs.length === 0 && (
						<p className="py-16 text-center text-footnote text-ink-soft">
							<span className="text-ink-mute">$</span> no results found
						</p>
					)}

					{remaining > 0 && (
						<div className="mt-8 flex justify-center">
							<Button
								variant="secondary"
								size="sm"
								onClick={() => setVisible((v) => v + PAGE_SIZE)}
							>
								Show {Math.min(PAGE_SIZE, remaining)} more
							</Button>
						</div>
					)}
				</Shell>
			</Section>

			<SheetDialog
				open={!!selectedArtist}
				onOpenChange={(open) => !open && setSelectedArtist(null)}
			>
				{selectedArtist && (
					<SheetDialogContent className="max-w-[560px]">
						<div className="flex items-center gap-4">
							<img
								src={selectedArtist.artistImage}
								alt=""
								className="size-16 shrink-0 border border-line object-cover"
							/>
							<div>
								<SheetDialogTitle className="mt-0">
									{selectedArtist.artist}
								</SheetDialogTitle>
								<SheetDialogDescription className="mt-1">
									{selectedArtist.songs.length} track
									{selectedArtist.songs.length !== 1 ? "s" : ""} in the library
								</SheetDialogDescription>
							</div>
						</div>

						<ul className="mt-6 max-h-[50vh] divide-y divide-line overflow-y-auto">
							{selectedArtist.songs.map((song, index) => (
								<li key={`${song.title}-${index}`}>
									<TrackRow song={song} />
								</li>
							))}
						</ul>
					</SheetDialogContent>
				)}
			</SheetDialog>
		</>
	);
}
