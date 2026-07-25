export type EpisodeChapter = {
	time: string;
	title: string;
};

export type EpisodeSource = {
	title: string;
	href: string;
	detail?: string;
};

export type EpisodeKit = {
	dir: string;
	repoUrl: string;
	blurbs?: Record<string, string>;
};

export type VideoEpisodeFrontmatter = {
	episode: number;
	title: string;
	seoTitle?: string;
	date: string;
	youtubeId: string;
	duration: string;
	runtime: string;
	summary: string;
	seoDescription?: string;
	socialDescription?: string;
	tags?: string[];
	thumbnail: string;
	thumbnailAlt?: string;
	chapters?: EpisodeChapter[];
	sources?: EpisodeSource[];
	kit?: EpisodeKit;
	draft?: boolean;
	hidden?: boolean;
};

export type VideoEpisodeMeta = VideoEpisodeFrontmatter & { slug: string };

export type KitFile = {
	path: string;
	dir: string;
	name: string;
	ext: string;
	bytes: number;
};

export function chapterSeconds(time: string): number {
	const parts = time.split(":").map(Number);
	if (parts.some(Number.isNaN)) return 0;
	return parts.reduce((total, part) => total * 60 + part, 0);
}

export function formatTimecode(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const rest = Math.floor(seconds % 60);
	const pad = (n: number) => String(n).padStart(2, "0");
	return hours
		? `${hours}:${pad(minutes)}:${pad(rest)}`
		: `${minutes}:${pad(rest)}`;
}

export function watchUrl(youtubeId: string): string {
	return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function chapterUrl(youtubeId: string, startSeconds: number): string {
	return startSeconds
		? `https://youtu.be/${youtubeId}?t=${startSeconds}`
		: `https://youtu.be/${youtubeId}`;
}

export function kitFileSlug(file: string): string {
	return file.endsWith(".md") ? file.slice(0, -3) : file;
}

export function kitFileHref(slug: string, file: string): string {
	return `/videos/${slug}/kit/${kitFileSlug(file)}`;
}

const LANGUAGES: Record<string, string> = {
	py: "python",
	sh: "bash",
	bash: "bash",
	json: "json",
	ts: "typescript",
	js: "javascript",
	toml: "toml",
	yml: "yaml",
	yaml: "yaml",
};

export function kitFileLanguage(ext: string): string {
	return LANGUAGES[ext] ?? "txt";
}

export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	return `${Math.round(bytes / 1024)} KB`;
}
