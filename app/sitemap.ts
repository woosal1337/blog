import { getAllPosts } from "@/lib/blog";

export default async function sitemap() {
	const today = new Date().toISOString().split("T")[0];
	const staticRoutes = ["", "/blog", "/projects", "/about"].map((route) => ({
		url: `https://chele.bi${route}`,
		lastModified: today,
	}));

	const posts = await getAllPosts();
	const postRoutes = posts.map((post) => ({
		url: `https://chele.bi/blog/${post.slug}`,
		lastModified: post.date.split("T")[0],
	}));

	return [...staticRoutes, ...postRoutes];
}
