import fs from "node:fs";
import path from "node:path";
import { formatPostDate, getAllSlugs, getPostMeta } from "@/lib/blog";
import { generateContour } from "@/lib/contour";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function generateStaticParams() {
	return getAllSlugs().map((slug) => ({ slug }));
}

const FONTS_DIR = path.join(process.cwd(), "public", "fonts");

export async function GET(
	_request: Request,
	{ params }: { params: { slug: string } },
) {
	const post = await getPostMeta(params.slug);
	const title = post?.title ?? params.slug;
	const date = post?.date ? formatPostDate(post.date) : "";

	const svg = await generateContour(title, "#f5f5f5");
	const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

	const shownTitle = title.length > 110 ? `${title.slice(0, 109)}…` : title;
	const titleSize = shownTitle.length > 55 ? 44 : 54;

	const geistSemiBold = fs.readFileSync(
		path.join(FONTS_DIR, "Geist-SemiBold.ttf"),
	);
	const geistMono = fs.readFileSync(
		path.join(FONTS_DIR, "GeistMono-Regular.ttf"),
	);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				backgroundColor: "#0a0a0a",
				backgroundImage:
					"radial-gradient(circle at 78% 50%, rgba(255,255,255,0.06), rgba(255,255,255,0) 55%)",
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={dataUri}
				width={430}
				height={430}
				alt=""
				style={{
					position: "absolute",
					right: 64,
					top: 99,
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: 72,
					bottom: 64,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					maxWidth: 640,
				}}
			>
				<div
					style={{
						fontFamily: "Geist Mono",
						fontSize: 20,
						letterSpacing: "0.18em",
						color: "#a0a0a0",
					}}
				>
					chele.bi
				</div>
				<div
					style={{
						marginTop: 16,
						display: "flex",
						flexWrap: "wrap",
						columnGap: 13,
						rowGap: 6,
						fontFamily: "Geist",
						fontWeight: 600,
						fontSize: titleSize,
						lineHeight: 1.05,
						letterSpacing: "-0.02em",
						color: "#f5f5f5",
					}}
				>
					{shownTitle.split(/\s+/).map((word, i) => (
						<span key={i} style={{ display: "flex" }}>
							{word}
						</span>
					))}
				</div>
				{date && (
					<div
						style={{
							marginTop: 20,
							fontFamily: "Geist Mono",
							fontSize: 19,
							color: "#787878",
						}}
					>
						{date}
					</div>
				)}
			</div>
		</div>,
		{
			width: 1200,
			height: 628,
			fonts: [
				{ name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
				{ name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
			],
		},
	);
}
