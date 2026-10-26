export type BioLogo = {
	name: string;
	href?: string;
	iconSrc?: string;
	glyph?: string;
	mono?: boolean;
};

export const BIO_TERMS: Record<string, BioLogo[]> = {
	si: [{ name: "superintelligence" }],
	university: [
		{ name: "Medipol, MSc", href: "https://www.medipol.edu.tr/", mono: true },
		{ name: "Medipol, BSc", href: "https://www.medipol.edu.tr/", mono: true },
	],
	payments: [{ name: "Etrapay", href: "https://www.etrapay.com/", mono: true }],
	fintech: [
		{
			name: "Ahlatcı Holding",
			href: "https://www.ahlatci.com.tr/",
			mono: true,
		},
	],
	newsroom: [
		{ name: "Anadolu Ajansı", href: "https://aa.com.tr/", mono: true },
	],
	hackathons: [
		{ name: "AA Media", href: "https://www.aa.com.tr/", mono: true },
		{ name: "Akbank ReFi", href: "https://www.akbank.com/" },
		{ name: "Avalanche", href: "https://www.avax.network/" },
		{
			name: "AÇIKHACK",
			href: "https://www.aa.com.tr/tr/bilim-teknoloji/bilisim-vadisi-hackathon-yarismasina-ev-sahipligi-yapti/2589261",
		},
	],
	fellowships: [
		{
			name: "Girişimcilik Vakfı",
			href: "https://www.girisimcilikvakfi.org/",
		},
		{ name: "sabah.hub", href: "https://sabahhub.com/" },
	],
	languages: [
		{ name: "English", glyph: "🇬🇧" },
		{ name: "Turkish", glyph: "🇹🇷" },
		{ name: "Azerbaijani", glyph: "🇦🇿" },
		{ name: "Russian", glyph: "🇷🇺" },
	],
	studio: [
		{
			name: "Refik Anadol Studio",
			href: "https://refikanadolstudio.com/",
			iconSrc: "/icons/refikanadol.gif",
		},
	],
	before: [
		{
			name: "Ahlatcı Holding",
			href: "https://www.ahlatci.com.tr/",
			mono: true,
		},
		{ name: "Anadolu Ajansı", href: "https://aa.com.tr/", mono: true },
		{ name: "Etrapay", href: "https://www.etrapay.com/", mono: true },
	],
};
