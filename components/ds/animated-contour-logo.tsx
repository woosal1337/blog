import "server-only";

import fs from "node:fs";
import path from "node:path";
import {
	ContourLogoMotion,
	type ContourLogoTrigger,
} from "@/components/ds/contour-logo-motion";

const contourMarkup = fs
	.readFileSync(
		path.join(
			process.cwd(),
			"public",
			"contour-logo",
			"contour-logo-white.svg",
		),
		"utf8",
	)
	.replaceAll("<path ", '<path pathLength="1" ');

type AnimatedContourLogoProps = {
	className?: string;
	trigger?: ContourLogoTrigger;
};

export function AnimatedContourLogo({
	className,
	trigger = "load",
}: AnimatedContourLogoProps) {
	return (
		<ContourLogoMotion className={className} trigger={trigger}>
			<span
				className="contour-logo-motion__art"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: the markup comes from the repository's static contour SVG
				dangerouslySetInnerHTML={{ __html: contourMarkup }}
			/>
		</ContourLogoMotion>
	);
}
