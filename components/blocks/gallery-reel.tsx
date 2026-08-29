import Link from "next/link";
import type * as React from "react";

const SPAN = 680;

const A = {
	y: 16,
	h: 64,
	pitch: 136,
	frameW: 112,
	frameX: 12,
	frameY: 29,
	frameH: 38,
};
const B = {
	y: 92,
	h: 44,
	pitch: 68,
	frameW: 54,
	frameX: 7,
	frameY: 101,
	frameH: 20,
};

const A_COUNT = SPAN / A.pitch;
const B_COUNT = SPAN / B.pitch;
const SPROCKET_PITCH = 34;
const SPROCKET_COUNT = SPAN / SPROCKET_PITCH;

function range(n: number): number[] {
	return Array.from({ length: n }, (_, i) => i);
}

function Perforations({
	y,
	w,
	h,
	rx,
}: { y: number; w: number; h: number; rx: number }) {
	return (
		<>
			{range(SPROCKET_COUNT).map((i) => (
				<rect
					key={i}
					x={i * SPROCKET_PITCH + (SPROCKET_PITCH - w) / 2}
					y={y}
					width={w}
					height={h}
					rx={rx}
					fill="currentColor"
					opacity="0.38"
				/>
			))}
		</>
	);
}

function FrameArt({
	k,
	x,
	y,
	w,
	h,
}: { k: number; x: number; y: number; w: number; h: number }) {
	const cx = x + w / 2;
	const cy = y + h / 2;

	switch (k % 5) {
		case 0:
			return (
				<g opacity="0.62">
					<circle
						cx={x + w * 0.66}
						cy={y + h * 0.38}
						r={h * 0.16}
						fill="currentColor"
					/>
					<line
						x1={x + 8}
						y1={y + h * 0.68}
						x2={x + w - 8}
						y2={y + h * 0.68}
						stroke="currentColor"
						strokeWidth="1.2"
					/>
				</g>
			);
		case 1:
			return (
				<g opacity="0.62" fill="none" stroke="currentColor" strokeWidth="1.2">
					<path
						d={`M${x + 6} ${y + h - 8}L${x + w * 0.28} ${y + h * 0.3}L${x + w * 0.5} ${y + h - 8}`}
					/>
					<path
						d={`M${x + w * 0.48} ${y + h - 8}L${x + w * 0.7} ${y + h * 0.48}L${x + w - 6} ${y + h - 8}`}
					/>
				</g>
			);
		case 2:
			return (
				<g opacity="0.62" fill="none" stroke="currentColor" strokeWidth="1.2">
					<circle cx={cx} cy={y + h * 0.36} r={h * 0.17} />
					<path
						d={`M${cx - h * 0.34} ${y + h - 6}a${h * 0.34} ${h * 0.3} 0 0 1 ${h * 0.68} 0`}
					/>
				</g>
			);
		case 3:
			return (
				<g opacity="0.52">
					{[0.3, 0.45, 0.6, 0.75].map((t, i) => (
						<line
							key={t}
							x1={x + 8}
							y1={y + h * t}
							x2={x + w - 8 - i * w * 0.14}
							y2={y + h * t}
							stroke="currentColor"
							strokeWidth="1.1"
						/>
					))}
				</g>
			);
		default:
			return (
				<g opacity="0.52">
					{range(4).map((r) =>
						range(7).map((c) => (
							<circle
								key={`${r}-${c}`}
								cx={x + 12 + c * ((w - 24) / 6)}
								cy={y + 9 + r * ((h - 18) / 3)}
								r="1.1"
								fill="currentColor"
							/>
						)),
					)}
					<circle cx={cx} cy={cy} r="1.1" fill="currentColor" />
				</g>
			);
	}
}

function Strip({
	cfg,
	count,
	small,
	offset,
}: {
	cfg: typeof A;
	count: number;
	small: boolean;
	offset: number;
}) {
	const holeH = small ? 4 : 6;
	const holeW = small ? 6 : 8;

	return (
		<g transform={`translate(${offset} 0)`}>
			<line
				x1="0"
				y1={cfg.y}
				x2={SPAN}
				y2={cfg.y}
				stroke="currentColor"
				strokeWidth="1"
				opacity="0.32"
			/>
			<line
				x1="0"
				y1={cfg.y + cfg.h}
				x2={SPAN}
				y2={cfg.y + cfg.h}
				stroke="currentColor"
				strokeWidth="1"
				opacity="0.32"
			/>
			<Perforations y={cfg.y + 3} w={holeW} h={holeH} rx={small ? 1.2 : 2} />
			<Perforations
				y={cfg.y + cfg.h - 3 - holeH}
				w={holeW}
				h={holeH}
				rx={small ? 1.2 : 2}
			/>
			{range(count).map((k) => {
				const x = k * cfg.pitch + cfg.frameX;
				return (
					<g key={k}>
						<rect
							x={x}
							y={cfg.frameY}
							width={cfg.frameW}
							height={cfg.frameH}
							rx="2"
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							opacity="0.58"
						/>
						{!small && (
							<FrameArt
								k={k}
								x={x}
								y={cfg.frameY}
								w={cfg.frameW}
								h={cfg.frameH}
							/>
						)}
					</g>
				);
			})}
		</g>
	);
}

export function ReelField({ className }: { className?: string }) {
	const fade =
		"linear-gradient(to right, transparent, black 72px, black calc(100% - 72px), transparent)";

	return (
		<svg
			viewBox={`0 0 ${SPAN} 150`}
			preserveAspectRatio="xMidYMid slice"
			className={`absolute inset-0 h-full w-full text-ink-mute transition-colors duration-400 ease-house group-hover:text-ink-soft ${className ?? ""}`}
			style={{ maskImage: fade, WebkitMaskImage: fade } as React.CSSProperties}
			aria-hidden="true"
		>
			<g className="reel-a group-hover:[animation-play-state:paused]">
				{[0, SPAN].map((offset) => (
					<Strip
						key={offset}
						cfg={A}
						count={A_COUNT}
						small={false}
						offset={offset}
					/>
				))}
			</g>
			<g
				className="reel-b group-hover:[animation-play-state:paused]"
				opacity="0.55"
			>
				{[0, SPAN].map((offset) => (
					<Strip key={offset} cfg={B} count={B_COUNT} small offset={offset} />
				))}
			</g>
		</svg>
	);
}

export function GalleryReel({ className }: { className?: string }) {
	return (
		<Link
			href="/gallery"
			aria-label="Gallery, photographs, clips and made images"
			className={className}
		>
			<div className="group flex h-full flex-col rounded-[16px] border border-line bg-[#060606] p-1 transition-colors duration-200 ease-house hover:border-line-strong">
				<div className="relative h-[150px] overflow-hidden rounded-[12px] bg-[#060606]">
					<ReelField />
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#060606]"
						aria-hidden="true"
					/>
				</div>
				<div className="px-3.5 pb-3 pt-3.5">
					<p className="font-ui text-[15px] font-medium text-ink">Gallery</p>
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						Photographs, clips and made images, one set at a time.
					</p>
				</div>
			</div>
		</Link>
	);
}
