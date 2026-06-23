import type { ReactNode } from "react";

type CalloutKind = "note" | "tip" | "warn" | "danger" | "lvl-up";

const CALLOUT_PRESETS: Record<CalloutKind, { label: string }> = {
	note: { label: "NOTE" },
	tip: { label: "TIP" },
	warn: { label: "WARN" },
	danger: { label: "DANGER" },
	"lvl-up": { label: "LVL UP" },
};

interface CalloutProps {
	kind?: CalloutKind;
	title?: string;
	children: ReactNode;
}

export function Callout({ kind = "note", title, children }: CalloutProps) {
	const preset = CALLOUT_PRESETS[kind];
	return (
		<div className="my-7 border border-line border-l-2 border-l-line-strong bg-paper-2 p-5">
			<p className="oak-label flex items-center gap-2 text-ink-soft">
				<span aria-hidden="true" className="text-ink-mute">
					{"//"}
				</span>
				{preset.label}
				{title ? (
					<span className="text-ink-mute normal-case tracking-normal">
						{title}
					</span>
				) : null}
			</p>
			<div className="mt-3 text-footnote leading-[1.65] text-ink-soft [&_a]:text-foreground [&_a]:underline [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p]:my-1">
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
		<details className="group my-6 border border-line bg-paper-2 p-5">
			<summary className="oak-label flex cursor-pointer list-none items-center gap-2.5 text-ink-soft transition-colors duration-240 ease-house hover:text-foreground [&::-webkit-details-marker]:hidden">
				<span aria-hidden="true" className="select-none text-ink-mute">
					<span className="group-open:hidden">+</span>
					<span className="hidden group-open:inline">−</span>
				</span>
				{summary}
			</summary>
			<div className="mt-3 text-footnote leading-[1.65] text-ink-soft [&_a]:text-foreground [&_a]:underline">
				{children}
			</div>
		</details>
	);
}
