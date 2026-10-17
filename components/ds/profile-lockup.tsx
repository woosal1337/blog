import { FaceDots } from "@/components/ds/face-dots";
import { cn } from "@/lib/utils";

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
			<FaceDots className="size-16 shrink-0" />
			<div className="min-w-0 leading-tight">
				<h1 className="font-ui text-[16px] font-medium text-ink">{name}</h1>
				<p className="font-ui text-[16px] text-ink-mute">{tagline}</p>
			</div>
		</div>
	);
}
