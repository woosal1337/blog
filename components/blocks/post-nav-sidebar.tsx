"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type PostNavItem = {
	slug: string;
	title: string;
};

export function PostNavSidebar({ posts }: { posts: PostNavItem[] }) {
	const pathname = usePathname();
	const currentSlug = pathname?.split("/").filter(Boolean).pop();

	if (!posts.length) return null;

	return (
		<nav
			aria-label="All posts"
			className="no-scrollbar sticky top-20 max-h-[calc(100vh-6rem)] self-start overflow-y-auto"
		>
			<Link
				href="/blog"
				className="oak-label mb-4 inline-block text-ink-mute transition-colors duration-240 ease-house hover:text-foreground"
			>
				{"// blog"}
			</Link>
			<ul className="space-y-1">
				{posts.map((post) => {
					const isCurrent = post.slug === currentSlug;
					if (isCurrent) {
						return (
							<li key={post.slug}>
								<span
									aria-current="page"
									className="block border border-foreground p-3 text-caption leading-snug text-foreground"
								>
									{post.title}
								</span>
							</li>
						);
					}
					return (
						<li key={post.slug}>
							<Link
								href={`/blog/${post.slug}`}
								className={cn(
									"block px-3 py-2 text-caption leading-snug text-ink-soft transition-colors duration-240 ease-house hover:text-foreground",
								)}
							>
								{post.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
