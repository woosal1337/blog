import { cn } from "@/lib/utils";
import type * as React from "react";

export function Kbd({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<kbd
			className={cn(
				"inline-flex items-center rounded-[5px] border border-line bg-white/[0.04] px-1.5 py-0.5 font-mono text-caption uppercase tracking-wide text-ink",
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
