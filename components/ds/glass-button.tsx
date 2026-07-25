"use client";

import { cn } from "@/lib/utils";
import { Vaso } from "vaso";

const GLASS_BTN =
	"rounded-[999px] border border-line text-ink-soft transition-colors duration-200 ease-house hover:border-line-strong hover:text-ink";

export function GlassButtonSurface({
	size = 40,
	className,
	children,
}: {
	size?: number;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<Vaso
			width={size}
			height={size}
			radius={size / 2}
			blur={0.4}
			depth={2.5}
			dispersion={0.18}
			className={cn(GLASS_BTN, className)}
		>
			<span
				className="grid place-items-center"
				style={{ width: size, height: size }}
			>
				{children}
			</span>
		</Vaso>
	);
}
