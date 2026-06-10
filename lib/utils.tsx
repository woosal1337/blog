import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [
				{
					text: [
						"caption",
						"label",
						"footnote",
						"body",
						"subhead",
						"eyebrow",
						"title",
						"headline",
						"display",
					],
				},
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formattedDate = (date: string) =>
	new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
	});

export const workExperience = [
	{
		title: "AI Engineer",
		company: "Refik Anadol Studio",
		url: "https://refikanadolstudio.com/",
		type: "full-time",
		period: "2026-now",
		description:
			"Media arts and AI studio pioneering generative AI and data-driven artworks.",
		tags: ["ai", "generative", "media arts"],
		active: true,
	},
	{
		title: "Founding Engineer",
		company: "Ahlatcı Holding",
		url: "https://www.ahlatci.com.tr/",
		type: "full-time",
		period: "2025-2026",
		description: "Stealth fintech company project.",
		tags: ["react native", "expo", "python", "fintech"],
		active: false,
	},
	{
		title: "Consultant",
		company: "Anadolu Ajansı",
		url: "https://aa.com.tr/",
		type: "contract",
		period: "2025",
		description: "AI-driven system designs and integrations.",
		tags: ["ai", "system design", "consulting"],
		active: false,
	},
	{
		title: "Developer",
		company: "Etrapay (acquired)",
		url: "https://www.etrapay.com/",
		type: "full-time",
		period: "2023-2024",
		description:
			"Next-gen layer 1 blockchain for instant, zero-fee global payments.",
		tags: ["full-stack", "fintech", "payments"],
		active: false,
	},
];

export const education = [
	{
		title: "MSc, Computer Engineering · Medipol University",
		url: "https://www.medipol.edu.tr/",
		description: "Started the master's degree in 2024.",
		period: "2024-now",
	},
	{
		title: "BSc, Computer Engineering · Medipol University",
		url: "https://www.medipol.edu.tr/",
		description: "Graduated in 2024.",
		period: "2019-2024",
	},
];

export const fellowships = [
	{
		title: "Fellow & Alumni",
		org: "Türkiye Girişimcilik Vakfı",
		url: "https://www.girisimcilikvakfi.org/",
		period: "2022-now",
		description: "Entrepreneurship foundation fellow (2022) and alumni.",
	},
	{
		title: "Incubation",
		org: "sabah.lab / sabah.hub · Baku",
		url: "https://sabahhub.com/",
		period: "2024",
		description: "The biggest startup acceleration program in Azerbaijan.",
	},
];

export const awards = [
	{
		name: "AA Media Hackathon",
		place: "Top 10",
		year: "2024",
		description: "One of 2 projects acquired out of 133 teams.",
	},
	{
		name: "ReFi Hackathon",
		place: "3rd place",
		year: "2022",
		description: "Akbank x Avalanche hackathon, 19 teams.",
	},
	{
		name: "AÇIKHACK Blockchain",
		place: "1st place",
		year: "2022",
		description: "Blockchain, NFT, metaverse hackathon, 41 teams.",
	},
	{
		name: "Avalanche Hacks",
		place: "2nd place",
		year: "2021",
		description: "Blockchain gaming track, Istanbul.",
	},
	{
		name: "Teknofest",
		place: "Finalist",
		year: "2021",
		description: "Fighting UAVs, Medipol Autonomous Vehicles.",
	},
];

export const allProjects: Array<{
	name: string;
	desc: string;
	href: string;
	logo?: string;

	logoInverts?: boolean;
	external: boolean;
	isNew?: boolean;
}> = [
	{
		name: "Folio",
		desc: "Meeting recorder for macOS. Local-first transcription and diarization, no cloud.",
		href: "/blog/folio",
		logo: "/folio-logo.png",
		external: false,
		isNew: true,
	},
	{
		name: "Soft Club UI",
		desc: "Gen X soft club React component library. Dark glass, phosphor green and restrained Y2K cyber, shadcn-compatible.",
		href: "https://github.com/cobanov/soft-club-ui",
		logo: "/soft-club-ui-logo.png",
		external: true,
		isNew: true,
	},
	{
		name: "Pulsar",
		desc: "AI-powered real-time market intelligence platform for stocks and currencies.",
		href: "https://pulsar.investments",
		logo: "/pulsar-logo.png",
		logoInverts: true,
		external: true,
	},
	{
		name: "Clinora",
		desc: "AI-powered call center platform with voice agents.",
		href: "https://clinora.ai",
		logo: "/clinora-logo.png",
		logoInverts: true,
		external: true,
	},
	{
		name: "Learnity",
		desc: "AI-powered learning platform where students collaborate.",
		href: "https://learnity.ai",
		logo: "/learnity-logo.png",
		external: true,
	},
	{
		name: "meclis",
		desc: "A personal advisory board of AI personas. Route decisions through Paul Graham, Seth Godin and Robert Greene.",
		href: "https://github.com/woosal1337/meclis",
		logo: "/meclis-logo.png",
		external: true,
	},
	{
		name: "media-mcp",
		desc: "MCP server for media work. Transcription, video frames, tweets and social data for agents.",
		href: "https://github.com/woosal1337/media-mcp",
		logo: "/media-mcp-logo.png",
		external: true,
	},
	{
		name: "stack",
		desc: "CLI that lists every plugin, skill, MCP, agent and hook installed across Claude Code, Codex and Cursor.",
		href: "https://github.com/woosal1337/stack",
		logo: "/stack-logo.png",
		external: true,
	},
];
