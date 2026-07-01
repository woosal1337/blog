import { cn } from "@/lib/utils";
import Link from "next/link";

type ProfileLockupProps = {
	name: string;
	tagline: React.ReactNode;
	avatar: string;
	className?: string;
};

/** Avatar + name + role lockup that opens the editorial column (the site's
 * de-facto header on the landing page). Renders `avatar` as a plain `<img>`
 * (no next/image optimizer pass) so an SVG source stays pixel-exact against
 * the page background — Next's image pipeline re-encodes PNGs through sharp,
 * which can reintroduce a color/gamma mismatch a raster source already fixed. */
export function ProfileLockup({
	name,
	tagline,
	avatar,
	className,
}: ProfileLockupProps) {
	return (
		<div className={cn("flex items-center gap-4", className)}>
			<Link
				href="/"
				aria-label="Home"
				className="shrink-0 transition-opacity duration-200 ease-house hover:opacity-80"
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={avatar}
					alt={name}
					width={64}
					height={64}
					className="size-16 object-cover"
				/>
			</Link>
			<div className="min-w-0 leading-tight">
				<p className="font-ui text-[16px] font-medium text-ink">{name}</p>
				<p className="font-ui text-[16px] text-ink-mute">{tagline}</p>
			</div>
		</div>
	);
}
