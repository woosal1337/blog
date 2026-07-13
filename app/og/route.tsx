import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export async function GET() {
	const contour = fs.readFileSync(
		path.join(PUBLIC_DIR, "contour-logo", "contour-logo-white.svg"),
		"utf8",
	);
	const contourDataUri = `data:image/svg+xml;base64,${Buffer.from(contour).toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				position: "relative",
				display: "flex",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				backgroundColor: "#101010",
				backgroundImage:
					"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.075), rgba(255,255,255,0) 42%)",
				color: "#f5f5f5",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						position: "absolute",
						left: 0,
						top: 0,
						width: "100%",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
					}}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={contourDataUri}
						width={590}
						height={590}
						alt=""
						style={{ opacity: 0.045, transform: "scale(3.2)" }}
					/>
				</div>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={contourDataUri}
					width={590}
					height={590}
					alt=""
					style={{ opacity: 0.94 }}
				/>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
