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
			text: "i just started a youtube channel. this is the first video.",
			date: "Jul 24",
		},
		{
			text: "on its way to becoming the best ADE so far, and almost no one is aware of it at all too @getsome_air",
			date: "Jul 22",
		},
		{
			text: "infinite canvases ftw",
			date: "Jul 17",
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
			text: "blog · My blog website",
			date: "Jul 25",
			meta: "★ 1",
		},
		{
			text: "folio · Local-first meeting notes for macOS",
			date: "Jul 23",
			meta: "★ 5",
		},
		{
			text: "vaulted · Local-first .env and secrets manager, MCP-native",
			date: "Jul 23",
			meta: "★ 2",
		},
	],
};
