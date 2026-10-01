"use client";

import {
	STUDY_DURATION,
	type ShapeStudy as ShapeStudyKind,
	shapeStudyLines,
	studyPhase,
} from "@/lib/shape-study";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ShapeStudyProps {
	study: ShapeStudyKind;
	className?: string;
}

export function ShapeStudy({ study, className }: ShapeStudyProps) {
	const hostRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const elapsedRef = useRef(0);

	useEffect(() => {
		const host = hostRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!host || !canvas || !ctx) return;

		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const ink = getComputedStyle(host).getPropertyValue("--ink-soft").trim();
		const color = `rgb(${ink || "160 160 160"})`;
		let width = 0;
		let height = 0;
		let inView = false;
		let frame = 0;
		let previousTime: number | null = null;
		let lastDraw = 0;

		const draw = () => {
			if (!width || !height) return;
			ctx.clearRect(0, 0, width, height);
			ctx.strokeStyle = color;
			ctx.lineWidth = width < 400 ? 0.65 : 0.75;
			ctx.lineJoin = "round";
			for (const line of shapeStudyLines(
				study,
				studyPhase(elapsedRef.current),
				width,
				height,
			)) {
				ctx.globalAlpha = line.opacity;
				ctx.beginPath();
				ctx.moveTo(line.points[0], line.points[1]);
				for (let i = 2; i < line.points.length; i += 2) {
					ctx.lineTo(line.points[i], line.points[i + 1]);
				}
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
		};

		const canAnimate = () => inView && !document.hidden && !media.matches;
		const tick = (timestamp: number) => {
			frame = 0;
			if (!canAnimate()) return;
			if (previousTime !== null) {
				elapsedRef.current =
					(elapsedRef.current +
						Math.min((timestamp - previousTime) / 1000, 0.1)) %
					STUDY_DURATION;
			}
			previousTime = timestamp;
			if (timestamp - lastDraw >= 1000 / 30) {
				draw();
				lastDraw = timestamp;
			}
			frame = requestAnimationFrame(tick);
		};
		const syncAnimation = () => {
			if (canAnimate()) {
				if (!frame) frame = requestAnimationFrame(tick);
			} else {
				cancelAnimationFrame(frame);
				frame = 0;
				previousTime = null;
			}
		};
		const resize = () => {
			const rect = host.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(1, Math.round(width * dpr));
			canvas.height = Math.max(1, Math.round(height * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			draw();
		};
		const onMotionChange = () => {
			syncAnimation();
			draw();
		};

		const resizeObserver = new ResizeObserver(resize);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			inView = entry.isIntersecting;
			syncAnimation();
		});
		resizeObserver.observe(host);
		intersectionObserver.observe(host);
		media.addEventListener("change", onMotionChange);
		document.addEventListener("visibilitychange", syncAnimation);
		onMotionChange();
		resize();

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			media.removeEventListener("change", onMotionChange);
			document.removeEventListener("visibilitychange", syncAnimation);
		};
	}, [study]);

	return (
		<div
			ref={hostRef}
			data-shape-study={study}
			className={cn("relative isolate", className)}
		>
			<canvas
				ref={canvasRef}
				aria-hidden="true"
				tabIndex={-1}
				className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
			/>
		</div>
	);
}
