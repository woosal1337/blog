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
	const drag = React.useRef({
		id: -1,
		startX: 0,
		startScroll: 0,
		active: false,
		moved: false,
	});
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

	// Mouse/pen drag-to-scroll; touch already pans natively. A small threshold
	// keeps plain clicks working, and a real drag suppresses the click behind it.
	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.pointerType === "touch" || e.button !== 0) return;
		const el = ref.current;
		if (!el) return;
		drag.current = {
			id: e.pointerId,
			startX: e.clientX,
			startScroll: el.scrollLeft,
			active: true,
			moved: false,
		};
	};

	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const d = drag.current;
		const el = ref.current;
		if (!el || !d.active || e.pointerId !== d.id) return;
		const dx = e.clientX - d.startX;
		if (!d.moved) {
			if (Math.abs(dx) < 5) return;
			d.moved = true;
			el.setPointerCapture(e.pointerId);
			el.style.scrollSnapType = "none";
			el.style.cursor = "grabbing";
		}
		el.scrollLeft = d.startScroll - dx;
	};

	const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
		const d = drag.current;
		const el = ref.current;
		if (!el || !d.active || e.pointerId !== d.id) return;
		d.active = false;
		if (d.moved) {
			if (el.hasPointerCapture(e.pointerId)) {
				el.releasePointerCapture(e.pointerId);
			}
			el.style.scrollSnapType = "";
			el.style.cursor = "";
		}
	};

	const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!drag.current.moved) return;
		drag.current.moved = false;
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div className={className}>
			<div
				ref={ref}
				role="region"
				aria-label={ariaLabel}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerEnd}
				onPointerCancel={onPointerEnd}
				onClickCapture={onClickCapture}
				onDragStart={(e) => e.preventDefault()}
				className={cn(
					"no-scrollbar flex cursor-grab select-none snap-x snap-proximity gap-6 overflow-x-auto",
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
