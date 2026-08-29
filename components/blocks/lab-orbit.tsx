import Link from "next/link";
import type * as React from "react";

const CX = 340;
const CY = 75;

const ORBITS = [
	{ rx: 60, ry: 18, tilt: -6, theta: 38, size: 2.2, drift: 10 },
	{ rx: 115, ry: 30, tilt: 4, theta: 205, size: 2.8, drift: 8 },
	{ rx: 175, ry: 42, tilt: -3, theta: 322, size: 3.4, drift: 6.5 },
	{ rx: 240, ry: 54, tilt: 5, theta: 118, size: 3, drift: 5 },
	{ rx: 305, ry: 66, tilt: -4, theta: 255, size: 2.6, drift: 4 },
];

const MOONS = [
	{ dx: 9, dy: -4, r: 1 },
	{ dx: -7, dy: 6, r: 1.2 },
];

function round2(n: number): number {
	return Math.round(n * 100) / 100;
}

function orbitPoint(k: number, thetaDeg: number): [number, number] {
	const o = ORBITS[k];
	const a = (thetaDeg * Math.PI) / 180;
	const t = (o.tilt * Math.PI) / 180;
	const x = o.rx * Math.cos(a);
	const y = o.ry * Math.sin(a);
	return [
		round2(CX + x * Math.cos(t) - y * Math.sin(t)),
		round2(CY + x * Math.sin(t) + y * Math.cos(t)),
	];
}

const PLANETS = ORBITS.map((o, k) => {
	const [x, y] = orbitPoint(k, o.theta);
	const [x1, y1] = orbitPoint(k, o.theta + o.drift);
	return {
		x,
		y,
		dx: round2(x1 - x),
		dy: round2(y1 - y),
		size: o.size,
		delay: k * 40,
	};
});

const COMET_TAIL = "M84 22Q320 -4 552 30";
const COMET_HEAD: [number, number] = [552, 30];

function planetStyle(p: { dx: number; dy: number; delay: number }) {
	return {
		"--dx": `${p.dx}px`,
		"--dy": `${p.dy}px`,
		transitionDelay: `${p.delay}ms`,
	} as React.CSSProperties;
}

export function OrbitField() {
	return (
		<svg
			viewBox="0 0 680 150"
			preserveAspectRatio="xMidYMid slice"
			className="absolute inset-0 h-full w-full text-ink-mute transition-colors duration-400 ease-house group-hover:text-ink-soft"
			aria-hidden="true"
		>
			{ORBITS.map((o, k) => (
				<g key={o.rx} transform={`rotate(${o.tilt} ${CX} ${CY})`}>
					<ellipse
						cx={CX}
						cy={CY}
						rx={o.rx}
						ry={o.ry}
						fill="none"
						stroke="currentColor"
						strokeWidth="1.1"
						className="origin-center transition-transform duration-400 ease-house [transform-box:fill-box] group-hover:scale-[1.03]"
						style={{ opacity: 0.9 - k * 0.13, transitionDelay: `${k * 40}ms` }}
					/>
				</g>
			))}

			<path
				d={COMET_TAIL}
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeDasharray="1 6"
				opacity="0.4"
			/>
			<circle
				cx={COMET_HEAD[0]}
				cy={COMET_HEAD[1]}
				r="2"
				fill="currentColor"
				opacity="0.75"
				className="transition-transform duration-400 ease-house group-hover:translate-x-[25.7px] group-hover:translate-y-[3.8px]"
			/>

			{PLANETS.map((p, k) => (
				<g
					key={p.x}
					className="transition-transform duration-400 ease-house group-hover:translate-x-[var(--dx)] group-hover:translate-y-[var(--dy)]"
					style={{ ...planetStyle(p), opacity: 0.95 - k * 0.09 }}
				>
					<circle cx={p.x} cy={p.y} r={p.size} fill="currentColor" />
					{k === 2 && (
						<ellipse
							cx={p.x}
							cy={p.y}
							rx="6.6"
							ry="2.3"
							transform={`rotate(-18 ${p.x} ${p.y})`}
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
						/>
					)}
					{k === 3 &&
						MOONS.map((m) => (
							<circle
								key={m.dx}
								cx={p.x + m.dx}
								cy={p.y + m.dy}
								r={m.r}
								fill="currentColor"
								opacity="0.8"
							/>
						))}
				</g>
			))}

			<g className="origin-center transition-transform duration-400 ease-house [transform-box:fill-box] group-hover:scale-[1.12]">
				<circle cx={CX} cy={CY} r="4.6" fill="currentColor" opacity="0.9" />
				<circle
					cx={CX}
					cy={CY}
					r="8.6"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.1"
					opacity="0.55"
				/>
			</g>
		</svg>
	);
}

export function LabOrbit({ className }: { className?: string }) {
	return (
		<Link
			href="/lab"
			aria-label="The lab, the machines, containers, MCP servers and tools I use every day"
			className={className}
		>
			<div className="group flex h-full flex-col rounded-[16px] border border-line bg-[#060606] p-1 transition-colors duration-200 ease-house hover:border-line-strong">
				<div className="relative h-[150px] overflow-hidden rounded-[12px] bg-[#060606]">
					<OrbitField />
					{/* The art dissolves into the card before the text starts, so the
					    animation never runs up against the title. */}
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#060606]"
						aria-hidden="true"
					/>
				</div>
				<div className="px-3.5 pb-3 pt-3.5">
					<p className="font-ui text-[15px] font-medium text-ink">Lab</p>
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						The machines, the mesh and the tools my agents and I use every day.
					</p>
				</div>
			</div>
		</Link>
	);
}
