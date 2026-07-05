"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ATLAS: All-round Testing of Long-context Abilities across Scales
 * (arXiv 2605.28079, May 2026). ATLAScore composite per model, scored over
 * 8K–128K contexts and re-scored with the scope stretched to 1M tokens.
 * Sorted by the 128K-scope score.
 */
const MODELS = [
	{ name: "Gemini 3.1 Pro", at128k: 77.83, at1m: 68.52 },
	{ name: "Claude Opus 4.6", at128k: 77.1, at1m: 70.55 },
	{ name: "GPT-5.5", at128k: 74.63, at1m: 67.77 },
	{ name: "GPT-5.2", at128k: 73.71, at1m: 58.2 },
	{ name: "GPT-5.4", at128k: 73.44, at1m: 63.23 },
	{ name: "Gemini 3 Flash", at128k: 71.96, at1m: 63.13 },
	{ name: "DeepSeek V4 Pro", at128k: 71.56, at1m: 59.11 },
];

// Two-slot categorical pair validated against the page surface #101010
// (all checks pass, worst CVD pair ΔE 69.8).
const C_128K = "#3987e5";
const C_1M = "#199e70";

const X_MIN = 55;
const X_MAX = 80;
const TICKS = [55, 60, 65, 70, 75, 80];

/**
 * Compact mode drops the left name column (names move above each row) and
 * narrows the viewBox so labels render at full size instead of scaled. The
 * 480-unit plot slightly overflows phones behind a horizontal scroll, buying
 * breathing room between the columns.
 */
function useCompact() {
	const [compact, setCompact] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 640px)");
		const update = () => setCompact(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return compact;
}

export function ContextRotChart() {
	const compact = useCompact();
	const [row, setRow] = useState<number | null>(null);
	const svgRef = useRef<SVGSVGElement>(null);

	const W = compact ? 480 : 680;
	const PLOT_L = compact ? 10 : 164;
	const PLOT_R = compact ? W - 50 : 640;
	const ROW_H = compact ? 52 : 36;
	const PLOT_T = compact ? 4 : 8;
	const PLOT_B = PLOT_T + MODELS.length * ROW_H;
	const H = PLOT_B + 30;
	const DOT_Y = compact ? 36 : ROW_H / 2;

	const xAt = (v: number) =>
		PLOT_L + ((v - X_MIN) / (X_MAX - X_MIN)) * (PLOT_R - PLOT_L);
	const rowY = (i: number) => PLOT_T + i * ROW_H + DOT_Y;

	const onPointerMove = useCallback(
		(e: React.PointerEvent) => {
			const svg = svgRef.current;
			if (!svg) return;
			const rect = svg.getBoundingClientRect();
			const y = ((e.clientY - rect.top) / rect.height) * H;
			const i = Math.floor((y - PLOT_T) / ROW_H);
			setRow(i >= 0 && i < MODELS.length ? i : null);
		},
		[H, PLOT_T, ROW_H],
	);

	const onKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setRow((v) => Math.min(MODELS.length - 1, (v ?? -1) + 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setRow((v) => Math.max(0, (v ?? MODELS.length) - 1));
		} else if (e.key === "Escape") {
			setRow(null);
		}
	}, []);

	// Keep the tooltip inside the card horizontally on narrow screens.
	const tooltipX =
		row === null
			? 0
			: Math.min(Math.max(xAt(MODELS[row].at1m), W * 0.22), W * 0.78);

	return (
		<figure className="not-prose my-7">
			<div className="rounded-[14px] border border-line bg-transparent p-5 sm:p-6">
				<p className="font-ui text-[15px] font-medium text-ink">
					The 2026 frontier pays the same tax
				</p>
				<p className="mt-1 font-ui text-[13px] leading-snug text-ink-mute">
					ATLAS composite score per model: the same tasks scored over contexts
					up to 128K tokens, then re-scored with the scope stretched to 1M.
				</p>

				<div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
					<span className="flex items-center gap-2">
						<span
							className="inline-block size-2.5 rounded-full"
							style={{ backgroundColor: C_128K }}
						/>
						<span className="font-ui text-[12px] text-ink-soft">
							8K–128K window
						</span>
					</span>
					<span className="flex items-center gap-2">
						<span
							className="inline-block size-2.5 rounded-full"
							style={{ backgroundColor: C_1M }}
						/>
						<span className="font-ui text-[12px] text-ink-soft">
							stretched to 1M
						</span>
					</span>
				</div>

				<div className="mt-3 overflow-x-auto">
					<div className="relative min-w-[480px]">
						<svg
							ref={svgRef}
							viewBox={`0 0 ${W} ${H}`}
							className="block w-full outline-none"
							tabIndex={0}
							role="img"
							aria-label="Dumbbell chart of ATLAS scores for seven frontier models. Every model scores lower when the context scope stretches from 128K to 1M tokens. Claude Opus 4.6 drops least, from 77.1 to 70.6. GPT-5.2 drops most, from 73.7 to 58.2. Arrow keys move the readout. Full values are in the table below."
							onPointerMove={onPointerMove}
							onPointerLeave={() => setRow(null)}
							onKeyDown={onKeyDown}
							onBlur={() => setRow(null)}
						>
							{/* vertical gridlines + x ticks */}
							{TICKS.map((v) => (
								<g key={v} className="text-line">
									<line
										x1={xAt(v)}
										x2={xAt(v)}
										y1={PLOT_T}
										y2={PLOT_B}
										stroke="currentColor"
										strokeOpacity={0.4}
										strokeWidth="1"
									/>
									<text
										x={xAt(v)}
										y={PLOT_B + 18}
										textAnchor="middle"
										className="fill-ink-mute font-ui text-[11px] tabular-nums"
									>
										{v}
									</text>
								</g>
							))}

							{/* rows */}
							{MODELS.map((m, i) => {
								const y = rowY(i);
								const delta = m.at1m - m.at128k;
								return (
									<g
										key={m.name}
										opacity={row === null || row === i ? 1 : 0.45}
									>
										{row === i && (
											<rect
												x={0}
												y={PLOT_T + i * ROW_H}
												width={W}
												height={ROW_H}
												fill="rgb(255 255 255 / 0.02)"
											/>
										)}
										{compact ? (
											<text
												x={PLOT_L}
												y={PLOT_T + i * ROW_H + 16}
												className="fill-ink-soft font-ui text-[12px]"
											>
												{m.name}
											</text>
										) : (
											<text
												x={PLOT_L - 14}
												y={y + 4}
												textAnchor="end"
												className="fill-ink-soft font-ui text-[12px]"
											>
												{m.name}
											</text>
										)}
										<line
											x1={xAt(m.at1m)}
											x2={xAt(m.at128k)}
											y1={y}
											y2={y}
											stroke="currentColor"
											strokeWidth="1.5"
											className="text-line-strong"
										/>
										<circle
											cx={xAt(m.at1m)}
											cy={y}
											r="5"
											fill={C_1M}
											strokeWidth="2"
											className="stroke-paper"
										/>
										<circle
											cx={xAt(m.at128k)}
											cy={y}
											r="5"
											fill={C_128K}
											strokeWidth="2"
											className="stroke-paper"
										/>
										<text
											x={xAt(m.at128k) + 12}
											y={y + 4}
											className="fill-ink-mute font-ui text-[11px] tabular-nums"
										>
											{delta.toFixed(1)}
										</text>
									</g>
								);
							})}
						</svg>

						{/* tooltip */}
						{row !== null && (
							<div
								className="pointer-events-none absolute z-10 rounded-[10px] border border-line bg-paper px-3 py-2"
								style={{
									left: `${(tooltipX / W) * 100}%`,
									// The top rows have no room above them, so flip below.
									top: `${((rowY(row) + (row < 3 ? 10 : -10)) / H) * 100}%`,
									transform:
										row < 3
											? "translate(-50%, 6px)"
											: "translate(-50%, calc(-100% - 6px))",
								}}
							>
								<p className="whitespace-nowrap font-ui text-[11px] text-ink-mute">
									{MODELS[row].name}
								</p>
								<div className="mt-1.5 flex flex-col gap-1">
									<p className="flex items-center gap-2 whitespace-nowrap font-ui text-[12px]">
										<span
											className="inline-block size-2 rounded-full"
											style={{ backgroundColor: C_128K }}
										/>
										<span className="font-medium tabular-nums text-ink">
											{MODELS[row].at128k.toFixed(1)}
										</span>
										<span className="text-ink-mute">8K–128K</span>
									</p>
									<p className="flex items-center gap-2 whitespace-nowrap font-ui text-[12px]">
										<span
											className="inline-block size-2 rounded-full"
											style={{ backgroundColor: C_1M }}
										/>
										<span className="font-medium tabular-nums text-ink">
											{MODELS[row].at1m.toFixed(1)}
										</span>
										<span className="text-ink-mute">stretched to 1M</span>
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				<details className="mt-4 border-t border-line pt-3">
					<summary className="cursor-pointer font-ui text-[12px] text-ink-mute transition-colors duration-200 ease-house hover:text-ink-soft">
						View as table
					</summary>
					<table className="mt-3 w-full font-ui text-[12px]">
						<thead>
							<tr className="border-b border-line text-left text-ink-mute">
								<th className="py-1.5 pr-3 font-normal">Model</th>
								<th className="py-1.5 pr-3 text-right font-normal">8K–128K</th>
								<th className="py-1.5 pr-3 text-right font-normal">8K–1M</th>
								<th className="py-1.5 pr-3 text-right font-normal">Change</th>
							</tr>
						</thead>
						<tbody>
							{MODELS.map((m) => (
								<tr key={m.name} className="border-b border-line/50">
									<td className="py-1.5 pr-3 text-ink-soft">{m.name}</td>
									<td className="py-1.5 pr-3 text-right tabular-nums text-ink">
										{m.at128k.toFixed(2)}
									</td>
									<td className="py-1.5 pr-3 text-right tabular-nums text-ink">
										{m.at1m.toFixed(2)}
									</td>
									<td className="py-1.5 pr-3 text-right tabular-nums text-ink">
										{(m.at1m - m.at128k).toFixed(2)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</details>
			</div>
			<figcaption className="mt-3 text-center font-ui text-[13px] leading-snug text-ink-mute">
				Data:{" "}
				<a
					href="https://arxiv.org/abs/2605.28079"
					target="_blank"
					rel="noopener noreferrer"
					className="underline decoration-line underline-offset-[3px] transition-colors duration-200 ease-house hover:decoration-ink-soft"
				>
					ATLAS: All-round Testing of Long-context Abilities across Scales
				</a>
				, May 2026. Composite of eight capability dimensions, ±1.5-point
				confidence intervals. The newest mid-2026 releases, Claude Fable 5 among
				them, have not yet published comparable long-context sweeps.
			</figcaption>
		</figure>
	);
}
