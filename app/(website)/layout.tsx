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
