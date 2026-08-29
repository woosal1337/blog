import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { GallerySetFrontmatter, GallerySetMeta } from "./gallery-utils";

export type {
	GalleryFrame,
	GallerySetFrontmatter,
	GallerySetMeta,
} from "./gallery-utils";

export { frameCount, isVideoFrame, setDate } from "./gallery-utils";

const SETS_DIR = path.join(
	process.cwd(),
	"app",
	"(website)",
	"gallery",
	"(set)",
);

function listSlugs(): string[] {
	if (!fs.existsSync(SETS_DIR)) return [];
	return fs
		.readdirSync(SETS_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
		.map((entry) => entry.name)
		.filter((slug) => fs.existsSync(path.join(SETS_DIR, slug, "page.mdx")));
}

async function loadMeta(slug: string): Promise<GallerySetMeta | null> {
	try {
		const mod = (await import(
			`@/app/(website)/gallery/(set)/${slug}/page.mdx`
		)) as {
			meta?: GallerySetFrontmatter;
		};
		if (!mod.meta) return null;
		return { slug, ...mod.meta };
	} catch {
		return null;
	}
}

export async function getAllSetsWithHidden(): Promise<GallerySetMeta[]> {
	const sets = await Promise.all(listSlugs().map(loadMeta));
	return sets
		.filter((s): s is GallerySetMeta => Boolean(s) && !s?.draft)
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllSets(): Promise<GallerySetMeta[]> {
	return (await getAllSetsWithHidden()).filter((s) => !s.hidden);
}

export async function getSet(slug: string): Promise<GallerySetMeta | null> {
	return loadMeta(slug);
}

export function getAllSetSlugs(): string[] {
	return listSlugs();
}
