import { PostAuthor } from "@/components/blocks/post-author";
import { PostFooterNav } from "@/components/blocks/post-footer-nav";
import { PostStamp } from "@/components/blocks/post-stamp";
import { PostToc } from "@/components/blocks/post-toc";
import { PostTopBar } from "@/components/blocks/post-top-bar";
import { ReadingProgress } from "@/components/blocks/reading-progress";
import { getAllPosts, getAllPostsWithHidden } from "@/lib/blog";

export default async function PostLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const posts = await getAllPosts();
	const items = posts.map((post) => ({ slug: post.slug, title: post.title }));
	const stampEntries = (await getAllPostsWithHidden()).map((post) => ({
		slug: post.slug,
		date: post.date,
	}));

	return (
		<>
			<ReadingProgress />
			<div className="relative mx-auto max-w-column px-6 py-14 sm:py-20">
				<aside className="absolute right-full top-0 hidden h-full w-[260px] pr-10 xl:block">
					<div className="sticky top-24">
						<PostToc />
					</div>
				</aside>
				<PostTopBar />
				<article className="w-full min-w-0">
					{children}
					<PostAuthor />
					<div className="mt-20 flex justify-center">
						<PostStamp entries={stampEntries} />
					</div>
				</article>
			</div>
			<PostFooterNav posts={items} />
		</>
	);
}
