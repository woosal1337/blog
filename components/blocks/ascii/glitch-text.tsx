import { cn } from "@/lib/utils";
import type * as React from "react";

type GlitchTextProps = React.HTMLAttributes<HTMLSpanElement> & {
	text: string;
};

/** Phosphor glitch type: the text is duplicated into two clipped grey channels
 * that jitter on a loop for a broken-signal CRT feel. CSS only, no canvas.
 * Ported from soft-club-ui, retuned monochrome (see .oak-glitch in globals). */
export function GlitchText({ text, className, ...props }: GlitchTextProps) {
	return (
		<span className={cn("oak-glitch", className)} data-text={text} {...props}>
			<span className="oak-glitch__base">{text}</span>
		</span>
	);
}
