import { PostFooterNav } from "@/components/blocks/post-footer-nav";
import { PostToc } from "@/components/blocks/post-toc";
import { ReadingProgress } from "@/components/blocks/reading-progress";
import { Shell } from "@/components/ds/shell";
import { getAllPosts } from "@/lib/blog";

export default async function PostLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const posts = await getAllPosts();
	const items = posts.map((post) => ({ slug: post.slug, title: post.title }));

	return (
		<>
			<ReadingProgress />
			<Shell width="wide" className="py-12 sm:py-16">
				<div className="xl:grid xl:grid-cols-[minmax(0,1fr)_240px] xl:gap-12">
					<article className="mx-auto w-full min-w-0 max-w-article">
						{children}
					</article>
					<aside className="hidden xl:block">
						<PostToc />
					</aside>
				</div>
			</Shell>
			<PostFooterNav posts={items} />
		</>
	);
}
