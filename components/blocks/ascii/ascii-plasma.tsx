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

type AsciiPlasmaProps = React.HTMLAttributes<HTMLDivElement> & {
	label?: string;
	cell?: number;
	speed?: number;
};

/** Classic plasma interference rendered as a glyph density field; bulges toward
 * the cursor. Ported from soft-club-ui, retuned to a grey ramp. */
export function AsciiPlasma({
	label,
	cell = 11,
	speed = 1,
	className,
	...props
}: AsciiPlasmaProps) {
	const hostRef = React.useRef<HTMLDivElement | null>(null);
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

	useCanvasAnimation(
		canvasRef,
		hostRef,
		({ ctx, height, pointer, time, width }) => {
			const dim = themeRgb(hostRef.current, "--ink-mute", [120, 120, 120]);
			const mid = themeRgb(hostRef.current, "--ink-soft", [160, 160, 160]);
			const bright = themeRgb(hostRef.current, "--ink", [245, 245, 245]);

			const cellH = cell * 1.15;
			const cols = Math.floor(width / cell);
			const rows = Math.floor(height / cellH);
			const cx0 = width / 2;
			const cy0 = height / 2;
			const t = time * speed;

			ctx.clearRect(0, 0, width, height);
			ctx.font = `${cell}px ${FONT}`;
			ctx.textBaseline = "top";

			const rampMax = RAMP.length - 1;

			for (let row = 0; row < rows; row += 1) {
				const y = row * cellH;
				for (let col = 0; col < cols; col += 1) {
					const x = col * cell;

					let value =
						Math.sin(x * 0.04 + t) +
						Math.sin(y * 0.05 - t * 0.8) +
						Math.sin((x + y) * 0.03 + t * 1.3) +
						Math.sin(Math.hypot(x - cx0, y - cy0) * 0.05 - t * 1.5);

					if (pointer.inside) {
						const pd = Math.hypot(x - pointer.x, y - pointer.y);
						value +=
							Math.sin(pd * 0.06 - t * 2.2) * Math.max(0, 1 - pd / 220) * 1.6;
					}

					const v01 = Math.min(1, Math.max(0, (value + 4) / 8));
					const ch = RAMP[Math.min(rampMax, Math.floor(v01 * rampMax))] ?? " ";
					if (ch === " ") continue;

					const tone =
						v01 < 0.5
							? mix(dim, mid, v01 * 2)
							: mix(mid, bright, (v01 - 0.5) * 2);
					ctx.fillStyle = rgba(tone, 0.35 + v01 * 0.6);
					ctx.fillText(ch, x, y);
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
