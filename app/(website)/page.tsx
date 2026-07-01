import { BooksShelf } from "@/components/blocks/books-shelf";
import { CTALink } from "@/components/ds/cta-link";
import { EntryRow } from "@/components/ds/entry-row";
import { FeatureCard } from "@/components/ds/feature-card";
import {
	GithubIcon,
	IconLink,
	InstagramIcon,
	XIcon,
} from "@/components/ds/icon-link";
import { ProfileLockup } from "@/components/ds/profile-lockup";
import { SectionLabel } from "@/components/ds/section-label";
import { NewLabel } from "@/components/ds/tag";
import { getAllPosts } from "@/lib/blog";
import { allProjects } from "@/lib/utils";

function rowDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
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
	const writing = posts.slice(0, 8);
	const featured = allProjects.slice(0, 2);

	return (
		<>
			<div className="mx-auto max-w-column px-6 pt-16 sm:pt-28">
				{/* Intro */}
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

				{/* Social links */}
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

				{/* Projects */}
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
				</section>

				{/* Writing */}
				<section className="mt-24">
					<div className="flex items-baseline justify-between">
						<SectionLabel>Writing</SectionLabel>
						<CTALink href="/blog" className="font-ui text-[13px]">
							All posts
						</CTALink>
					</div>
					<div className="mt-5 flex flex-col">
						{writing.map((post) => (
							<EntryRow
								key={post.slug}
								href={`/blog/${post.slug}`}
								title={post.title}
								meta={rowDate(post.date)}
							/>
						))}
					</div>
				</section>
			</div>

			{/* Shelf */}
			<section className="mt-24 pb-24">
				<div className="mx-auto max-w-column px-6">
					<SectionLabel>Shelf</SectionLabel>
				</div>
				<BooksShelf className="mt-6" />
			</section>
		</>
	);
}
