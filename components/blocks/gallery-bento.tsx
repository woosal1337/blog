"use client";

import { LoopingVideo } from "@/components/ds/looping-video";
import {
	SheetDialog,
	SheetDialogContent,
	SheetDialogTitle,
} from "@/components/ds/sheet-dialog";
import { type GalleryFrame, isVideoFrame, setDate } from "@/lib/gallery-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export type BentoFrame = GalleryFrame & {
	setSlug: string;
	setTitle: string;
	setDate: string;
};

/**
 * Tile size, from the frame's own shape. A wide picture takes two columns, a
 * tall one takes two rows, and every fifth square becomes a block, so the grid
 * never settles into a plain checkerboard.
 */
function spanFor(frame: GalleryFrame, index: number): string {
	if (frame.full) return "col-span-2 row-span-2";
	const ratio = frame.width / frame.height;
	if (ratio >= 1.4) return "col-span-2 row-span-1";
	if (ratio <= 0.72) return "col-span-1 row-span-2";
	return index % 5 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
}

function TileMedia({ frame }: { frame: BentoFrame }) {
	if (isVideoFrame(frame)) {
		return (
			<LoopingVideo
				src={frame.src}
				poster={frame.poster ?? ""}
				alt={frame.alt}
			/>
		);
	}
	return (
		<Image
			src={frame.src}
			alt={frame.alt}
			fill
			loading="lazy"
			sizes="(max-width: 768px) 50vw, 320px"
			className="object-cover transition-transform duration-500 ease-house group-hover:scale-[1.03]"
		/>
	);
}

/**
 * Consecutive runs of one date become one band. The list arrives sorted newest
 * first, so a run is every frame added to the blog on that day.
 */
function groupByDate(frames: BentoFrame[]): {
	date: string;
	frames: BentoFrame[];
}[] {
	const bands: { date: string; frames: BentoFrame[] }[] = [];
	for (const frame of frames) {
		const last = bands[bands.length - 1];
		if (last && last.date === frame.setDate) last.frames.push(frame);
		else bands.push({ date: frame.setDate, frames: [frame] });
	}
	return bands;
}

export function GalleryBento({
	frames,
	className,
}: { frames: BentoFrame[]; className?: string }) {
	const [selected, setSelected] = useState<BentoFrame | null>(null);

	return (
		<>
			<div className={cn("flex flex-col gap-12", className)}>
				{groupByDate(frames).map((band) => (
					<section key={band.date}>
						<div className="flex items-center gap-4">
							<h2 className="font-ui text-[13px] uppercase tracking-[0.14em] text-ink-mute">
								{setDate(band.date)}
							</h2>
							<span className="h-px flex-1 bg-line" aria-hidden="true" />
						</div>
						<div
							// grid-flow-dense backfills the holes a mixed-span grid leaves.
							className="mt-4 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[170px] md:grid-cols-4"
						>
							{band.frames.map((frame, index) => (
								<button
									key={`${frame.setSlug}-${frame.src}`}
									type="button"
									data-sound="card"
									onClick={() => setSelected(frame)}
									aria-label={`Open ${frame.alt}`}
									className={cn(
										"group relative overflow-hidden rounded-[12px] border border-line bg-[#060606] transition-colors duration-200 ease-house hover:border-line-strong",
										spanFor(frame, index),
									)}
								>
									<TileMedia frame={frame} />
								</button>
							))}
						</div>
					</section>
				))}
			</div>

			<SheetDialog
				open={!!selected}
				onOpenChange={(open) => !open && setSelected(null)}
			>
				{selected && (
					// A bare lightbox: no card, no padding, no caption. `[&>div]:p-0`
					// clears the padding SheetDialogContent wraps its children in.
					<SheetDialogContent className="w-auto max-w-[min(94vw,1400px)] border-0 bg-transparent [&>div]:p-0">
						{/* Radix needs a title. The picture is the content, so hide it. */}
						<SheetDialogTitle className="sr-only">
							{selected.alt}
						</SheetDialogTitle>
						<div
							className="relative mx-auto overflow-hidden rounded-[12px]"
							style={{
								aspectRatio: `${selected.width} / ${selected.height}`,
								// Viewport units, never a percentage. The dialog shrinks to fit
								// this box, so a percentage here would resolve against itself.
								width: `min(94vw, 1400px, calc(82vh * ${selected.width} / ${selected.height}))`,
							}}
						>
							{isVideoFrame(selected) ? (
								<LoopingVideo
									src={selected.src}
									poster={selected.poster ?? ""}
									alt={selected.alt}
								/>
							) : (
								<Image
									src={selected.src}
									alt={selected.alt}
									fill
									priority
									sizes="94vw"
									className="object-contain"
								/>
							)}
						</div>
					</SheetDialogContent>
				)}
			</SheetDialog>
		</>
	);
}
