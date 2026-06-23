import { cn } from "@/lib/utils";
import type * as React from "react";

const themes = {
	canvas: "bg-paper text-foreground",

	tint: "bg-paper text-foreground",

	dark: "bg-paper-2 text-foreground",
} as const;

export type ProjectTileProps = {
	eyebrow: string;

	headline: string;

	actions?: React.ReactNode;

	icon?: React.ReactNode;

	media?: React.ReactNode;
	theme?: keyof typeof themes;

	size?: "full" | "pair";
	className?: string;
};

export function ProjectTile({
	eyebrow,
	headline,
	actions,
	icon,
	media,
	theme = "tint",
	size = "pair",
	className,
}: ProjectTileProps) {
	const full = size === "full";
	return (
		<div
			className={cn(
				"flex h-full flex-col overflow-hidden border border-line transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2",
				themes[theme],
				className,
			)}
		>
			<div className="flex items-center justify-between border-b border-line px-5 py-2">
				<span className="oak-label text-ink-mute">{"// project"}</span>
			</div>
			<div
				className={cn(
					"flex flex-col px-5",
					full ? "gap-2 pt-8" : "gap-1 pb-6 pt-6",
					full && !media && "pb-8",
				)}
			>
				{icon && (
					<div className="mb-4 flex size-14 items-center justify-center border border-line bg-paper">
						{icon}
					</div>
				)}
				<p
					className={cn(
						"text-foreground",
						full ? "text-title" : "text-subhead font-semibold",
					)}
				>
					{eyebrow}
				</p>
				<h3
					className={cn(
						"max-w-[40ch]",
						full
							? "text-body text-ink-soft"
							: "mt-1 text-footnote font-normal text-ink-soft",
					)}
				>
					{headline}
				</h3>
				{actions && (
					<div
						className={cn(
							"flex items-center gap-6",
							full ? "mt-4" : "mt-3 text-footnote",
						)}
					>
						{actions}
					</div>
				)}
			</div>
			{media && (
				<div className={cn("mt-auto w-full", full ? "pt-8" : "pt-6")}>
					{media}
				</div>
			)}
		</div>
	);
}
