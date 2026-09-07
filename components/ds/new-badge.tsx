"use client";

import { cn } from "@/lib/utils";
import { MetalBadge } from "metal-fx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const BADGE_SCALE = 0.85;
const BADGE_WIDTH = 45 * BADGE_SCALE;
const BADGE_HEIGHT = 25 * BADGE_SCALE;

export function MetalNewBadge({ className }: { className?: string }) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return (
		<span className={cn("inline-flex align-middle", className)}>
			{mounted ? (
				<MetalBadge
					theme={resolvedTheme === "light" ? "light" : "dark"}
					scale={BADGE_SCALE}
				>
					New
				</MetalBadge>
			) : (
				<span
					className="grid place-items-center rounded-[999px] bg-white font-ui text-[10.4px] font-semibold text-black"
					style={{ width: BADGE_WIDTH, height: BADGE_HEIGHT }}
				>
					New
				</span>
			)}
		</span>
	);
}
