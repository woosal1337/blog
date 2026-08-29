"use client";

import { BIO_TERMS, type BioLogo } from "@/data/bio";
import { cn } from "@/lib/utils";
import * as React from "react";

const SCATTER = [
	{ x: -58, y: -84, r: -7 },
	{ x: 56, y: -74, r: 6 },
	{ x: -6, y: -114, r: -3 },
	{ x: 100, y: -100, r: 8 },
	{ x: -104, y: -72, r: 5 },
	{ x: 24, y: -70, r: -9 },
];

const BioContext = React.createContext<{
	active: string | null;
	setActive: (id: string | null) => void;
}>({ active: null, setActive: () => {} });

function faviconFor(href: string): string | undefined {
	try {
		const host = new URL(href).hostname.replace(/^www\./, "");
		return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
	} catch {
		return undefined;
	}
}

function Mark({
	logo,
	index,
	open,
}: { logo: BioLogo; index: number; open: boolean }) {
	const spot = SCATTER[index % SCATTER.length];
	const src = logo.iconSrc ?? (logo.href ? faviconFor(logo.href) : undefined);

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
					className={cn(
						"flex flex-col items-center gap-1.5",
						logo.glyph ? "w-11" : "w-[92px]",
					)}
					style={{ rotate: `${spot.r}deg` }}
				>
					<span className="grid size-11 place-items-center rounded-[10px] bg-white">
						{logo.glyph ? (
							<span className="text-[26px] leading-none">{logo.glyph}</span>
						) : src ? (
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
					<span
						className={cn(
							logo.glyph
								? "sr-only"
								: "text-center font-ui text-[11px] leading-tight text-ink",
						)}
					>
						{logo.name}
					</span>
				</span>
			</span>
		</span>
	);
}

export function BioTerm({
	id,
	children,
}: { id: string; children: React.ReactNode }) {
	const { active, setActive } = React.useContext(BioContext);
	const term = BIO_TERMS[id];
	const open = active === id;

	if (!term) return <>{children}</>;

	return (
		<span
			className="relative inline-block"
			onPointerEnter={(e) => {
				if (e.pointerType !== "touch") setActive(id);
			}}
			onPointerLeave={(e) => {
				if (e.pointerType !== "touch") setActive(null);
			}}
		>
			<button
				type="button"
				onFocus={() => setActive(id)}
				onBlur={() => setActive(null)}
				onClick={() => setActive(open ? null : id)}
				aria-expanded={open}
				className={cn(
					"cursor-default underline decoration-dotted decoration-from-font underline-offset-[5px] transition-colors duration-300 ease-house",
					open ? "text-ink decoration-ink-mute" : "decoration-line",
				)}
			>
				{children}
			</button>

			<span
				aria-hidden={!open}
				className="pointer-events-none absolute inset-x-0 top-0 z-10 block"
			>
				{term.map((logo, index) => (
					<Mark key={logo.name} logo={logo} index={index} open={open} />
				))}
			</span>
		</span>
	);
}

export function BioProse({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	const [active, setActive] = React.useState<string | null>(null);
	const value = React.useMemo(() => ({ active, setActive }), [active]);

	return (
		<BioContext.Provider value={value}>
			<div
				className={cn(
					"relative transition-colors duration-400 ease-house",
					active ? "z-30 text-ink-mute/40" : "text-ink-soft",
					className,
				)}
			>
				<div
					aria-hidden="true"
					className="bio-scrim pointer-events-none fixed inset-0 -z-10 transition-opacity duration-400 ease-house"
					style={{ opacity: active ? 1 : 0 }}
				/>
				{children}
			</div>
		</BioContext.Provider>
	);
}
