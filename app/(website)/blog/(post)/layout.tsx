import { GlitchText } from "@/components/blocks/ascii/glitch-text";
import { PostFooterNav } from "@/components/blocks/post-footer-nav";
import { PostNavSidebar } from "@/components/blocks/post-nav-sidebar";
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
				<div className="xl:grid xl:grid-cols-[200px_minmax(0,1fr)_220px] xl:gap-12">
					<aside className="hidden xl:block">
						<PostNavSidebar posts={items} />
					</aside>
					<article className="mx-auto w-full min-w-0 max-w-article">
						{children}
						<div className="mt-20 flex justify-center border-t border-line pt-8">
							<GlitchText
								text="EOF"
								className="text-[28px] font-semibold tracking-[0.2em]"
							/>
						</div>
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
