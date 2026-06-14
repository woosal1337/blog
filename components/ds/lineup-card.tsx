import { Button } from "@/components/ds/button";
import { NewLabel, SoonLabel } from "@/components/ds/tag";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type LineupCardProps = {
	name: string;
	description: string;
	href: string;
	ctaLabel: string;
	external?: boolean;

	logo?: string;

	logoInverts?: boolean;

	isNew?: boolean;
	comingSoon?: boolean;
	className?: string;
};

export function LineupCard({
	name,
	description,
	href,
	ctaLabel,
	external = false,
	logo,
	logoInverts = false,
	isNew = false,
	comingSoon = false,
	className,
}: LineupCardProps) {
	return (
		<div
			className={cn(
				"flex h-full w-[260px] flex-col items-center text-center sm:w-[300px]",
				className,
			)}
		>
			<div className="flex aspect-[4/5] w-full shrink-0 items-center justify-center rounded-xl bg-muted">
				{logo ? (
					<Image
						src={logo}
						alt={`${name} logo`}
						width={112}
						height={112}
						className={cn(
							"size-24 rounded-2xl object-contain",
							logoInverts && "invert dark:invert-0",
						)}
					/>
				) : (
					<span className="px-6 text-title text-tertiary">{name}</span>
				)}
			</div>
			<p
				className={cn(
					"mt-6 leading-none",
					!isNew && !comingSoon && "invisible",
				)}
				aria-hidden={!isNew && !comingSoon}
			>
				{comingSoon ? <SoonLabel /> : <NewLabel />}
			</p>
			<h3 className="mt-1.5 text-title">{name}</h3>
			<p className="mt-2 text-footnote text-muted-foreground">{description}</p>
			<div className="mt-auto pt-5">
				{comingSoon ? (
					<Button variant="secondary" size="sm" disabled>
						Coming soon
					</Button>
				) : (
					<Button asChild variant="primary" size="sm">
						{external ? (
							<a href={href} target="_blank" rel="noopener noreferrer">
								{ctaLabel}
							</a>
						) : (
							<Link href={href}>{ctaLabel}</Link>
						)}
					</Button>
				)}
			</div>
		</div>
	);
}
