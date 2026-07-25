import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { KitFile, VideoEpisodeFrontmatter } from "./video-utils";

export type {
	EpisodeChapter,
	EpisodeKit,
	EpisodeSource,
	KitFile,
	VideoEpisodeFrontmatter,
	VideoEpisodeMeta,
} from "./video-utils";

export {
	chapterSeconds,
	chapterUrl,
	formatBytes,
	formatTimecode,
	kitFileHref,
	kitFileLanguage,
	kitFileSlug,
	watchUrl,
} from "./video-utils";

import type { VideoEpisodeMeta } from "./video-utils";

const EPISODES_DIR = path.join(
	process.cwd(),
	"app",
	"(website)",
	"videos",
	"(episode)",
);

const KIT_ROOT = path.join(process.cwd(), "videos");

const KIT_IGNORE = new Set([".DS_Store", ".gitignore", ".gitkeep"]);

function listSlugs(): string[] {
	if (!fs.existsSync(EPISODES_DIR)) return [];
	return fs
		.readdirSync(EPISODES_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
		.map((entry) => entry.name)
		.filter((slug) => fs.existsSync(path.join(EPISODES_DIR, slug, "page.mdx")));
}

async function loadMeta(slug: string): Promise<VideoEpisodeMeta | null> {
	try {
		const mod = (await import(
			`@/app/(website)/videos/(episode)/${slug}/page.mdx`
		)) as { meta?: VideoEpisodeFrontmatter };
		if (!mod.meta) return null;
		return { slug, ...mod.meta };
	} catch {
		return null;
	}
}

export async function getAllEpisodesWithHidden(): Promise<VideoEpisodeMeta[]> {
	const episodes = await Promise.all(listSlugs().map(loadMeta));
	return episodes
		.filter((e): e is VideoEpisodeMeta => Boolean(e) && !e?.draft)
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllEpisodes(): Promise<VideoEpisodeMeta[]> {
	return (await getAllEpisodesWithHidden()).filter((e) => !e.hidden);
}

export async function getEpisode(
	slug: string,
): Promise<VideoEpisodeMeta | null> {
	return loadMeta(slug);
}

export function getAllEpisodeSlugs(): string[] {
	return listSlugs();
}

function kitDirFor(dir: string): string | null {
	const resolved = path.resolve(KIT_ROOT, dir);
	if (resolved !== KIT_ROOT && !resolved.startsWith(`${KIT_ROOT}${path.sep}`)) {
		return null;
	}
	return fs.existsSync(resolved) ? resolved : null;
}

export function listKitFiles(dir: string): KitFile[] {
	const root = kitDirFor(dir);
	if (!root) return [];

	const files: KitFile[] = [];

	const walk = (absolute: string, relative: string) => {
		const entries = fs
			.readdirSync(absolute, { withFileTypes: true })
			.filter((entry) => !KIT_IGNORE.has(entry.name))
			.sort((a, b) => a.name.localeCompare(b.name));

		for (const entry of entries.filter((e) => e.isFile())) {
			const rel = relative ? `${relative}/${entry.name}` : entry.name;
			files.push({
				path: rel,
				dir: relative,
				name: entry.name,
				ext: path.extname(entry.name).slice(1).toLowerCase(),
				bytes: fs.statSync(path.join(absolute, entry.name)).size,
			});
		}

		for (const entry of entries.filter((e) => e.isDirectory())) {
			if (entry.name.startsWith(".") || entry.name === "__pycache__") continue;
			const rel = relative ? `${relative}/${entry.name}` : entry.name;
			walk(path.join(absolute, entry.name), rel);
		}
	};

	walk(root, "");
	return files;
}

export function resolveKitFile(dir: string, segments: string[]): string | null {
	const root = kitDirFor(dir);
	if (!root) return null;

	const joined = segments.join("/");
	for (const candidate of [joined, `${joined}.md`]) {
		const resolved = path.resolve(root, candidate);
		if (!resolved.startsWith(`${root}${path.sep}`)) continue;
		if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
			return path.relative(root, resolved).split(path.sep).join("/");
		}
	}
	return null;
}

export function readKitFile(dir: string, file: string): string | null {
	const root = kitDirFor(dir);
	if (!root) return null;
	const resolved = path.resolve(root, file);
	if (!resolved.startsWith(`${root}${path.sep}`)) return null;
	if (!fs.existsSync(resolved)) return null;
	return fs.readFileSync(resolved, "utf8");
}
