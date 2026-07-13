import "server-only";

import fs from "node:fs";
import path from "node:path";

export { formatPostDate, formatTag, slugify } from "./blog-utils";

export type BlogPostFrontmatter = {
	title: string;
	seoTitle?: string;
	date: string;
	updated?: string;
	summary: string;
	seoDescription?: string;
	socialDescription?: string;
	tags?: string[];
	draft?: boolean;
	hidden?: boolean;
	cover?: string;
	coverAlt?: string;
	readingMinutes?: number;
};

export type BlogPostMeta = BlogPostFrontmatter & {
	slug: string;
	readingMinutes: number;
};

export type Heading = {
	id: string;
	text: string;
	level: 2 | 3;
};

const POSTS_DIR = path.join(
	process.cwd(),
	"app",
	"(website)",
	"blog",
	"(post)",
);

const WORDS_PER_MINUTE = 220;

function listSlugs(): string[] {
	if (!fs.existsSync(POSTS_DIR)) return [];
	return fs
		.readdirSync(POSTS_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
		.map((entry) => entry.name)
		.filter((slug) => fs.existsSync(path.join(POSTS_DIR, slug, "page.mdx")));
}

function readRaw(slug: string): string | null {
	const file = path.join(POSTS_DIR, slug, "page.mdx");
	if (!fs.existsSync(file)) return null;
	return fs.readFileSync(file, "utf8");
}

function stripMdx(raw: string): string {
	return raw
		.replace(/^export\s+const\s+\w+\s*=\s*[\s\S]*?^};?\s*$/gm, "")
		.replace(/```[\s\S]*?```/g, "")
		.replace(/`[^`]*`/g, "")
		.replace(/<[^>]+>/g, "")
		.replace(/[#*_>~\-|]/g, " ");
}

function computeReadingMinutes(raw: string): number {
	const words = stripMdx(raw).trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

import { slugify as slugifyImpl } from "./blog-utils";

export function getHeadings(slug: string): Heading[] {
	const raw = readRaw(slug);
	if (!raw) return [];

	const seen = new Map<string, number>();
	const headings: Heading[] = [];
	const lines = raw.split("\n");
	let inFence = false;

	for (const line of lines) {
		if (/^```/.test(line)) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;

		const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
		if (!match) continue;

		const level = match[1].length as 2 | 3;
		const text = match[2].replace(/[*_`]/g, "").trim();
		const baseId = slugifyImpl(text);
		const count = seen.get(baseId) ?? 0;
		seen.set(baseId, count + 1);
		const id = count === 0 ? baseId : `${baseId}-${count}`;

		headings.push({ id, text, level });
	}

	return headings;
}

async function loadMeta(slug: string): Promise<BlogPostMeta | null> {
	try {
		const mod = (await import(
			`@/app/(website)/blog/(post)/${slug}/page.mdx`
		)) as {
			meta?: BlogPostFrontmatter;
		};
		if (!mod.meta) return null;
		const raw = readRaw(slug);
		const readingMinutes =
			mod.meta.readingMinutes ?? (raw ? computeReadingMinutes(raw) : 1);
		return { slug, ...mod.meta, readingMinutes };
	} catch {
		return null;
	}
}

export async function getAllPostsWithHidden(): Promise<BlogPostMeta[]> {
	const slugs = listSlugs();
	const posts = await Promise.all(slugs.map(loadMeta));
	return posts
		.filter((p): p is BlogPostMeta => Boolean(p) && !p?.draft)
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
	return (await getAllPostsWithHidden()).filter((p) => !p.hidden);
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta | null> {
	return loadMeta(slug);
}

export function getAllSlugs(): string[] {
	return listSlugs();
}
