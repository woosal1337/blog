"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const DELAYS = [0, 50, 200, 400] as const;

type RevealProps = {
	children: React.ReactNode;

	delay?: 0 | 1 | 2 | 3;
	className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [shown, setShown] = React.useState(false);

	React.useEffect(() => {
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
	}, []);

	return (
		<div
			ref={ref}
			className={cn(shown ? "reveal-play" : "reveal-hidden", className)}
			style={{ animationDelay: `${DELAYS[delay]}ms` }}
		>
			{children}
		</div>
	);
}
