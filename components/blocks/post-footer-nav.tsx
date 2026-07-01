"use client";

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

	const newer = index > 0 ? posts[index - 1] : null;
	const older =
		index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

	if (!newer && !older) return null;

	return (
		<div className="mx-auto max-w-column px-6">
			<div className="mb-16 mt-4 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2">
				{older ? (
					<Link
						href={`/blog/${older.slug}`}
						className="group flex flex-col gap-1"
					>
						<span className="font-ui text-[12px] text-ink-mute">
							<span aria-hidden="true">←</span> Previous
						</span>
						<span className="font-ui text-[14px] text-ink-soft transition-colors duration-200 ease-house group-hover:text-ink">
							{older.title}
						</span>
					</Link>
				) : (
					<span className="hidden sm:block" />
				)}
				{newer ? (
					<Link
						href={`/blog/${newer.slug}`}
						className="group flex flex-col items-end gap-1 text-right"
					>
						<span className="font-ui text-[12px] text-ink-mute">
							Next <span aria-hidden="true">→</span>
						</span>
						<span className="font-ui text-[14px] text-ink-soft transition-colors duration-200 ease-house group-hover:text-ink">
							{newer.title}
						</span>
					</Link>
				) : (
					<span className="hidden sm:block" />
				)}
			</div>
		</div>
	);
}
