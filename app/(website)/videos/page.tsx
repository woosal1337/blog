import { AsciiTunnel } from "@/components/blocks/ascii/ascii-tunnel";
import { BackButton } from "@/components/ds/back-button";
import { EpisodeCard } from "@/components/ds/episode-card";
import { Reveal } from "@/components/ds/reveal";
import { Section, Shell } from "@/components/ds/shell";
import { VideoIndexJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";
import { getAllEpisodes } from "@/lib/videos";

export const metadata = createPageMetadata({
	title: "Videos on AI Engineering, Agents, and Claim Tests",
	description:
		"Video essays and claim tests by AI engineer Ege Vusal Chelebi on AI agents, context engineering, and applied research — each episode published with the skill, linter, or data behind it.",
	socialDescription:
		"Claim tests and deep dives on AI engineering and agents, each published with the skill, linter, or data behind it.",
	path: "/videos",
});

function cardDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export default async function VideosPage() {
	const episodes = await getAllEpisodes();
	const [latest, ...rest] = episodes;

	return (
		<>
			<VideoIndexJsonLd episodes={episodes} />
			<Section>
				<Shell width="column">
					<BackButton className="mb-8" />
					<Reveal immediate className="mb-8">
						<header>
							<h1 className="font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
								Videos
							</h1>
							<p className="mt-3 max-w-[620px] font-ui text-[15px] leading-relaxed text-ink-mute">
								Claim tests and deep dives on AI engineering and agents. Every
								episode ships with what it was built on, so you can check the
								work.
							</p>
						</header>
					</Reveal>

					<Reveal immediate className="mb-6">
						<AsciiTunnel className="h-[180px]" />
					</Reveal>

					{episodes.length === 0 ? (
						<p className="font-ui text-[15px] text-ink-mute">
							No episodes yet.
						</p>
					) : (
						<>
							<Reveal immediate>
								<EpisodeCard
									featured
									isNew
									href={`/videos/${latest.slug}`}
									title={latest.title}
									summary={latest.summary}
									date={cardDate(latest.date)}
									thumbnail={latest.thumbnail}
									thumbnailAlt={latest.thumbnailAlt}
									runtime={latest.runtime}
								/>
							</Reveal>
							{rest.length > 0 && (
								<div className="mt-4 grid gap-4 md:grid-cols-2">
									{rest.map((episode, index) => (
										<Reveal key={episode.slug} delay={index % 2 === 0 ? 1 : 2}>
											<EpisodeCard
												href={`/videos/${episode.slug}`}
												title={episode.title}
												summary={episode.summary}
												date={cardDate(episode.date)}
												thumbnail={episode.thumbnail}
												thumbnailAlt={episode.thumbnailAlt}
												runtime={episode.runtime}
											/>
										</Reveal>
									))}
								</div>
							)}
						</>
					)}
				</Shell>
			</Section>
		</>
	);
}
