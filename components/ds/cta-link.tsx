import { cn } from "@/lib/utils";
import Link from "next/link";
import type * as React from "react";

type CTALinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;

	external?: boolean;

	chevron?: boolean;
};

export function CTALink({
	href,
	children,
	className,
	external = false,
	chevron = true,
}: CTALinkProps) {
	const classes = cn(
		"group inline-flex items-baseline gap-1 text-footnote text-foreground underline-offset-4 hover:underline",
		className,
	);
	const inner = (
		<>
			<span>{children}</span>
			{chevron && (
				<span
					aria-hidden="true"
					className="transition-transform duration-240 ease-house group-hover:translate-x-0.5"
				>
					→
				</span>
			)}
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
