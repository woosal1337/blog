"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TocEntry = {
	id: string;
	text: string;
	level: number;
};

export function PostToc() {
	const [entries, setEntries] = useState<TocEntry[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const article = document.querySelector("article");
		if (!article) return;

		const nodes = Array.from(
			article.querySelectorAll<HTMLElement>("h2[id], h3[id]"),
		);
		const collected: TocEntry[] = nodes.map((node) => ({
			id: node.id,
			text: node.textContent?.replace(/#$/, "").trim() ?? "",
			level: Number(node.dataset.tocHeading ?? node.tagName.slice(1)),
		}));
		setEntries(collected);

		if (!collected.length) return;

		const observer = new IntersectionObserver(
			(records) => {
				const visible = records
					.filter((r) => r.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) {
					setActiveId(visible[0].target.id);
				}
			},
			{ rootMargin: "-30% 0px -60% 0px", threshold: 0 },
		);

		for (const node of nodes) observer.observe(node);
		return () => observer.disconnect();
	}, []);

	if (entries.length < 2) return null;

	return (
		<nav
			aria-label="Table of contents"
			className="sticky top-20 hidden max-h-[calc(100vh-6rem)] self-start overflow-y-auto xl:block"
		>
			<p className="mb-3 text-caption font-semibold text-muted-foreground">
				On this page
			</p>
			<ul className="space-y-2">
				{entries.map((entry) => {
					const isActive = entry.id === activeId;
					return (
						<li key={entry.id}>
							<a
								href={`#${entry.id}`}
								className={cn(
									"block text-caption leading-snug transition-colors duration-200 ease-house",
									entry.level === 3 ? "pl-4" : "",
									isActive
										? "font-semibold text-foreground"
										: "text-tertiary hover:text-foreground",
								)}
							>
								{entry.text}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
