import { postIconSrc } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";

export function PostGlyph({
	slug,
	className,
}: {
	slug: string;
	className?: string;
}) {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={postIconSrc(slug)}
			alt=""
			width={36}
			height={36}
			loading="lazy"
			decoding="async"
			className={cn("size-9", className)}
		/>
	);
}
