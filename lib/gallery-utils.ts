// Types and helpers for the /gallery section. This file stays free of
// node:fs so a client component can import it. Server-only discovery lives
// in lib/gallery.ts, the same split as video-utils.ts and videos.ts.

export type GalleryFrame = {
	/** Image path, or the mp4 path when kind is "video". */
	src: string;
	kind?: "image" | "video";
	alt: string;
	/** Video only. The still that holds the frame before playback starts. */
	poster?: string;
	width: number;
	height: number;
	caption?: string;
	/** Let one frame run the full width of the grid. */
	full?: boolean;
};

export type GallerySetFrontmatter = {
	title: string;
	date: string;
	summary: string;
	seoDescription?: string;
	socialDescription?: string;
	/** Where the set was shot, or what made it. Shown under the title. */
	place?: string;
	cover: GalleryFrame;
	frames: GalleryFrame[];
	tags?: string[];
	draft?: boolean;
	hidden?: boolean;
};

export type GallerySetMeta = GallerySetFrontmatter & { slug: string };

export function isVideoFrame(frame: GalleryFrame): boolean {
	return frame.kind === "video" || /\.(mp4|webm|mov)$/i.test(frame.src);
}

export function setDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function frameCount(set: GallerySetMeta): string {
	const videos = set.frames.filter(isVideoFrame).length;
	const stills = set.frames.length - videos;
	const parts: string[] = [];
	if (stills) parts.push(`${stills} ${stills === 1 ? "photo" : "photos"}`);
	if (videos) parts.push(`${videos} ${videos === 1 ? "clip" : "clips"}`);
	return parts.join(" · ");
}
