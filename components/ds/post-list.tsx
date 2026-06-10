import { cn } from "@/lib/utils";
import Link from "next/link";
import type * as React from "react";

export function PostList({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return <div className={cn("dim-list", className)}>{children}</div>;
}

export function PostListGroup({
	label,
	children,
	className,
}: { label: string; children: React.ReactNode; className?: string }) {
	return (
		<div className={className}>
			<p className="pb-2 pt-8 text-caption text-tertiary first:pt-0">{label}</p>
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
	const classes = cn(
		"dim-row flex items-baseline justify-between gap-6 border-b border-border py-4",
		className,
	);
	const inner = (
		<>
			<span className="min-w-0">
				<span className="block text-body text-foreground">{title}</span>
				{subtitle && (
					<span className="mt-0.5 block text-caption text-tertiary">
						{subtitle}
					</span>
				)}
			</span>
			{right && (
				<span className="shrink-0 whitespace-nowrap text-caption text-tertiary">
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
