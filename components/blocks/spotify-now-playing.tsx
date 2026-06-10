"use client";

import { cn } from "@/lib/utils";
import type { SpotifyTrack } from "@/server/spotify";
import { useEffect, useState } from "react";

export function SpotifyNowPlaying({ className }: { className?: string }) {
	const [track, setTrack] = useState<SpotifyTrack | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchTrack() {
			try {
				const res = await fetch("/api/spotify");
				const data = await res.json();
				setTrack(data);
			} catch {
				setTrack(null);
			} finally {
				setLoading(false);
			}
		}

		fetchTrack();
		const interval = setInterval(fetchTrack, 15_000);
		return () => clearInterval(interval);
	}, []);

	if (loading) {
		return (
			<div className={cn("flex items-center gap-4 py-3", className)}>
				<div className="size-12 shrink-0 animate-pulse rounded-md bg-muted" />
				<div className="flex-1 space-y-2">
					<div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
					<div className="h-2 w-1/4 animate-pulse rounded bg-muted" />
				</div>
			</div>
		);
	}

	if (!track) {
		return (
			<p className={cn("py-3 text-body text-muted-foreground", className)}>
				nothing playing right now.
			</p>
		);
	}

	return (
		<a
			href={track.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"-mx-3 flex items-center gap-4 rounded-lg px-3 py-3 transition-colors duration-200 ease-house hover:bg-muted",
				className,
			)}
		>
			{track.albumImageUrl && (
				<img
					src={track.albumImageUrl}
					alt={track.album}
					className="size-12 shrink-0 rounded-md object-cover"
				/>
			)}
			<span className="min-w-0 flex-1">
				<span className="block truncate text-body text-foreground">
					{track.name}
				</span>
				<span className="block truncate text-caption text-tertiary">
					{track.artist} · {track.album}
				</span>
			</span>
			{track.isPlaying && (
				<span
					className="flex h-3 shrink-0 items-end gap-[2px]"
					aria-label="Playing now"
				>
					<span className="h-1 w-[3px] animate-bar-bounce bg-tertiary" />
					<span
						className="h-2 w-[3px] animate-bar-bounce bg-tertiary"
						style={{ animationDelay: "0.15s" }}
					/>
					<span
						className="h-3 w-[3px] animate-bar-bounce bg-tertiary"
						style={{ animationDelay: "0.3s" }}
					/>
				</span>
			)}
		</a>
	);
}
