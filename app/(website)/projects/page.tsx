import { AsciiFlow } from "@/components/blocks/ascii/ascii-flow";
import { BackButton } from "@/components/ds/back-button";
import { FeatureCard } from "@/components/ds/feature-card";
import { Reveal } from "@/components/ds/reveal";
import { Section, Shell } from "@/components/ds/shell";
import { NewLabel, SoonLabel } from "@/components/ds/tag";
import { createPageMetadata } from "@/lib/seo";
import { allProjects } from "@/lib/utils";

export const metadata = createPageMetadata({
	title: "AI Systems and Open-Source Developer Projects",
	description:
		"AI systems, local-first developer tools, agent infrastructure, and open-source software designed and built by Ege Chelebi.",
	socialDescription:
		"AI systems, local-first developer tools, agent infrastructure, and open-source software built by Ege Chelebi.",
	path: "/projects",
});

function cardDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export default function ProjectsPage() {
	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<Reveal immediate className="mb-8">
					<header>
						<h1 className="font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
							AI and open-source projects
						</h1>
						<p className="mt-3 max-w-[620px] font-ui text-[15px] leading-relaxed text-ink-mute">
							Agent infrastructure, local-first developer tools, and applied AI
							systems I have designed and shipped.
						</p>
					</header>
				</Reveal>
				<Reveal immediate className="mb-8">
					<AsciiFlow className="h-[220px]" />
				</Reveal>
				<div className="grid gap-4 sm:grid-cols-2">
					{allProjects.map((project, index) => (
						<Reveal
							key={project.name}
							delay={(index % 3) as 0 | 1 | 2}
							className="h-full"
						>
							<FeatureCard
								title={project.name}
								description={project.desc}
								href={project.href}
								external={project.external}
								logo={project.logo}
								logoInverts={project.logoInverts}
								badge={
									project.comingSoon ? (
										<SoonLabel />
									) : project.isNew ? (
										<NewLabel />
									) : undefined
								}
								date={project.date ? cardDate(project.date) : undefined}
							/>
						</Reveal>
					))}
				</div>
			</Shell>
		</Section>
	);
}
