const EM = "font-serif text-[1.06em] italic text-ink-soft";

const LINES: Array<[string, string, string]> = [
	["Lost in the ", "contours", "."],
	["Off the ", "map", "."],
	["This page ", "wandered", " off."],
	["Nothing ", "lives", " here."],
	["", "Uncharted", " territory."],
	["The trail ", "ends", " here."],
	["No ", "landmarks", " in sight."],
	["You have drifted ", "off course", "."],
	["This ", "elevation", " does not exist."],
	["A blank spot on the ", "map", "."],
];

const lineHtml = ([before, em, after]: [string, string, string]) =>
	`${before}<span class="${EM}">${em}</span>${after}`;

export function NotFoundLine() {
	const swap = `(()=>{var L=${JSON.stringify(
		LINES.map(lineHtml),
	)};document.getElementById("nf-line").innerHTML=L[Math.floor(Math.random()*L.length)]})()`;

	return (
		<>
			<p
				id="nf-line"
				className="mt-4 font-ui text-[16px] text-ink-mute"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static site-owned strings
				dangerouslySetInnerHTML={{ __html: lineHtml(LINES[0]) }}
			/>
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static site-owned strings
				dangerouslySetInnerHTML={{ __html: swap }}
			/>
		</>
	);
}
