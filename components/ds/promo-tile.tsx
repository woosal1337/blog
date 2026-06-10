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
		"group block rounded-2xl bg-action px-6 py-16 text-center text-white transition-colors duration-300 ease-house hover:bg-action-hover",
		className,
	);
	const inner = (
		<>
			{icon && <div className="mb-5 flex justify-center">{icon}</div>}
			<h3 className="text-headline text-white">{headline}</h3>
			<p className="mx-auto mt-3 max-w-[52ch] text-body text-white/80">
				{body}
			</p>
			<span className="mt-6 inline-block text-body">
				<span className="group-hover:underline">{ctaLabel}</span>{" "}
				<span aria-hidden="true">›</span>
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
