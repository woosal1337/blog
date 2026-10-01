import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import {
	STUDY_DURATION,
	type ShapeStudy,
	shapeStudyLines,
	studyPhase,
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

console.log(
	`${studies.length} studies passed across ${frames} frames and ${sizes.length} sizes.`,
);
console.log(
	`Slowest geometry frame: ${longestFrame.toFixed(2)} ms on this machine.`,
);
