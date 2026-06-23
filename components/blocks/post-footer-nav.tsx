"use client";

import { Shell } from "@/components/ds/shell";
import { BreadcrumbBand } from "@/components/ds/site-footer";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type PostNavItem = {
	slug: string;
	title: string;
};

export function PostFooterNav({ posts }: { posts: PostNavItem[] }) {
	const pathname = usePathname();
	const slug = pathname?.split("/").filter(Boolean).pop();
	const index = posts.findIndex((post) => post.slug === slug);
	const current = index >= 0 ? posts[index] : null;

	const newer = index > 0 ? posts[index - 1] : null;
	const older =
		index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

	return (
		<>
			{(newer || older) && (
				<Shell width="wide">
					<div className="mx-auto w-full max-w-article">
						<div className="mb-16 mt-4 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-2">
							{older ? (
								<Link
									href={`/blog/${older.slug}`}
									className="group flex flex-col border border-line bg-paper p-4 transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2"
								>
									<span className="oak-label text-ink-mute">
										<span aria-hidden="true">←</span> prev
									</span>
									<span className="mt-2 block text-footnote text-ink-soft transition-colors duration-240 ease-house group-hover:text-foreground">
										{older.title}
									</span>
								</Link>
							) : (
								<span className="hidden sm:block" />
							)}
							{newer ? (
								<Link
									href={`/blog/${newer.slug}`}
									className="group flex flex-col items-end border border-line bg-paper p-4 text-right transition-colors duration-240 ease-house hover:border-line-strong hover:bg-paper-2"
								>
									<span className="oak-label text-ink-mute">
										next <span aria-hidden="true">→</span>
									</span>
									<span className="mt-2 block text-footnote text-ink-soft transition-colors duration-240 ease-house group-hover:text-foreground">
										{newer.title}
									</span>
								</Link>
							) : (
								<span className="hidden sm:block" />
							)}
						</div>
					</div>
				</Shell>
			)}
			<BreadcrumbBand
				items={[
					{ label: "Ege", href: "/" },
					{ label: "Blog", href: "/blog" },
					{ label: current?.title ?? "Post" },
				]}
			/>
		</>
	);
}
