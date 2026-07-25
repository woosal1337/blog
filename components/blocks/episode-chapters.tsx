import {
	type EpisodeChapter,
	chapterSeconds,
	chapterUrl,
} from "@/lib/video-utils";

export function EpisodeChapters({
	chapters,
	youtubeId,
}: { chapters?: EpisodeChapter[]; youtubeId: string }) {
	if (!chapters?.length) return null;

	return (
		<section className="not-prose">
			<h2
				id="chapters"
				className="mb-3 mt-14 scroll-mt-24 font-ui text-[19px] font-semibold tracking-tight text-ink"
			>
				Chapters
			</h2>
			<ol className="flex flex-col">
				{chapters.map((chapter) => {
					const label = (
						<span className="flex items-baseline gap-3">
							<span className="w-[46px] shrink-0 font-mono text-[13px] tabular-nums text-ink-mute">
								{chapter.time}
							</span>
							<span className="min-w-0 font-ui text-[15px] text-ink">
								{chapter.title}
							</span>
						</span>
					);

					if (!youtubeId) {
						return (
							<li
								key={chapter.time}
								className="-mx-2 rounded-[10px] px-2 py-[7px]"
							>
								{label}
							</li>
						);
					}

					return (
						<li key={chapter.time}>
							<a
								href={chapterUrl(youtubeId, chapterSeconds(chapter.time))}
								target="_blank"
								rel="noopener noreferrer"
								className="group -mx-2 block rounded-[10px] px-2 py-[7px] transition-colors duration-200 ease-house hover:bg-white/[0.02]"
							>
								<span className="inline-block transition-transform duration-200 ease-house group-hover:translate-x-0.5">
									{label}
								</span>
							</a>
						</li>
					);
				})}
			</ol>
		</section>
	);
}
