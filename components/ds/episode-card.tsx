import { NewLabel } from "@/components/ds/tag";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function PlayGlyph() {
	return (
		<svg
			width="18"
			height="18"
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

export type EpisodeCardProps = {
	href: string;
	title: string;
	date: string;
	summary?: string;
	thumbnail: string;
	thumbnailAlt?: string;
	runtime?: string;
	isNew?: boolean;
	featured?: boolean;
	wide?: boolean;
	className?: string;
};

export function EpisodeCard({
	href,
	title,
	date,
	summary,
	thumbnail,
	thumbnailAlt,
	runtime,
	isNew = false,
	featured = false,
	wide = false,
	className,
}: EpisodeCardProps) {
	const fullWidth = featured || wide;

	return (
		<Link
			href={href}
			data-sound="card"
			className={cn(
				"group block overflow-hidden rounded-[16px] border border-line bg-[#0a0a0a] transition-colors duration-200 ease-house hover:border-line-strong",
				className,
			)}
		>
			<div className="relative aspect-video overflow-hidden bg-[#060606]">
				<Image
					src={thumbnail}
					alt={thumbnailAlt ?? `Still from “${title}”`}
					fill
					priority={featured}
					sizes={
						fullWidth
							? "(max-width: 768px) 100vw, 680px"
							: "(max-width: 768px) 100vw, 332px"
					}
					className="object-cover"
				/>
				<span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-200 ease-house group-hover:opacity-100">
					<span className="grid size-12 place-items-center rounded-[999px] border border-white/20 bg-black/55 text-white backdrop-blur-[3px]">
						<PlayGlyph />
					</span>
				</span>
				{runtime ? (
					<span className="absolute bottom-3 right-3 rounded-[6px] bg-black/70 px-1.5 py-0.5 font-ui text-[12px] tabular-nums text-white backdrop-blur-[2px]">
						{runtime}
					</span>
				) : null}
			</div>
			<div className={cn("p-5", featured && "p-6")}>
				{isNew && <NewLabel className="mb-2" />}
				<h3
					className={cn(
						"font-ui text-[17px] font-medium text-ink",
						featured && "text-[22px]",
					)}
				>
					{title}
				</h3>
				{summary && (
					<p className="mt-2 line-clamp-2 font-ui text-[14px] leading-snug text-ink-mute">
						{summary}
					</p>
				)}
				<p className="mt-4 font-ui text-[13px] text-ink-mute">{date}</p>
			</div>
		</Link>
	);
}
