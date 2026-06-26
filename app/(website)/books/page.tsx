"use client";

import { AsciiStars } from "@/components/blocks/ascii/ascii-stars";
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
			className="flex w-full items-center gap-4 px-3 py-3 text-left transition-colors duration-240 ease-house hover:bg-paper-2"
		>
			<span aria-hidden="true" className="shrink-0 text-footnote text-ink-mute">
				$
			</span>
			{book.cover ? (
				<div className="relative h-12 w-8 shrink-0 overflow-hidden border border-line bg-paper-2">
					<Image
						src={book.cover}
						alt=""
						fill
						sizes="32px"
						className="object-cover"
					/>
				</div>
			) : (
				<div className="h-12 w-8 shrink-0 border border-line bg-paper-2" />
			)}
			<span className="min-w-0 flex-1">
				<span className="block truncate text-footnote text-foreground">
					{book.title}
				</span>
				<span className="block truncate text-caption text-ink-mute">
					{book.author}
				</span>
			</span>
			<span className="shrink-0 text-caption tabular-nums text-ink-soft">
				{book.progress}%
			</span>
			<span className="oak-label hidden shrink-0 text-ink-mute sm:inline">
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
				eyebrow="books"
				title="~/books"
				caption={`${completed} of ${books.length} read to the last page`}
			/>

			<Section tint>
				<Shell>
					<AsciiStars className="mb-8 h-[240px]" />
					<p className="oak-label mb-3 text-ink-mute">// shelf</p>
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
									<div className="relative aspect-[2/3] w-full overflow-hidden border border-line bg-paper transition-colors duration-240 ease-house group-hover:border-line-strong">
										<Image
											src={book.cover}
											alt=""
											fill
											sizes="140px"
											className="object-cover transition-opacity duration-240 ease-house group-hover:opacity-80"
										/>
									</div>
								) : (
									<div className="flex aspect-[2/3] w-full items-center justify-center border border-line bg-paper p-3 transition-colors duration-240 ease-house group-hover:border-line-strong">
										<span className="text-center text-caption text-ink-soft">
											{book.title}
										</span>
									</div>
								)}
								<span className="mt-3 block truncate text-footnote text-foreground">
									{book.title}
								</span>
								<span className="block truncate text-caption text-ink-mute">
									{book.author}
								</span>
							</button>
						</GalleryItem>
					))}
					{filtered.length === 0 && (
						<GalleryItem>
							<p className="py-8 text-body text-ink-soft">No books match.</p>
						</GalleryItem>
					)}
				</Gallery>
			</Section>

			<Section>
				<Shell>
					<p className="oak-label mb-3 text-ink-mute">// all-books</p>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<h2 className="text-headline">All books</h2>
						<SearchInput
							placeholder="find in shelf"
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

					<ul className="mt-6 divide-y divide-line border-y border-line">
						{filtered.map((book) => (
							<li key={`${book.title}-${book.author}`}>
								<BookRow book={book} onSelect={setSelected} />
							</li>
						))}
					</ul>

					{filtered.length === 0 && (
						<p className="border-y border-line py-16 text-center text-body text-ink-soft">
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
							<div className="relative mx-auto mb-6 h-48 w-32 overflow-hidden border border-line bg-paper-2">
								<Image
									src={selected.cover}
									alt=""
									fill
									sizes="128px"
									className="object-cover"
								/>
							</div>
						)}
						<SheetDialogTitle className="text-center text-title text-foreground">
							{selected.title}
						</SheetDialogTitle>
						<SheetDialogDescription className="mt-1 text-center text-ink-soft">
							By {selected.author}
						</SheetDialogDescription>
						<div className="mt-5 flex items-center justify-center gap-2">
							<Tag>
								{categoryLabel.get(selected.category) ?? selected.category}
							</Tag>
						</div>
						<div className="mx-auto mt-6 max-w-[260px]">
							<div className="flex items-center justify-between">
								<span className="oak-label text-ink-mute">progress</span>
								<span className="text-caption tabular-nums text-ink-soft">
									{selected.progress}%
								</span>
							</div>
							<div
								aria-hidden="true"
								className="mt-2 h-2.5 w-full border border-line"
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
