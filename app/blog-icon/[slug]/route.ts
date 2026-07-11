import { getPostMeta } from "@/lib/blog";
import { generateContour } from "@/lib/contour";

export const runtime = "nodejs";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } },
) {
	const post = await getPostMeta(params.slug);
	if (!post) {
		return Response.redirect(new URL("/favicon.svg?v=2", request.url), 307);
	}

	const svg = await generateContour(post.title, "#f5f5f5", {
		nonScalingStroke: true,
		strokeWidth: 0.3,
	});

	return new Response(svg, {
		headers: {
			"Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
			"Content-Type": "image/svg+xml; charset=utf-8",
			"X-Content-Type-Options": "nosniff",
		},
	});
}
