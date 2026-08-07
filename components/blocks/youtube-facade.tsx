"use client";

import { GlassButtonSurface } from "@/components/ds/glass-button";
import { cn } from "@/lib/utils";
import { formatTimecode } from "@/lib/video-utils";
import Image from "next/image";
import * as React from "react";

const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";
const WARM_ORIGINS = [PLAYER_ORIGIN, "https://www.google.com"];

function PlayGlyph() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M7.5 5.2v9.6a.6.6 0 0 0 .93.5l7.2-4.8a.6.6 0 0 0 0-1l-7.2-4.8a.6.6 0 0 0-.93.5Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function warmPlayerOrigins() {
	for (const href of WARM_ORIGINS) {
		if (document.head.querySelector(`link[data-yt-warm="${href}"]`)) continue;
		const link = document.createElement("link");
		link.rel = "preconnect";
		link.href = href;
		link.crossOrigin = "";
		link.dataset.ytWarm = href;
		document.head.appendChild(link);
	}
}

type YouTubeFacadeProps = {
	videoId: string;
	title: string;
	thumbnail: string;
	thumbnailAlt?: string;
	runtime?: string;
	className?: string;
};

export function YouTubeFacade({
	videoId,
	title,
	thumbnail,
	thumbnailAlt,
	runtime,
	className,
}: YouTubeFacadeProps) {
	const [playing, setPlaying] = React.useState(false);
	const [start, setStart] = React.useState(0);

	React.useEffect(() => {
		const seconds = Number(
			new URLSearchParams(window.location.search).get("t") ?? "",
		);
		if (Number.isFinite(seconds) && seconds > 0) setStart(Math.floor(seconds));
	}, []);

	const frame = cn(
		"relative aspect-video w-full overflow-hidden rounded-[14px] border border-line bg-[#060606]",
		className,
	);

	if (playing) {
		return (
			<div className={frame}>
				<iframe
					src={`${PLAYER_ORIGIN}/embed/${videoId}?autoplay=1&playsinline=1&rel=0${
						start ? `&start=${start}` : ""
					}`}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					className="absolute inset-0 size-full border-0"
				/>
			</div>
		);
	}

	const poster = (
		<>
			<Image
				src={thumbnail}
				alt={thumbnailAlt ?? `Thumbnail for “${title}”`}
				fill
				priority
				sizes="(max-width: 1024px) 100vw, 680px"
				className="object-cover"
			/>
			{runtime ? (
				<span className="absolute bottom-3 right-3 rounded-[6px] bg-black/70 px-1.5 py-0.5 font-ui text-[12px] tabular-nums text-white backdrop-blur-[2px]">
					{runtime}
				</span>
			) : null}
		</>
	);

	if (!videoId) {
		return (
			<div className={frame}>
				{poster}
				<span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 font-ui text-[13px] text-white/80">
					Player goes live with the video.
				</span>
			</div>
		);
	}

	return (
		<button
			type="button"
			onClick={() => setPlaying(true)}
			onPointerEnter={warmPlayerOrigins}
			onFocus={warmPlayerOrigins}
			aria-label={`Play “${title}”`}
			data-sound="card"
			className={cn(
				frame,
				"group cursor-pointer transition-colors duration-200 ease-house hover:border-line-strong",
			)}
		>
			{poster}
			<span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors duration-200 ease-house group-hover:bg-black/25">
				<GlassButtonSurface
					size={64}
					className="liquid-press-sync translate-x-[1px]"
				>
					<PlayGlyph />
				</GlassButtonSurface>
			</span>
			{start ? (
				<span className="absolute bottom-3 left-3 rounded-[6px] bg-black/70 px-1.5 py-0.5 font-ui text-[12px] tabular-nums text-white backdrop-blur-[2px]">
					Starts at {formatTimecode(start)}
				</span>
			) : null}
		</button>
	);
}
