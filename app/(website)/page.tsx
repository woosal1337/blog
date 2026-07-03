import { BooksShelf } from "@/components/blocks/books-shelf";
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
import { ViewAllButton } from "@/components/ds/view-all-button";
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
	const featured = allProjects.slice(0, 2);

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

				<div className="mt-24 grid gap-x-6 gap-y-14 sm:grid-cols-2">
					<section className="flex flex-col">
						<SectionLabel>Projects</SectionLabel>
						<div className="mt-5 flex flex-col gap-4">
							{featured[0] && (
								<FeatureCard
									title={featured[0].name}
									description={featured[0].desc}
									href={featured[0].href}
									external={featured[0].external}
									logo={featured[0].logo}
									logoInverts={featured[0].logoInverts}
									badge={featured[0].isNew ? <NewLabel /> : undefined}
									date={
										featured[0].date ? cardDate(featured[0].date) : undefined
									}
								/>
							)}
							{featured[1] && (
								<PeekFade>
									<FeatureCard
										title={featured[1].name}
										description={featured[1].desc}
										href={featured[1].href}
										external={featured[1].external}
										logo={featured[1].logo}
										logoInverts={featured[1].logoInverts}
										date={
											featured[1].date ? cardDate(featured[1].date) : undefined
										}
									/>
								</PeekFade>
							)}
						</div>
						<div className="mt-auto flex justify-center pt-6">
							<ViewAllButton href="/projects" label="All projects" />
						</div>
					</section>

					<section className="flex flex-col">
						<SectionLabel>Writing</SectionLabel>
						<div className="mt-5 flex flex-col gap-4">
							{writing[0] && (
								<StoryCard
									href={`/blog/${writing[0].slug}`}
									title={writing[0].title}
									summary={writing[0].summary}
									date={cardDate(writing[0].date)}
									label={formatTag(writing[0].tags?.[0])}
									cover={writing[0].cover}
								/>
							)}
							{writing[1] && (
								<PeekFade>
									<StoryCard
										href={`/blog/${writing[1].slug}`}
										title={writing[1].title}
										summary={writing[1].summary}
										date={cardDate(writing[1].date)}
										label={formatTag(writing[1].tags?.[0])}
										cover={writing[1].cover}
									/>
								</PeekFade>
							)}
						</div>
						<div className="mt-auto flex justify-center pt-6">
							<ViewAllButton href="/blog" label="All posts" />
						</div>
					</section>
				</div>
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
