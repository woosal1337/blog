"use client";

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
import { usePathname } from "next/navigation";

const STAMP_COUNT = 8;

function hash(s: string): number {
	let h = 5381;
	for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
	h ^= h >>> 16;
	h = Math.imul(h, 0x85ebca6b);
	h ^= h >>> 13;
	h = Math.imul(h, 0xc2b2ae35);
	h ^= h >>> 16;
	return h >>> 0;
}

function assignStamps(slugs: string[]): Map<string, number> {
	const assign = new Map<string, number>();
	const used = new Set<number>();
	for (const s of [...slugs].sort()) {
		let i = hash(s) % STAMP_COUNT;
		while (used.has(i)) i = (i + 1) % STAMP_COUNT;
		used.add(i);
		if (used.size === STAMP_COUNT) used.clear();
		assign.set(s, i);
	}
	return assign;
}

type Entry = { slug: string; date: string };

export function PostStamp({ entries }: { entries: Entry[] }) {
	const pathname = usePathname();
	const slug = pathname.split("/").filter(Boolean).pop();
	const entry = entries.find((e) => e.slug === slug);
	if (!entry || !slug) return null;

	const h = hash(slug);
	const pick = assignStamps(entries.map((e) => e.slug)).get(slug) ?? 0;
	const d = new Date(entry.date);
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	const yyyy = String(d.getFullYear());
	const long = d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	const no = 1000 + (h % 9000);

	const variants = [
		<StampPassport key="p" className="w-[190px]" />,
		<StampCheckpoint
			key="c"
			className="w-[215px]"
			refCode={`REF A${String(h % 900) + 100}`.slice(0, 9)}
			date={`${mm}/${dd} ${yyyy}`}
		/>,
		<StampVisa key="v" className="w-[205px]" date={long} />,
		<StampEntry key="e" className="w-[195px]" no={`№ ${no}`} />,
		<StampApproved key="a" className="w-[205px]" />,
		<StampRing
			key="r"
			className="w-[175px]"
			date={`${mm} · ${dd} · ${yyyy.slice(2)}`}
		/>,
		<StampBars key="b" className="w-[220px]" />,
		<StampDateBox key="d" className="w-[185px]" date={long} />,
	];
	const rotate = (h % 15) - 7;

	return (
		<div
			aria-hidden="true"
			className="text-ink-soft opacity-80"
			style={{ transform: `rotate(${rotate}deg)` }}
		>
			{variants[pick]}
		</div>
	);
}
