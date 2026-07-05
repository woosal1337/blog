"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

type TocEntry = {
	id: string;
	text: string;
	level: number;
};

export function PostToc() {
	const pathname = usePathname();
	const [entries, setEntries] = useState<TocEntry[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);

	// Re-collect on every route change: the (post) layout persists across
	// client-side navigation between posts, so a mount-only effect would keep
	// showing the previous article's headings.
	// biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the re-run trigger
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

		if (!nodes.length) return;

		// Active = the last heading scrolled past a line near the top of the
		// viewport. This stays correct when a TOC link is clicked (the heading
		// jumps to the top) and while scrolling up or down.
		const TOP = 140;
		const update = () => {
			let current = nodes[0].id;
			for (const node of nodes) {
				if (node.getBoundingClientRect().top <= TOP) current = node.id;
			}
			// At the very bottom of the page, force the final heading active so
			// short trailing sections can still highlight.
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2;
			if (atBottom) current = nodes[nodes.length - 1].id;
			setActiveId(current);
		};

		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update, { passive: true });
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [pathname]);

	if (entries.length < 2) return null;

	return (
		<nav
			aria-label="Table of contents"
			className="no-scrollbar max-h-[calc(100vh-8rem)] overflow-y-auto"
		>
			<ul>
				{entries.map((entry, index) => {
					const isActive = entry.id === activeId;
					return (
						<Fragment key={entry.id}>
							<li>
								<a
									href={`#${entry.id}`}
									className={cn(
										"group flex items-center gap-2.5",
										entry.level === 3 && "pl-3",
									)}
								>
									<span
										aria-hidden="true"
										className={cn(
											"h-px shrink-0 transition-all duration-200 ease-house",
											isActive
												? "w-5 bg-ink"
												: "w-2.5 bg-line group-hover:w-3.5 group-hover:bg-ink-mute",
										)}
									/>
									<span
										className={cn(
											"font-ui text-[11.5px] leading-snug transition-colors duration-200 ease-house",
											isActive
												? "text-ink"
												: "text-ink-mute group-hover:text-ink-soft",
										)}
									>
										{entry.text}
									</span>
								</a>
							</li>
							{/* a bare separator between titles: dash on the left, no text */}
							{index < entries.length - 1 && (
								<li
									aria-hidden="true"
									className="flex h-2.5 items-center gap-2.5"
								>
									<span className="h-px w-1.5 shrink-0 bg-line" />
								</li>
							)}
						</Fragment>
					);
				})}
			</ul>
		</nav>
	);
}
