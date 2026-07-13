import type { BlogPostFrontmatter } from "@/lib/blog";
import type { Metadata } from "next";

export const SITE_URL = "https://www.chele.bi";
export const SITE_NAME = "Ege Chelebi";
export const SITE_HANDLE = "@woosal1337";
export const SITE_DESCRIPTION =
	"Ege Chelebi is an AI engineer at Refik Anadol Studio, building thoughtful tools across generative art, open source, and applied AI.";

export const PERSON_ID = `${SITE_URL}/about#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PERSON_SAME_AS = [
	"https://x.com/woosal1337",
	"https://github.com/woosal1337",
	"https://linkedin.com/in/woosal",
	"https://www.instagram.com/woosal1337/",
];

export function absoluteUrl(pathname: string): string {
	return new URL(pathname, SITE_URL).toString();
}

type PageMetadataOptions = {
	title: string;
	description: string;
	socialDescription?: string;
	path: string;
	absoluteTitle?: boolean;
};

export function createPageMetadata({
	title,
	description,
	socialDescription = description,
	path,
	absoluteTitle = false,
}: PageMetadataOptions): Metadata {
	const canonical = absoluteUrl(path);
	const image = absoluteUrl("/og");

	return {
		title: absoluteTitle ? { absolute: title } : title,
		description,
		alternates: {
			canonical,
			types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
		},
		openGraph: {
			title,
			description: socialDescription,
			url: canonical,
			type: "website",
			images: [
				{
					url: image,
					width: 1200,
					height: 630,
					alt: "Ege Chelebi — AI engineer, developer, and researcher",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: socialDescription,
			site: SITE_HANDLE,
			creator: SITE_HANDLE,
			images: [image],
		},
	};
}

export function createPostMetadata(
	meta: BlogPostFrontmatter,
	slug: string,
): Metadata {
	const title = meta.seoTitle ?? meta.title;
	const description = meta.seoDescription ?? meta.summary;
	const socialDescription = meta.socialDescription ?? description;
	const canonical = absoluteUrl(`/blog/${slug}`);
	const image = absoluteUrl(`/blog-og/${slug}`);

	return {
		title: { absolute: title },
		description,
		keywords: meta.tags,
		authors: [{ name: SITE_NAME, url: absoluteUrl("/about") }],
		creator: SITE_NAME,
		publisher: SITE_NAME,
		category: meta.tags?.[0],
		alternates: {
			canonical,
			types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
		},
		robots: meta.hidden ? { index: false, follow: false } : undefined,
		openGraph: {
			title,
			description: socialDescription,
			url: canonical,
			type: "article",
			publishedTime: meta.date,
			modifiedTime: meta.updated ?? meta.date,
			authors: [absoluteUrl("/about")],
			tags: meta.tags,
			images: [
				{
					url: image,
					width: 1200,
					height: 628,
					alt: meta.coverAlt ?? meta.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: socialDescription,
			site: SITE_HANDLE,
			creator: SITE_HANDLE,
			images: [image],
		},
	};
}
