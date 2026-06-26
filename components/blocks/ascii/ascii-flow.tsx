"use client";

import * as React from "react";
import { AsciiFrame } from "./ascii-frame";
import { rgba, themeRgb, useCanvasAnimation } from "./use-canvas-animation";

const FONT = "var(--font-geist-mono, ui-monospace, monospace)";
const RAMP = " .:-=+*#%@";

function hash2(ix: number, iy: number): number {
	let h = (ix * 374761393 + iy * 668265263) | 0;
	h = (h ^ (h >>> 13)) * 1274126177;
	return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

function valueNoise(x: number, y: number): number {
	const ix = Math.floor(x);
	const iy = Math.floor(y);
	const fx = smooth(x - ix);
	const fy = smooth(y - iy);
	const a = hash2(ix, iy);
	const b = hash2(ix + 1, iy);
	const c = hash2(ix, iy + 1);
	const d = hash2(ix + 1, iy + 1);
	const top = a + (b - a) * fx;
	const bot = c + (d - c) * fx;
	return top + (bot - top) * fy;
}

type AsciiFlowProps = React.HTMLAttributes<HTMLDivElement> & {
	label?: string;
	cell?: number;
	threshold?: number;
};

/** A dense glyph flow field with drifting negative-space voids that deform
 * around the cursor. Ported from soft-club-ui, retuned monochrome. */
export function AsciiFlow({
	label,
	cell = 10,
	threshold = 0.42,
	className,
	...props
}: AsciiFlowProps) {
	const hostRef = React.useRef<HTMLDivElement | null>(null);
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

	useCanvasAnimation(
		canvasRef,
		hostRef,
		({ ctx, height, pointer, time, width }) => {
			const dim = themeRgb(hostRef.current, "--ink-mute", [120, 120, 120]);
			const bright = themeRgb(hostRef.current, "--ink", [245, 245, 245]);
			const cellH = cell * 1.15;
			const cols = Math.floor(width / cell);
			const rows = Math.floor(height / cellH);
			const t = time;

			ctx.clearRect(0, 0, width, height);
			ctx.font = `${cell}px ${FONT}`;
			ctx.textBaseline = "top";

			for (let row = 0; row < rows; row += 1) {
				const py = row * cellH;
				for (let col = 0; col < cols; col += 1) {
					const px = col * cell;
					const n1 = valueNoise(col * 0.12 + t * 0.15, row * 0.14 - t * 0.1);
					const n2 = valueNoise(col * 0.045 - t * 0.06, row * 0.05 + t * 0.08);
					let v01 = n1 * 0.65 + n2 * 0.35;

					if (pointer.inside) {
						const dx = px - pointer.x;
						const dy = py - pointer.y;
						const d2 = dx * dx + dy * dy;
						const radius = 90;
						v01 += Math.exp(-d2 / (radius * radius)) * 0.55;
					}
					v01 = v01 < 0 ? 0 : v01 > 1 ? 1 : v01;

					if (v01 <= threshold) continue;

					const k = (v01 - threshold) / (1 - threshold);
					const ci = Math.min(RAMP.length - 1, Math.floor(k * RAMP.length));
					const char = RAMP[ci] ?? "@";
					const r = dim[0] + (bright[0] - dim[0]) * k;
					const g = dim[1] + (bright[1] - dim[1]) * k;
					const b = dim[2] + (bright[2] - dim[2]) * k;
					ctx.fillStyle = rgba([r, g, b], 0.4 + k * 0.55);
					ctx.fillText(char, px, py);
				}
			}
		},
		{ fps: 30, reactive: true },
	);

	return (
		<AsciiFrame
			hostRef={hostRef}
			canvasRef={canvasRef}
			label={label}
			className={className}
			{...props}
		/>
	);
}
