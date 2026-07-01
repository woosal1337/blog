import {
	StampApproved,
	StampBars,
	StampCheckpoint,
	StampDateBox,
	StampEntry,
	StampPassport,
	StampRing,
	StampVisa,
} from "@/components/blocks/stamps";
import { BackButton } from "@/components/ds/back-button";
import { Section, Shell } from "@/components/ds/shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stamps",
	robots: { index: false, follow: false },
};

const SWATCHES = [
	{
		name: "1 · Passport control",
		el: <StampPassport className="w-[210px]" />,
		rot: -7,
		tone: "text-ink-soft opacity-90",
	},
	{
		name: "2 · Reader checkpoint",
		el: <StampCheckpoint className="w-[240px]" />,
		rot: 4,
		tone: "text-ink-soft opacity-80",
	},
	{
		name: "3 · Visa box",
		el: <StampVisa className="w-[230px]" />,
		rot: -3,
		tone: "text-ink-soft opacity-75",
	},
	{
		name: "4 · Entry",
		el: <StampEntry className="w-[220px]" />,
		rot: 6,
		tone: "text-ink-mute opacity-90",
	},
	{
		name: "5 · Approved",
		el: <StampApproved className="w-[230px]" />,
		rot: -8,
		tone: "text-ink-soft opacity-85",
	},
	{
		name: "6 · Ring",
		el: <StampRing className="w-[190px]" />,
		rot: 9,
		tone: "text-ink-mute opacity-95",
	},
	{
		name: "7 · End of transmission",
		el: <StampBars className="w-[250px]" />,
		rot: -2,
		tone: "text-ink-soft opacity-80",
	},
	{
		name: "8 · Date box",
		el: <StampDateBox className="w-[200px]" />,
		rot: 5,
		tone: "text-ink-mute opacity-85",
	},
];

export default function StampsPage() {
	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<div className="grid gap-4 sm:grid-cols-2">
					{SWATCHES.map((s) => (
						<div
							key={s.name}
							className="flex flex-col items-center rounded-[12px] border border-line px-4 pb-4 pt-8"
						>
							<div
								style={{ transform: `rotate(${s.rot}deg)` }}
								className={s.tone}
							>
								{s.el}
							</div>
							<p className="mt-6 self-start font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
								{s.name}
							</p>
						</div>
					))}
				</div>
			</Shell>
		</Section>
	);
}
