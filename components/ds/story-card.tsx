import { NewLabel } from "@/components/ds/tag";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type StoryCardProps = {
	href: string;
	title: string;

	date: string;
	summary?: string;

	label?: string;
	cover?: string | null;

	isNew?: boolean;

	featured?: boolean;
	className?: string;
};

export function StoryCard({
	href,
	title,
	date,
	summary,
	label,
	cover,
	isNew = false,
	featured = false,
	className,
}: StoryCardProps) {
	return (
		<Link
			href={href}
			className={cn(
				"group block overflow-hidden rounded-xl bg-card shadow-story transition-[transform,box-shadow] duration-300 ease-house hover:-translate-y-0.5 hover:shadow-story-hover",
				featured && "md:grid md:grid-cols-2",
				className,
			)}
		>
			{cover && (
				<div
					className={cn(
						"relative aspect-[2/1] overflow-hidden bg-muted",
						featured && "md:aspect-auto md:h-full md:min-h-[320px]",
					)}
				>
					<Image
						src={cover}
						alt=""
						fill
						sizes={
							featured
								? "(max-width: 768px) 100vw, 490px"
								: "(max-width: 768px) 100vw, 470px"
						}
						className="object-cover"
					/>
				</div>
			)}
			<div
				className={cn(
					"p-6",
					featured && "md:flex md:flex-col md:justify-center md:p-10",
				)}
			>
				{label && <p className="text-label uppercase text-tertiary">{label}</p>}
				{isNew && (
					<p className="mt-2">
						<NewLabel />
					</p>
				)}
				<h3 className={cn("mt-2 text-title", featured && "md:text-headline")}>
					{title}
				</h3>
				{summary && (
					<p className="mt-2 line-clamp-2 text-body text-muted-foreground">
						{summary}
					</p>
				)}
				<p className="mt-4 text-caption text-tertiary">{date}</p>
			</div>
		</Link>
	);
}
