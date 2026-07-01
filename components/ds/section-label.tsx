import { cn } from "@/lib/utils";
import type * as React from "react";

/** Small, sentence-case section label that heads each block in the editorial
 * layout (Projects, Writing, Shelf ...). Soft white, sans. */
export function SectionLabel({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn("font-ui text-[16px] font-medium text-ink", className)}
			{...props}
		>
			{children}
		</p>
	);
}
