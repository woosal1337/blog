import { cn } from "@/lib/utils";
import Link from "next/link";
import type * as React from "react";

export type PromoTileProps = {
	href: string;
	headline: string;
	body: string;
	ctaLabel: string;

	icon?: React.ReactNode;
	external?: boolean;
	className?: string;
};

export function PromoTile({
	href,
	headline,
	body,
	ctaLabel,
	icon,
	external = false,
	className,
}: PromoTileProps) {
	const classes = cn(
		"group block border border-line bg-paper px-6 py-14 text-foreground transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2",
		className,
	);
	const inner = (
		<>
			{icon && (
				<div className="mb-5 flex size-14 items-center justify-center border border-line bg-paper">
					{icon}
				</div>
			)}
			<p className="oak-label text-ink-mute">{"// promo"}</p>
			<h3 className="mt-3 text-headline text-foreground">{headline}</h3>
			<p className="mt-3 max-w-[52ch] text-body text-ink-soft">{body}</p>
			<span className="mt-6 inline-flex items-baseline gap-1 text-body text-foreground">
				<span className="group-hover:underline">{ctaLabel}</span>{" "}
				<span
					aria-hidden="true"
					className="transition-transform duration-240 ease-house group-hover:translate-x-0.5"
				>
					→
				</span>
			</span>
		</>
	);
	if (external) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={classes}
			>
				{inner}
			</a>
		);
	}
	return (
		<Link href={href} className={classes}>
			{inner}
		</Link>
	);
}
