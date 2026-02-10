import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MusicProvider } from "@/components/providers/music-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://chele.bi"),
	title: "ege",
	description: "code, finance, entrepreneurship, music.",
	icons: {
		icon: [
			{ url: "/favicon.png", sizes: "32x32", type: "image/png" },
			{ url: "/logo.png", sizes: "32x32", type: "image/png" },
			{ url: "/avatar.png", sizes: "192x192", type: "image/png" },
			{ url: "/avatar.png", sizes: "512x512", type: "image/png" },
		],
		apple: [
			{ url: "/avatar.png", sizes: "180x180", type: "image/png" },
		],
	},
	openGraph: {
		title: "ege",
		description: "code, finance, entrepreneurship, music.",
		url: "https://chele.bi",
		siteName: "ege",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/avatar.png",
				width: 1200,
				height: 630,
				alt: "ege",
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
		title: "ege",
		card: "summary_large_image",
	},
	verification: {
		// google: '',
		// yandex: '',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					storageKey="ned.im.theme"
					disableTransitionOnChange
				>
					<MusicProvider>
						<TooltipProvider
							delayDuration={10}
							skipDelayDuration={10}
							disableHoverableContent
						>
							<div className="flex w-full h-full min-h-full">
								<div className="relative flex w-full h-full flex-col">
									{children}
								</div>
							</div>
					</TooltipProvider>
					</MusicProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
