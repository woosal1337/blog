import { ConditionalFooter } from "@/components/ds/conditional-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://chele.bi"),
	description: "Developer, entrepreneur, and researcher.",
	openGraph: {
		description: "Developer, entrepreneur, and researcher.",
		siteName: "Ege",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/og",
				width: 1200,
				height: 630,
				alt: "Ege Chelebi — AI engineer, developer, and researcher",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		card: "summary_large_image",
		images: ["/og"],
	},
};

export default function WebsiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1">{children}</main>
			<ConditionalFooter />
		</div>
	);
}
