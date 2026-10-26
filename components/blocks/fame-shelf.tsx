import { FameCard } from "@/components/ds/fame-card";
import { Gallery, GalleryItem } from "@/components/ds/gallery";
import { fame } from "@/data/fame";

export function FameShelf({ className }: { className?: string }) {
	return (
		<Gallery ariaLabel="Wall of fame" className={className} startCentered>
			{fame.map((person) => (
				<GalleryItem key={person.slug}>
					<div className="w-[168px]">
						<FameCard
							href={`/wall/${person.slug}`}
							name={person.name}
							role={person.role}
							portrait={person.portrait}
							portraitAlt={person.portraitAlt}
							portraitPosition={person.portraitPosition}
							sizes="168px"
						/>
					</div>
				</GalleryItem>
			))}
		</Gallery>
	);
}
