import { cn } from "@/lib/utils";
import type * as React from "react";

export function Tag({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-pill bg-muted px-2.5 py-1 text-caption text-muted-foreground",
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
			className={cn("text-caption font-semibold text-[#f56300]", className)}
		>
			new
		</span>
	);
}

export function SoonLabel({ className }: { className?: string }) {
	return (
		<span
			className={cn("text-caption font-semibold text-[#f56300]", className)}
		>
			soon
		</span>
	);
}
