"use client";

import * as React from "react";
import { AsciiFrame } from "./ascii-frame";
import { rgba, themeRgb, useCanvasAnimation } from "./use-canvas-animation";

const FONT = "var(--font-geist-mono, ui-monospace, monospace)";
const defaultGlyphs = "01<>/\\[]{}#*+=Σ░▒▓アカサタナソフ133G04";

type MatrixRainProps = React.HTMLAttributes<HTMLDivElement> & {
	glyphs?: string;
	label?: string;
};

/** Falling glyph rain, tinted to the oak palette. Ported from soft-club-ui. */
export function MatrixRain({
	glyphs = defaultGlyphs,
	label,
	className,
	...props
}: MatrixRainProps) {
	const hostRef = React.useRef<HTMLDivElement | null>(null);
	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
	const state = React.useRef({ cols: 0, drops: [] as number[] });

	useCanvasAnimation(
		canvasRef,
		hostRef,
		({ ctx, height, width }) => {
			const fontSize = 14;
			const cols = Math.max(1, Math.floor(width / fontSize));
			if (cols !== state.current.cols) {
				state.current.cols = cols;
				state.current.drops = Array.from(
					{ length: cols },
					() => Math.random() * -24,
				);
			}

			const dim = themeRgb(hostRef.current, "--ink-mute", [120, 120, 120]);
			const head = themeRgb(hostRef.current, "--ink", [245, 245, 245]);

			ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
			ctx.fillRect(0, 0, width, height);
			ctx.font = `${fontSize}px ${FONT}`;
			ctx.textBaseline = "top";

			const drops = state.current.drops;
			for (let i = 0; i < cols; i += 1) {
				const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				ctx.fillStyle = rgba(head, 0.92);
				ctx.fillText(glyph, x, y);
				ctx.fillStyle = rgba(dim, 0.5);
				ctx.fillText(
					glyphs[Math.floor(Math.random() * glyphs.length)],
					x,
					y - fontSize * 2,
				);

				if (y > height && Math.random() > 0.975) drops[i] = Math.random() * -12;
				drops[i] += 0.42;
			}
		},
		{ fps: 18 },
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
