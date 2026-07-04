"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

// Inset the first/last item to the page's editorial column (max-w-column 680px
// + px-6 24px), so the slider's left edge lines up with the section label above.
const SHELL_INLINE = "max(24px, calc((100vw - 680px) / 2 + 24px))";
// Soft fade at both edges so the row dissolves into the page — an infinite feel.
const EDGE_FADE =
	"linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)";

type GalleryProps = {
	children: React.ReactNode;
	ariaLabel: string;
	className?: string;
	/** Open scrolled to the middle of the list (infinite-shelf feel). */
	startCentered?: boolean;
};

/** Full-bleed scroll-snap slider with faded edges. Scroll/drag only — no paddles. */
export function Gallery({
	children,
	ariaLabel,
	className,
	startCentered = false,
}: GalleryProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	// Keep the row hidden (visibility only — layout still measures) until it's
	// centred, so the default left position never paints and no jump shows. The
	// reveal itself rides the page-enter fade, matching every other section.
	const [ready, setReady] = React.useState(!startCentered);

	React.useEffect(() => {
		if (!startCentered) return;
		const el = ref.current;
		if (!el) return;
		el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
		setReady(true);
	}, [startCentered]);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const warm = () => {
			el.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(
				(img) => {
					img.setAttribute("fetchpriority", "low");
					img.loading = "eager";
					img.decode?.().catch(() => {});
				},
			);
		};
		const ric = window.requestIdleCallback?.bind(window);
		if (ric) {
			const id = ric(warm, { timeout: 4000 });
			return () => window.cancelIdleCallback(id);
		}
		const id = window.setTimeout(warm, 1500);
		return () => window.clearTimeout(id);
	}, []);

	return (
		<div className={className}>
			<div
				ref={ref}
				role="region"
				aria-label={ariaLabel}
				className={cn(
					"no-scrollbar flex snap-x snap-proximity gap-6 overflow-x-auto",
					!ready && "invisible",
				)}
				style={{
					paddingInline: SHELL_INLINE,
					scrollPaddingInline: SHELL_INLINE,
					maskImage: EDGE_FADE,
					WebkitMaskImage: EDGE_FADE,
				}}
			>
				{children}
			</div>
		</div>
	);
}

export function GalleryItem({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<div data-gallery-item className={cn("shrink-0 snap-start", className)}>
			{children}
		</div>
	);
}
