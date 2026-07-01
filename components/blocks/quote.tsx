import { cn } from "@/lib/utils";
import type * as React from "react";

type QuoteProps = {
	/** The quote text. Can also be passed as children. */
	quote?: React.ReactNode;
	children?: React.ReactNode;
	/** Attribution name, e.g. "Fyodor Dostoevsky". */
	author?: React.ReactNode;
	/** Optional work/source, rendered in italics, e.g. "White Nights". */
	source?: React.ReactNode;
	className?: string;
};

/**
 * Editorial pull-quote for blog posts: serif body wrapped in decorative
 * quotation marks, an em-dash attribution, all inside a soft rounded border.
 *
 * Usage in MDX:
 *   <Quote author="Fyodor Dostoevsky" source="White Nights">
 *     Do you realize how rare it is to find someone who sees the world the
 *     same way you do, even if only for a single night?
 *   </Quote>
 */
export function Quote({
	quote,
	children,
	author,
	source,
	className,
}: QuoteProps) {
	const body = quote ?? children;
	return (
		<figure
			className={cn(
				"not-prose my-8 rounded-[16px] border border-line bg-white/[0.02] px-7 py-8 sm:px-10 sm:py-10",
				className,
			)}
		>
			<blockquote className="font-serif text-[22px] leading-[1.5] text-ink sm:text-[24px] [&_p]:m-0 [&_p]:inline [&_p]:font-serif [&_p]:text-ink [&_p]:[font-size:inherit] [&_p]:[line-height:inherit]">
				<span aria-hidden="true" className="text-[1.05em] text-ink-soft">
					“
				</span>
				{body}
				<span aria-hidden="true" className="text-[1.05em] text-ink-soft">
					”
				</span>
			</blockquote>
			{(author || source) && (
				<figcaption className="mt-6 font-serif text-[16px] text-ink-soft">
					<span aria-hidden="true">— </span>
					{author}
					{source ? (
						<>
							, <em className="italic">{source}</em>
						</>
					) : null}
				</figcaption>
			)}
		</figure>
	);
}
