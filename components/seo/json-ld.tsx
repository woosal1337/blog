import type { BlogPostFrontmatter, BlogPostMeta } from "@/lib/blog";
import {
	PERSON_ID,
	PERSON_SAME_AS,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
	WEBSITE_ID,
	absoluteUrl,
} from "@/lib/seo";

function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted metadata is JSON-serialized and escapes HTML opening characters
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}

const person = {
	"@type": "Person",
	"@id": PERSON_ID,
	name: SITE_NAME,
	url: absoluteUrl("/about"),
	image: absoluteUrl("/avatar.png"),
	jobTitle: "AI Engineer",
	worksFor: {
		"@type": "Organization",
		name: "Refik Anadol Studio",
		url: "https://refikanadolstudio.com/",
	},
	sameAs: PERSON_SAME_AS,
};

export function WebsiteJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "WebSite",
						"@id": WEBSITE_ID,
						url: SITE_URL,
						name: SITE_NAME,
						alternateName: ["chele.bi", "Ege"],
						description: SITE_DESCRIPTION,
						inLanguage: "en",
						publisher: { "@id": PERSON_ID },
					},
					person,
				],
			}}
		/>
	);
}

export function ProfilePageJsonLd() {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "ProfilePage",
						"@id": `${absoluteUrl("/about")}#profile`,
						url: absoluteUrl("/about"),
						name: `About ${SITE_NAME}`,
						description: SITE_DESCRIPTION,
						inLanguage: "en",
						isPartOf: { "@id": WEBSITE_ID },
						mainEntity: { "@id": PERSON_ID },
					},
					person,
				],
			}}
		/>
	);
}

export function BlogIndexJsonLd({ posts }: { posts: BlogPostMeta[] }) {
	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@type": "CollectionPage",
				"@id": `${absoluteUrl("/blog")}#collection`,
				url: absoluteUrl("/blog"),
				name: "AI Engineering, Agents, and Local-First Tools",
				description:
					"Essays by Ege Chelebi on AI agents, context engineering, local-first software, developer tools, memory systems, and applied research.",
				inLanguage: "en",
				isPartOf: { "@id": WEBSITE_ID },
				author: { "@id": PERSON_ID },
				mainEntity: {
					"@type": "ItemList",
					itemListElement: posts.map((post, index) => ({
						"@type": "ListItem",
						position: index + 1,
						url: absoluteUrl(`/blog/${post.slug}`),
						name: post.title,
					})),
				},
			}}
		/>
	);
}

export function ArticleJsonLd({
	meta,
	slug,
}: {
	meta: BlogPostFrontmatter;
	slug: string;
}) {
	const url = absoluteUrl(`/blog/${slug}`);
	const description = meta.seoDescription ?? meta.summary;
	const image = absoluteUrl(`/blog-og/${slug}`);

	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "BlogPosting",
						"@id": `${url}#article`,
						url,
						headline: meta.title,
						description,
						image: {
							"@type": "ImageObject",
							url: image,
							width: 1200,
							height: 628,
						},
						datePublished: meta.date,
						dateModified: meta.updated ?? meta.date,
						inLanguage: "en",
						isPartOf: { "@id": `${absoluteUrl("/blog")}#collection` },
						mainEntityOfPage: { "@type": "WebPage", "@id": url },
						author: { "@id": PERSON_ID },
						publisher: { "@id": PERSON_ID },
						keywords: meta.tags?.join(", "),
						articleSection: meta.tags?.[0],
					},
					person,
					{
						"@type": "BreadcrumbList",
						"@id": `${url}#breadcrumb`,
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: SITE_URL,
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "Blog",
								item: absoluteUrl("/blog"),
							},
							{
								"@type": "ListItem",
								position: 3,
								name: meta.title,
								item: url,
							},
						],
					},
				],
			}}
		/>
	);
}
