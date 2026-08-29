import { LoopingVideo } from "@/components/ds/looping-video";
import { type GalleryFrame, isVideoFrame, setDate } from "@/lib/gallery-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * One tile. A still renders through next/image, a clip through LoopingVideo.
 * Both sit in the same bordered box, so a mixed grid reads as one surface.
 */
export function Frame({
	frame,
	sizes = "(max-width: 768px) 100vw, 640px",
	priority = false,
	className,
}: {
	frame: GalleryFrame;
	sizes?: string;
	priority?: boolean;
	className?: string;
}) {
	const ratio = `${frame.width} / ${frame.height}`;

	return (
		<figure className={cn("m-0", className)}>
			<div
				className="relative overflow-hidden rounded-[12px] border border-line bg-[#060606]"
				style={{ aspectRatio: ratio }}
			>
				{isVideoFrame(frame) ? (
					<LoopingVideo
						src={frame.src}
						poster={frame.poster ?? ""}
						alt={frame.alt}
					/>
				) : (
					<Image
						src={frame.src}
						alt={frame.alt}
						fill
						sizes={sizes}
						priority={priority}
						className="object-cover"
					/>
				)}
			</div>
			{frame.caption && (
				<figcaption className="mt-2 font-ui text-[13px] leading-snug text-ink-mute">
					{frame.caption}
				</figcaption>
			)}
		</figure>
	);
}

/**
 * The set body. Two columns from `sm` up, and a frame marked `full` takes the
 * whole row. Nothing here is client code except the clips themselves.
 */
export function Frames({
	frames,
	className,
}: { frames: GalleryFrame[]; className?: string }) {
	return (
		<div className={cn("my-8 grid gap-4 sm:grid-cols-2", className)}>
			{frames.map((frame, index) => (
				<Frame
					key={frame.src}
					frame={frame}
					priority={index === 0}
					sizes={
						frame.full
							? "(max-width: 768px) 100vw, 680px"
							: "(max-width: 768px) 100vw, 332px"
					}
					className={frame.full ? "sm:col-span-2" : undefined}
				/>
			))}
		</div>
	);
}

export function SetHeader({
	title,
	date,
	place,
	summary,
}: {
	title: string;
	date: string;
	place?: string;
	summary?: string;
}) {
	return (
		<header className="mb-8">
			<p className="font-ui text-[13px] uppercase tracking-[0.14em] text-ink-mute">
				{setDate(date)}
				{place ? ` · ${place}` : ""}
			</p>
			<h1 className="mt-3 font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
				{title}
			</h1>
			{summary && (
				<p className="mt-3 font-ui text-[15px] leading-relaxed text-ink-mute">
					{summary}
				</p>
			)}
		</header>
	);
}
