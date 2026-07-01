import { GlassButtonSurface } from "@/components/ds/glass-button";
import { cn } from "@/lib/utils";
import Link from "next/link";

function BackIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M8 5 3.5 9.5 8 14"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3.5 9.5H12a4.5 4.5 0 0 1 0 9h-1.5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
		</svg>
	);
}

/** Circular back-to-home button, matching the post template's chrome. */
export function BackButton({
	href = "/",
	className,
}: {
	href?: string;
	className?: string;
}) {
	return (
		<Link
			href={href}
			aria-label="Back to home"
			className={cn("inline-block rounded-[999px]", className)}
		>
			<GlassButtonSurface size={40}>
				<BackIcon />
			</GlassButtonSurface>
		</Link>
	);
}
