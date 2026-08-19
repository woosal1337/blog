import { SoundProvider } from "@/components/providers/sound-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OA_COLLECTOR_URL, OA_TRACKING_KEY } from "@/lib/analytics";
import { SITE_DESCRIPTION, SITE_HANDLE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	applicationName: SITE_NAME,
	title: {
		default: "Ege Vusal Chelebi — AI Engineer, Developer, and Researcher",
		template: "%s · Ege Vusal Chelebi",
	},
	description: SITE_DESCRIPTION,
	alternates: {
		types: { "application/rss+xml": "/blog/rss.xml" },
	},
	authors: [{ name: SITE_NAME, url: "/about" }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	icons: {
		icon: [
			{ url: "/favicon.ico?v=3", sizes: "any" },
			{ url: "/favicon.png?v=3", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
		],
	},
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
				alt: "Ege Vusal Chelebi — AI engineer, developer, and researcher",
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
		site: SITE_HANDLE,
		creator: SITE_HANDLE,
		description: SITE_DESCRIPTION,
		images: ["/og"],
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
			className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
			suppressHydrationWarning
		>
			<head>
				{/*
				 * Self-hosted OpenAnalytics. It patches the history API, so App
				 * Router navigations count as pageviews with no extra code, and
				 * it reports Core Web Vitals on the first hidden without help.
				 * The key is public and write-only — see lib/analytics.ts.
				 */}
				<script
					async
					src={`${OA_COLLECTOR_URL}/oa.js`}
					data-key={OA_TRACKING_KEY}
					data-collector={OA_COLLECTOR_URL}
				/>
			</head>
			<body>
				{/* Film-grain noise over the black bg. opacity + baseFrequency are the tuning knobs. */}
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
				<SoundProvider />
				<Analytics />
			</body>
		</html>
	);
}
