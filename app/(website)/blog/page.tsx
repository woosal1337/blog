import { CTALink } from "@/components/ds/cta-link";
import { PageHero } from "@/components/ds/page-hero";
import {
	PostList,
	PostListGroup,
	PostListRow,
} from "@/components/ds/post-list";
import { Reveal } from "@/components/ds/reveal";
import { SectionHeader } from "@/components/ds/section-header";
import { Section, Shell } from "@/components/ds/shell";
import { StoryCard } from "@/components/ds/story-card";
import { type BlogPostMeta, getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Essays, notes, and field reports.",
};

function cardDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

function rowDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

function groupByYear(posts: BlogPostMeta[]): Array<[string, BlogPostMeta[]]> {
	const groups = new Map<string, BlogPostMeta[]>();
	for (const post of posts) {
		const year = String(new Date(post.date).getFullYear());
		const list = groups.get(year) ?? [];
		list.push(post);
		groups.set(year, list);
	}
	return Array.from(groups.entries());
}

export default async function BlogIndexPage() {
	const posts = await getAllPosts();
	const [featured, ...rest] = posts;

	return (
		<>
			<PageHero
				title="Writing"
				caption={`${posts.length} ${posts.length === 1 ? "essay" : "essays"} and field reports`}
				action={<CTALink href="/blog/rss.xml">Subscribe via RSS</CTALink>}
			/>

			{posts.length === 0 ? (
				<Section>
					<Shell>
						<p className="text-body text-muted-foreground">
							No entries yet. Drop an MDX file under app/(website)/blog/(post)/.
						</p>
					</Shell>
				</Section>
			) : (
				<>
					<Section tint>
						<Shell>
							<Reveal>
								<StoryCard
									featured
									isNew
									href={`/blog/${featured.slug}`}
									title={featured.title}
									summary={featured.summary}
									date={cardDate(featured.date)}
									label={featured.tags?.[0]}
									cover={featured.cover}
								/>
							</Reveal>
							{rest.length > 0 && (
								<div className="mt-6 grid gap-6 md:grid-cols-2">
									{rest.map((post, index) => (
										<Reveal key={post.slug} delay={index % 2 === 0 ? 1 : 2}>
											<StoryCard
												href={`/blog/${post.slug}`}
												title={post.title}
												summary={post.summary}
												date={cardDate(post.date)}
												label={post.tags?.[0]}
												cover={post.cover}
											/>
										</Reveal>
									))}
								</div>
							)}
						</Shell>
					</Section>

					<Section>
						<Shell>
							<SectionHeader title="All posts" />
							<PostList className="mt-8">
								{groupByYear(posts).map(([year, yearPosts]) => (
									<PostListGroup key={year} label={year}>
										{yearPosts.map((post) => (
											<PostListRow
												key={post.slug}
												href={`/blog/${post.slug}`}
												title={post.title}
												right={rowDate(post.date)}
											/>
										))}
									</PostListGroup>
								))}
							</PostList>
						</Shell>
					</Section>
				</>
			)}
		</>
	);
}
