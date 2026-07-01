import { cn } from "@/lib/utils";
import type * as React from "react";

// Inset the first/last item to the page's editorial column (max-w-column 680px
// + px-6 24px), so the slider's left edge lines up with the section label above.
const SHELL_INLINE = "max(24px, calc((100vw - 680px) / 2 + 24px))";

type GalleryProps = {
	children: React.ReactNode;
	ariaLabel: string;
	className?: string;
};

/** Full-bleed scroll-snap slider. Scroll/drag only — no paddles. */
export function Gallery({ children, ariaLabel, className }: GalleryProps) {
	return (
		<div className={className}>
			<div
				role="region"
				aria-label={ariaLabel}
				className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto"
				style={{
					paddingInline: SHELL_INLINE,
					scrollPaddingInline: SHELL_INLINE,
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
