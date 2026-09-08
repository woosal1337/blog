"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef, useState } from "react";

export type ContourLogoTrigger = "load" | "visible";

type ContourLogoMotionProps = {
	children: ReactNode;
	className?: string;
	trigger: ContourLogoTrigger;
};

export function ContourLogoMotion({
	children,
	className,
	trigger,
}: ContourLogoMotionProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const [isDrawing, setIsDrawing] = useState(trigger === "load");

	useEffect(() => {
		if (trigger === "load") return;

		const element = ref.current;
		if (!element) return;

		if (
			window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
			!("IntersectionObserver" in window)
		) {
			setIsDrawing(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setIsDrawing(true);
				observer.disconnect();
			},
			{ threshold: 0.35 },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [trigger]);

	return (
		<span
			ref={ref}
			aria-hidden="true"
			className={cn("contour-logo-motion", className)}
			data-drawing={isDrawing ? "true" : "false"}
		>
			{children}
		</span>
	);
}
