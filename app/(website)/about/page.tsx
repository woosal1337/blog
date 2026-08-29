import { AsciiDonut } from "@/components/blocks/ascii/ascii-donut";
import { BioProse, BioTerm } from "@/components/blocks/bio-prose";
import { BackButton } from "@/components/ds/back-button";
import { IconLink } from "@/components/ds/icon-link";
import { Reveal } from "@/components/ds/reveal";
import { SectionLabel } from "@/components/ds/section-label";
import { Section, Shell } from "@/components/ds/shell";
import { Tag } from "@/components/ds/tag";
import { ProfilePageJsonLd } from "@/components/seo/json-ld";
import { formatTag } from "@/lib/blog-utils";
import { createPageMetadata } from "@/lib/seo";
import {
	awards,
	cn,
	education,
	fellowships,
	workExperience,
} from "@/lib/utils";

export const metadata = createPageMetadata({
	title: "About Ege Vusal Chelebi — AI Engineer and Open-Source Developer",
	description:
		"Meet Ege Vusal Chelebi, an AI engineer at Refik Anadol Studio building generative-art systems, agent infrastructure, and open-source developer tools.",
	socialDescription:
		"AI engineer building generative-art systems, agent infrastructure, and open-source developer tools.",
	path: "/about",
	absoluteTitle: true,
});

function RowIcon({ href, iconSrc }: { href?: string; iconSrc?: string }) {
	let src = iconSrc;
	if (!src && href) {
		try {
			const host = new URL(href).hostname.replace(/^www\./, "");
			src = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
		} catch {
			src = undefined;
		}
	}
	if (!src) return null;
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={src}
			alt=""
			width={16}
			height={16}
			loading="lazy"
			className="size-4 shrink-0 rounded-[3px]"
		/>
	);
}

type ResumeRowProps = {
	href?: string;
	iconSrc?: string;
	title: string;
	right: string;
	subtitle?: React.ReactNode;
	tags?: string[];
	active?: boolean;
};

function ResumeRow({
	href,
	iconSrc,
	title,
	right,
	subtitle,
	tags,
	active = false,
}: ResumeRowProps) {
	const inner = (
		<>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					{active && (
						<span className="shrink-0 text-[8px] text-ink" aria-label="current">
							●
						</span>
					)}
					{(iconSrc || href) && <RowIcon href={href} iconSrc={iconSrc} />}
					<span className="font-ui text-[15px] font-medium text-ink">
						{title}
					</span>
				</div>
				{subtitle && (
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						{subtitle}
					</p>
				)}
				{tags && tags.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-1.5">
						{tags.map((tag) => (
							<Tag key={tag}>{formatTag(tag)}</Tag>
						))}
					</div>
				)}
			</div>
			<span className="shrink-0 whitespace-nowrap pt-[3px] font-ui text-[13px] text-ink-mute">
				{right}
			</span>
		</>
	);

	const classes =
		"group -mx-3 flex items-start justify-between gap-6 rounded-[10px] px-3 py-4 transition-colors duration-200 ease-house";

	if (!href) {
		return <div className={classes}>{inner}</div>;
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(classes, "hover:bg-white/[0.02]")}
		>
			{inner}
		</a>
	);
}

function ResumeGroup({
	label,
	children,
	className,
}: {
	label: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<SectionLabel>{label}</SectionLabel>
			<div className="mt-2 flex flex-col">{children}</div>
		</div>
	);
}

export default function AboutPage() {
	return (
		<>
			<ProfilePageJsonLd />
			<Section className="pb-[clamp(24px,4vw,44px)]">
				<Shell width="column">
					<BackButton className="mb-8" />
					<Reveal immediate>
						<h1 className="mb-6 font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
							About Ege Vusal Chelebi
						</h1>
						<BioProse className="space-y-5 font-ui text-[16px] leading-[1.65]">
							<p>
								I&apos;m Ege. I work as an AI engineer at a{" "}
								<BioTerm id="studio">studio</BioTerm> where code meets large
								scale generative art, and I contribute to open source on the
								side. Before that I shipped{" "}
								<BioTerm id="payments">blockchain payments</BioTerm>, built a{" "}
								<BioTerm id="fintech">stealth fintech</BioTerm>, and consulted
								for a <BioTerm id="newsroom">newsroom</BioTerm>. Earlier still I
								founded companies that delivered blockchain and software
								products to B2B clients in Miami, Dubai, and Istanbul.
							</p>
							<p>
								I studied CS at{" "}
								<BioTerm id="university">the same university</BioTerm> twice,
								and finished the bachelor&apos;s in 2024 before I started the
								master&apos;s the same year.{" "}
								<BioTerm id="hackathons">Hackathons</BioTerm> taught me to ship
								in two days, and two{" "}
								<BioTerm id="fellowships">fellowships</BioTerm> paid for the
								rest. I speak <BioTerm id="languages">four languages</BioTerm>.
							</p>
						</BioProse>

						<AsciiDonut className="mt-4 h-[200px] w-full" />
					</Reveal>
				</Shell>
			</Section>

			<Section className="pt-[clamp(24px,4vw,44px)]">
				<Shell width="column">
					<ResumeGroup label="Work">
						{workExperience.map((job) => (
							<ResumeRow
								key={`${job.company}-${job.period}`}
								href={job.url}
								iconSrc={
									job.company === "Refik Anadol Studio"
										? "/icons/refikanadol.gif"
										: undefined
								}
								title={`${job.title} · ${job.company}`}
								right={job.period}
								subtitle={job.description}
								tags={job.tags}
								active={job.active}
							/>
						))}
					</ResumeGroup>

					<ResumeGroup
						label="Fellowships"
						className="mt-10 border-t border-line pt-10"
					>
						{fellowships.map((fellowship) => (
							<ResumeRow
								key={fellowship.org}
								href={fellowship.url}
								title={`${fellowship.title} · ${fellowship.org}`}
								right={fellowship.period}
								subtitle={fellowship.description}
							/>
						))}
					</ResumeGroup>

					<ResumeGroup
						label="Awards"
						className="mt-10 border-t border-line pt-10"
					>
						{awards.map((award) => (
							<ResumeRow
								key={award.name}
								href={award.url}
								iconSrc={
									award.name === "Teknofest"
										? "/icons/teknofest.png"
										: undefined
								}
								title={`${award.name} · ${award.place}`}
								right={award.year}
								subtitle={award.description}
							/>
						))}
					</ResumeGroup>

					<ResumeGroup
						label="Education"
						className="mt-10 border-t border-line pt-10"
					>
						{education.map((entry) => (
							<ResumeRow
								key={entry.title}
								href={entry.url}
								title={entry.title}
								right={entry.period}
								subtitle={entry.description}
							/>
						))}
					</ResumeGroup>
				</Shell>
			</Section>
		</>
	);
}
