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
			text: "peak animation experience.",
			date: "Aug 18",
		},
		{
			text: "the best self hosted analytics tool you can use in your websites if you are looking for simplicity and accuracy. @openanalyticshq",
			date: "Aug 18",
		},
		{
			text: "sana simdi ne mesajlar geliyordur…",
			date: "Aug 18",
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
	],
};
