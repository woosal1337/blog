import { cn } from "@/lib/utils";
import type * as React from "react";

export function Kbd({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<kbd
			className={cn(
				"inline-flex items-center rounded-sm border border-border bg-card px-1.5 py-0.5 font-mono text-caption text-muted-foreground",
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
