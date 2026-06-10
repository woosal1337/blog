import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Music",
	description: "The music library, synced weekly from Spotify liked songs.",
};

export default function MusicLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
