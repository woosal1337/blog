import { BooksShelf } from "@/components/blocks/books-shelf";
import { CTALink } from "@/components/ds/cta-link";
import { FeatureCard } from "@/components/ds/feature-card";
import {
	GithubIcon,
	IconLink,
	InstagramIcon,
	XIcon,
} from "@/components/ds/icon-link";
import { PeekFade } from "@/components/ds/peek-fade";
import { ProfileLockup } from "@/components/ds/profile-lockup";
import { SectionLabel } from "@/components/ds/section-label";
import { StoryCard } from "@/components/ds/story-card";
import { NewLabel } from "@/components/ds/tag";
import { formatTag, getAllPosts } from "@/lib/blog";
import { allProjects } from "@/lib/utils";

function cardDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

const em = "font-serif text-[1.06em] italic text-ink";

const SOCIALS = [
	{ href: "https://x.com/woosal1337", label: "X (Twitter)", Icon: XIcon },
	{
		href: "https://www.instagram.com/woosal1337/",
		label: "Instagram",
		Icon: InstagramIcon,
	},
	{ href: "https://github.com/woosal1337", label: "GitHub", Icon: GithubIcon },
] as const;

export default async function HomePage() {
	const posts = await getAllPosts();
	const writing = posts.slice(0, 2);
	const writingPeek = posts.slice(2, 4);
	const featured = allProjects.slice(0, 2);
	const projectsPeek = allProjects.slice(2, 4);

	return (
		<>
			<div className="mx-auto max-w-column px-6 pt-16 sm:pt-28">
				<ProfileLockup
					name="Ege Chelebi"
					tagline="AI engineer at Refik Anadol Studio"
					avatar="/contour-logo/contour-logo-white.svg"
				/>

				<div className="mt-7 space-y-4 font-ui text-[16px] leading-[1.65] text-ink-soft">
					<p>
						I&apos;m an AI engineer at{" "}
						<IconLink
							href="https://refikanadolstudio.com/"
							iconSrc="/icons/refikanadol.gif"
						>
							Refik Anadol Studio
						</IconLink>
						, working where code meets large-scale generative art. I build tools
						that feel fast, considered and{" "}
						<span className={em}>quietly alive</span>, and I contribute to open
						source on the side.
					</p>
				</div>

				<div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-ui text-[15px]">
					<span className="inline-flex items-center gap-2">
						<span className="-mx-1 inline-flex items-center">
							{SOCIALS.map(({ href, label, Icon }) => (
								<a
									key={href}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									className="p-1 transition-opacity duration-200 ease-house hover:opacity-60"
								>
									<Icon className="mr-0" />
								</a>
							))}
						</span>
						<span className="text-ink">@woosal1337</span>
					</span>
					<IconLink href="mailto:ege@chele.bi">ege[at]chele.bi</IconLink>
				</div>

				<section className="mt-24">
					<div className="flex items-baseline justify-between">
						<SectionLabel>Projects</SectionLabel>
						<CTALink href="/projects" className="font-ui text-[13px]">
							All projects
						</CTALink>
					</div>
					<div className="mt-5 grid gap-4 sm:grid-cols-2">
						{featured.map((project) => (
							<FeatureCard
								key={project.name}
								title={project.name}
								description={project.desc}
								href={project.href}
								external={project.external}
								logo={project.logo}
								logoInverts={project.logoInverts}
								badge={project.isNew ? <NewLabel /> : undefined}
							/>
						))}
					</div>
					{projectsPeek.length > 0 && (
						<PeekFade className="mt-4">
							<div className="grid gap-4 sm:grid-cols-2">
								{projectsPeek.map((project) => (
									<FeatureCard
										key={project.name}
										title={project.name}
										description={project.desc}
										href={project.href}
										external={project.external}
										logo={project.logo}
										logoInverts={project.logoInverts}
									/>
								))}
							</div>
						</PeekFade>
					)}
				</section>

				<section className="mt-24">
					<div className="flex items-baseline justify-between">
						<SectionLabel>Writing</SectionLabel>
						<CTALink href="/blog" className="font-ui text-[13px]">
							All posts
						</CTALink>
					</div>
					<div className="mt-5 grid gap-4 sm:grid-cols-2">
						{writing.map((post) => (
							<StoryCard
								key={post.slug}
								href={`/blog/${post.slug}`}
								title={post.title}
								summary={post.summary}
								date={cardDate(post.date)}
								label={formatTag(post.tags?.[0])}
								cover={post.cover}
							/>
						))}
					</div>
					{writingPeek.length > 0 && (
						<PeekFade className="mt-4">
							<div className="grid gap-4 sm:grid-cols-2">
								{writingPeek.map((post) => (
									<StoryCard
										key={post.slug}
										href={`/blog/${post.slug}`}
										title={post.title}
										summary={post.summary}
										date={cardDate(post.date)}
										label={formatTag(post.tags?.[0])}
										cover={post.cover}
									/>
								))}
							</div>
						</PeekFade>
					)}
				</section>
			</div>

			<section className="mt-24 pb-24">
				<div className="mx-auto max-w-column px-6">
					<SectionLabel>Shelf</SectionLabel>
				</div>
				<BooksShelf className="mt-6" />
			</section>
		</>
	);
}
