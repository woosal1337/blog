import { BooksShelf } from "@/components/blocks/books-shelf";
import { BackButton } from "@/components/ds/back-button";
import { Reveal } from "@/components/ds/reveal";
import { Section, Shell } from "@/components/ds/shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
	title: "Shelf",
	description: "Books on Ege Vusal Chelebi's shelf.",
	socialDescription: "Books on my shelf.",
	path: "/wall",
});

export default function WallPage() {
	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<Reveal immediate>
					<h1 className="mb-10 font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
						Shelf
					</h1>
				</Reveal>
			</Shell>
			<BooksShelf />
		</Section>
	);
}
