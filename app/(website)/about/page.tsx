import { PageHero } from "@/components/ds/page-hero";
import { PostList, PostListRow } from "@/components/ds/post-list";
import { Reveal } from "@/components/ds/reveal";
import { SectionHeader } from "@/components/ds/section-header";
import { Section, Shell } from "@/components/ds/shell";
import { awards, education, fellowships, workExperience } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description: "Developer, entrepreneur, and researcher.",
};

const orgLink =
	"text-link transition-colors duration-200 ease-house hover:underline";

function OrgLink({ href, children }: { href: string; children: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={orgLink}
		>
			{children}
		</a>
	);
}

export default function AboutPage() {
	return (
		<>
			<PageHero
				title="About"
				caption="Developer, entrepreneur, and researcher"
			/>

			<Section>
				<Shell>
					<Reveal>
						<div className="max-w-article space-y-5 text-body leading-[1.65]">
							<p>
								I&apos;m Ege. I work as an AI engineer at{" "}
								<OrgLink href="https://refikanadolstudio.com/">
									Refik Anadol Studio
								</OrgLink>
								, and I love contributing to the open source products on the
								side. Before that I shipped stealth fintech at{" "}
								<OrgLink href="https://www.ahlatci.com.tr/">
									Ahlatcı Holding
								</OrgLink>
								, consulted for{" "}
								<OrgLink href="https://aa.com.tr/">Anadolu Ajansı</OrgLink>. In
								the past I founded companies providing end-to-end blockchain and
								software products for B2B clients in Miami, Dubai, and Istanbul.
							</p>
							<p>
								I studied computer engineering at{" "}
								<OrgLink href="https://www.medipol.edu.tr/">Medipol</OrgLink>,
								finished the bachelor&apos;s in 2024 and started the
								master&apos;s the same year. I speak English, Turkish,
								Azerbaijani and Russian.
							</p>
							<p>
								This site is where the writing, the music library and the
								bookshelf live. Everything else is on GitHub and X.
							</p>
						</div>
					</Reveal>
				</Shell>
			</Section>

			<Section tint>
				<Shell>
					<SectionHeader title="Work" />
					<PostList className="mt-8">
						{workExperience.map((job) => (
							<PostListRow
								key={`${job.company}-${job.period}`}
								href={job.url}
								external
								title={`${job.title} · ${job.company}`}
								subtitle={job.description}
								right={job.period}
							/>
						))}
					</PostList>

					<SectionHeader title="Fellowships" className="mt-16" />
					<PostList className="mt-8">
						{fellowships.map((fellowship) => (
							<PostListRow
								key={fellowship.org}
								href={fellowship.url}
								external
								title={`${fellowship.title} · ${fellowship.org}`}
								subtitle={fellowship.description}
								right={fellowship.period}
							/>
						))}
					</PostList>
				</Shell>
			</Section>

			<Section>
				<Shell>
					<SectionHeader title="Awards" />
					<PostList className="mt-8">
						{awards.map((award) => (
							<PostListRow
								key={award.name}
								title={`${award.name} · ${award.place}`}
								subtitle={award.description}
								right={award.year}
							/>
						))}
					</PostList>
				</Shell>
			</Section>

			<Section tint>
				<Shell>
					<SectionHeader title="Education" />
					<PostList className="mt-8">
						{education.map((entry) => (
							<PostListRow
								key={entry.title}
								href={entry.url}
								external
								title={entry.title}
								subtitle={entry.description}
								right={entry.period}
							/>
						))}
					</PostList>
				</Shell>
			</Section>
		</>
	);
}
