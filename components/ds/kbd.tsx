import { cn } from "@/lib/utils";
import type * as React from "react";

export function Kbd({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<kbd
			className={cn(
				"inline-flex items-center border border-line bg-paper-2 px-1.5 py-0.5 font-mono text-caption uppercase tracking-wide text-ink-soft",
				className,
			)}
		>
			{children}
		</kbd>
	);
}

export function KbdGroup({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<span className={cn("inline-flex items-center gap-1", className)}>
			{children}
		</span>
	);
}
