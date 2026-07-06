"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Fragment, memo, useEffect, useRef, useState } from "react";

type TocEntry = {
	id: string;
	text: string;
	level: number;
};

// Marker geometry and spring from ncdai's LineNav
// (https://chanhdai.com/components/line-nav): the hairline expands
// 24px -> 40px on hover and active state. h3 entries get a shorter
// "minor tick" that expands by the same amount.
const majorLine = {
	normal: { width: 24 },
	active: { width: 40 },
	hover: { width: 40 },
};

const minorLine = {
	normal: { width: 12 },
	active: { width: 28 },
	hover: { width: 28 },
};

const lineTransition = { type: "spring", stiffness: 200, damping: 20 } as const;

export function PostToc() {
	const pathname = usePathname();
	const [entries, setEntries] = useState<TocEntry[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const navRef = useRef<HTMLElement>(null);

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

	// Keep the active item visible inside the scrollable nav on long TOCs.
	useEffect(() => {
		if (!activeId) return;
		navRef.current
			?.querySelector(`a[href="#${CSS.escape(activeId)}"]`)
			?.scrollIntoView({ block: "nearest" });
	}, [activeId]);

	if (entries.length < 2) return null;

	return (
		<nav
			ref={navRef}
			aria-label="Table of contents"
			// py keeps the first/last label (which overflows its hairline row
			// vertically) from being clipped by the scroll container
			className="no-scrollbar flex max-h-[calc(100vh-8rem)] flex-col gap-2 overflow-y-auto py-3"
		>
			{entries.map((entry, index) => (
				<Fragment key={entry.id}>
					<TocItem entry={entry} active={entry.id === activeId} />
					{/* double hairline "ruler" texture between titles */}
					{index < entries.length - 1 && (
						<>
							<span aria-hidden="true" className="block h-px w-6 bg-ink/20" />
							<span aria-hidden="true" className="block h-px w-6 bg-ink/20" />
						</>
					)}
				</Fragment>
			))}
		</nav>
	);
}

const TocItem = memo(function TocItem({
	entry,
	active,
}: {
	entry: TocEntry;
	active: boolean;
}) {
	return (
		<motion.a
			href={`#${entry.id}`}
			title={entry.text}
			aria-current={active ? "true" : undefined}
			initial={false}
			animate={active ? "active" : "normal"}
			whileHover="hover"
			className={cn(
				// hairline-height row: the label centers vertically on its tick,
				// keeping every line in the nav on an even ruler rhythm.
				// after: enlarges the hit target without loosening that rhythm
				"group relative flex h-px items-center gap-3 after:absolute after:inset-x-0 after:-inset-y-3",
				entry.level === 3 && "pl-3",
			)}
		>
			<motion.span
				aria-hidden="true"
				variants={entry.level === 3 ? minorLine : majorLine}
				transition={lineTransition}
				className={cn(
					"block h-px shrink-0 transition-colors duration-150 ease-out",
					active ? "bg-ink" : "bg-ink/20 group-hover:bg-ink",
				)}
			/>
			<span
				className={cn(
					"min-w-0 truncate font-ui text-[13px] transition-colors duration-150 ease-out",
					active ? "text-ink" : "text-ink-soft group-hover:text-ink",
				)}
			>
				{entry.text}
			</span>
		</motion.a>
	);
});
