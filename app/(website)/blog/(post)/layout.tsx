import { ParentalAdvisory } from "@/components/blocks/parental-advisory";
import { PostFooterNav } from "@/components/blocks/post-footer-nav";
import { PostToc } from "@/components/blocks/post-toc";
import { PostTopBar } from "@/components/blocks/post-top-bar";
import { ReadingProgress } from "@/components/blocks/reading-progress";
import { getAllPosts } from "@/lib/blog";

export default async function PostLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const posts = await getAllPosts();
	const items = posts.map((post) => ({ slug: post.slug, title: post.title }));

	return (
		<>
			<ReadingProgress />
			<div className="relative mx-auto max-w-column px-6 py-14 sm:py-20">
				{/* Table of contents on the left rail on wide screens; the reading
				    measure stays centered. */}
				<aside className="absolute right-full top-0 hidden h-full w-[260px] pr-10 xl:block">
					<div className="sticky top-24">
						<PostToc />
					</div>
				</aside>
				<PostTopBar />
				<article className="w-full min-w-0">
					{children}
					{/* Easter egg: explicit-content stamp at the end of every post. */}
					<div className="mt-20 flex justify-center">
						<ParentalAdvisory className="h-auto w-[180px] opacity-80 [transform:rotate(-5deg)] transition-opacity duration-300 ease-house hover:opacity-100" />
					</div>
				</article>
			</div>
			<PostFooterNav posts={items} />
		</>
	);
}
