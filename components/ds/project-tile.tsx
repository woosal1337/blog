import { cn } from "@/lib/utils";
import type * as React from "react";

const themes = {
	canvas: "bg-background text-foreground",

	tint: "bg-muted text-foreground",

	dark: "dark bg-background text-foreground",
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
				"flex h-full flex-col items-center overflow-hidden text-center",
				themes[theme],
				!full && "rounded-2xl",
				className,
			)}
		>
			<div
				className={cn(
					"flex flex-col items-center px-6",
					full ? "gap-2 pt-14" : "gap-1 pb-8 pt-8",
					full && !media && "pb-14",
				)}
			>
				{icon && <div className="mb-4">{icon}</div>}
				<p className={cn(full ? "text-eyebrow" : "text-subhead font-semibold")}>
					{eyebrow}
				</p>
				<h3
					className={cn(
						"max-w-[24ch]",
						full
							? "text-headline"
							: "mt-1 text-footnote font-normal text-muted-foreground",
					)}
				>
					{headline}
				</h3>
				{actions && (
					<div
						className={cn(
							"flex items-center justify-center gap-6",
							full ? "mt-3" : "mt-2 text-footnote",
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
