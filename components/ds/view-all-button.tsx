import { GlassButtonSurface } from "@/components/ds/glass-button";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ForwardArrowIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M12 5 16.5 9.5 12 14"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.5 9.5H8a4.5 4.5 0 0 0 0 9h1.5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function ViewAllButton({
	href,
	label,
	className,
}: {
	href: string;
	label: string;
	className?: string;
}) {
	return (
		<Link
			href={href}
			aria-label={label}
			className={cn("inline-block rounded-[999px]", className)}
		>
			<GlassButtonSurface size={40}>
				<ForwardArrowIcon />
			</GlassButtonSurface>
		</Link>
	);
}
