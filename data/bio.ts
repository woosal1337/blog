// The companies behind each hoverable phrase in the bio. One entry for each
// term id used by <BioTerm> on the About page and the landing page.
//
// iconSrc is optional. Without it the component falls back to the site's
// favicon trick, the same one about/page.tsx uses for its resume rows.

export type BioLogo = {
	name: string;
	/** Drives the favicon fallback. Leave it out when the entry uses a glyph. */
	href?: string;
	iconSrc?: string;
	/** An emoji, shown in place of an icon. Used by the language flags. */
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
	// The landing page collapses the three earlier jobs into one phrase.
	before: [
		{ name: "Ahlatcı Holding", href: "https://www.ahlatci.com.tr/" },
		{ name: "Anadolu Ajansı", href: "https://aa.com.tr/" },
		{ name: "Etrapay", href: "https://www.etrapay.com/" },
	],
};
