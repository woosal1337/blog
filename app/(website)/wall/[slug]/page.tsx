import { BackButton } from "@/components/ds/back-button";
import { Section, Shell } from "@/components/ds/shell";
import { fame, getFamePerson } from "@/data/fame";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return fame.map((person) => ({ slug: person.slug }));
}

export function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Metadata {
	const person = getFamePerson(params.slug);
	if (!person) return {};
	return createPageMetadata({
		title: person.name,
		description: `${person.name}, ${person.role}. ${person.paragraphs[0]}`,
		path: `/wall/${person.slug}`,
	});
}

export default function FamePersonPage({
	params,
}: {
	params: { slug: string };
}) {
	const person = getFamePerson(params.slug);
	if (!person) notFound();

	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[16px] border border-line bg-[#060606]">
					<Image
						src={person.portrait}
						alt={person.portraitAlt}
						fill
						priority
						sizes="280px"
						className="object-cover"
						style={{ objectPosition: person.portraitPosition }}
					/>
				</div>
				<header className="mt-8">
					<h1 className="font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
						{person.name}
					</h1>
					<p className="mt-2 font-ui text-[15px] text-ink-mute">
						{person.role}
					</p>
				</header>
				<div className="mt-8 space-y-5">
					{person.paragraphs.map((paragraph) => (
						<p
							key={paragraph}
							className="font-ui text-[15px] leading-relaxed text-ink-soft"
						>
							{paragraph}
						</p>
					))}
				</div>
				<ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
					{person.links.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="font-ui text-[14px] text-ink underline decoration-line underline-offset-4 transition-colors duration-200 ease-house hover:text-ink-soft"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
				<p className="mt-12 font-ui text-[12px] leading-relaxed text-ink-mute">
					{person.credit.label ?? "Photograph"} by {person.credit.author}.{" "}
					<a
						href={person.credit.licenseHref}
						target="_blank"
						rel="noopener noreferrer license"
						className="underline decoration-line underline-offset-4 hover:text-ink-soft"
					>
						{person.credit.license}
					</a>
					.{" "}
					<a
						href={person.credit.sourceHref}
						target="_blank"
						rel="noopener noreferrer"
						className="underline decoration-line underline-offset-4 hover:text-ink-soft"
					>
						Source
					</a>
					.{person.credit.note ? ` ${person.credit.note}` : ""}
				</p>
			</Shell>
		</Section>
	);
}
