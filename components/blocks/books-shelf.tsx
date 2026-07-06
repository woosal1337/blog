"use client";

import { Gallery, GalleryItem } from "@/components/ds/gallery";
import {
	SheetDialog,
	SheetDialogContent,
	SheetDialogDescription,
	SheetDialogTitle,
} from "@/components/ds/sheet-dialog";
import { Tag } from "@/components/ds/tag";
import { type Book, bookCategories, books } from "@/data/books";
import Image from "next/image";
import { useState } from "react";

const categoryLabel = new Map(
	bookCategories.map((category) => [category.key, category.label]),
);

/** The bookshelf slider, lifted verbatim from the old /books page: a full-bleed
 * scroll-snap gallery of covers, each opening a detail sheet. */
export function BooksShelf({ className }: { className?: string }) {
	const [selected, setSelected] = useState<Book | null>(null);

	return (
		<>
			<Gallery ariaLabel="Shelf" className={className} startCentered>
				{books.map((book) => (
					<GalleryItem key={`${book.title}-${book.author}`}>
						<button
							type="button"
							data-sound="card"
							onClick={() => setSelected(book)}
							className="group w-[120px] text-left sm:w-[140px]"
						>
							{book.cover ? (
								<div className="relative aspect-[2/3] w-full overflow-hidden rounded-[12px] border border-line bg-paper transition-colors duration-240 ease-house group-hover:border-line-strong">
									<Image
										src={book.cover}
										alt=""
										fill
										sizes="140px"
										className="object-cover transition-opacity duration-240 ease-house group-hover:opacity-80"
									/>
								</div>
							) : (
								<div className="flex aspect-[2/3] w-full items-center justify-center rounded-[12px] border border-line bg-paper p-3 transition-colors duration-240 ease-house group-hover:border-line-strong">
									<span className="text-center font-ui text-[12px] text-ink-soft">
										{book.title}
									</span>
								</div>
							)}
							<span className="mt-3 block truncate font-ui text-[13px] text-ink">
								{book.title}
							</span>
							<span className="block truncate font-ui text-[12px] text-ink-mute">
								{book.author}
							</span>
						</button>
					</GalleryItem>
				))}
			</Gallery>

			<SheetDialog
				open={!!selected}
				onOpenChange={(open) => !open && setSelected(null)}
			>
				{selected && (
					<SheetDialogContent className="max-w-[560px]">
						{selected.cover && (
							<div className="relative mx-auto mb-6 h-48 w-32 overflow-hidden rounded-[12px] border border-line bg-paper-2">
								<Image
									src={selected.cover}
									alt=""
									fill
									sizes="128px"
									className="object-cover"
								/>
							</div>
						)}
						<SheetDialogTitle className="text-center font-ui text-title text-foreground">
							{selected.title}
						</SheetDialogTitle>
						<SheetDialogDescription className="mt-1 text-center font-ui text-ink-soft">
							By {selected.author}
						</SheetDialogDescription>
						<div className="mt-5 flex items-center justify-center gap-2">
							<Tag>
								{categoryLabel.get(selected.category) ?? selected.category}
							</Tag>
						</div>
						<div className="mx-auto mt-6 max-w-[260px]">
							<div className="flex items-center justify-between">
								<span className="font-ui text-[12px] text-ink-mute">
									Progress
								</span>
								<span className="font-ui text-[12px] tabular-nums text-ink-soft">
									{selected.progress}%
								</span>
							</div>
							<div
								aria-hidden="true"
								className="mt-2 h-2.5 w-full overflow-hidden rounded-[4px] border border-line"
							>
								<div
									className="h-full bg-foreground"
									style={{ width: `${selected.progress}%` }}
								/>
							</div>
						</div>
					</SheetDialogContent>
				)}
			</SheetDialog>
		</>
	);
}
