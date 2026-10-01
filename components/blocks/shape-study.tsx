"use client";

import {
	STUDY_DURATION,
	STUDY_FPS,
	STUDY_PIXEL_RATIO,
	type ShapeStudy as ShapeStudyKind,
	batchStudyLines,
	shapeStudyLines,
	studyPhase,
	studySampleScale,
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
		const ctx = canvas?.getContext("2d", { alpha: false });
		if (!host || !canvas || !ctx) return;

		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const style = getComputedStyle(host);
		const ink = style.getPropertyValue("--ink-soft").trim();
		const paper = style.getPropertyValue("--paper").trim() || "16 16 16";
		const color = `rgb(${ink || "160 160 160"})`;
		const background = `rgb(${paper})`;
		let width = 0;
		let height = 0;
		let inView = false;
		let frame = 0;
		let previousTime: number | null = null;
		let lastDraw = 0;
		let fade: CanvasGradient;

		const draw = () => {
			if (!width || !height) return;
			ctx.globalAlpha = 1;
			ctx.fillStyle = background;
			ctx.fillRect(0, 0, width, height);
			ctx.strokeStyle = color;
			ctx.lineWidth = width < 400 ? 0.65 : 0.75;
			ctx.lineJoin = "round";
			const lines = shapeStudyLines(
				study,
				studyPhase(elapsedRef.current),
				width,
				height,
				studySampleScale(width),
			);
			const batches = batchStudyLines(lines);
			for (let i = 1; i < batches.length; i++) {
				if (!batches[i].length) continue;
				ctx.globalAlpha = i / 16;
				ctx.beginPath();
				for (const line of batches[i]) {
					ctx.moveTo(line.points[0], line.points[1]);
					for (let point = 2; point < line.points.length; point += 2) {
						ctx.lineTo(line.points[point], line.points[point + 1]);
					}
				}
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
			ctx.fillStyle = fade;
			ctx.fillRect(0, 0, width, height);
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
			const interval = 1000 / STUDY_FPS;
			if (timestamp - lastDraw >= interval) {
				draw();
				lastDraw = timestamp - ((timestamp - lastDraw) % interval);
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
			const dpr = Math.min(window.devicePixelRatio || 1, STUDY_PIXEL_RATIO);
			const pixelWidth = Math.max(1, Math.round(width * dpr));
			const pixelHeight = Math.max(1, Math.round(height * dpr));
			if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
			if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			fade = ctx.createLinearGradient(0, 0, width, 0);
			fade.addColorStop(0, background);
			fade.addColorStop(0.08, `rgb(${paper} / 0)`);
			fade.addColorStop(0.92, `rgb(${paper} / 0)`);
			fade.addColorStop(1, background);
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
		resize();
		onMotionChange();

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
				className="pointer-events-none absolute inset-0 h-full w-full"
			/>
		</div>
	);
}
