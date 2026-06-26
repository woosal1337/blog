import { MatrixRain } from "@/components/blocks/ascii/matrix-rain";
import { CTALink } from "@/components/ds/cta-link";
import { Gallery, GalleryItem } from "@/components/ds/gallery";
import { LineupCard } from "@/components/ds/lineup-card";
import { PostList, PostListRow } from "@/components/ds/post-list";
import { Reveal } from "@/components/ds/reveal";
import { SectionHeader } from "@/components/ds/section-header";
import { Section, Shell } from "@/components/ds/shell";
import { getAllPosts } from "@/lib/blog";
import { allProjects } from "@/lib/utils";

function rowDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

const bioLink =
	"text-link transition-colors duration-200 ease-house hover:underline";

export default async function HomePage() {
	const posts = await getAllPosts();
	const latest = posts.slice(0, 3);

	return (
		<>
			<Section className="relative overflow-hidden">
				<MatrixRain
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 opacity-[0.2]"
				/>
				<Shell className="relative">
					<Reveal>
						<p className="oak-label mb-5 text-ink-mute">// whoami</p>
						<h1 className="text-display text-foreground">
							Hi, I&apos;m Ege.
							<span className="oak-caret ml-1.5 align-baseline" aria-hidden />
						</h1>
						<p className="mt-6 max-w-[56ch] text-subhead text-muted-foreground">
							AI engineer at{" "}
							<a
								href="https://refikanadolstudio.com/"
								target="_blank"
								rel="noopener noreferrer"
								className={bioLink}
							>
								Refik Anadol Studio
							</a>
							. I write about code, finance, entrepreneurship and AI.
						</p>
						<div className="oak-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-mute">
							<span>Istanbul</span>
							<span className="text-line">·</span>
							<span>AI / Code / Finance</span>
							<span className="text-line">·</span>
							<span>$ status: building</span>
						</div>
					</Reveal>
				</Shell>
			</Section>

			<Section className="border-t border-line">
				<Shell>
					<Reveal>
						<SectionHeader
							eyebrow="latest-writing"
							title="Latest writing"
							action={<CTALink href="/blog">All posts</CTALink>}
						/>
						<PostList className="mt-8">
							{latest.map((post) => (
								<PostListRow
									key={post.slug}
									href={`/blog/${post.slug}`}
									title={post.title}
									right={rowDate(post.date)}
								/>
							))}
						</PostList>
					</Reveal>
				</Shell>
			</Section>

			<Section className="border-t border-line">
				<Shell>
					<Reveal>
						<SectionHeader
							eyebrow="selected-work"
							title="Selected work"
							action={<CTALink href="/projects">All projects</CTALink>}
						/>
					</Reveal>
				</Shell>
				<Reveal delay={1}>
					<Gallery ariaLabel="Selected work" className="mt-8">
						{allProjects.map((work) => (
							<GalleryItem key={work.name}>
								<LineupCard
									name={work.name}
									description={work.desc}
									href={work.href}
									ctaLabel="Learn more"
									external={work.external}
									logo={work.logo}
									logoInverts={work.logoInverts}
									isNew={work.isNew}
									comingSoon={work.comingSoon}
								/>
							</GalleryItem>
						))}
					</Gallery>
				</Reveal>
			</Section>
		</>
	);
}
