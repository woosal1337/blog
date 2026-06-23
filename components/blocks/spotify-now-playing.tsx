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
			<div className={cn("border border-line bg-paper p-4", className)}>
				<p className="oak-label mb-4 text-ink-mute">// now-playing</p>
				<div className="flex items-center gap-4">
					<div className="size-12 shrink-0 animate-pulse bg-paper-3" />
					<div className="flex-1 space-y-2">
						<div className="h-3 w-2/5 animate-pulse bg-paper-3" />
						<div className="h-2 w-1/4 animate-pulse bg-paper-3" />
					</div>
				</div>
			</div>
		);
	}

	if (!track) {
		return (
			<div className={cn("border border-line bg-paper p-4", className)}>
				<p className="oak-label mb-4 text-ink-mute">// now-playing</p>
				<p className="text-footnote text-ink-soft">
					<span className="text-ink-mute">$</span> nothing playing right now
				</p>
			</div>
		);
	}

	return (
		<a
			href={track.songUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"block border border-line bg-paper p-4 transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2",
				className,
			)}
		>
			<div className="mb-4 flex items-center justify-between">
				<p className="oak-label text-ink-mute">// now-playing</p>
				{track.isPlaying && (
					<span
						className="flex h-3 shrink-0 items-end gap-[2px]"
						aria-label="Playing now"
					>
						<span className="h-1 w-[3px] animate-bar-bounce bg-ink-mute" />
						<span
							className="h-2 w-[3px] animate-bar-bounce bg-ink-soft"
							style={{ animationDelay: "0.15s" }}
						/>
						<span
							className="h-3 w-[3px] animate-bar-bounce bg-white"
							style={{ animationDelay: "0.3s" }}
						/>
					</span>
				)}
			</div>
			<div className="flex items-center gap-4">
				{track.albumImageUrl && (
					<img
						src={track.albumImageUrl}
						alt={track.album}
						className="size-12 shrink-0 border border-line object-cover"
					/>
				)}
				<span className="min-w-0 flex-1">
					<span className="block truncate text-footnote text-foreground">
						{track.name}
					</span>
					<span className="block truncate text-caption text-ink-soft">
						{track.artist} <span className="text-line">·</span> {track.album}
					</span>
				</span>
			</div>
		</a>
	);
}
