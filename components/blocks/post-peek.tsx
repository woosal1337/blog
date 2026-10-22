"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

export function PostPeek({
	href,
	title,
	summary,
	detail,
	iconSrc,
	className,
	children,
}: {
	href: string;
	title: string;
	summary: string;
	detail: string;
	iconSrc: string | null;
	className?: string;
	children: React.ReactNode;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<span
			className={cn("relative inline", open && "z-30")}
			onPointerEnter={(event) => {
				if (event.pointerType !== "touch") setOpen(true);
			}}
			onPointerLeave={(event) => {
				if (event.pointerType !== "touch") setOpen(false);
			}}
		>
			<span
				aria-hidden="true"
				className="bio-scrim pointer-events-none fixed inset-0 -z-10 transition-opacity duration-400 ease-house"
				style={{ opacity: open ? 1 : 0 }}
			/>
			<Link
				href={href}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				className={className}
			>
				{children}
			</Link>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 block w-[320px]"
				style={{
					transform: open
						? "translate(-50%, 0) scale(1)"
						: "translate(-50%, 8px) scale(0.96)",
					opacity: open ? 1 : 0,
					transition:
						"transform 420ms var(--ease-house), opacity 260ms var(--ease-house)",
				}}
			>
				<span className="glass-chip block overflow-hidden whitespace-normal rounded-[16px] p-4 text-left">
					{iconSrc ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={iconSrc}
							alt=""
							width={280}
							height={280}
							className="absolute -right-16 top-1/2 size-[280px] -translate-y-1/2 opacity-30"
						/>
					) : null}
					<span className="relative block font-ui text-[15px] font-semibold leading-snug text-ink">
						{title}
					</span>
					<span className="relative mt-1.5 line-clamp-3 font-ui text-[13.5px] leading-[1.55] text-ink-soft">
						{summary}
					</span>
					<span className="relative mt-3 block font-ui text-[12px] text-ink-mute">
						{detail}
					</span>
				</span>
			</span>
		</span>
	);
}
