import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Books",
	description: "The bookshelf. Everything read to the last page.",
};

export default function BooksLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
