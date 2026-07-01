import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

type FeatureCardProps = {
	title: string;
	description: string;
	href: string;
	external?: boolean;
	logo?: string;
	logoInverts?: boolean;
	badge?: React.ReactNode;
	className?: string;
};

/** Rounded project/feature card: a centered icon stage above a title + one-line
 * description. Border brightens on hover. */
export function FeatureCard({
	title,
	description,
	href,
	external,
	logo,
	logoInverts,
	badge,
	className,
}: FeatureCardProps) {
	const inner = (
		<>
			<div className="flex min-h-[150px] flex-1 items-center justify-center rounded-[12px] bg-[#060606]">
				{logo ? (
					<Image
						src={logo}
						alt={`${title} logo`}
						width={48}
						height={48}
						className={cn(
							"size-12 object-contain",
							logoInverts && "invert dark:invert-0",
						)}
					/>
				) : null}
			</div>
			<div className="flex items-start justify-between gap-3 px-3.5 pb-3 pt-3.5">
				<div className="min-w-0">
					<p className="font-ui text-[15px] font-medium text-ink">{title}</p>
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						{description}
					</p>
				</div>
				{badge}
			</div>
		</>
	);

	const classes = cn(
		"group flex h-full min-h-[236px] flex-col rounded-[16px] border border-line bg-[#0a0a0a] p-1 transition-colors duration-200 ease-house hover:border-line-strong",
		className,
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
