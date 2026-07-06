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
			data-sound="card"
			className={cn(
				"group block overflow-hidden rounded-[16px] border border-line bg-[#0a0a0a] transition-colors duration-200 ease-house hover:border-line-strong",
				className,
			)}
		>
			{cover && (
				<div
					className={cn(
						"relative aspect-[2/1] overflow-hidden bg-[#060606]",
						featured && "aspect-[16/9]",
					)}
				>
					<Image
						src={cover}
						alt=""
						fill
						sizes={
							featured
								? "(max-width: 768px) 100vw, 680px"
								: "(max-width: 768px) 100vw, 332px"
						}
						className="object-cover"
					/>
				</div>
			)}
			<div className={cn("p-5", featured && "p-6")}>
				<div className="flex items-center gap-2">
					{label && (
						<p className="font-ui text-[13px] text-ink-mute">{label}</p>
					)}
					{isNew && <NewLabel />}
				</div>
				<h3
					className={cn(
						"mt-2 font-ui text-[17px] font-medium text-ink",
						featured && "text-[22px]",
					)}
				>
					{title}
				</h3>
				{summary && (
					<p className="mt-2 line-clamp-2 font-ui text-[14px] leading-snug text-ink-mute">
						{summary}
					</p>
				)}
				<p className="mt-4 font-ui text-[13px] text-ink-mute">{date}</p>
			</div>
		</Link>
	);
}
