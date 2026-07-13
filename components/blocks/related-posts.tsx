import { EntryRow } from "@/components/ds/entry-row";
import { SectionLabel } from "@/components/ds/section-label";
import { getAllPosts } from "@/lib/blog";

function overlap(left: string[] = [], right: string[] = []): number {
	const rightTags = new Set(right);
	return left.reduce((score, tag) => score + (rightTags.has(tag) ? 1 : 0), 0);
}

export async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
	const posts = await getAllPosts();
	const current = posts.find((post) => post.slug === currentSlug);
	if (!current) return null;

	const related = posts
		.filter((post) => post.slug !== currentSlug)
		.map((post) => ({
			post,
			score: overlap(current.tags, post.tags),
		}))
		.sort(
			(a, b) =>
				b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date),
		)
		.slice(0, 3)
		.map(({ post }) => post);

	if (related.length === 0) return null;

	return (
		<aside
			className="not-prose mt-16 border-t border-line pt-10"
			aria-labelledby="related-writing"
		>
			<SectionLabel>
				<span id="related-writing">Related writing</span>
			</SectionLabel>
			<div className="mt-4 flex flex-col">
				{related.map((post) => (
					<EntryRow
						key={post.slug}
						href={`/blog/${post.slug}`}
						title={post.title}
						meta={post.seoDescription ?? post.summary}
					/>
				))}
			</div>
		</aside>
	);
}
