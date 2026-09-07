import type { SocialRecord } from "@/data/social";
import { cn } from "@/lib/utils";

const GROOVES = [
	29.0, 27.6, 26.2, 24.8, 23.4, 22.0, 20.6, 19.2, 17.8, 16.4, 15.0,
];

function Glyph({ glyph }: { glyph: SocialRecord["glyph"] }) {
	if (glyph === "annotator") {
		return (
			<text
				x="32"
				y="36.6"
				textAnchor="middle"
				fontSize="12"
				fontWeight="700"
				fill="#7d451f"
			>
				&#8220;
			</text>
		);
	}
	return (
		<g stroke="#7d451f" strokeWidth="1.1" strokeLinecap="round" fill="none">
			<rect x="28.4" y="26.6" width="7.2" height="10.8" rx="1.2" />
			<path d="M30.2 29.6h3.6M30.2 32h3.6M30.2 34.4h2.2" />
		</g>
	);
}

export function GeniusRecord({
	record,
	className,
}: {
	record: SocialRecord;
	className?: string;
}) {
	const id = `rec-${record.glyph}`;
	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<svg
				viewBox="0 0 64 64"
				aria-hidden="true"
				focusable="false"
				className="h-[62px] w-[62px]"
			>
				<defs>
					<radialGradient id={id} cx="34%" cy="28%" r="78%">
						<stop offset="0%" stopColor="#f4cda6" />
						<stop offset="42%" stopColor="#d5945f" />
						<stop offset="100%" stopColor="#9a5b30" />
					</radialGradient>
				</defs>
				<circle cx="32" cy="32" r="30" fill={`url(#${id})`} />
				<circle
					cx="32"
					cy="32"
					r="29.4"
					fill="none"
					stroke="#fbe0c6"
					strokeOpacity="0.5"
					strokeWidth="1"
				/>
				<g fill="none" stroke="#6b3a19" strokeOpacity="0.2" strokeWidth="0.8">
					{GROOVES.map((r) => (
						<circle key={r} cx="32" cy="32" r={r} />
					))}
				</g>
				<circle cx="32" cy="32" r="12.6" fill="#e7ab78" />
				<circle
					cx="32"
					cy="32"
					r="12.6"
					fill="none"
					stroke="#6b3a19"
					strokeOpacity="0.3"
					strokeWidth="0.9"
				/>
				<Glyph glyph={record.glyph} />
			</svg>
			<p className="text-center font-mono text-[9.5px] uppercase leading-[1.4] tracking-[0.1em] text-ink-mute">
				{record.name}
			</p>
		</div>
	);
}
