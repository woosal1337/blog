export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export function formatPostDate(date: string): string {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

/** Acronyms and brand names that need exact casing; everything else just gets
 * its first letter capitalized. */
const TAG_LABELS: Record<string, string> = {
	ai: "AI",
	mcp: "MCP",
	byok: "BYOK",
	fastapi: "FastAPI",
	macos: "macOS",
	"claude-code": "Claude Code",
	"context-engineering": "Context Engineering",
	"multi-tenant": "Multi-tenant",
	"self-hosted": "Self-hosted",
	"local-first": "Local-first",
};

/** Display label for a tag: `ai` → `AI`, `tech` → `Tech`, `macos` → `macOS`,
 * `media arts` → `Media Arts`. Known acronyms/brands keep exact casing;
 * everything else is title-cased word by word. */
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
