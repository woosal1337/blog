import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

const FEED_TITLE = "Ege Chelebi · AI Engineering Blog";
const FEED_DESCRIPTION =
	"Essays on AI agents, context engineering, local-first software, developer tools, memory systems, and applied research.";

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export async function GET() {
	const posts = await getAllPosts();
	const buildDate = new Date().toUTCString();

	const items = posts
		.map((post) => {
			const url = `${SITE_URL}/blog/${post.slug}`;
			const pubDate = new Date(post.date).toUTCString();
			const coverUrl = post.cover ? `${SITE_URL}${post.cover}` : null;
			return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.summary)}</description>
${coverUrl ? `      <enclosure url="${coverUrl}" type="image/png" length="0"/>\n      <media:content url="${coverUrl}" medium="image" type="image/png"/>` : ""}
${(post.tags ?? []).map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`;
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
