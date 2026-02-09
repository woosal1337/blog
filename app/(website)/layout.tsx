import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://chele.bi"),
	title: "ege",
	description: "developer, entrepreneur, and creator.",
	openGraph: {
		title: "ege",
		description: "developer, entrepreneur, and creator.",
		url: "https://chele.bi",
		siteName: "ege",
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
		title: "ege",
		card: "summary_large_image",
	},
	verification: {
		// google: '',
		// yandex: '',
	},
};

export default function WebsiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
