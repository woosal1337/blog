import { cn } from "@/lib/utils";
import type * as React from "react";

type SectionHeaderProps = {
	title: string;

	eyebrow?: string;

	action?: React.ReactNode;
	className?: string;
};

export function SectionHeader({
	title,
	eyebrow,
	action,
	className,
}: SectionHeaderProps) {
	return (
		<div className={cn("flex items-end justify-between gap-6", className)}>
			<div className="min-w-0">
				{eyebrow && (
					<p className="mb-1 text-eyebrow text-muted-foreground">{eyebrow}</p>
				)}
				<h2 className="text-headline">{title}</h2>
			</div>
			{action && <div className="shrink-0 pb-1">{action}</div>}
		</div>
	);
}
