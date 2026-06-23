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
				"flex h-full w-[260px] flex-col border border-line bg-paper transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2 sm:w-[300px]",
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-line px-4 py-2">
				<span className="oak-label text-ink-mute">{"// project"}</span>
				{comingSoon ? <SoonLabel /> : isNew ? <NewLabel /> : null}
			</div>
			<div className="flex aspect-[4/5] w-full shrink-0 items-center justify-center border-b border-line bg-paper">
				{logo ? (
					<Image
						src={logo}
						alt={`${name} logo`}
						width={112}
						height={112}
						className={cn(
							"size-24 object-contain",
							logoInverts && "invert dark:invert-0",
						)}
					/>
				) : (
					<span className="px-6 text-title text-ink-mute">{name}</span>
				)}
			</div>
			<div className="flex flex-1 flex-col px-4 py-4">
				<h3 className="text-title text-foreground">{name}</h3>
				<p className="mt-2 text-footnote text-ink-soft">{description}</p>
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
		</div>
	);
}
