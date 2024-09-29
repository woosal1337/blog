import type { Metadata } from "next";

import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { HeaderGradient } from "@/components/blocks/header-gradient";

export const metadata: Metadata = {
	metadataBase: new URL("https://vusal.tr"),
	title: {
		default: "Vusal Ismayilov",
		template: "%s | Vusal Ismayilov",
	},
	description: "Developer, entrepreneur, and creator.",
	openGraph: {
		title: "Vusal Ismayilov",
		description: "Developer, entrepreneur, and creator.",
		url: "https://vusal.tr",
		siteName: "Vusal Ismayilov",
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
		title: "Vusal Ismayilov",
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
	return (
		<>
			<HeaderGradient />
			<div className="relative flex w-full flex-col">
				<Header />
				<main className="flex-auto">{children}</main>
				<Footer />
			</div>
			<div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full" />
		</>
	);
}
