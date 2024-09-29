import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const LexendFont = Lexend({
	subsets: ["latin"],
	variable: "--font-lexend",
});

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable} ${LexendFont.variable}`}
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
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
