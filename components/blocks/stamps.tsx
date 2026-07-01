function Rough({
	id,
	seed = 7,
	scale = 2.2,
}: {
	id: string;
	seed?: number;
	scale?: number;
}) {
	return (
		<filter id={id} x="-5%" y="-5%" width="110%" height="110%">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.55"
				numOctaves="2"
				seed={seed}
				result="n"
			/>
			<feDisplacementMap in="SourceGraphic" in2="n" scale={scale} />
		</filter>
	);
}

const MONO = "font-mono uppercase";

export function StampPassport({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 200 200" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-1" seed={3} />
				<path id="st1-top" d="M 47.7,152.3 A 74,74 0 1 1 152.3,152.3" />
				<path id="st1-bot" d="M 48,100 A 52,52 0 0 0 152,100" />
			</defs>
			<g filter="url(#st-rough-1)" fill="currentColor">
				<circle
					cx="100"
					cy="100"
					r="88"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
				/>
				<circle
					cx="100"
					cy="100"
					r="62"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<text className={MONO} fontSize="13.5" letterSpacing="3.5">
					<textPath href="#st1-top" startOffset="50%" textAnchor="middle">
						chele.bi passport control
					</textPath>
				</text>
				<text className={MONO} fontSize="10" letterSpacing="2.5">
					<textPath href="#st1-bot" startOffset="50%" textAnchor="middle">
						· read access granted ·
					</textPath>
				</text>
				<image
					href="/contour-logo/contour-logo-white.svg"
					x="64"
					y="64"
					width="72"
					height="72"
				/>
			</g>
		</svg>
	);
}

export function StampCheckpoint({
	className,
	refCode = "REF A0017",
	date = "07/01 2026",
}: { className?: string; refCode?: string; date?: string }) {
	return (
		<svg viewBox="0 0 240 190" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-2" seed={11} />
				<path id="st2-top" d="M 22,120 A 98,98 0 0 1 218,120" />
				<path id="st2-bot" d="M 56,148 A 74,74 0 0 0 184,148" />
			</defs>
			<g filter="url(#st-rough-2)" fill="currentColor">
				<text className={MONO} fontSize="13" letterSpacing="2" fontWeight="700">
					<textPath href="#st2-top" startOffset="50%" textAnchor="middle">
						universal reader checkpoint
					</textPath>
				</text>
				<text
					className={MONO}
					fontSize="12"
					letterSpacing="1.5"
					textAnchor="middle"
				>
					<tspan x="52" y="112">
						{refCode.split(" ")[0]}
					</tspan>
					<tspan x="52" y="126">
						{refCode.split(" ")[1] ?? ""}
					</tspan>
					<tspan x="188" y="112">
						{date.split(" ")[0]}
					</tspan>
					<tspan x="188" y="126">
						{date.split(" ")[1] ?? ""}
					</tspan>
				</text>
				<image
					href="/contour-logo/contour-logo-white.svg"
					x="98"
					y="92"
					width="44"
					height="44"
				/>
				<text className={MONO} fontSize="11" letterSpacing="2.5">
					<textPath href="#st2-bot" startOffset="50%" textAnchor="middle">
						session verified
					</textPath>
				</text>
			</g>
		</svg>
	);
}

export function StampVisa({
	className,
	date = "1 Jul 2026",
}: { className?: string; date?: string }) {
	return (
		<svg viewBox="0 0 220 92" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-3" seed={19} />
			</defs>
			<g filter="url(#st-rough-3)" fill="currentColor">
				<path
					d="M 18,4 H 202 L 216,18 V 74 L 202,88 H 18 L 4,74 V 18 Z"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				/>
				<text
					className={MONO}
					fontSize="15"
					letterSpacing="2"
					fontWeight="700"
					textAnchor="middle"
				>
					<tspan x="110" y="30">
						end of post
					</tspan>
				</text>
				<text
					className={MONO}
					fontSize="12"
					letterSpacing="2"
					textAnchor="middle"
				>
					<tspan x="110" y="50">
						{date}
					</tspan>
					<tspan x="110" y="70">
						reader verified
					</tspan>
				</text>
			</g>
		</svg>
	);
}

export function StampEntry({
	className,
	no = "№ 1337",
}: { className?: string; no?: string }) {
	return (
		<svg viewBox="0 0 210 120" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-4" seed={23} />
			</defs>
			<g filter="url(#st-rough-4)" fill="currentColor">
				<rect
					x="5"
					y="5"
					width="200"
					height="110"
					rx="18"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				/>
				<image
					href="/contour-logo/contour-logo-white.svg"
					x="18"
					y="34"
					width="52"
					height="52"
				/>
				<text
					className={MONO}
					fontSize="14"
					letterSpacing="2.5"
					fontWeight="700"
				>
					<tspan x="82" y="42">
						entry
					</tspan>
				</text>
				<text className={MONO} fontSize="12" letterSpacing="2">
					<tspan x="82" y="64">
						read verified
					</tspan>
					<tspan x="82" y="86">
						{no}
					</tspan>
				</text>
			</g>
		</svg>
	);
}

export function StampApproved({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 220 110" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-5" seed={31} scale={2.8} />
			</defs>
			<g filter="url(#st-rough-5)" fill="currentColor">
				<ellipse
					cx="110"
					cy="55"
					rx="102"
					ry="47"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
				/>
				<ellipse
					cx="110"
					cy="55"
					rx="94"
					ry="39"
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
				/>
				<text
					className={MONO}
					fontSize="26"
					letterSpacing="6"
					fontWeight="700"
					textAnchor="middle"
				>
					<tspan x="110" y="52">
						approved
					</tspan>
				</text>
				<text
					className={MONO}
					fontSize="9"
					letterSpacing="3"
					textAnchor="middle"
				>
					<tspan x="110" y="72">
						for re-reading
					</tspan>
				</text>
			</g>
		</svg>
	);
}

export function StampRing({
	className,
	date = "07 · 01 · 26",
}: { className?: string; date?: string }) {
	return (
		<svg viewBox="0 0 180 180" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-6" seed={41} />
				<path
					id="st6-ring"
					d="M 90,90 m -64,0 a 64,64 0 1,1 128,0 a 64,64 0 1,1 -128,0"
				/>
			</defs>
			<g filter="url(#st-rough-6)" fill="currentColor">
				<circle
					cx="90"
					cy="90"
					r="80"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				/>
				<circle
					cx="90"
					cy="90"
					r="48"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<text className={MONO} fontSize="11.5" letterSpacing="3">
					<textPath href="#st6-ring" startOffset="0%">
						read to the end ★ thank you ★
					</textPath>
				</text>
				<text
					className={MONO}
					fontSize="12"
					letterSpacing="1.5"
					textAnchor="middle"
					fontWeight="700"
				>
					<tspan x="90" y="95">
						{date}
					</tspan>
				</text>
			</g>
		</svg>
	);
}

export function StampBars({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 240 90" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-7" seed={47} />
			</defs>
			<g filter="url(#st-rough-7)" fill="currentColor">
				<rect x="6" y="8" width="228" height="6" />
				<rect x="6" y="76" width="228" height="6" />
				<text
					className={MONO}
					fontSize="14"
					letterSpacing="2.5"
					fontWeight="700"
					textAnchor="middle"
				>
					<tspan x="120" y="44">
						end of transmission
					</tspan>
				</text>
				<text
					className={MONO}
					fontSize="9"
					letterSpacing="4"
					textAnchor="middle"
				>
					<tspan x="120" y="64">
						chele.bi press
					</tspan>
				</text>
			</g>
		</svg>
	);
}

export function StampDateBox({
	className,
	date = "1 Jul 2026",
}: { className?: string; date?: string }) {
	return (
		<svg viewBox="0 0 190 80" className={className} aria-hidden="true">
			<defs>
				<Rough id="st-rough-8" seed={53} />
			</defs>
			<g filter="url(#st-rough-8)" fill="currentColor">
				<path
					d="M 14,4 H 176 L 186,14 V 66 L 176,76 H 14 L 4,66 V 14 Z"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
				/>
				<text
					className={MONO}
					fontSize="12.5"
					letterSpacing="1.5"
					fontWeight="700"
					textAnchor="middle"
				>
					<tspan x="95" y="26">
						fully read
					</tspan>
				</text>
				<text
					className={MONO}
					fontSize="11.5"
					letterSpacing="1.5"
					textAnchor="middle"
				>
					<tspan x="95" y="46">
						{date}
					</tspan>
					<tspan x="95" y="64">
						identity verified
					</tspan>
				</text>
			</g>
		</svg>
	);
}
