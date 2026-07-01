"use client";

import { BackButton } from "@/components/ds/back-button";
import { GlassButtonSurface } from "@/components/ds/glass-button";
import { useState } from "react";

function LinkIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="M8.7 11.3a3.2 3.2 0 0 0 4.5 0l2.1-2.1a3.2 3.2 0 1 0-4.5-4.5l-1.1 1.1"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M11.3 8.7a3.2 3.2 0 0 0-4.5 0l-2.1 2.1a3.2 3.2 0 1 0 4.5 4.5l1.1-1.1"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="m5 10.5 3.2 3.2L15 6.8"
				stroke="currentColor"
				strokeWidth="1.7"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/** Post chrome row: a back-to-home button and a copy-link button, matching the
 * editorial reading layout. */
export function PostTopBar() {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		if (typeof navigator === "undefined" || !navigator.clipboard) return;
		navigator.clipboard.writeText(window.location.href).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	};

	return (
		<div className="mb-10 flex items-center justify-between">
			<BackButton />
			<button
				type="button"
				onClick={copy}
				aria-label={copied ? "Link copied" : "Copy link to this post"}
				className="inline-block rounded-[999px]"
			>
				<GlassButtonSurface size={40}>
					{copied ? <CheckIcon /> : <LinkIcon />}
				</GlassButtonSurface>
			</button>
		</div>
	);
}
