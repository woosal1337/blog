import { cn } from "@/lib/utils";

const FONT = "var(--font-geist-sans), Arial, sans-serif";

/**
 * Easter-egg "Parental Advisory" stamp, rebuilt from scratch as a monochrome
 * SVG in the authentic layout: spaced PARENTAL up top, a big bold ADVISORY set
 * in a white band, EXPLICIT CONTENT along the bottom. Themed via --ink/--paper
 * so it inverts with the palette. Use <ParentalAdvisory /> anywhere in a post,
 * or rely on the default stamp on the post template.
 */
export function ParentalAdvisory({
	className,
	title = "Parental Advisory — Explicit Content",
}: {
	className?: string;
	title?: string;
}) {
	return (
		<svg
			viewBox="0 0 200 122"
			role="img"
			aria-label={title}
			className={cn("inline-block h-auto w-40", className)}
		>
			<title>{title}</title>
			{/* Black field with a faint border so it reads as a sticker on dark. */}
			<rect
				x="0.75"
				y="0.75"
				width="198.5"
				height="120.5"
				fill="rgb(var(--paper))"
				stroke="rgb(var(--line))"
				strokeWidth="1.5"
			/>
			{/* PARENTAL — spaced, white on black */}
			<text
				x="100"
				y="29"
				textAnchor="middle"
				textLength="150"
				lengthAdjust="spacingAndGlyphs"
				fill="rgb(var(--ink))"
				fontFamily={FONT}
				fontWeight="700"
				fontSize="20"
			>
				PARENTAL
			</text>
			{/* White band holding ADVISORY */}
			<rect x="4" y="37" width="192" height="44" fill="rgb(var(--ink))" />
			<text
				x="100"
				y="72"
				textAnchor="middle"
				textLength="186"
				lengthAdjust="spacingAndGlyphs"
				fill="rgb(var(--paper))"
				fontFamily={FONT}
				fontWeight="800"
				fontSize="40"
			>
				ADVISORY
			</text>
			{/* EXPLICIT CONTENT — spaced, white on black */}
			<text
				x="100"
				y="106"
				textAnchor="middle"
				textLength="168"
				lengthAdjust="spacingAndGlyphs"
				fill="rgb(var(--ink))"
				fontFamily={FONT}
				fontWeight="700"
				fontSize="17"
			>
				EXPLICIT CONTENT
			</text>
		</svg>
	);
}
