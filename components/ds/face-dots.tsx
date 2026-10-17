"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const GRID = 48;

const ease = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * Math.max(t, 0)));

type Dot = {
	x: number;
	y: number;
	alpha: number;
	phase: number;
	delay: number;
	fromX: number;
	fromY: number;
};

export function FaceDots({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) return;

		const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const size = canvas.clientWidth;
		const scale = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = canvas.height = Math.round(size * scale);
		context.scale(scale, scale);
		context.fillStyle = getComputedStyle(canvas).color;

		const cell = size / GRID;
		const radius = cell * 0.36;
		let dots: Dot[] = [];
		let start = 0;
		let frame = 0;
		let visible = true;

		const draw = (now: number) => {
			const t = (now - start) / 1000;
			context.clearRect(0, 0, size, size);
			for (const dot of dots) {
				const progress = still ? 1 : ease((t - dot.delay) / 1.2);
				if (progress <= 0) continue;
				const drift = still ? 0 : cell * 0.22;
				const x =
					dot.fromX +
					(dot.x - dot.fromX) * progress +
					Math.sin(t * 0.9 + dot.phase + dot.y * 0.19) * drift;
				const y =
					dot.fromY +
					(dot.y - dot.fromY) * progress +
					Math.cos(t * 0.75 + dot.phase + dot.x * 0.21) * drift;
				context.globalAlpha =
					dot.alpha *
					progress *
					(still ? 1 : 0.82 + 0.18 * Math.sin(t * 1.6 + dot.phase));
				context.beginPath();
				context.arc(x, y, radius, 0, Math.PI * 2);
				context.fill();
			}
			if (!still && visible) frame = requestAnimationFrame(draw);
		};

		const image = new Image();
		image.onload = () => {
			const sample = document.createElement("canvas");
			sample.width = sample.height = GRID;
			const sampleContext = sample.getContext("2d", {
				willReadFrequently: true,
			});
			if (!sampleContext) return;
			sampleContext.drawImage(image, 0, 0, GRID, GRID);
			const { data } = sampleContext.getImageData(0, 0, GRID, GRID);
			for (let row = 0; row < GRID; row++) {
				for (let column = 0; column < GRID; column++) {
					const alpha = data[(row * GRID + column) * 4 + 3] / 255;
					if (alpha < 0.04) continue;
					const x = (column + 0.5) * cell;
					const y = (row + 0.5) * cell;
					dots.push({
						x,
						y,
						alpha,
						phase: Math.random() * Math.PI * 2,
						delay: 0.3 + (row / GRID) * 0.6 + Math.random() * 0.3,
						fromX: x + (Math.random() - 0.5) * size * 0.2,
						fromY: y + (Math.random() - 0.5) * size * 0.2,
					});
				}
			}
			start = performance.now();
			frame = requestAnimationFrame(draw);
		};
		image.src = "/portrait/face.png";

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			cancelAnimationFrame(frame);
			if (visible && dots.length) frame = requestAnimationFrame(draw);
		});
		observer.observe(canvas);

		return () => {
			image.onload = null;
			dots = [];
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, []);

	return <canvas ref={ref} className={cn("block text-ink", className)} />;
}
