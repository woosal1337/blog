"use client";

import { cn } from "@/lib/utils";
import { MetalFx, useMetalBend } from "metal-fx";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const METAL_BASELINE = 32;

const ICON =
	"grid place-items-center rounded-[999px] text-ink-soft transition-colors duration-200 ease-house hover:text-ink";

export function GlassButtonSurface({
	size = 40,
	className,
	children,
}: {
	size?: number;
	className?: string;
	children: React.ReactNode;
}) {
	const root = useRef<HTMLDivElement>(null);
	useMetalBend(root);

	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const icon = (
		<span className={ICON} style={{ width: size, height: size }}>
			{children}
		</span>
	);

	if (!mounted) {
		return (
			<span
				className={cn(
					"metal-btn inline-block rounded-[999px] border border-line",
					className,
				)}
			>
				{icon}
			</span>
		);
	}

	return (
		<MetalFx
			ref={root}
			preset="chromatic"
			variant="circle"
			theme={resolvedTheme === "light" ? "light" : "dark"}
			innerShadow
			scale={size / METAL_BASELINE}
			className={cn("metal-btn rounded-[999px]", className)}
		>
			{icon}
		</MetalFx>
	);
}
