import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export const metadata: Metadata = {
	metadataBase: new URL("https://chele.bi"),
	title: {
		default: "Ege",
		template: "%s · Ege",
	},
	description: "Code, finance, entrepreneurship and AI.",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/favicon.png", sizes: "32x32", type: "image/png" },
			{ url: "/logo.png", sizes: "512x512", type: "image/png" },
			{ url: "/avatar.png", sizes: "1024x1024", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	openGraph: {
		description: "Code, finance, entrepreneurship and AI.",
		siteName: "Ege",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/avatar.png",
				width: 1024,
				height: 1024,
				alt: "Ege",
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
			className={`dark ${GeistMono.variable}`}
			suppressHydrationWarning
		>
			<body>
				{/* Film-grain noise over the black bg. ponytail: opacity + baseFrequency are the tuning knobs. */}
				<svg
					aria-hidden="true"
					className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.06] mix-blend-screen"
				>
					<filter id="noise-bg-fx">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.8"
							numOctaves="4"
							stitchTiles="stitch"
						/>
						<feColorMatrix type="saturate" values="0" />
					</filter>
					<rect width="100%" height="100%" filter="url(#noise-bg-fx)" />
				</svg>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					forcedTheme="dark"
					enableSystem={false}
					storageKey="chele.bi.theme"
					disableTransitionOnChange
				>
					<TooltipProvider>{children}</TooltipProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
