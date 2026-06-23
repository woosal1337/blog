import { cn } from "@/lib/utils";

/*
 * Pixel-art monogram. A blocky "E" drawn on a grid, rendered as merged <rect>
 * runs with shape-rendering="crispEdges" so it stays razor-sharp at any size —
 * the same technique oak.space uses for its mark. Scales with `1em`, so font
 * size controls the glyph size.
 */

// '#' = filled cell. 7 wide x 10 tall.
const GRID = [
	"#######",
	"#######",
	"##.....",
	"##.....",
	"######.",
	"######.",
	"##.....",
	"##.....",
	"#######",
	"#######",
];

const W = GRID[0].length;
const H = GRID.length;

// Merge consecutive filled cells in each row into a single rect.
function rects() {
	const out: { x: number; y: number; w: number }[] = [];
	GRID.forEach((row, y) => {
		let x = 0;
		while (x < W) {
			if (row[x] === "#") {
				let len = 1;
				while (x + len < W && row[x + len] === "#") len++;
				out.push({ x, y, w: len });
				x += len;
			} else {
				x++;
			}
		}
	});
	return out;
}

const RECTS = rects();

export function PixelLogo({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${W} ${H}`}
			width="1em"
			height="1em"
			fill="currentColor"
			shapeRendering="crispEdges"
			aria-hidden="true"
			className={cn("pixelated inline-block", className)}
			style={{ width: "0.7em", height: "1em" }}
		>
			{RECTS.map((r) => (
				<rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} />
			))}
		</svg>
	);
}
