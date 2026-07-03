import { AsciiFlow } from "@/components/blocks/ascii/ascii-flow";
import { BackButton } from "@/components/ds/back-button";
import { FeatureCard } from "@/components/ds/feature-card";
import { Reveal } from "@/components/ds/reveal";
import { Section, Shell } from "@/components/ds/shell";
import { NewLabel, SoonLabel } from "@/components/ds/tag";
import { allProjects } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
	description: "What I am building and what I have shipped.",
};

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
				<Reveal className="mb-8">
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
