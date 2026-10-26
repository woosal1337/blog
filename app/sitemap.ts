import { fame } from "@/data/fame";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import { getAllEpisodes, kitFileHref, listKitFiles } from "@/lib/videos";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticRoutes = [
		"",
		"/blog",
		"/projects",
		"/videos",
		"/wall",
		"/about",
		"/lab",
	].map((route) => ({
		url: absoluteUrl(route || "/"),
	}));

	const posts = await getAllPosts();
	const postRoutes = posts.map((post) => ({
		url: absoluteUrl(`/blog/${post.slug}`),
		lastModified: (post.updated ?? post.date).split("T")[0],
	}));

	const episodes = await getAllEpisodes();
	const episodeRoutes = episodes.map((episode) => ({
		url: absoluteUrl(`/videos/${episode.slug}`),
		lastModified: episode.date.split("T")[0],
	}));

	const fameRoutes = fame.map((person) => ({
		url: absoluteUrl(`/wall/${person.slug}`),
	}));

	const kitRoutes = episodes.flatMap((episode) =>
		episode.kit
			? listKitFiles(episode.kit.dir).map((file) => ({
					url: absoluteUrl(kitFileHref(episode.slug, file.path)),
					lastModified: episode.date.split("T")[0],
				}))
			: [],
	);

	return [
		...staticRoutes,
		...postRoutes,
		...episodeRoutes,
		...fameRoutes,
		...kitRoutes,
	];
}
