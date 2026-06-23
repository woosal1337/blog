"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const SHELL_INLINE = "max(22px, calc((100vw - 936px) / 2))";

type GalleryProps = {
	children: React.ReactNode;
	ariaLabel: string;
	className?: string;
};

export function Gallery({ children, ariaLabel, className }: GalleryProps) {
	const scrollerRef = React.useRef<HTMLDivElement>(null);
	const [canPrev, setCanPrev] = React.useState(false);
	const [canNext, setCanNext] = React.useState(false);

	const update = React.useCallback(() => {
		const el = scrollerRef.current;
		if (!el) return;
		setCanPrev(el.scrollLeft > 4);
		setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
	}, []);

	React.useEffect(() => {
		update();
		const el = scrollerRef.current;
		if (!el) return;
		el.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			el.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [update]);

	const page = (direction: 1 | -1) => {
		const el = scrollerRef.current;
		if (!el) return;
		const item = el.querySelector<HTMLElement>("[data-gallery-item]");
		const step = item ? item.offsetWidth + 24 : el.clientWidth * 0.8;
		el.scrollBy({ left: direction * step, behavior: "smooth" });
	};

	return (
		<div className={className}>
			<div
				ref={scrollerRef}
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

			<div className="mt-8 flex justify-center gap-3 [@media(hover:none)]:hidden">
				<GalleryPaddle
					direction="previous"
					disabled={!canPrev}
					onClick={() => page(-1)}
				/>
				<GalleryPaddle
					direction="next"
					disabled={!canNext}
					onClick={() => page(1)}
				/>
			</div>
		</div>
	);
}

function GalleryPaddle({
	direction,
	disabled,
	onClick,
}: {
	direction: "previous" | "next";
	disabled: boolean;
	onClick: () => void;
}) {
	const glyph = direction === "previous" ? "←" : "→";
	return (
		<button
			type="button"
			aria-label={direction}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				"flex size-9 items-center justify-center border border-line bg-paper text-subhead text-ink-soft transition-colors duration-240 ease-house",
				disabled
					? "pointer-events-none opacity-30"
					: "hover:border-line-strong hover:bg-paper-2 hover:text-foreground",
			)}
		>
			<span aria-hidden="true">{glyph}</span>
		</button>
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
