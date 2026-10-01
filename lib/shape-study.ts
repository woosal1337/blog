export type ShapeStudy = "mesh" | "ribbons" | "orbit" | "rings";

export interface StudyLine {
	points: number[];
	opacity: number;
}

export const STUDY_DURATION = 48;
const TAU = Math.PI * 2;

export function studyPhase(seconds: number): number {
	return (
		((((seconds % STUDY_DURATION) + STUDY_DURATION) % STUDY_DURATION) /
			STUDY_DURATION) *
		TAU
	);
}

export function shapeStudyLines(
	study: ShapeStudy,
	phase: number,
	width: number,
	height: number,
): StudyLine[] {
	const lines: StudyLine[] = [];
	const addLine = (
		count: number,
		opacity: number,
		point: (position: number) => [number, number],
	) => {
		const points: number[] = [];
		for (let i = 0; i <= count; i++) {
			const [x, y] = point(i / count);
			points.push(x, y);
		}
		lines.push({ points, opacity });
	};

	if (study === "mesh") {
		const fold = 0.75 + 0.25 * Math.sin(phase);
		const position = (u: number, v: number): [number, number] => {
			const envelope = Math.sin(Math.PI * u) ** 0.7;
			const wave =
				Math.sin(u * 9 + v * 3 + phase) * 0.58 +
				Math.sin(u * 16 - v * 5 - phase * 2) * 0.22;
			const twist = Math.sin(u * 7 - phase + v * 2);
			return [
				width * (0.04 + u * 0.92 + twist * Math.sin(Math.PI * v) * 0.022),
				height * (0.22 + v * 0.52 + wave * envelope * fold * 0.2),
			];
		};
		for (let row = 0; row <= 48; row++) {
			addLine(96, 0.42 + Math.sin((row / 48) * Math.PI) * 0.4, (u) =>
				position(u, row / 48),
			);
		}
		for (let column = 0; column <= 64; column++) {
			addLine(48, 0.22, (v) => position(column / 64, v));
		}
	}

	if (study === "ribbons") {
		for (let line = 0; line < 64; line++) {
			const v = line / 63;
			addLine(112, 0.32 + Math.sin(v * Math.PI) * 0.55, (u) => {
				const envelope = Math.sin(u * Math.PI) ** 0.6;
				const bend =
					Math.sin(u * 8 + phase + v * 1.8) * 0.18 +
					Math.sin(u * 13 - phase * 2 + v * 3) * 0.055;
				const fan = 0.18 + 0.18 * (0.5 + 0.5 * Math.cos(u * TAU + phase));
				return [
					width * (0.025 + u * 0.95),
					height * (0.47 + bend * envelope + (v - 0.5) * fan),
				];
			});
		}
	}

	if (study === "orbit") {
		const size = Math.min(width * 0.4, height * 0.85);
		for (let line = 0; line < 56; line++) {
			const v = line / 55;
			addLine(160, 0.24 + Math.sin(v * Math.PI) * 0.6, (u) => {
				const angle = u * TAU;
				const radius =
					0.59 +
					v * 0.34 +
					0.065 * Math.sin(angle * 3 + phase + v * 4) +
					0.035 * Math.cos(angle * 5 - phase * 2);
				const tilt = 0.36 + 0.12 * Math.sin(phase);
				const x = Math.cos(angle) * radius;
				const y = Math.sin(angle) * radius * tilt;
				const turn = -0.3 + 0.17 * Math.cos(phase);
				return [
					width * 0.5 + size * (x * Math.cos(turn) - y * Math.sin(turn)),
					height * 0.46 + size * (x * Math.sin(turn) + y * Math.cos(turn)),
				];
			});
		}
	}

	if (study === "rings") {
		const size = Math.min(width * 0.29, height * 0.37);
		for (let line = 0; line < 50; line++) {
			const v = line / 49;
			addLine(160, 0.3 + Math.sin(v * Math.PI) * 0.6, (u) => {
				const angle = u * TAU;
				const radius =
					0.45 +
					v * 0.6 +
					0.085 * Math.sin(angle * 3 + phase + v * 3) +
					0.05 * Math.cos(angle * 5 - phase * 2 + v * 2);
				return [
					width * 0.5 + size * Math.cos(angle) * radius * 1.28,
					height * 0.47 + size * Math.sin(angle) * radius,
				];
			});
		}
	}

	return lines;
}
