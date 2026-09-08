import { AnimatedContourLogo } from "@/components/ds/animated-contour-logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ProfileLockupProps = {
	name: string;
	tagline: React.ReactNode;
	className?: string;
};

export function ProfileLockup({
	name,
	tagline,
	className,
}: ProfileLockupProps) {
	return (
		<div className={cn("flex items-center gap-4", className)}>
			<Link
				href="/blog/contour"
				aria-label="The story of this mark"
				className="shrink-0 transition-opacity duration-200 ease-house hover:opacity-80"
			>
				<AnimatedContourLogo className="size-16" />
			</Link>
			<div className="min-w-0 leading-tight">
				<h1 className="font-ui text-[16px] font-medium text-ink">{name}</h1>
				<p className="font-ui text-[16px] text-ink-mute">{tagline}</p>
			</div>
		</div>
	);
}
