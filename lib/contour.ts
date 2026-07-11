const PI_DIGITS =
	"1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679" +
	"8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196" +
	"4428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273" +
	"7245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094" +
	"3305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912" +
	"9833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132" +
	"0005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235" +
	"4201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859" +
	"5024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303" +
	"5982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

const SIZE = 256;
const CENTER = SIZE / 2;
const LOOPS = 8;
const VARIANT = "2";

type Next = (length?: number) => number;
type Point = { x: number; y: number };

async function sha256Bytes(input: string): Promise<number[]> {
	const data = new TextEncoder().encode(input);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(digest));
}

async function makePiStream(seed: string): Promise<Next> {
	const bytes = await sha256Bytes(`pi-scribble-logo:${seed}`);
	let cursor =
		bytes.reduce((sum, byte, index) => sum + byte * (index + 1), 0) %
		PI_DIGITS.length;
	let turn = 0;

	return (length = 6) => {
		let digits = "";
		while (digits.length < length) {
			const piDigit = Number(PI_DIGITS[cursor % PI_DIGITS.length]);
			const mixedDigit = (piDigit + bytes[(cursor + turn) % bytes.length]) % 10;
			digits += String(mixedDigit);
			cursor += 1 + (bytes[(turn + cursor) % bytes.length] % 3);
			turn += 1;
		}
		return Number(digits) / 10 ** length;
	};
}

function pick(next: Next, min: number, max: number) {
	return min + next() * (max - min);
}

function pickInt(next: Next, min: number, max: number) {
	return Math.round(pick(next, min, max));
}

function polyline(points: Point[]) {
	const d = points
		.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
		.join(" ");
	return `${d} Z`;
}

function escapeXml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

type ContourOptions = {
	nonScalingStroke?: boolean;
	strokeWidth?: number;
};

export async function generateContour(
	seed: string,
	color = "#f5f5f5",
	options: ContourOptions = {},
): Promise<string> {
	const shapeNext = await makePiStream(`${seed}:variant:${VARIANT}`);
	const generatedStroke = pick(shapeNext, 1.4, 2.2);
	const stroke = options.strokeWidth ?? generatedStroke;
	const vectorEffect = options.nonScalingStroke
		? ' vector-effect="non-scaling-stroke"'
		: "";
	const harmonics = Array.from({ length: 4 }, () => ({
		freq: pickInt(shapeNext, 2, 6),
		amp: pick(shapeNext, 4, 12),
		phase: pick(shapeNext, 0, Math.PI * 2),
	}));
	const offsetX = pick(shapeNext, -1.5, 1.5);
	const offsetY = pick(shapeNext, -1.5, 1.5);
	const base0 = 18;
	const step = (100 - base0) / LOOPS;
	const paths: string[] = [];

	for (let c = 0; c < LOOPS; c += 1) {
		const base = base0 + c * step;
		const cx = CENTER + offsetX * c;
		const cy = CENTER + offsetY * c;
		const grow = 0.4 + (0.6 * c) / LOOPS;
		const samples = 200;
		const points: Point[] = [];

		for (let i = 0; i <= samples; i += 1) {
			const theta = (i / samples) * Math.PI * 2;
			let r = base;
			for (const h of harmonics)
				r += h.amp * Math.sin(h.freq * theta + h.phase) * grow;
			points.push({ x: cx + Math.cos(theta) * r, y: cy + Math.sin(theta) * r });
		}

		paths.push(
			`<path d="${polyline(points)}" fill="none" stroke="${color}" stroke-width="${stroke.toFixed(2)}"${vectorEffect} stroke-linecap="round" stroke-linejoin="round"/>`,
		);
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="Contour mark for ${escapeXml(
		seed,
	)}"><g>${paths.join("")}</g></svg>`;
}
