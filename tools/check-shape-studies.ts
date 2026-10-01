import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import {
	STUDY_DURATION,
	STUDY_FPS,
	type ShapeStudy,
	batchStudyLines,
	shapeStudyLines,
	studyPhase,
	studySampleScale,
} from "../lib/shape-study";

const studies: ShapeStudy[] = ["mesh", "ribbons", "orbit", "rings"];
const sizes = [
	[272, 180],
	[342, 200],
	[632, 280],
] as const;
let frames = 0;
let longestFrame = 0;

for (const study of studies) {
	for (const [width, height] of sizes) {
		const first = shapeStudyLines(study, studyPhase(0), width, height);
		const last = shapeStudyLines(
			study,
			studyPhase(STUDY_DURATION),
			width,
			height,
		);
		assert.deepEqual(last, first, `${study}: the loop must close`);
		assert.deepEqual(
			shapeStudyLines(study, studyPhase(STUDY_DURATION * 10), width, height),
			first,
			`${study}: later loops must return to the same geometry`,
		);
		assert.notDeepEqual(
			shapeStudyLines(study, studyPhase(12), width, height),
			first,
			`${study}: the geometry must move`,
		);
		const before = shapeStudyLines(
			study,
			studyPhase(STUDY_DURATION - 0.001),
			width,
			height,
		);
		const after = shapeStudyLines(study, studyPhase(0.001), width, height);
		for (let line = 0; line < before.length; line++) {
			for (let point = 0; point < before[line].points.length; point++) {
				assert.ok(
					Math.abs(before[line].points[point] - after[line].points[point]) <
						0.2,
					`${study}: no visible jump at the loop boundary`,
				);
			}
		}
		for (let seconds = 0; seconds < STUDY_DURATION; seconds += 3) {
			const start = performance.now();
			const lines = shapeStudyLines(study, studyPhase(seconds), width, height);
			longestFrame = Math.max(longestFrame, performance.now() - start);
			assert.equal(
				lines.length,
				first.length,
				`${study}: keep the same topology`,
			);
			for (const line of lines) {
				assert.ok(line.opacity > 0 && line.opacity <= 1);
				assert.ok(line.points.length > 2 && line.points.length % 2 === 0);
				for (let i = 0; i < line.points.length; i += 2) {
					const [x, y] = [line.points[i], line.points[i + 1]];
					assert.ok(Number.isFinite(x) && Number.isFinite(y));
					assert.ok(x >= 0 && x <= width, `${study}: keep x inside the canvas`);
					assert.ok(
						y >= 0 && y <= height,
						`${study}: keep y inside the canvas`,
					);
				}
			}
			frames++;
		}
	}
}

let largestDeviation = 0;
for (const study of studies) {
	for (const [width, height] of sizes) {
		const scale = studySampleScale(width);
		const first = shapeStudyLines(study, studyPhase(0), width, height, scale);
		assert.deepEqual(
			shapeStudyLines(study, studyPhase(STUDY_DURATION), width, height, scale),
			first,
			`${study}: the lower-detail loop must close`,
		);
		for (let seconds = 0; seconds < STUDY_DURATION; seconds += 3) {
			const dense = shapeStudyLines(study, studyPhase(seconds), width, height);
			const lean = shapeStudyLines(
				study,
				studyPhase(seconds),
				width,
				height,
				scale,
			);
			const points = (lines: typeof dense) =>
				lines.reduce((total, line) => total + line.points.length / 2, 0);
			assert.ok(
				points(lean) * STUDY_FPS < points(dense) * 30 * 0.5,
				`${study}: cut the original point workload by at least half`,
			);
			const batches = batchStudyLines(lean);
			assert.equal(batches.flat().length, dense.length);
			assert.ok(batches.filter((batch) => batch.length).length <= 12);
			for (let line = 0; line < dense.length; line++) {
				const reference = dense[line].points;
				const simplified = lean[line].points;
				const segments = simplified.length / 2 - 1;
				for (let point = 0; point < reference.length / 2; point++) {
					const referenceX = reference[point * 2];
					if (referenceX < width * 0.08 || referenceX > width * 0.92) {
						continue;
					}
					const position = (point / (reference.length / 2 - 1)) * segments;
					const left = Math.min(segments - 1, Math.floor(position));
					const weight = position - left;
					const x =
						simplified[left * 2] * (1 - weight) +
						simplified[(left + 1) * 2] * weight;
					const y =
						simplified[left * 2 + 1] * (1 - weight) +
						simplified[(left + 1) * 2 + 1] * weight;
					const deviation = Math.hypot(
						x - referenceX,
						y - reference[point * 2 + 1],
					);
					largestDeviation = Math.max(largestDeviation, deviation);
					assert.ok(
						deviation < 1,
						`${study}: preserve the central curves within 1px`,
					);
				}
			}
		}
	}
}

console.log(
	`${studies.length} studies passed across ${frames} frames and ${sizes.length} sizes.`,
);
console.log(
	`Slowest geometry frame: ${longestFrame.toFixed(2)} ms on this machine.`,
);
console.log(
	`Largest central curve deviation: ${largestDeviation.toFixed(2)} px.`,
);
