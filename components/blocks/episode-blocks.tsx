import { YouTubeFacade } from "@/components/blocks/youtube-facade";
import { EntryRow } from "@/components/ds/entry-row";
import { IconLink } from "@/components/ds/icon-link";
import { Tag } from "@/components/ds/tag";
import { formatPostDate, formatTag } from "@/lib/blog-utils";
import {
	type EpisodeKit,
	type EpisodeSource,
	type VideoEpisodeFrontmatter,
	formatBytes,
	kitFileHref,
	listKitFiles,
} from "@/lib/videos";
import Link from "next/link";

const heading =
	"mb-3 mt-14 scroll-mt-24 font-ui text-[19px] font-semibold tracking-tight text-ink";

function CodeGlyph() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<title>Code file</title>
			<path
				d="m6 5.5-2.5 2.5L6 10.5M10 5.5 12.5 8 10 10.5"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function LinkGlyph() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<title>External reference</title>
			<path
				d="M6.5 9.5 9.5 6.5M7 4.5l.9-.9a2.55 2.55 0 0 1 3.6 3.6l-.9.9M9 11.5l-.9.9a2.55 2.55 0 0 1-3.6-3.6l.9-.9"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function EpisodeHeader({
	meta,
}: { meta: VideoEpisodeFrontmatter & { slug?: string } }) {
	return (
		<header className="not-prose mb-10">
			<p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-ui text-[13px] text-ink-mute">
				<time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
				<span className="text-line">·</span>
				<span>{meta.runtime}</span>
				<span className="text-line">·</span>
				<Link
					href="/about"
					rel="author"
					className="text-ink-mute transition-colors duration-200 ease-house hover:text-ink"
				>
					Ege Vusal Chelebi
				</Link>
			</p>
			<h1 className="mt-4 font-ui text-[clamp(26px,4vw,34px)] font-semibold leading-[1.12] tracking-tight text-ink">
				{meta.title}
			</h1>
			{meta.tags && meta.tags.length > 0 && (
				<div className="mt-5 flex flex-wrap gap-2">
					{meta.tags.map((tag) => (
						<Tag key={tag}>{formatTag(tag)}</Tag>
					))}
				</div>
			)}
			<div className="mt-8">
				<YouTubeFacade
					videoId={meta.youtubeId}
					title={meta.title}
					thumbnail={meta.thumbnail}
					thumbnailAlt={meta.thumbnailAlt}
					runtime={meta.runtime}
				/>
			</div>
		</header>
	);
}

const CODE_EXTS = new Set([
	"py",
	"sh",
	"js",
	"ts",
	"json",
	"toml",
	"yml",
	"yaml",
]);

export async function EpisodeKitList({
	slug,
	kit,
}: { slug: string; kit?: EpisodeKit }) {
	if (!kit) return null;

	const files = listKitFiles(kit.dir);
	if (!files.length) return null;

	const order = Object.keys(kit.blurbs ?? {});
	const rank = (key: string) => {
		const index = order.indexOf(key);
		return index === -1 ? Number.MAX_SAFE_INTEGER : index;
	};

	const top = files
		.filter((file) => !file.dir)
		.sort((a, b) => rank(a.path) - rank(b.path));
	const groups = new Map<string, typeof files>();
	for (const file of files.filter((f) => f.dir)) {
		groups.set(file.dir, [...(groups.get(file.dir) ?? []), file]);
	}

	const orderedGroups = Array.from(groups.entries())
		.map(
			([dir, groupFiles]) =>
				[
					dir,
					[...groupFiles].sort((a, b) => rank(a.path) - rank(b.path)),
				] as const,
		)
		.sort(([a], [b]) => rank(`${a}/`) - rank(`${b}/`));

	return (
		<section className="not-prose">
			<h2 id="kit" className={heading}>
				The kit
			</h2>
			<p className="mb-5 font-ui text-[15px] leading-relaxed text-ink-mute">
				Everything the episode promises in the description, in two folders: the
				skill you install, and the test data behind the numbers. Read it here or
				clone the folder.
			</p>
			<div className="flex flex-col">
				{top.map((file) => (
					<EntryRow
						key={file.path}
						href={kitFileHref(slug, file.path)}
						title={file.name}
						icon={CODE_EXTS.has(file.ext) ? <CodeGlyph /> : undefined}
						meta={kit.blurbs?.[file.path] ?? formatBytes(file.bytes)}
					/>
				))}
			</div>

			{orderedGroups.map(([dir, groupFiles]) => (
				<div key={dir} className="mt-8">
					<p className="font-mono text-[13px] text-ink-soft">{dir}/</p>
					{kit.blurbs?.[`${dir}/`] ? (
						<p className="mt-1 mb-2 font-ui text-[13px] leading-relaxed text-ink-mute">
							{kit.blurbs[`${dir}/`]}
						</p>
					) : (
						<div className="mb-2" />
					)}
					<div className="flex flex-col border-l border-line pl-3">
						{groupFiles.map((file) => (
							<EntryRow
								key={file.path}
								href={kitFileHref(slug, file.path)}
								title={file.name}
								icon={CODE_EXTS.has(file.ext) ? <CodeGlyph /> : undefined}
								meta={kit.blurbs?.[file.path] ?? formatBytes(file.bytes)}
							/>
						))}
					</div>
				</div>
			))}

			<p className="mt-8 font-ui text-[15px]">
				<IconLink href={kit.repoUrl}>The Kit</IconLink>
			</p>
		</section>
	);
}

export function EpisodeSources({ sources }: { sources?: EpisodeSource[] }) {
	if (!sources?.length) return null;

	return (
		<section className="not-prose">
			<h2 id="sources" className={heading}>
				Sources
			</h2>
			<div className="flex flex-col">
				{sources.map((source) => (
					<EntryRow
						key={source.href}
						href={source.href}
						external
						icon={<LinkGlyph />}
						title={source.title}
						meta={source.detail}
					/>
				))}
			</div>
		</section>
	);
}
