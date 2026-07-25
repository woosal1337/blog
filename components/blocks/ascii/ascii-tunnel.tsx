"use client";

import * as React from "react";
import { AsciiFrame } from "./ascii-frame";
import {
	type Rgb,
	rgba,
	themeRgb,
	useCanvasAnimation,
} from "./use-canvas-animation";

const FONT = "var(--font-geist-mono, ui-monospace, monospace)";
const RAMP = " .:-=+*#%@";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (c1: Rgb, c2: Rgb, t: number): Rgb => [
	lerp(c1[0], c2[0], t),
	lerp(c1[1], c2[1], t),
	lerp(c1[2], c2[2], t),
];

type AsciiTunnelProps = React.HTMLAttributes<HTMLDivElement> & {
	label?: string;
	cell?: number;
	speed?: number;
	twist?: number;
};

export function AsciiTunnel({
	label,
	cell = 11,
	speed = 1,
	twist = 8,
	className,
	...props
}: AsciiTunnelProps) {
	const hostRef = React.useRef<HTMLDivElement | null>(null);
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	const state = React.useRef({ ccol: 0, crow: 0, w: 0, h: 0, seeded: false });

	useCanvasAnimation(
		canvasRef,
		hostRef,
		({ ctx, height, pointer, time, width }) => {
			const st = state.current;
			const cellH = cell * 1.15;
			const cols = Math.max(1, Math.floor(width / cell));
			const rows = Math.max(1, Math.floor(height / cellH));

			if (!st.seeded || st.w !== width || st.h !== height) {
				st.w = width;
				st.h = height;
				st.seeded = true;
				st.ccol = cols / 2;
				st.crow = rows / 2;
			}

			const targetCol = pointer.inside ? pointer.x / cell : cols / 2;
			const targetRow = pointer.inside ? pointer.y / cellH : rows / 2;
			st.ccol += (targetCol - st.ccol) * 0.08;
			st.crow += (targetRow - st.crow) * 0.08;

			const dim = themeRgb(hostRef.current, "--ink-mute", [120, 120, 120]);
			const mid = themeRgb(hostRef.current, "--ink-soft", [160, 160, 160]);
			const bright = themeRgb(hostRef.current, "--ink", [245, 245, 245]);

			const t = time * 0.5 * speed;
			const halfW = width * 0.5;
			const halfH = height * 0.5;
			const cx0 = st.ccol * cell;
			const cy0 = st.crow * cellH;

			ctx.clearRect(0, 0, width, height);
			ctx.font = `${cell}px ${FONT}`;
			ctx.textBaseline = "top";

			const rampMax = RAMP.length - 1;

			for (let row = 0; row < rows; row += 1) {
				const py = row * cellH + cellH * 0.5;
				const ny = (py - cy0) / halfH;
				for (let col = 0; col < cols; col += 1) {
					const px = col * cell + cell * 0.5;
					const nx = (px - cx0) / halfW;
					const radius = Math.hypot(nx, ny) + 1e-3;
					const angle = Math.atan2(ny, nx);

					const depth = 0.7 / radius + t;
					const rings = 0.5 + 0.5 * Math.sin(depth * Math.PI * 2);
					const spokes = 0.65 + 0.35 * Math.sin(angle * twist - t * 2);
					const edge = Math.max(0, Math.min(1, 1.35 - radius));
					const core = Math.exp(-radius * radius * 7);
					const value = rings * spokes * edge + core * 0.6;
					const v01 = value < 0 ? 0 : value > 1 ? 1 : value;

					const ch =
						RAMP[Math.min(rampMax, Math.floor(v01 * RAMP.length))] ?? " ";
					if (ch === " ") continue;

					const tone =
						v01 < 0.5
							? mix(dim, mid, v01 * 2)
							: mix(mid, bright, (v01 - 0.5) * 2);
					ctx.fillStyle = rgba(tone, 0.35 + v01 * 0.6);
					ctx.fillText(ch, col * cell, row * cellH);
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
