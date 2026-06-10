"use client";

import { Tag } from "@/components/ds/tag";
import { formatPostDate } from "@/lib/blog-utils";
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
		<header className="not-prose mb-12">
			<p className="text-caption text-tertiary">
				{formatPostDate(meta.date)}
				{readingMinutes ? ` · ${readingMinutes} min read` : null}
			</p>
			<h1 className="mt-3 text-display">{meta.title}</h1>
			<p className="mt-4 text-subhead text-muted-foreground">{meta.summary}</p>
			{meta.tags && meta.tags.length > 0 && (
				<div className="mt-5 flex flex-wrap gap-2">
					{meta.tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>
			)}
			{meta.cover ? (
				<div className="relative mt-8 aspect-[1200/628] overflow-hidden rounded-xl bg-muted">
					<Image
						src={meta.cover}
						alt={meta.coverAlt ?? meta.title}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 692px"
						className="object-cover"
					/>
				</div>
			) : null}
		</header>
	);
}
