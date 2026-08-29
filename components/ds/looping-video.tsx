"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type LoopingVideoProps = {
	src: string;
	/** The still that holds the frame before the first video frame decodes. */
	poster: string;
	/** Describes the clip for a reader who never sees it play. */
	alt: string;
	className?: string;
};

/**
 * A silent clip that plays as soon as it enters the viewport and repeats
 * forever. The `loop` attribute does the repeat, so there is no ended handler.
 *
 * Playback is driven by the observer instead of the `autoPlay` attribute. With
 * `autoPlay`, every clip on the page starts at once, and a reduced-motion
 * reader sees movement before this effect can stop it.
 */
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
		// The autoplay policy reads the muted *property*, not the attribute.
		// The JSX prop sets both here, and this line guarantees the property
		// before the first play() call.
		el.muted = true;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// play() rejects when the policy or the decoder says no. The
				// poster stays on screen, so there is nothing to repair.
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
