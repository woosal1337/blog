import Link from "next/link";

function ring(
	rx: number,
	ry: number,
	wobbleAmp: number,
	wobblePhase: number,
): string {
	const pts: string[] = [];
	for (let i = 0; i <= 96; i++) {
		const t = (i / 96) * Math.PI * 2;
		const wob = 1 + wobbleAmp * Math.sin(4 * t + wobblePhase);
		const x = 340 + rx * Math.cos(t) * wob;
		const y = 75 + ry * Math.sin(t) * wob;
		pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
	}
	return `${pts.join("")}Z`;
}

const RING_COUNT = 8;
const RINGS = Array.from({ length: RING_COUNT }, (_, k) =>
	ring(22 + k * 42, 16 + k * 6.4, 0.024 - k * 0.002, 0.7 + k * 0.9),
);

export function RippleField() {
	return (
		<svg
			viewBox="0 0 680 150"
			preserveAspectRatio="xMidYMid slice"
			className="absolute inset-0 h-full w-full text-ink-mute transition-colors duration-400 ease-house group-hover:text-ink-soft"
			aria-hidden="true"
		>
			{RINGS.map((d, k) => (
				<path
					key={d.slice(0, 16)}
					d={d}
					fill="none"
					stroke="currentColor"
					strokeWidth="1.1"
					className="origin-center transition-transform duration-400 ease-house [transform-box:fill-box] group-hover:scale-[1.03]"
					style={{
						opacity: 0.95 - k * 0.09,
						transitionDelay: `${k * 40}ms`,
					}}
				/>
			))}
		</svg>
	);
}

export function SetupTerrain({ className }: { className?: string }) {
	return (
		<Link
			href="/setup"
			aria-label="My setup, the tools, agents and MCP servers I use daily"
			className={className}
		>
			<div className="group flex flex-col rounded-[16px] border border-line bg-[#0a0a0a] p-1 transition-colors duration-200 ease-house hover:border-line-strong">
				<div className="relative h-[150px] overflow-hidden rounded-[12px] bg-[#060606]">
					<RippleField />
				</div>
				<div className="px-3.5 pb-3 pt-3.5">
					<p className="font-ui text-[15px] font-medium text-ink">Setup</p>
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						The tools, agents and MCP servers I use every day.
					</p>
				</div>
			</div>
		</Link>
	);
}
