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
				"group block overflow-hidden border border-line bg-paper transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2",
				featured && "md:grid md:grid-cols-2",
				className,
			)}
		>
			{cover && (
				<div
					className={cn(
						"relative aspect-[2/1] overflow-hidden border-b border-line bg-paper-2",
						featured &&
							"md:aspect-auto md:h-full md:min-h-[320px] md:border-b-0 md:border-r",
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
				<div className="flex items-center gap-2">
					{label && <p className="oak-label text-ink-mute">{label}</p>}
					{isNew && <NewLabel />}
				</div>
				<h3
					className={cn(
						"mt-3 text-title text-foreground transition-colors group-hover:text-foreground",
						featured && "md:text-headline",
					)}
				>
					{title}
				</h3>
				{summary && (
					<p className="mt-2 line-clamp-2 text-footnote text-ink-soft">
						{summary}
					</p>
				)}
				<p className="oak-label mt-4 text-ink-mute">{date}</p>
			</div>
		</Link>
	);
}
