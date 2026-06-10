import { cn } from "@/lib/utils";
import type * as React from "react";

const widths = {
	shell: "max-w-shell",
	article: "max-w-article",
	wide: "max-w-wide",
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
			className={cn("mx-auto w-full px-[22px]", widths[width], className)}
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
