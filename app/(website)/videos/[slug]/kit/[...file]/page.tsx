import { BackButton } from "@/components/ds/back-button";
import { Section, Shell } from "@/components/ds/shell";
import { rehypePrettyCodeOptions } from "@/lib/mdx-options.mjs";
import { absoluteUrl } from "@/lib/seo";
import {
	formatBytes,
	getAllEpisodes,
	kitFileLanguage,
	kitFileSlug,
	listKitFiles,
	readKitFile,
	resolveKitFile,
} from "@/lib/videos";
import { useMDXComponents as mdxComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type KitPageProps = { params: { slug: string; file: string[] } };

export async function generateStaticParams() {
	const episodes = await getAllEpisodes();
	return episodes.flatMap((episode) =>
		episode.kit
			? listKitFiles(episode.kit.dir).map((file) => ({
					slug: episode.slug,
					file: kitFileSlug(file.path).split("/"),
				}))
			: [],
	);
}

async function loadKitPage(params: KitPageProps["params"]) {
	const episodes = await getAllEpisodes();
	const episode = episodes.find((e) => e.slug === params.slug);
	if (!episode?.kit) return null;

	const file = resolveKitFile(episode.kit.dir, params.file);
	if (!file) return null;

	const source = readKitFile(episode.kit.dir, file);
	if (source === null) return null;

	return { episode, kit: episode.kit, file, source };
}

export async function generateMetadata({
	params,
}: KitPageProps): Promise<Metadata> {
	const loaded = await loadKitPage(params);
	if (!loaded) return {};

	const { episode, file } = loaded;
	const name = file.split("/").pop() ?? file;
	const title = `${name} — ${episode.title} kit`;
	const description = `${name} from the kit published with “${episode.title}”: the skill, linter, and test data behind the episode.`;

	return {
		title: { absolute: title },
		description,
		alternates: {
			canonical: absoluteUrl(
				`/videos/${episode.slug}/kit/${kitFileSlug(file)}`,
			),
		},
		openGraph: {
			title,
			description,
			url: absoluteUrl(`/videos/${episode.slug}/kit/${kitFileSlug(file)}`),
			type: "article",
			images: [
				{
					url: absoluteUrl(episode.thumbnail),
					width: 1280,
					height: 720,
					alt: episode.thumbnailAlt ?? episode.title,
				},
			],
		},
	};
}

function stripFrontmatter(source: string): string {
	return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function rewriteKitLinks(
	source: string,
	slug: string,
	fileDir: string,
): string {
	return source.replace(
		/\]\((?!https?:|\/|#)([^)\s]+)\)/g,
		(match, target: string) => {
			const [rawPath, hash = ""] = target.split(/(?=#)/);
			const segments = fileDir ? `${fileDir}/${rawPath}` : rawPath;
			const normalized: string[] = [];
			for (const part of segments.split("/")) {
				if (part === "." || part === "") continue;
				if (part === "..") normalized.pop();
				else normalized.push(part);
			}
			if (!normalized.length) return match;
			return `](/videos/${slug}/kit/${kitFileSlug(normalized.join("/"))}${hash})`;
		},
	);
}

function asCodeBlock(source: string, language: string): string {
	const longestRun = Math.max(
		0,
		...Array.from(source.matchAll(/`+/g), (match) => match[0].length),
	);
	const fence = "`".repeat(Math.max(3, longestRun + 1));
	return `${fence}${language}\n${source}\n${fence}`;
}

export default async function KitFilePage({ params }: KitPageProps) {
	const loaded = await loadKitPage(params);
	if (!loaded) notFound();

	const { episode, kit, file, source } = loaded;
	const name = file.split("/").pop() ?? file;
	const fileDir = file.includes("/")
		? file.slice(0, file.lastIndexOf("/"))
		: "";
	const isMarkdown = file.endsWith(".md");
	const extension = name.slice(name.lastIndexOf(".") + 1).toLowerCase();

	const body = isMarkdown
		? rewriteKitLinks(stripFrontmatter(source), episode.slug, fileDir)
		: asCodeBlock(source, kitFileLanguage(extension));

	const { content } = await compileMDX({
		source: body,
		components: mdxComponents({}),
		options: {
			mdxOptions: {
				format: "md",
				remarkPlugins: [remarkGfm],
				rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
			},
		},
	});

	return (
		<Section>
			<Shell width="column">
				<BackButton
					href={`/videos/${episode.slug}`}
					label="Back to the episode"
					className="mb-8"
				/>
				<header className="mb-10">
					<p className="font-ui text-[13px] text-ink-mute">
						<Link
							href={`/videos/${episode.slug}`}
							className="transition-colors duration-200 ease-house hover:text-ink"
						>
							{episode.title}
						</Link>
						<span className="mx-2 text-line">/</span>
						<span>kit</span>
					</p>
					<h1 className="mt-3 font-mono text-[clamp(20px,3vw,26px)] font-semibold leading-[1.2] tracking-tight text-ink">
						{file}
					</h1>
					<p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-ui text-[13px] text-ink-mute">
						<span>{formatBytes(Buffer.byteLength(source, "utf8"))}</span>
						<span className="text-line">·</span>
						<a
							href={`${kit.repoUrl}/${file}`}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-colors duration-200 ease-house hover:text-ink"
						>
							Raw on GitHub ↗
						</a>
					</p>
					{kit.blurbs?.[file] ? (
						<p className="mt-4 font-ui text-[15px] leading-relaxed text-ink-soft">
							{kit.blurbs[file]}
						</p>
					) : null}
				</header>
				<div className="w-full min-w-0">{content}</div>
				<p className="mt-16 font-ui text-[13px] text-ink-mute">
					<Link
						href={`/videos/${episode.slug}`}
						className="transition-colors duration-200 ease-house hover:text-ink"
					>
						← Back to the episode
					</Link>
				</p>
			</Shell>
		</Section>
	);
}
