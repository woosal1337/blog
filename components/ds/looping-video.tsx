"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type LoopingVideoProps = {
	src: string;
	poster: string;
	alt: string;
	className?: string;
};

export function LoopingVideo({
	src,
	poster,
	alt,
	className,
}: LoopingVideoProps) {
	const ref = React.useRef<HTMLVideoElement>(null);

	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.muted = true;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) el.play().catch(() => {});
				else el.pause();
			},
			{ rootMargin: "200px 0px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<video
			ref={ref}
			src={src}
			poster={poster}
			aria-label={alt}
			muted
			loop
			playsInline
			preload="none"
			disablePictureInPicture
			className={cn("size-full object-cover", className)}
		/>
	);
}
