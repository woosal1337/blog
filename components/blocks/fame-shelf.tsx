import { FameCard } from "@/components/ds/fame-card";
import { fame } from "@/data/fame";
import { cn } from "@/lib/utils";

export function FameShelf({ className }: { className?: string }) {
	return (
		<ul
			className={cn(
				"grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4",
				className,
			)}
		>
			{fame.map((person) => (
				<li key={person.slug}>
					<FameCard
						href={`/wall/${person.slug}`}
						name={person.name}
						role={person.role}
						portrait={person.portrait}
						portraitAlt={person.portraitAlt}
						portraitPosition={person.portraitPosition}
						sizes="(max-width: 640px) 30vw, 160px"
					/>
				</li>
			))}
		</ul>
	);
}
