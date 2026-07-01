import { AsciiPlasma } from "@/components/blocks/ascii/ascii-plasma";
import { BackButton } from "@/components/ds/back-button";
import { EntryRow } from "@/components/ds/entry-row";
import { Reveal } from "@/components/ds/reveal";
import { SectionLabel } from "@/components/ds/section-label";
import { Section, Shell } from "@/components/ds/shell";
import { StoryCard } from "@/components/ds/story-card";
import { type BlogPostMeta, formatTag, getAllPosts } from "@/lib/blog";
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
			{posts.length === 0 ? (
				<Section>
					<Shell width="column">
						<BackButton className="mb-8" />
						<p className="font-ui text-[15px] text-ink-mute">
							No entries yet. Drop an MDX file under app/(website)/blog/(post)/
							to publish your first post.
						</p>
					</Shell>
				</Section>
			) : (
				<>
					<Section tint>
						<Shell width="column">
							<BackButton className="mb-8" />
							<Reveal className="mb-6">
								<AsciiPlasma className="h-[160px]" />
							</Reveal>
							<Reveal>
								<StoryCard
									featured
									isNew
									href={`/blog/${featured.slug}`}
									title={featured.title}
									summary={featured.summary}
									date={cardDate(featured.date)}
									label={formatTag(featured.tags?.[0])}
									cover={featured.cover}
								/>
							</Reveal>
							{rest.length > 0 && (
								<div className="mt-4 grid gap-4 md:grid-cols-2">
									{rest.map((post, index) => (
										<Reveal key={post.slug} delay={index % 2 === 0 ? 1 : 2}>
											<StoryCard
												href={`/blog/${post.slug}`}
												title={post.title}
												summary={post.summary}
												date={cardDate(post.date)}
												label={formatTag(post.tags?.[0])}
												cover={post.cover}
											/>
										</Reveal>
									))}
								</div>
							)}
						</Shell>
					</Section>

					<Section>
						<Shell width="column">
							<SectionLabel>All posts</SectionLabel>
							<div className="mt-5 flex flex-col">
								{groupByYear(posts).map(([year, yearPosts]) => (
									<div key={year}>
										<p className="mb-1 mt-8 font-ui text-[13px] text-ink-mute first:mt-0">
											{year}
										</p>
										{yearPosts.map((post) => (
											<EntryRow
												key={post.slug}
												href={`/blog/${post.slug}`}
												title={post.title}
												meta={
													post.tags?.[0]
														? `${formatTag(post.tags[0])} · ${rowDate(post.date)}`
														: rowDate(post.date)
												}
											/>
										))}
									</div>
								))}
							</div>
						</Shell>
					</Section>
				</>
			)}
		</>
	);
}
