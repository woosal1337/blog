"use client";

import { cn } from "@/lib/utils";
import type * as React from "react";

type AsciiFrameProps = React.HTMLAttributes<HTMLDivElement> & {
	hostRef: React.RefObject<HTMLDivElement>;
	canvasRef: React.RefObject<HTMLCanvasElement>;
	label?: string;
};

/** Shared chrome for the live ASCII canvas surfaces: a sized host + an absolute
 * canvas + an optional oak-label overlay. The parent owns both refs. */
export function AsciiFrame({
	hostRef,
	canvasRef,
	label,
	className,
	...props
}: AsciiFrameProps) {
	return (
		<div
			ref={hostRef}
			aria-hidden="true"
			className={cn("relative overflow-hidden", className)}
			{...props}
		>
			<canvas
				className="absolute inset-0 block h-full w-full"
				ref={canvasRef}
			/>
			{label ? (
				<span className="oak-label pointer-events-none absolute left-3 top-3 z-[1] text-ink-mute">
					{label}
				</span>
			) : null}
		</div>
	);
}
