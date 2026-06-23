"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formattedDate } from "@/lib/utils";
import { type Variants, motion } from "framer-motion";
import type React from "react";

export function ContributionGraph({
	play,
	contributions,
}: {
	play: boolean;
	contributions: Externals.Github.ContributionDay[];
}): React.ReactElement {
	const container: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.035,
			},
		},
	};

	const item: Variants = {
		hidden: { opacity: 0, top: -8 },
		show: { opacity: 1, top: 0 },
	};

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate={play ? "show" : "hidden"}
			className="inline-grid grid-cols-7 gap-1 relative w-full"
		>
			{contributions.map((day, index) => (
				<Tooltip key={`tooltip-${index}`}>
					<TooltipTrigger asChild>
						<motion.div
							variants={item}
							className={cn(
								"size-2 relative hover:scale-125 transition-transform duration-150",
								day.contributionCount === 0
									? "bg-paper-2"
									: day.contributionCount < 5
										? "bg-ink-mute"
										: day.contributionCount < 10
											? "bg-ink-soft"
											: "bg-white",
							)}
						/>
					</TooltipTrigger>
					<TooltipContent
						className="font-mono text-caption tabular-nums"
						align="center"
						side="top"
					>
						{formattedDate(day.date)} <span className="text-line">·</span>{" "}
						{day.contributionCount === 1
							? "1 contribution"
							: day.contributionCount === 0
								? "rest day"
								: `${day.contributionCount} contributions`}
					</TooltipContent>
				</Tooltip>
			))}
		</motion.div>
	);
}
