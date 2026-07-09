import { RippleField } from "@/components/blocks/setup-terrain";
import { BackButton } from "@/components/ds/back-button";
import { Reveal } from "@/components/ds/reveal";
import { SectionLabel } from "@/components/ds/section-label";
import { Section, Shell } from "@/components/ds/shell";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Setup",
	description: "The agents, the MCP servers and the tools I use every day.",
};

type SetupItem = {
	name: string;
	desc?: string;
	href?: string;
	iconHref?: string;
	image?: string;
	bleed?: boolean;
};

function faviconFor(href: string): string | undefined {
	try {
		const host = new URL(href).hostname.replace(/^www\./, "");
		return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
	} catch {
		return undefined;
	}
}

function TilePlaceholder() {
	return (
		<svg
			viewBox="0 0 64 64"
			className="size-full text-ink-mute"
			aria-hidden="true"
		>
			{[9, 16, 23].map((r, k) => (
				<circle
					key={r}
					cx="32"
					cy="32"
					r={r}
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
					opacity={0.85 - k * 0.25}
				/>
			))}
		</svg>
	);
}

function TileFrame() {
	return (
		<div
			className="pointer-events-none absolute inset-0 rounded-[10px] border border-white/10"
			aria-hidden="true"
		/>
	);
}

function Tile({ name, href, iconHref, image, bleed }: SetupItem) {
	const favicon = faviconFor(iconHref ?? href ?? "");
	return (
		<div className="relative grid size-12 shrink-0 place-items-center">
			{image ? (
				<div className="relative size-10 overflow-hidden rounded-[10px]">
					<Image
						src={image}
						alt={name}
						fill
						sizes="40px"
						className="object-cover"
					/>
					<TileFrame />
				</div>
			) : favicon && bleed ? (
				<div className="relative size-10 overflow-hidden rounded-[10px]">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={favicon}
						alt=""
						width={40}
						height={40}
						loading="lazy"
						className="size-full object-cover"
					/>
					<TileFrame />
				</div>
			) : favicon ? (
				<div className="relative grid size-10 place-items-center rounded-[10px] bg-white">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={favicon}
						alt=""
						width={24}
						height={24}
						loading="lazy"
						className="size-6"
					/>
					<TileFrame />
				</div>
			) : (
				<div className="relative grid size-10 place-items-center rounded-[10px] bg-white/[0.03] p-2">
					<TilePlaceholder />
					<TileFrame />
				</div>
			)}
		</div>
	);
}

function SetupRow(item: SetupItem) {
	const { name, desc, href } = item;
	const inner = (
		<>
			<div className="min-w-0 flex-1">
				<p className="font-ui text-[15px] font-medium text-ink">{name}</p>
				{desc && (
					<p className="mt-1 font-ui text-[14px] leading-snug text-ink-mute">
						{desc}
					</p>
				)}
			</div>
			<Tile {...item} />
		</>
	);
	const classes =
		"-mx-3 flex items-center justify-between gap-6 rounded-[10px] px-3 py-3 transition-colors duration-200 ease-house";
	if (!href) return <div className={classes}>{inner}</div>;
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`${classes} hover:bg-white/[0.02]`}
		>
			{inner}
		</a>
	);
}

function SetupGroup({
	label,
	children,
	first = false,
}: {
	label: string;
	children: React.ReactNode;
	first?: boolean;
}) {
	return (
		<div className={first ? undefined : "mt-10 border-t border-line pt-10"}>
			<SectionLabel>{label}</SectionLabel>
			<div className="mt-2 flex flex-col">{children}</div>
		</div>
	);
}

const AGENTS: SetupItem[] = [
	{
		name: "Warp",
		desc: "The terminal, and my main driver right now. The same CLI agents run inside it, they just get a faster shell around them.",
		href: "https://www.warp.dev",
	},
	{
		name: "JetBrains Air",
		desc: "The IDE. The same CLI agents drive it over ACP, so nothing changes about how they work — they just get an editor around them.",
		href: "https://air.dev",
		bleed: true,
	},
];

const MCPS: SetupItem[] = [
	{
		name: "Vaulted",
		desc: "Local-first secrets manager. Agents run commands with real secrets injected, the values never enter their context.",
		href: "https://vaulted.chele.bi",
		image: "/vaulted-logo.png",
	},
	{
		name: "CompanyOS",
		desc: "Agent-native project management. Agents run projects, tasks and meetings over MCP on your own keys.",
		href: "https://github.com/woosal1337/companyos",
		image: "/companyos-logo.png",
	},
	{
		name: "Folio",
		desc: "Local meeting recorder. Ships its own MCP server, so agents get read-only access to transcripts, tasks and memory over stdio.",
		href: "https://folio.chele.bi",
		image: "/folio-logo.png",
	},
	{
		name: "Feeder",
		desc: "RSS reader. Agents read my feeds and manage collections over MCP, so a briefing is a conversation, not a tab.",
		href: "https://feeder.co",
	},
	{
		name: "Bucketmark",
		desc: "Link bookmarking. Agents save and sort links into buckets over MCP, so a good link doesn't just die in a chat log.",
		href: "https://bucketmark.cobanov.dev",
		image: "/bucketmark-logo.png",
	},
];

const KNOWLEDGE: SetupItem[] = [
	{
		name: "Notion",
		desc: "The source of truth. Research, worklogs and references land here, and agents read and write it over MCP.",
		href: "https://notion.so",
	},
	{
		name: "OpenKnowledge",
		desc: "Markdown-CRDT collaboration platform. Agents and I edit the same notes in real time over MCP, every change attributed.",
		href: "https://openknowledge.ai",
	},
];

export default function SetupPage() {
	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<Reveal>
					<header className="mb-10">
						<h1 className="font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
							Setup
						</h1>
						<div className="group relative mt-6 h-[190px] overflow-hidden rounded-[14px] border border-line bg-[#060606]">
							<RippleField />
						</div>
					</header>
				</Reveal>

				<div className="mt-12">
					<SetupGroup label="ADE" first>
						{AGENTS.map((row) => (
							<SetupRow key={row.name} {...row} />
						))}
					</SetupGroup>

					<SetupGroup label="MCP">
						{MCPS.map((row) => (
							<SetupRow key={row.name} {...row} />
						))}
					</SetupGroup>

					<SetupGroup label="Knowledge">
						{KNOWLEDGE.map((row) => (
							<SetupRow key={row.name} {...row} />
						))}
					</SetupGroup>
				</div>
			</Shell>
		</Section>
	);
}
