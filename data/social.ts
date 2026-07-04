export type SocialPlatform = "x" | "instagram" | "github";

export type SocialItem = {
	text: string;
	date: string;
	meta?: string;
};

export type SocialFeed = {
	label: string;
	handle: string;
	href: string;
	items: SocialItem[];
	gallery?: string[];
};

export const X_FEED: SocialFeed = {
	label: "X",
	handle: "@woosal1337",
	href: "https://x.com/woosal1337",
	items: [
		{
			text: "told my memory.md about you…",
			date: "Jul 2",
		},
		{
			text: "agent native era.",
			date: "Jun 23",
		},
		{
			text: "Folio is open source now. A meeting recorder for macOS that runs whisper and pyannote on your own machine.",
			date: "Jun 9",
		},
	],
};

export const INSTAGRAM_FEED: SocialFeed = {
	label: "Instagram",
	handle: "@woosal1337",
	href: "https://www.instagram.com/woosal1337/",
	items: [],
	gallery: [
		"/social/ig-1.jpg",
		"/social/ig-2.jpg",
		"/social/ig-3.jpg",
		"/social/ig-4.jpg",
		"/social/ig-5.jpg",
		"/social/ig-6.jpg",
	],
};

export const GITHUB_FALLBACK: SocialFeed = {
	label: "GitHub",
	handle: "@woosal1337",
	href: "https://github.com/woosal1337",
	items: [
		{
			text: "vaulted · Local-first .env and secrets manager, MCP-native",
			date: "Jul 4",
		},
		{
			text: "blog · My blog website",
			date: "Jul 3",
		},
		{
			text: "folio · Local-first meeting notes for macOS",
			date: "Jul 1",
		},
	],
};
