import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes = ["", "/blog", "/projects", "/about", "/setup"].map(
		(route) => ({
			url: absoluteUrl(route || "/"),
		}),
	);

	const posts = await getAllPosts();
	const postRoutes = posts.map((post) => ({
		url: absoluteUrl(`/blog/${post.slug}`),
		lastModified: (post.updated ?? post.date).split("T")[0],
	}));

	return [...staticRoutes, ...postRoutes];
}
