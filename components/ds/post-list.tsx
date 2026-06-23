import { cn } from "@/lib/utils";
import Link from "next/link";
import type * as React from "react";

export function PostList({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("border-t border-line", className)}>{children}</div>
	);
}

export function PostListGroup({
	label,
	children,
	className,
}: { label: string; children: React.ReactNode; className?: string }) {
	return (
		<div className={className}>
			<p className="oak-label border-b border-line py-3 text-ink-mute">
				<span aria-hidden="true" className="text-line">
					{"// "}
				</span>
				{label}
			</p>
			{children}
		</div>
	);
}

export type PostListRowProps = {
	href?: string;
	title: React.ReactNode;

	right?: React.ReactNode;

	subtitle?: React.ReactNode;
	external?: boolean;
	className?: string;
};

export function PostListRow({
	href,
	title,
	right,
	subtitle,
	external = false,
	className,
}: PostListRowProps) {
	const isInteractive = Boolean(href);
	const classes = cn(
		"group flex items-baseline justify-between gap-6 border-b border-line py-3.5 transition-colors duration-240 ease-house",
		isInteractive && "hover:bg-paper-2",
		className,
	);
	const inner = (
		<>
			<span className="flex min-w-0 items-baseline gap-2.5">
				{isInteractive && (
					<span
						aria-hidden="true"
						className="select-none text-line transition-colors duration-240 ease-house group-hover:text-ink-soft"
					>
						›
					</span>
				)}
				<span className="min-w-0">
					<span
						className={cn(
							"block text-footnote text-foreground",
							isInteractive && "group-hover:underline",
						)}
					>
						{title}
					</span>
					{subtitle && (
						<span className="mt-0.5 block text-caption text-ink-mute">
							{subtitle}
						</span>
					)}
				</span>
			</span>
			{right && (
				<span className="oak-label shrink-0 whitespace-nowrap text-ink-mute">
					{right}
				</span>
			)}
		</>
	);
	if (!href) {
		return <div className={classes}>{inner}</div>;
	}
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
