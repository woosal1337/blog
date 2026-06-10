import { Shell } from "@/components/ds/shell";
import { cn } from "@/lib/utils";
import type * as React from "react";

type PageHeroProps = {
	title: string;

	caption?: React.ReactNode;

	action?: React.ReactNode;
	className?: string;
};

export function PageHero({ title, caption, action, className }: PageHeroProps) {
	return (
		<section className={cn("bg-muted dark:bg-raised", className)}>
			<Shell className="py-[clamp(48px,8vw,96px)]">
				<h1 className="text-display">{title}</h1>
				{caption && (
					<p className="mt-3 text-body text-muted-foreground">{caption}</p>
				)}
				{action && <div className="mt-6">{action}</div>}
			</Shell>
		</section>
	);
}
