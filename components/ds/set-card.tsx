import { LoopingVideo } from "@/components/ds/looping-video";
import { type GalleryFrame, isVideoFrame } from "@/lib/gallery-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type SetCardProps = {
	href: string;
	title: string;
	date: string;
	count: string;
	summary?: string;
	place?: string;
	cover: GalleryFrame;
	featured?: boolean;
	className?: string;
};

/**
 * Index card for one gallery set. The cover plays when it is a clip, so the
 * index moves the same way the set page does.
 */
export function SetCard({
	href,
	title,
	date,
	count,
	summary,
	place,
	cover,
	featured = false,
	className,
}: SetCardProps) {
	return (
		<Link
			href={href}
			data-sound="card"
			className={cn(
				"group block overflow-hidden rounded-[16px] border border-line bg-[#0a0a0a] transition-colors duration-200 ease-house hover:border-line-strong",
				className,
			)}
		>
			<div
				className="relative overflow-hidden bg-[#060606]"
				style={{ aspectRatio: featured ? "16 / 10" : "4 / 3" }}
			>
				{isVideoFrame(cover) ? (
					<LoopingVideo
						src={cover.src}
						poster={cover.poster ?? ""}
						alt={cover.alt}
					/>
				) : (
					<Image
						src={cover.src}
						alt={cover.alt}
						fill
						priority={featured}
						sizes={
							featured
								? "(max-width: 768px) 100vw, 680px"
								: "(max-width: 768px) 100vw, 332px"
						}
						className="object-cover transition-transform duration-500 ease-house group-hover:scale-[1.02]"
					/>
				)}
				<span className="absolute bottom-3 right-3 rounded-[6px] bg-black/70 px-1.5 py-0.5 font-ui text-[12px] tabular-nums text-white backdrop-blur-[2px]">
					{count}
				</span>
			</div>
			<div className={cn("p-5", featured && "p-6")}>
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
				<p className="mt-4 font-ui text-[13px] text-ink-mute">
					{date}
					{place ? ` · ${place}` : ""}
				</p>
			</div>
		</Link>
	);
}
