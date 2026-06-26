import { AsciiFlow } from "@/components/blocks/ascii/ascii-flow";
import { CTALink } from "@/components/ds/cta-link";
import { PageHero } from "@/components/ds/page-hero";
import { ProjectTile } from "@/components/ds/project-tile";
import { Reveal } from "@/components/ds/reveal";
import { Section, Shell } from "@/components/ds/shell";
import { SoonLabel } from "@/components/ds/tag";
import { allProjects } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Projects",
	description: "What I am building and what I have shipped.",
};

const tiles = allProjects.map((project) => ({
	...project,
	cta: project.external ? "Visit" : "Learn more",
}));

export default function ProjectsPage() {
	return (
		<>
			<PageHero
				eyebrow="projects"
				title="~/projects"
				caption="What I am building now and what already shipped"
			/>

			<Section>
				<Shell>
					<Reveal className="mb-8">
						<AsciiFlow className="h-[220px]" />
					</Reveal>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{tiles.map((tile, index) => (
							<Reveal
								key={tile.name}
								delay={(index % 3) as 0 | 1 | 2}
								className="h-full"
							>
								<ProjectTile
									eyebrow={tile.name}
									headline={tile.desc}
									theme="tint"
									actions={
										tile.comingSoon ? (
											<SoonLabel />
										) : (
											<CTALink
												href={tile.href}
												external={tile.external}
												className="text-footnote"
											>
												{tile.cta}
											</CTALink>
										)
									}
									icon={
										tile.logo ? (
											<Image
												src={tile.logo}
												alt={`${tile.name} logo`}
												width={40}
												height={40}
												className={
													tile.logoInverts
														? "size-10 object-contain invert dark:invert-0"
														: "size-10 object-contain"
												}
											/>
										) : undefined
									}
								/>
							</Reveal>
						))}
					</div>
				</Shell>
			</Section>
		</>
	);
}
