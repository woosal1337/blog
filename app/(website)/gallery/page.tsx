import {
	type BentoFrame,
	GalleryBento,
} from "@/components/blocks/gallery-bento";
import { ReelField } from "@/components/blocks/gallery-reel";
import { BackButton } from "@/components/ds/back-button";
import { Reveal } from "@/components/ds/reveal";
import { Section, Shell } from "@/components/ds/shell";
import { getAllSets } from "@/lib/gallery";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
	title: "Gallery",
	description:
		"Photography, film, and made images by Ege Vusal Chelebi — sets from the road, the studio, and everyday life, with silent clips that play as you scroll.",
	socialDescription:
		"Photography, film, and made images. Sets from the road, the studio, and everyday life.",
	path: "/gallery",
});

export default async function GalleryPage() {
	const sets = await getAllSets();
	const frames: BentoFrame[] = sets.flatMap((set) =>
		set.frames.map((frame) => ({
			...frame,
			setSlug: set.slug,
			setTitle: set.title,
			setDate: set.date,
		})),
	);

	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<Reveal immediate>
					<header>
						<h1 className="font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
							Gallery
						</h1>
						<p className="mt-3 max-w-[620px] font-ui text-[15px] leading-relaxed text-ink-mute">
							Photographs, clips, and made images. One set for each place, or
							each idea that needed pictures instead of paragraphs.
						</p>
						<div className="group relative mt-6 h-[190px] overflow-hidden rounded-[14px] border border-line bg-[#060606]">
							<ReelField />
							<div
								className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#060606]"
								aria-hidden="true"
							/>
						</div>
					</header>
				</Reveal>
			</Shell>

			<Shell width="wide" className="mt-12">
				{frames.length === 0 ? (
					<Reveal immediate>
						<p className="py-[clamp(48px,10vw,120px)] text-center font-ui text-[15px] text-ink-mute">
							Cooking some content...
						</p>
					</Reveal>
				) : (
					<Reveal immediate>
						<GalleryBento frames={frames} />
					</Reveal>
				)}
			</Shell>
		</Section>
	);
}
