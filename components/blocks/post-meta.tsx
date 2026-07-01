"use client";

import { Tag } from "@/components/ds/tag";
import { formatPostDate, formatTag } from "@/lib/blog-utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostMetaProps {
	meta: {
		title: string;
		date: string;
		summary: string;
		tags?: string[];
		readingMinutes?: number;
		cover?: string;
		coverAlt?: string;
	};
}

const WORDS_PER_MINUTE = 220;

export function PostMeta({ meta }: PostMetaProps) {
	const [readingMinutes, setReadingMinutes] = useState<number | undefined>(
		meta.readingMinutes,
	);

	useEffect(() => {
		if (meta.readingMinutes) return;
		const article = document.querySelector("article");
		if (!article) return;
		const text = article.textContent ?? "";
		const words = text.trim().split(/\s+/).filter(Boolean).length;
		setReadingMinutes(Math.max(1, Math.round(words / WORDS_PER_MINUTE)));
	}, [meta.readingMinutes]);

	return (
		<header className="not-prose mb-10">
			<p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-ui text-[13px] text-ink-mute">
				<span>{formatPostDate(meta.date)}</span>
				{readingMinutes ? (
					<>
						<span className="text-line">·</span>
						<span>{readingMinutes} min read</span>
					</>
				) : null}
				<span className="text-line">·</span>
				<span>Ege Chelebi</span>
			</p>
			<h1 className="mt-4 font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
				{meta.title}
			</h1>
			<p className="mt-3 font-ui text-[17px] leading-relaxed text-ink-soft">
				{meta.summary}
			</p>
			{meta.tags && meta.tags.length > 0 && (
				<div className="mt-5 flex flex-wrap gap-2">
					{meta.tags.map((tag) => (
						<Tag key={tag}>{formatTag(tag)}</Tag>
					))}
				</div>
			)}
			{meta.cover ? (
				<div className="relative mt-8 aspect-[1200/628] overflow-hidden rounded-[14px] border border-line bg-paper-2">
					<Image
						src={meta.cover}
						alt={meta.coverAlt ?? meta.title}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 680px"
						className="object-cover"
					/>
				</div>
			) : null}
		</header>
	);
}
