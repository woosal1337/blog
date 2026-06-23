"use client";

import NumberTicker from "@/components/blocks/number-ticker";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconStarFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import type React from "react";

export function GithubStars({
	play,
	totalStars,
	repoStats,
}: {
	play: boolean;
	totalStars: number;
	repoStats: Externals.Github.ApiResponse["data"]["viewer"]["repositories"]["nodes"];
}): React.ReactElement {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<motion.div className="absolute top-1 -right-24 group-hover:right-0 opacity-10 transition-all duration-150 group-hover:opacity-100 text-footnote flex gap-1 items-center font-mono text-foreground tabular-nums delay-300">
					<NumberTicker play={play} value={totalStars} />
					<IconStarFilled className="size-4 text-foreground" />
				</motion.div>
			</TooltipTrigger>
			<TooltipContent align="center" side="top">
				<div className="divide-y divide-line">
					{repoStats.map((repo, index) => (
						<div
							key={`repo-${index}`}
							className="flex items-center gap-2 py-1 font-mono text-caption first:pt-0 last:pb-0"
						>
							<span className="truncate max-w-32 text-foreground">
								{repo.name}
							</span>
							<span className="grow" />
							<span className="text-ink-soft tabular-nums">
								{repo.stargazerCount}
							</span>
						</div>
					))}
				</div>
			</TooltipContent>
		</Tooltip>
	);
}
