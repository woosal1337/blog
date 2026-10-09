"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export type LabChip = {
	name: string;
	href: string;
};

const PAIR = [
	{ x: -52, y: -84, r: -6 },
	{ x: 52, y: -74, r: 5 },
];
const SINGLE = [{ x: 0, y: -78, r: -3 }];

function faviconFor(href: string): string | undefined {
	try {
		const host = new URL(href).hostname.replace(/^www\./, "");
		return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
	} catch {
		return undefined;
	}
}

function Mark({
	chip,
	index,
	open,
	spot,
}: {
	chip: LabChip;
	index: number;
	open: boolean;
	spot: { x: number; y: number; r: number };
}) {
	const src = faviconFor(chip.href);

	return (
		<span
			className="absolute left-1/2 top-0 block"
			style={{
				transform: open
					? `translate(calc(-50% + ${spot.x}px), ${spot.y}px) scale(1)`
					: "translate(-50%, 0) scale(0.2)",
				opacity: open ? 1 : 0,
				transition:
					"transform 420ms var(--ease-house), opacity 260ms var(--ease-house)",
				transitionDelay: `${index * 40}ms`,
			}}
		>
			<span
				className="bio-float block"
				style={{
					animationDelay: `${index * -1.4}s`,
					animationDuration: `${7 + index}s`,
				}}
			>
				<span
					className="flex w-[92px] flex-col items-center gap-1.5"
					style={{ rotate: `${spot.r}deg` }}
				>
					<span className="grid size-11 place-items-center rounded-[10px] bg-white">
						{src ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={src}
								alt=""
								width={26}
								height={26}
								loading="lazy"
								className="size-[26px]"
							/>
						) : null}
					</span>
					<span className="text-center font-ui text-[11px] leading-tight text-ink">
						{chip.name}
					</span>
				</span>
			</span>
		</span>
	);
}

export function LabChipRow({
	name,
	desc,
	chips,
	className,
	children,
}: {
	name: string;
	desc?: string;
	chips: LabChip[];
	className: string;
	children: React.ReactNode;
}) {
	const [open, setOpen] = React.useState(false);
	const spots = chips.length === 1 ? SINGLE : PAIR;

	return (
		<div className={cn(className, "relative", open && "z-30")}>
			<div
				aria-hidden="true"
				className="bio-scrim pointer-events-none fixed inset-0 -z-10 transition-opacity duration-400 ease-house"
				style={{ opacity: open ? 1 : 0 }}
			/>
			<div className="min-w-0 flex-1">
				<p className="font-ui text-[15px] font-medium text-ink">
					<span
						className="relative inline-block"
						onPointerEnter={(event) => {
							if (event.pointerType !== "touch") setOpen(true);
						}}
						onPointerLeave={(event) => {
							if (event.pointerType !== "touch") setOpen(false);
						}}
					>
						<button
							type="button"
							onFocus={() => setOpen(true)}
							onBlur={() => setOpen(false)}
							onClick={() => setOpen((value) => !value)}
							aria-expanded={open}
							className={cn(
								"cursor-default underline decoration-dotted decoration-from-font underline-offset-[5px] transition-colors duration-300 ease-house",
								open ? "decoration-ink-mute" : "decoration-line",
							)}
						>
							{name}
						</button>
						<span
							aria-hidden={!open}
							className="pointer-events-none absolute inset-x-0 top-0 z-10 block"
						>
							{chips.map((chip, index) => (
								<Mark
									key={chip.name}
									chip={chip}
									index={index}
									open={open}
									spot={spots[index] ?? PAIR[index % PAIR.length]}
								/>
							))}
						</span>
					</span>
				</p>
				{desc && (
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						{desc}
					</p>
				)}
			</div>
			{children}
		</div>
	);
}
