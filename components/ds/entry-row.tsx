import { cn } from "@/lib/utils";
import Link from "next/link";
import type * as React from "react";

/** Small lined-document glyph used as the leading icon on list rows. */
function DocGlyph() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<title>Document</title>
			<path
				d="M4 2.5h5L12 5.5V13a.5.5 0 0 1-.5.5h-7A.5.5 0 0 1 4 13V2.5Z"
				stroke="currentColor"
				strokeWidth="1"
			/>
			<path
				d="M6 6.5h4M6 8.5h4M6 10.5h2.5"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
			/>
		</svg>
	);
}

type EntryRowProps = {
	title: string;
	meta?: React.ReactNode;
	href: string;
	external?: boolean;
	icon?: React.ReactNode;
};

/** A list row: leading icon tile + title that nudges right on hover + a muted
 * meta line. Used for the Writing feed and similar lists. */
export function EntryRow({ title, meta, href, external, icon }: EntryRowProps) {
	const inner = (
		<>
			<span className="grid size-9 shrink-0 place-items-center rounded-[8px] border border-line bg-white/[0.015] text-ink-mute transition-colors duration-200 ease-house group-hover:border-line-strong group-hover:text-ink-soft">
				{icon ?? <DocGlyph />}
			</span>
			<span className="min-w-0 leading-tight">
				<span className="block truncate font-ui text-[15px] text-ink transition-transform duration-200 ease-house group-hover:translate-x-0.5">
					{title}
				</span>
				{meta ? (
					<span className="mt-0.5 block font-ui text-[13px] text-ink-mute">
						{meta}
					</span>
				) : null}
			</span>
		</>
	);

	const classes =
		"group -mx-2 flex items-center gap-3 rounded-[10px] px-2 py-2 transition-colors duration-200 ease-house hover:bg-white/[0.02]";

	if (external) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={classes}
			>
				{inner}
			</a>
		);
	}

	return (
		<Link href={href} className={classes}>
			{inner}
		</Link>
	);
}
