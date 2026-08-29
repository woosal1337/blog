export type BioLogo = {
	name: string;
	href?: string;
	iconSrc?: string;
	glyph?: string;
};

export const BIO_TERMS: Record<string, BioLogo[]> = {
	university: [
		{ name: "Medipol, MSc", href: "https://www.medipol.edu.tr/" },
		{ name: "Medipol, BSc", href: "https://www.medipol.edu.tr/" },
	],
	payments: [{ name: "Etrapay", href: "https://www.etrapay.com/" }],
	fintech: [{ name: "Ahlatcı Holding", href: "https://www.ahlatci.com.tr/" }],
	newsroom: [{ name: "Anadolu Ajansı", href: "https://aa.com.tr/" }],
	hackathons: [
		{ name: "AA Media", href: "https://www.aa.com.tr/" },
		{ name: "Akbank ReFi", href: "https://www.akbank.com/" },
		{ name: "Avalanche", href: "https://www.avax.network/" },
		{
			name: "AÇIKHACK",
			href: "https://www.turkiyeacikkaynakplatformu.com/",
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
		{ name: "Ahlatcı Holding", href: "https://www.ahlatci.com.tr/" },
		{ name: "Anadolu Ajansı", href: "https://aa.com.tr/" },
		{ name: "Etrapay", href: "https://www.etrapay.com/" },
	],
};
