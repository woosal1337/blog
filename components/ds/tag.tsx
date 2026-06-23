import { cn } from "@/lib/utils";
import type * as React from "react";

export function Tag({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center border border-line bg-transparent px-2 py-[3px] text-caption text-ink-soft",
				className,
			)}
		>
			{children}
		</span>
	);
}

export function NewLabel({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center bg-foreground px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-[0.12em] text-background",
				className,
			)}
		>
			new
		</span>
	);
}

export function SoonLabel({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center border border-line px-1.5 py-[1px] text-[10px] font-medium uppercase tracking-[0.12em] text-ink-soft",
				className,
			)}
		>
			soon
		</span>
	);
}
