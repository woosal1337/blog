import { cn } from "@/lib/utils";
import Link from "next/link";
import type * as React from "react";

const ICON = "mr-[0.32em] inline-block h-[0.95em] w-[0.95em] align-[-0.12em]";

function MailIcon() {
	return (
		<svg viewBox="0 0 16 16" fill="none" className={cn(ICON, "text-ink-soft")}>
			<title>Email</title>
			<rect
				x="1.5"
				y="3"
				width="13"
				height="10"
				rx="2"
				stroke="currentColor"
				strokeWidth="1.2"
			/>
			<path
				d="m2.5 4.5 5.5 4 5.5-4"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function GithubIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="currentColor"
			className={cn(ICON, "text-ink-soft", className)}
		>
			<title>GitHub</title>
			<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
		</svg>
	);
}

export function XIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="currentColor"
			className={cn(ICON, "text-ink-soft", className)}
		>
			<title>X</title>
			<path d="M9.52 6.78 15.48 0h-1.41L8.9 5.88 4.76 0H0l6.25 8.9L0 16h1.41l5.46-6.21L11.24 16H16L9.52 6.78Zm-1.93 2.2-.63-.89L1.92 1.04h2.17l4.06 5.7.63.89 5.28 7.41h-2.17L7.59 8.98Z" />
		</svg>
	);
}

export function InstagramIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			className={cn(ICON, "text-ink-soft", className)}
		>
			<title>Instagram</title>
			<rect
				x="1.6"
				y="1.6"
				width="12.8"
				height="12.8"
				rx="4"
				stroke="currentColor"
				strokeWidth="1.4"
			/>
			<circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.4" />
			<circle cx="11.6" cy="4.4" r="0.95" fill="currentColor" />
		</svg>
	);
}

function Favicon({ host }: { host: string }) {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
			alt=""
			width={16}
			height={16}
			loading="lazy"
			className={cn(ICON, "rounded-[3px]")}
		/>
	);
}

function leadingIcon(href: string): React.ReactNode {
	if (href.startsWith("mailto:")) return <MailIcon />;
	try {
		const host = new URL(href).hostname.replace(/^www\./, "");
		if (host === "github.com") return <GithubIcon />;
		if (host === "x.com" || host === "twitter.com") return <XIcon />;
		if (host === "instagram.com") return <InstagramIcon />;
		return <Favicon host={host} />;
	} catch {
		return null;
	}
}

type IconLinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
	/** Source the leading favicon/icon from a different URL than the link
	 * target (e.g. a brand's main domain). Defaults to `href`. */
	iconHref?: string;
	/** Use an explicit image as the leading icon (overrides favicon lookup),
	 * e.g. a local brand mark in /public. */
	iconSrc?: string;
};

/** Inline link with a leading site favicon / brand mark, in the editorial
 * underline style. The icon is detected from `iconHref` (or `href`), unless an
 * explicit `iconSrc` is given. */
export function IconLink({
	href,
	children,
	className,
	iconHref,
	iconSrc,
}: IconLinkProps) {
	const icon = iconSrc ? (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={iconSrc}
			alt=""
			width={16}
			height={16}
			loading="lazy"
			className={cn(ICON, "rounded-[3px]")}
		/>
	) : (
		leadingIcon(iconHref ?? href)
	);
	const external = href.startsWith("http") || href.startsWith("mailto:");
	const inner = (
		<>
			{icon}
			<span className="underline decoration-line underline-offset-[3px] transition-colors duration-200 ease-house group-hover/il:decoration-ink-soft">
				{children}
			</span>
		</>
	);
	const cls = cn(
		"group/il whitespace-nowrap text-ink transition-colors duration-200 ease-house",
		className,
	);

	if (external) {
		return (
			<a
				href={href}
				target={href.startsWith("http") ? "_blank" : undefined}
				rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
				className={cls}
			>
				{inner}
			</a>
		);
	}
	return (
		<Link href={href} className={cls}>
			{inner}
		</Link>
	);
}
