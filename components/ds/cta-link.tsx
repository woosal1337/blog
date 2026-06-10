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
		"group inline-flex items-baseline gap-1 text-body text-link",
		className,
	);
	const inner = (
		<>
			<span className="group-hover:underline">{children}</span>
			{chevron && <span aria-hidden="true">›</span>}
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
