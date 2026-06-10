"use client";

import { Gallery, GalleryItem } from "@/components/ds/gallery";
import { PageHero } from "@/components/ds/page-hero";
import { SearchInput } from "@/components/ds/search-input";
import { SegmentedFilter } from "@/components/ds/segmented";
import {
	SheetDialog,
	SheetDialogContent,
	SheetDialogDescription,
	SheetDialogTitle,
} from "@/components/ds/sheet-dialog";
import { Section, Shell } from "@/components/ds/shell";
import { Tag } from "@/components/ds/tag";
import {
	type Book,
	type BookCategory,
	bookCategories,
	books,
} from "@/data/books";
import Image from "next/image";
import { useMemo, useState } from "react";

type Filter = BookCategory | "all";

const categoryLabel = new Map(
	bookCategories.map((category) => [category.key, category.label]),
);

function BookRow({
	book,
	onSelect,
}: {
	book: Book;
	onSelect: (book: Book) => void;
}) {
	return (
		<button
			type="button"
			onClick={() => onSelect(book)}
			className="-mx-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors duration-200 ease-house hover:bg-muted"
		>
			{book.cover ? (
				<div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-[4px] bg-muted">
					<Image
						src={book.cover}
						alt=""
						fill
						sizes="32px"
						className="object-cover"
					/>
				</div>
			) : (
				<div className="h-12 w-8 shrink-0 rounded-[4px] bg-muted" />
			)}
			<span className="min-w-0 flex-1">
				<span className="block truncate text-footnote text-foreground">
					{book.title}
				</span>
				<span className="block truncate text-caption text-tertiary">
					{book.author}
				</span>
			</span>
			<span className="shrink-0 text-caption text-tertiary">
				{categoryLabel.get(book.category) ?? book.category}
			</span>
		</button>
	);
}

export default function BooksPage() {
	const [filter, setFilter] = useState<Filter>("all");
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<Book | null>(null);

	const filtered = useMemo(() => {
		let result =
			filter === "all" ? books : books.filter((b) => b.category === filter);
		if (search.trim()) {
			const q = search.toLowerCase();
			result = result.filter(
				(b) =>
					b.title.toLowerCase().includes(q) ||
					b.author.toLowerCase().includes(q),
			);
		}
		return result;
	}, [filter, search]);

	const completed = books.filter((b) => b.progress === 100).length;
	const filterOptions = [
		{ value: "all" as Filter, label: `All (${books.length})` },
		...bookCategories.map((cat) => ({
			value: cat.key as Filter,
			label: `${cat.label} (${books.filter((b) => b.category === cat.key).length})`,
		})),
	];

	return (
		<>
			<PageHero
				title="Books"
				caption={`${completed} of ${books.length} read to the last page`}
			/>

			<Section tint>
				<Shell>
					<h2 className="text-headline">Shelf</h2>
				</Shell>
				<Gallery ariaLabel="Shelf" className="mt-8">
					{filtered.map((book) => (
						<GalleryItem key={`${book.title}-${book.author}`}>
							<button
								type="button"
								onClick={() => setSelected(book)}
								className="group w-[120px] text-left sm:w-[140px]"
							>
								{book.cover ? (
									<div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-background">
										<Image
											src={book.cover}
											alt=""
											fill
											sizes="140px"
											className="object-cover transition-opacity duration-200 ease-house group-hover:opacity-85"
										/>
									</div>
								) : (
									<div className="flex aspect-[2/3] w-full items-center justify-center rounded-md bg-background p-3">
										<span className="text-center text-caption text-muted-foreground">
											{book.title}
										</span>
									</div>
								)}
								<span className="mt-3 block truncate text-footnote text-foreground">
									{book.title}
								</span>
								<span className="block truncate text-caption text-tertiary">
									{book.author}
								</span>
							</button>
						</GalleryItem>
					))}
					{filtered.length === 0 && (
						<GalleryItem>
							<p className="py-8 text-body text-muted-foreground">
								No books match.
							</p>
						</GalleryItem>
					)}
				</Gallery>
			</Section>

			<Section>
				<Shell>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<h2 className="text-headline">All books</h2>
						<SearchInput
							placeholder="Find in shelf"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="sm:w-64"
							aria-label="Find in shelf"
						/>
					</div>

					<SegmentedFilter
						ariaLabel="Filter by category"
						options={filterOptions}
						value={filter}
						onChange={setFilter}
						className="mt-6"
					/>

					<ul className="mt-6">
						{filtered.map((book) => (
							<li
								key={`${book.title}-${book.author}`}
								className="border-b border-border/60 last:border-0"
							>
								<BookRow book={book} onSelect={setSelected} />
							</li>
						))}
					</ul>

					{filtered.length === 0 && (
						<p className="py-16 text-center text-body text-muted-foreground">
							No books match. Try a different search or filter.
						</p>
					)}
				</Shell>
			</Section>

			<SheetDialog
				open={!!selected}
				onOpenChange={(open) => !open && setSelected(null)}
			>
				{selected && (
					<SheetDialogContent className="max-w-[560px]">
						{selected.cover && (
							<div className="relative mx-auto mb-6 h-48 w-32 overflow-hidden rounded-md bg-muted">
								<Image
									src={selected.cover}
									alt=""
									fill
									sizes="128px"
									className="object-cover"
								/>
							</div>
						)}
						<SheetDialogTitle className="sr-only">
							{selected.title}
						</SheetDialogTitle>
						<SheetDialogDescription className="mt-1 text-center">
							By {selected.author}
						</SheetDialogDescription>
						<div className="mt-4 flex items-center justify-center gap-2">
							<Tag>
								{categoryLabel.get(selected.category) ?? selected.category}
							</Tag>
						</div>
					</SheetDialogContent>
				)}
			</SheetDialog>
		</>
	);
}
