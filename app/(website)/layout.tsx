import { ConditionalFooter } from "@/components/ds/conditional-footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	description: SITE_DESCRIPTION,
	openGraph: {
		description: SITE_DESCRIPTION,
		siteName: SITE_NAME,
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
		description: SITE_DESCRIPTION,
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
