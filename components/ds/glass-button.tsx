"use client";

import { cn } from "@/lib/utils";
import { Vaso } from "vaso";

const GLASS_BTN =
	"rounded-[999px] border border-line text-ink-soft transition-colors duration-200 ease-house hover:border-line-strong hover:text-ink";

/**
 * The shared circular chrome-button surface, rendered as vaso "liquid glass":
 * a per-instance SVG-displacement backdrop with a hairline ring. Wrap it in the
 * interactive element (Link / button / Dialog.Close) and pass the icon as
 * children. The glass refraction only reads over content (e.g. the dialog close
 * over a book cover); on the flat page it degrades to a subtle frosted ring.
 */
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
