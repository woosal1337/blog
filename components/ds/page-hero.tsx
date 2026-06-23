import { Shell } from "@/components/ds/shell";
import { cn } from "@/lib/utils";
import type * as React from "react";

type PageHeroProps = {
	title: string;

	eyebrow?: string;

	caption?: React.ReactNode;

	action?: React.ReactNode;
	className?: string;
};

export function PageHero({
	title,
	eyebrow,
	caption,
	action,
	className,
}: PageHeroProps) {
	return (
		<section className={cn("border-b border-line bg-paper", className)}>
			<Shell className="py-[clamp(40px,7vw,80px)]">
				{eyebrow && (
					<p className="oak-label mb-3 text-ink-mute">// {eyebrow}</p>
				)}
				<h1 className="text-display text-foreground">{title}</h1>
				{caption && (
					<p className="mt-4 max-w-2xl text-body text-ink-soft">{caption}</p>
				)}
				{action && <div className="mt-6">{action}</div>}
			</Shell>
		</section>
	);
}
