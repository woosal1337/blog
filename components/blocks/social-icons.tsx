"use client";

import { GithubIcon, InstagramIcon, XIcon } from "@/components/ds/icon-link";
import type { SocialFeed, SocialPlatform } from "@/data/social";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

const ORDER: SocialPlatform[] = ["x", "instagram", "github"];
const ICONS = { x: XIcon, instagram: InstagramIcon, github: GithubIcon };
const OFFSET_X = 18;
const OFFSET_Y = 22;
const MARGIN = 12;

export function SocialIcons({
	feeds,
}: {
	feeds: Record<SocialPlatform, SocialFeed>;
}) {
	const [enabled, setEnabled] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [platform, setPlatform] = React.useState<SocialPlatform>("x");
	const cardRef = React.useRef<HTMLDivElement>(null);
	const openRef = React.useRef(false);
	const raf = React.useRef(0);
	const target = React.useRef({ x: 0, y: 0 });
	const pos = React.useRef({ x: 0, y: 0 });
	const instant = React.useRef(false);

	React.useEffect(() => {
		setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
		instant.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		return () => cancelAnimationFrame(raf.current);
	}, []);

	function clamp(x: number, y: number) {
		const el = cardRef.current;
		const w = el?.offsetWidth ?? 300;
		const h = el?.offsetHeight ?? 240;
		let nx = x + OFFSET_X;
		let ny = y + OFFSET_Y;
		if (nx + w + MARGIN > window.innerWidth) nx = x - w - OFFSET_X;
		if (ny + h + MARGIN > window.innerHeight) ny = y - h - OFFSET_Y;
		return { x: Math.max(MARGIN, nx), y: Math.max(MARGIN, ny) };
	}

	function tick() {
		const el = cardRef.current;
		if (!el) return;
		const k = instant.current ? 1 : 0.16;
		pos.current.x += (target.current.x - pos.current.x) * k;
		pos.current.y += (target.current.y - pos.current.y) * k;
		el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
		if (openRef.current) raf.current = requestAnimationFrame(tick);
	}

	function showAt(next: SocialPlatform, x: number, y: number) {
		target.current = clamp(x, y);
		if (!openRef.current) pos.current = { ...target.current };
		openRef.current = true;
		setPlatform(next);
		setOpen(true);
		cancelAnimationFrame(raf.current);
		raf.current = requestAnimationFrame(tick);
	}

	function move(event: React.PointerEvent) {
		if (openRef.current) target.current = clamp(event.clientX, event.clientY);
	}

	function hide() {
		openRef.current = false;
		setOpen(false);
	}

	const feed = feeds[platform];
	const HeaderIcon = ICONS[platform];

	return (
		<>
			<span
				className="-mx-1 inline-flex items-center"
				onPointerMove={enabled ? move : undefined}
				onPointerLeave={enabled ? hide : undefined}
			>
				{ORDER.map((key) => {
					const ItemIcon = ICONS[key];
					const item = feeds[key];
					return (
						<a
							key={key}
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={item.label}
							onPointerEnter={
								enabled ? (e) => showAt(key, e.clientX, e.clientY) : undefined
							}
							onFocus={
								enabled
									? (e) => {
											const rect = e.currentTarget.getBoundingClientRect();
											showAt(key, rect.right, rect.bottom);
										}
									: undefined
							}
							onBlur={enabled ? hide : undefined}
							className="p-1 transition-opacity duration-200 ease-house hover:opacity-60"
						>
							<ItemIcon className="mr-0" />
						</a>
					);
				})}
			</span>
			{enabled && (
				<div
					ref={cardRef}
					aria-hidden="true"
					className="pointer-events-none fixed left-0 top-0 z-[80] w-[300px] will-change-transform"
				>
					<div
						className={cn(
							"overflow-hidden rounded-[14px] border border-line bg-[#0d0d0d]/95 backdrop-blur-[6px] transition-[opacity,transform] duration-200 ease-house [box-shadow:inset_0_1px_0_rgb(255_255_255/0.06)]",
							open
								? "translate-y-0 scale-100 opacity-100"
								: "translate-y-1 scale-[0.985] opacity-0",
						)}
					>
						<div className="flex items-center gap-2 border-b border-line/70 px-4 pb-2.5 pt-3">
							<HeaderIcon className="mr-0 h-[13px] w-[13px]" />
							<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
								{feed.label}
							</span>
							<span className="ml-auto font-mono text-[11px] text-ink-mute">
								{feed.handle}
							</span>
						</div>
						{feed.gallery && feed.gallery.length > 0 ? (
							<div
								key={platform}
								className="animate-in fade-in-0 slide-in-from-bottom-1 grid grid-cols-3 gap-1.5 p-3 duration-200 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]"
							>
								{feed.gallery.map((src) => (
									<div
										key={src}
										className="relative aspect-square overflow-hidden rounded-[8px] border border-line bg-paper-2"
									>
										<Image
											src={src}
											alt=""
											fill
											sizes="96px"
											className="object-cover"
										/>
									</div>
								))}
							</div>
						) : (
							feed.items.length > 0 && (
								<div
									key={platform}
									className="animate-in fade-in-0 slide-in-from-bottom-1 divide-y divide-line/60 duration-200 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]"
								>
									{feed.items.map((item) => (
										<div key={item.text} className="px-4 py-2.5">
											<p className="line-clamp-2 font-ui text-[13px] leading-snug text-ink-soft">
												{item.text}
											</p>
											<p className="mt-1 flex items-center justify-between font-mono text-[10.5px] text-ink-mute">
												<span>{item.date}</span>
												{item.meta && <span>{item.meta}</span>}
											</p>
										</div>
									))}
								</div>
							)
						)}
						<div
							className={cn(
								"px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute",
								(feed.items.length > 0 ||
									(feed.gallery && feed.gallery.length > 0)) &&
									"border-t border-line/70",
							)}
						>
							open {feed.handle} ↗
						</div>
					</div>
				</div>
			)}
		</>
	);
}
