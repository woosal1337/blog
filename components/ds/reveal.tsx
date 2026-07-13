"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const DELAYS = [0, 50, 200, 400] as const;

type RevealProps = {
	children: React.ReactNode;

	delay?: 0 | 1 | 2 | 3;
	immediate?: boolean;
	className?: string;
};

export function Reveal({
	children,
	delay = 0,
	immediate = false,
	className,
}: RevealProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [shown, setShown] = React.useState(immediate);

	React.useEffect(() => {
		if (immediate) return;
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(true);
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShown(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px 0px -10% 0px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [immediate]);

	return (
		<div
			ref={ref}
			className={cn(
				!immediate && (shown ? "reveal-play" : "reveal-hidden"),
				className,
			)}
			style={immediate ? undefined : { animationDelay: `${DELAYS[delay]}ms` }}
		>
			{children}
		</div>
	);
}
