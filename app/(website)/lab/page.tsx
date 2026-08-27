import { OrbitField } from "@/components/blocks/lab-orbit";
import { BackButton } from "@/components/ds/back-button";
import { Reveal } from "@/components/ds/reveal";
import { SectionLabel } from "@/components/ds/section-label";
import { Section, Shell } from "@/components/ds/shell";
import { createPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = createPageMetadata({
	title: "Lab",
	description:
		"The lab Ege Vusal Chelebi runs day to day: the AI coding agents, MCP servers, skills, and knowledge tools he works with, and the self-hosted infrastructure underneath them.",
	socialDescription:
		"The lab: the agents, MCP servers, skills, and knowledge tools I use every day, and the infrastructure underneath.",
	path: "/lab",
});

type LabItem = {
	name: string;
	desc?: string;
	href?: string;
	iconHref?: string;
	image?: string;
	bleed?: boolean;
	code?: string;
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

function Tile({ name, href, iconHref, image, bleed, code }: LabItem) {
	const favicon = faviconFor(iconHref ?? href ?? "");
	return (
		<div className="relative grid size-12 shrink-0 place-items-center">
			{code ? (
				<div className="relative grid size-10 place-items-center rounded-[10px] bg-white/[0.03]">
					<span className="font-mono text-[11px] leading-none tracking-tight text-ink-mute">
						{code}
					</span>
					<TileFrame />
				</div>
			) : image ? (
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

function LabRow(item: LabItem) {
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

function LabGroup({
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

const AGENTS: LabItem[] = [
	{
		name: "Herdr",
		desc: "The runtime the agents live in. A background server owns their terminals, so a closed lid never stops the work, and every pane reports whether its agent is working, blocked or idle.",
		href: "https://herdr.dev",
	},
	{
		name: "JetBrains Air",
		desc: "The agentic IDE. Claude Code runs inside it over ACP, on my own fork of the adapter so the agents' work stays visible.",
		href: "https://air.dev",
	},
	{
		name: "Zed",
		desc: "The editor. ACP started here, so the same agents attach over the protocol itself rather than through an adapter I have to maintain.",
		href: "https://zed.dev",
	},
];

const MCPS: LabItem[] = [
	{
		name: "Elliptic",
		desc: "Agent-native project management. Agents run projects, tasks and meetings over MCP on your own keys.",
		href: "https://github.com/woosal1337/elliptic",
		image: "/elliptic-logo.png",
	},
	{
		name: "Bucketmark",
		desc: "Link bookmarking. Agents save and sort links into buckets over MCP, so a good link doesn't just die in a chat log.",
		href: "https://bucketmark.cobanov.dev",
		image: "/bucketmark-logo.png",
	},
	{
		name: "Wispr Flow",
		desc: "Voice dictation, with a notetaker beside it. Agents read the meetings, notes and briefs over MCP, and never the dictations.",
		href: "https://wisprflow.ai",
	},
	{
		name: "Aperture",
		desc: "Tailscale's private AI platform, self-hosted on my own tailnet. Models, MCP servers and agents meet behind one network identity, so no API key has to be handed out to reach them.",
		href: "https://aperture.tailscale.com",
	},
];

const SKILLS: LabItem[] = [
	{
		name: "ste-writing",
		desc: "Two layers, always on. The words become Simplified Technical English, so docs and commit messages read like a person wrote them. The shape puts the next action on line one, for a reader with ADHD who will not find it in paragraph four.",
		href: "/videos/the-cure-for-ai-slop/kit/ste-writing/SKILL",
		code: "/ste",
	},
	{
		name: "elliptic",
		desc: "Teaches an agent the Elliptic workspace over MCP: the domain model, the org discipline, and the mistakes that quietly land a write in the wrong workspace.",
		href: "https://github.com/woosal1337/elliptic",
		code: "/ell",
	},
	{
		name: "herdr",
		desc: "Drives Herdr, the terminal multiplexer for coding agents. An agent reads neighbouring panes and starts work in them, and refuses to try from outside a Herdr session.",
		href: "https://herdr.dev",
		code: "/hrd",
	},
];

const KNOWLEDGE: LabItem[] = [
	{
		name: "Obsidian",
		desc: "Local vault for personal notes and journaling. Deliberately not wired to MCP, some things are just for me.",
		href: "https://obsidian.md",
	},
];

export default function LabPage() {
	return (
		<Section>
			<Shell width="column">
				<BackButton className="mb-8" />
				<Reveal immediate>
					<header className="mb-10">
						<h1 className="font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
							The lab
						</h1>
						<p className="mt-3 font-ui text-[15px] leading-relaxed text-ink-mute">
							The agents, MCP servers, skills, and knowledge tools I use every
							day.
						</p>
						<div className="group relative mt-6 h-[190px] overflow-hidden rounded-[14px] border border-line bg-[#060606]">
							<OrbitField />
						</div>
					</header>
				</Reveal>

				<div className="mt-12">
					<LabGroup label="ADE" first>
						{AGENTS.map((row) => (
							<LabRow key={row.name} {...row} />
						))}
					</LabGroup>

					<LabGroup label="MCP">
						{MCPS.map((row) => (
							<LabRow key={row.name} {...row} />
						))}
					</LabGroup>

					<LabGroup label="Skills">
						{SKILLS.map((row) => (
							<LabRow key={row.name} {...row} />
						))}
					</LabGroup>

					<LabGroup label="Knowledge">
						{KNOWLEDGE.map((row) => (
							<LabRow key={row.name} {...row} />
						))}
					</LabGroup>
				</div>
			</Shell>
		</Section>
	);
}
