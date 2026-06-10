import { cn } from "@/lib/utils";
import {
	ChevronDown,
	Flame,
	Info,
	Lightbulb,
	TriangleAlert,
	Zap,
} from "lucide-react";
import type { ReactNode } from "react";

type CalloutKind = "note" | "tip" | "warn" | "danger" | "lvl-up";

const CALLOUT_PRESETS: Record<
	CalloutKind,
	{ label: string; icon: ReactNode; accent?: string }
> = {
	note: {
		label: "note",
		icon: <Info size={17} strokeWidth={1.5} aria-hidden="true" />,
	},
	tip: {
		label: "tip",
		icon: <Lightbulb size={17} strokeWidth={1.5} aria-hidden="true" />,
	},
	warn: {
		label: "warn",
		icon: <TriangleAlert size={17} strokeWidth={1.5} aria-hidden="true" />,
		accent: "text-[#f56300]",
	},
	danger: {
		label: "danger",
		icon: <Flame size={17} strokeWidth={1.5} aria-hidden="true" />,
		accent: "text-destructive",
	},
	"lvl-up": {
		label: "lvl up",
		icon: <Zap size={17} strokeWidth={1.5} aria-hidden="true" />,
	},
};

interface CalloutProps {
	kind?: CalloutKind;
	title?: string;
	children: ReactNode;
}

export function Callout({ kind = "note", title, children }: CalloutProps) {
	const preset = CALLOUT_PRESETS[kind];
	return (
		<div className="my-7 rounded-lg bg-muted p-5">
			<p className="flex items-center gap-2 text-body font-semibold text-foreground">
				<span className={cn("shrink-0", preset.accent)}>{preset.icon}</span>
				{title ?? preset.label}
			</p>
			<div className="mt-2 text-body leading-[1.65] text-muted-foreground [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
				{children}
			</div>
		</div>
	);
}

export function Note(props: Omit<CalloutProps, "kind">) {
	return <Callout kind="note" {...props} />;
}
export function Tip(props: Omit<CalloutProps, "kind">) {
	return <Callout kind="tip" {...props} />;
}
export function Warn(props: Omit<CalloutProps, "kind">) {
	return <Callout kind="warn" {...props} />;
}
export function Danger(props: Omit<CalloutProps, "kind">) {
	return <Callout kind="danger" {...props} />;
}
export function LvlUp(props: Omit<CalloutProps, "kind">) {
	return <Callout kind="lvl-up" {...props} />;
}

interface DetailsProps {
	summary: string;
	children: ReactNode;
}

export function Details({ summary, children }: DetailsProps) {
	return (
		<details className="group my-6 rounded-lg bg-muted p-5">
			<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body font-semibold text-foreground [&::-webkit-details-marker]:hidden">
				{summary}
				<ChevronDown
					size={17}
					strokeWidth={1.5}
					aria-hidden="true"
					className="shrink-0 text-tertiary transition-transform duration-200 ease-house group-open:rotate-180"
				/>
			</summary>
			<div className="mt-3 text-body leading-[1.65] text-muted-foreground">
				{children}
			</div>
		</details>
	);
}
