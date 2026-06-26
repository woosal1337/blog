import { AsciiDonut } from "@/components/blocks/ascii/ascii-donut";
import { PageHero } from "@/components/ds/page-hero";
import { Reveal } from "@/components/ds/reveal";
import { SectionHeader } from "@/components/ds/section-header";
import { Section, Shell } from "@/components/ds/shell";
import { Tag } from "@/components/ds/tag";
import { awards, education, fellowships, workExperience } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description: "Developer, entrepreneur, and researcher.",
};

const orgLink =
	"text-foreground underline decoration-line underline-offset-[3px] transition-colors duration-200 ease-house hover:decoration-line-strong";

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

type ResumeRowProps = {
	href?: string;
	title: string;
	right: string;
	subtitle?: React.ReactNode;
	tags?: string[];
	active?: boolean;
};

function ResumeRow({
	href,
	title,
	right,
	subtitle,
	tags,
	active = false,
}: ResumeRowProps) {
	const inner = (
		<>
			<div className="min-w-0 flex-1">
				<div className="flex items-baseline gap-2">
					{active && (
						<span className="shrink-0 text-foreground" aria-label="current">
							●
						</span>
					)}
					<span className="text-body text-foreground">{title}</span>
				</div>
				{subtitle && (
					<p className="mt-1 text-footnote text-ink-soft">{subtitle}</p>
				)}
				{tags && tags.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-1.5">
						{tags.map((tag) => (
							<Tag key={tag}>{tag}</Tag>
						))}
					</div>
				)}
			</div>
			<span className="oak-label shrink-0 whitespace-nowrap pt-[3px] text-ink-mute">
				{right}
			</span>
		</>
	);

	const classes =
		"flex items-baseline justify-between gap-6 py-5 transition-colors duration-240 ease-house";

	if (!href) {
		return <div className={classes}>{inner}</div>;
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`${classes} group hover:bg-paper-2`}
		>
			{inner}
		</a>
	);
}

export default function AboutPage() {
	return (
		<>
			<PageHero
				eyebrow="about"
				title="~/about"
				caption="Developer, entrepreneur, and researcher"
			/>

			<Section>
				<Shell>
					<Reveal className="mx-auto max-w-article">
						<p className="oak-label mb-6 text-ink-mute">$ cat readme.txt</p>
						<div className="space-y-5 text-body leading-[1.7]">
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
						</div>
						<AsciiDonut className="mt-10 h-[280px] w-full" />
					</Reveal>
				</Shell>
			</Section>

			<Section tint flush>
				<Shell className="py-[clamp(48px,8vw,96px)]">
					<SectionHeader eyebrow="experience" title="Work" />
					<div className="mt-8 divide-y divide-line border-t border-line">
						{workExperience.map((job) => (
							<ResumeRow
								key={`${job.company}-${job.period}`}
								href={job.url}
								title={`${job.title} · ${job.company}`}
								right={job.period}
								subtitle={job.description}
								tags={job.tags}
								active={job.active}
							/>
						))}
					</div>

					<SectionHeader
						eyebrow="fellowships"
						title="Fellowships"
						className="mt-16"
					/>
					<div className="mt-8 divide-y divide-line border-t border-line">
						{fellowships.map((fellowship) => (
							<ResumeRow
								key={fellowship.org}
								href={fellowship.url}
								title={`${fellowship.title} · ${fellowship.org}`}
								right={fellowship.period}
								subtitle={fellowship.description}
							/>
						))}
					</div>
				</Shell>
			</Section>

			<Section>
				<Shell>
					<SectionHeader eyebrow="awards" title="Awards" />
					<div className="mt-8 divide-y divide-line border-t border-line">
						{awards.map((award) => (
							<ResumeRow
								key={award.name}
								title={`${award.name} · ${award.place}`}
								right={award.year}
								subtitle={award.description}
							/>
						))}
					</div>
				</Shell>
			</Section>

			<Section tint flush>
				<Shell className="py-[clamp(48px,8vw,96px)]">
					<SectionHeader eyebrow="education" title="Education" />
					<div className="mt-8 divide-y divide-line border-t border-line">
						{education.map((entry) => (
							<ResumeRow
								key={entry.title}
								href={entry.url}
								title={entry.title}
								right={entry.period}
								subtitle={entry.description}
							/>
						))}
					</div>
				</Shell>
			</Section>
		</>
	);
}
