import { cn } from "@/lib/utils";
import type * as React from "react";

export function Tag({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-[999px] border border-white/15 bg-white/[0.06] px-2.5 py-[3px] font-ui text-[12.5px] text-ink-soft backdrop-blur-[4px] [box-shadow:inset_0_1px_0_rgb(255_255_255/0.12)]",
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
				"inline-flex items-center rounded-[999px] bg-ink px-2 py-[2px] font-ui text-[10px] font-semibold uppercase tracking-[0.1em] text-paper",
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
				"inline-flex items-center rounded-[999px] border border-line px-2 py-[2px] font-ui text-[10px] font-medium uppercase tracking-[0.1em] text-ink-soft",
				className,
			)}
		>
			soon
		</span>
	);
}
