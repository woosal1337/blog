export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

const BLOG_ICON_VERSION = "2";

export function postIconSrc(slug: string): string {
	return `/blog-icon/${encodeURIComponent(slug)}?v=${BLOG_ICON_VERSION}`;
}

export function formatPostDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

const TAG_LABELS: Record<string, string> = {
	ai: "AI",
	mcp: "MCP",
	cli: "CLI",
	byok: "BYOK",
	fastapi: "FastAPI",
	macos: "macOS",
	typescript: "TypeScript",
	"claude-code": "Claude Code",
	"context-engineering": "Context Engineering",
	"multi-tenant": "Multi-tenant",
	"self-hosted": "Self-hosted",
	"local-first": "Local-first",
};

export function formatTag(tag: string | undefined): string | undefined {
	if (!tag) return tag;
	return (
		TAG_LABELS[tag] ??
		tag
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")
	);
}
