import { cn } from "@/lib/utils";
import type * as React from "react";

const widths = {
	shell: "max-w-shell",
	article: "max-w-article",
	wide: "max-w-wide",
	// The editorial reading column — same width used by the landing page,
	// footer, and post template. Use this for any page that should match
	// their layout width.
	column: "max-w-column",
} as const;

type ShellProps = React.HTMLAttributes<HTMLDivElement> & {
	width?: keyof typeof widths;
};

export function Shell({
	width = "shell",
	className,
	children,
	...props
}: ShellProps) {
	return (
		<div
			className={cn(
				"mx-auto w-full",
				width === "column" ? "px-6" : "px-[22px]",
				widths[width],
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
	tint?: boolean;

	flush?: boolean;
};

export function Section({
	tint = false,
	flush = false,
	className,
	children,
	...props
}: SectionProps) {
	return (
		<section
			className={cn(
				!flush && "py-[clamp(48px,8vw,96px)]",
				tint && "bg-muted",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}
