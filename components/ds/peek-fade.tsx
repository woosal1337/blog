import { cn } from "@/lib/utils";
import type * as React from "react";

const FADE =
	"linear-gradient(to bottom, black 0%, rgb(0 0 0 / 0.4) 55%, transparent 100%)";

export function PeekFade({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			aria-hidden="true"
			{...({ inert: "" } as unknown as React.HTMLAttributes<HTMLDivElement>)}
			className={cn(
				"pointer-events-none relative h-24 select-none overflow-hidden",
				className,
			)}
			style={{ maskImage: FADE, WebkitMaskImage: FADE }}
		>
			{children}
		</div>
	);
}
