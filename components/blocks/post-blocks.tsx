import type { ReactNode } from "react";

type CalloutKind = "note" | "tip" | "warn" | "danger" | "lvl-up";

const CALLOUT_PRESETS: Record<CalloutKind, { label: string }> = {
	note: { label: "Note" },
	tip: { label: "Tip" },
	warn: { label: "Warning" },
	danger: { label: "Danger" },
	"lvl-up": { label: "Level up" },
};

const PANEL =
	"my-7 rounded-[14px] border border-line bg-transparent p-5 sm:p-6";

const LABEL =
	"flex items-center gap-2 font-ui text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-soft";

const BODY =
	"mt-2.5 font-ui text-[15px] leading-[1.6] text-ink [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-[3px] [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_p]:my-2 [&_p]:text-[15px] [&_p]:text-ink";

interface CalloutProps {
	kind?: CalloutKind;
	title?: string;
	children: ReactNode;
}

export function Callout({ kind = "note", title, children }: CalloutProps) {
	const preset = CALLOUT_PRESETS[kind];
	return (
		<div className={PANEL}>
			<p className={LABEL}>
				{preset.label}
				{title ? (
					<span className="font-normal normal-case tracking-normal text-ink-mute">
						{title}
					</span>
				) : null}
			</p>
			<div className={BODY}>{children}</div>
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
		<details className={`group ${PANEL}`}>
			<summary
				className={`cursor-pointer list-none transition-colors duration-200 ease-house hover:text-ink [&::-webkit-details-marker]:hidden ${LABEL}`}
			>
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
					className="shrink-0 text-ink-mute transition-transform duration-200 ease-house group-open:rotate-90"
				>
					<path
						d="m4.5 3 3 3-3 3"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{summary}
			</summary>
			<div className={BODY}>{children}</div>
		</details>
	);
}
