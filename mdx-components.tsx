import { ContourPlayground } from "@/components/blocks/contour-playground";
import {
	Callout,
	Danger,
	Details,
	LvlUp,
	Note,
	Tip,
	Warn,
} from "@/components/blocks/post-blocks";
import { PostMeta } from "@/components/blocks/post-meta";
import { Quote } from "@/components/blocks/quote";
import { IconLink } from "@/components/ds/icon-link";
import { Kbd, KbdGroup } from "@/components/ds/kbd";
import { Tag } from "@/components/ds/tag";
import { slugify } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

function textOf(node: unknown): string {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(textOf).join("");
	if (node && typeof node === "object" && "props" in node) {
		// biome-ignore lint/suspicious/noExplicitAny: react node walking
		return textOf((node as any).props?.children);
	}
	return "";
}

function HeadingAnchor({ id }: { id: string }) {
	return (
		<a
			href={`#${id}`}
			aria-label="link to this section"
			className="ml-2 align-middle text-tertiary opacity-0 transition-opacity duration-200 ease-house group-hover:opacity-100"
		>
			#
		</a>
	);
}

function GithubMark({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			aria-hidden="true"
			fill="currentColor"
			className={className}
		>
			<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
		</svg>
	);
}

const LINK_ICON_CLASS =
	"mr-[0.3em] inline-block h-[1em] w-[1em] align-[-0.15em] opacity-70 transition-opacity duration-200 ease-house group-hover/link:opacity-100";

function hasLinkIcon(href: string): boolean {
	try {
		const host = new URL(href).hostname.replace(/^www\./, "");
		return host === "github.com" || host.endsWith(".github.com");
	} catch {
		return false;
	}
}

function LinkLeadingIcon({ href }: { href: string }) {
	if (!hasLinkIcon(href)) return null;
	return <GithubMark className={LINK_ICON_CLASS} />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children, ...props }) => (
			<h1
				{...props}
				className={cn(
					"mb-4 mt-12 font-ui text-[26px] font-semibold tracking-tight text-ink",
					props.className,
				)}
			>
				{children}
			</h1>
		),
		h2: ({ children, ...props }) => {
			const id = props.id ?? slugify(textOf(children));
			return (
				<h2
					{...props}
					id={id}
					data-toc-heading="2"
					className={cn(
						"group mb-3 mt-12 scroll-mt-24 font-ui text-[19px] font-semibold tracking-tight text-ink",
						props.className,
					)}
				>
					{children}
					<HeadingAnchor id={id} />
				</h2>
			);
		},
		h3: ({ children, ...props }) => {
			const id = props.id ?? slugify(textOf(children));
			return (
				<h3
					{...props}
					id={id}
					data-toc-heading="3"
					className={cn(
						"group mb-2 mt-9 scroll-mt-24 font-ui text-[16.5px] font-semibold text-ink",
						props.className,
					)}
				>
					{children}
					<HeadingAnchor id={id} />
				</h3>
			);
		},
		h4: ({ children, ...props }) => (
			<h4
				{...props}
				className={cn(
					"mb-2 mt-7 font-ui text-[15px] font-semibold text-ink",
					props.className,
				)}
			>
				{children}
			</h4>
		),
		p: ({ children, ...props }) => (
			<p
				{...props}
				className={cn(
					"my-5 font-ui text-[16px] leading-[1.72] text-ink-soft",
					props.className,
				)}
			>
				{children}
			</p>
		),
		ul: ({ children, ...props }) => (
			<ul
				{...props}
				className={cn(
					"my-5 ml-5 list-disc space-y-2 font-ui text-[16px] leading-[1.72] text-ink-soft marker:text-ink-mute",
					props.className,
				)}
			>
				{children}
			</ul>
		),
		ol: ({ children, ...props }) => (
			<ol
				{...props}
				className={cn(
					"my-5 ml-5 list-decimal space-y-2 font-ui text-[16px] leading-[1.72] text-ink-soft marker:text-ink-mute",
					props.className,
				)}
			>
				{children}
			</ol>
		),
		li: ({ children, ...props }) => (
			<li {...props} className={cn("leading-[1.72]", props.className)}>
				{children}
			</li>
		),
		blockquote: ({ children, ...props }) => (
			<blockquote
				{...props}
				className={cn(
					"my-7 border-l border-line pl-5 [&_p]:my-2 [&_p]:font-serif [&_p]:text-[17px] [&_p]:italic [&_p]:leading-relaxed [&_p]:text-ink-soft",
					props.className,
				)}
			>
				{children}
			</blockquote>
		),
		code: ({ children, ...props }) => {
			if ("data-language" in props) {
				return <code {...props}>{children}</code>;
			}
			return (
				<code
					{...props}
					className={cn(
						"rounded-[5px] border border-line bg-white/[0.03] px-[0.4em] py-[0.1em] font-mono text-[0.85em] text-ink",
						props.className,
					)}
				>
					{children}
				</code>
			);
		},
		pre: ({ children, ...props }) => {
			if ("data-language" in props) {
				return <pre {...props}>{children}</pre>;
			}
			return (
				<pre
					{...props}
					className={cn(
						"my-6 overflow-x-auto rounded-[12px] border border-line bg-white/[0.02] p-4 font-mono text-[13px] leading-relaxed [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0",
						props.className,
					)}
				>
					{children}
				</pre>
			);
		},
		hr: (props) => (
			<hr {...props} className={cn("my-10 border-line", props.className)} />
		),
		table: ({ children, ...props }) => (
			<div className="my-8 overflow-x-auto">
				<table
					{...props}
					className={cn(
						"w-full border-collapse text-footnote",
						props.className,
					)}
				>
					{children}
				</table>
			</div>
		),
		thead: ({ children, ...props }) => (
			<thead
				{...props}
				className={cn("border-b border-border", props.className)}
			>
				{children}
			</thead>
		),
		th: ({ children, ...props }) => (
			<th
				{...props}
				className={cn(
					"px-3 py-2 text-left text-footnote font-semibold text-muted-foreground",
					props.className,
				)}
			>
				{children}
			</th>
		),
		td: ({ children, ...props }) => (
			<td
				{...props}
				className={cn(
					"border-b border-border px-3 py-2 align-top",
					props.className,
				)}
			>
				{children}
			</td>
		),
		strong: ({ children, ...props }) => (
			<strong
				{...props}
				className={cn("font-semibold text-ink", props.className)}
			>
				{children}
			</strong>
		),
		em: ({ children, ...props }) => (
			<em
				{...props}
				className={cn(
					"font-serif text-[1.05em] italic text-ink",
					props.className,
				)}
			>
				{children}
			</em>
		),
		img: (props) => (
			// eslint-disable-next-line jsx-a11y/alt-text
			<Image
				sizes="(max-width: 768px) 100vw, 692px"
				width={1200}
				height={675}
				className="my-8 h-auto w-full rounded-[12px] border border-line"
				{...(props as ImageProps)}
			/>
		),
		a: ({ children, href, ...props }) => {
			if (!href) {
				return <span {...props}>{children}</span>;
			}
			if (href.startsWith("http")) {
				return (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"group/link text-ink underline decoration-line underline-offset-[3px] transition-colors duration-200 ease-house hover:decoration-ink-soft",
							hasLinkIcon(href) && "whitespace-nowrap",
						)}
						{...props}
					>
						<LinkLeadingIcon href={href} />
						{children}
					</a>
				);
			}
			return (
				<Link
					href={href}
					className="text-ink underline decoration-line underline-offset-[3px] transition-colors duration-200 ease-house hover:decoration-ink-soft"
				>
					{children}
				</Link>
			);
		},
		Badge: ({ children }: { children: React.ReactNode }) => (
			<Tag>{children}</Tag>
		),
		ContourPlayground,
		IconLink,
		Kbd,
		KbdGroup,
		PostMeta,
		Quote,
		Callout,
		Note,
		Tip,
		Warn,
		Danger,
		LvlUp,
		Details,
		...components,
	};
}
