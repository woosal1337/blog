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
						<div className="mb-16 mt-4 flex justify-between gap-8 border-t border-border pt-8">
							{older ? (
								<Link
									href={`/blog/${older.slug}`}
									className="group max-w-[45%]"
								>
									<span className="block text-body text-foreground">
										<span aria-hidden="true">‹</span> Previous
									</span>
									<span className="mt-1 block text-body text-link group-hover:underline">
										{older.title}
									</span>
								</Link>
							) : (
								<span />
							)}
							{newer ? (
								<Link
									href={`/blog/${newer.slug}`}
									className="group max-w-[45%] text-right"
								>
									<span className="block text-body text-foreground">
										Next <span aria-hidden="true">›</span>
									</span>
									<span className="mt-1 block text-body text-link group-hover:underline">
										{newer.title}
									</span>
								</Link>
							) : (
								<span />
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
