import { getAllSlugs, getPostMeta } from "@/lib/blog";
import { generateContour } from "@/lib/contour";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
	return getAllSlugs().map((slug) => ({ slug }));
}

export async function GET(
	_request: Request,
	{ params }: { params: { slug: string } },
) {
	const post = await getPostMeta(params.slug);
	const title = post?.title ?? params.slug;

	const svg = await generateContour(title, "#f5f5f5");
	const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#0a0a0a",
				backgroundImage:
					"radial-gradient(circle at 50% 46%, rgba(255,255,255,0.05), rgba(255,255,255,0) 60%)",
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={dataUri} width={440} height={440} alt="" />
		</div>,
		{
			width: 1200,
			height: 628,
		},
	);
}
