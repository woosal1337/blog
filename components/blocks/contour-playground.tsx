"use client";

import { generateContour } from "@/lib/contour";
import { useEffect, useRef, useState } from "react";

const BACKGROUND_COLOR = "#101010";

function slugify(value: string) {
	return (
		value
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "") || "contour"
	);
}

function triggerDownload(url: string, filename: string) {
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	URL.revokeObjectURL(url);
}

function downloadSvg(svg: string, filename: string) {
	const blob = new Blob([svg], { type: "image/svg+xml" });
	triggerDownload(URL.createObjectURL(blob), filename);
}

function downloadPng(svg: string, filename: string, background: string | null) {
	const size = 1024;
	const svgBlob = new Blob([svg], { type: "image/svg+xml" });
	const svgUrl = URL.createObjectURL(svgBlob);
	const image = new Image();

	image.onload = () => {
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const context = canvas.getContext("2d");
		URL.revokeObjectURL(svgUrl);
		if (!context) return;
		if (background) {
			context.fillStyle = background;
			context.fillRect(0, 0, size, size);
		}
		context.drawImage(image, 0, 0, size, size);
		canvas.toBlob((blob) => {
			if (!blob) return;
			triggerDownload(URL.createObjectURL(blob), filename);
		}, "image/png");
	};

	image.src = svgUrl;
}

export function ContourPlayground() {
	const [name, setName] = useState("");
	const [seed, setSeed] = useState("");
	const [svg, setSvg] = useState("");
	const [previewUrl, setPreviewUrl] = useState("");
	const [transparentPng, setTransparentPng] = useState(false);
	const latest = useRef(0);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	useEffect(() => {
		const trimmed = name.trim().toLowerCase();
		const run = ++latest.current;
		if (!trimmed) {
			setSvg("");
			setSeed("");
			setPreviewUrl("");
			return;
		}
		const timer = setTimeout(async () => {
			const markup = await generateContour(trimmed);
			if (latest.current !== run) return;
			setSvg(markup);
			setPreviewUrl(
				URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" })),
			);
			setSeed(trimmed);
		}, 250);
		return () => clearTimeout(timer);
	}, [name]);

	const filenameBase = `${slugify(seed)}-contour`;

	return (
		<div className="not-prose my-10 rounded-[12px] border border-line bg-paper-2 p-6 sm:p-8">
			<input
				value={name}
				onChange={(event) => setName(event.target.value)}
				placeholder="type a name, any name"
				aria-label="name or string to generate a mark from"
				autoComplete="off"
				spellCheck={false}
				className="h-11 w-full rounded-[10px] border border-line bg-paper px-3.5 font-ui text-[14px] text-ink outline-none transition-colors duration-200 ease-house placeholder:text-ink-mute focus:border-line-strong"
			/>

			<div className="mx-auto mt-6 aspect-square w-full max-w-[300px]">
				<div className="grid h-full w-full place-items-center rounded-[12px] border border-line bg-paper p-6">
					{previewUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={previewUrl}
							alt={`Contour mark for ${seed}`}
							className="h-full w-full object-contain"
						/>
					) : (
						<span className="font-ui text-[13px] text-ink-mute">
							your mark appears here
						</span>
					)}
				</div>
			</div>

			{seed && (
				<p className="mt-3 text-center font-ui text-[12.5px] text-ink-mute">
					mark for “{seed}”
				</p>
			)}

			{svg && (
				<div className="mx-auto mt-5 flex max-w-[300px] flex-col gap-3">
					<label className="flex cursor-pointer select-none items-center gap-2 font-ui text-[13px] text-ink-soft">
						<input
							type="checkbox"
							checked={transparentPng}
							onChange={(event) => setTransparentPng(event.target.checked)}
							className="h-3.5 w-3.5 accent-white"
						/>
						Transparent PNG background
					</label>
					<div className="grid grid-cols-2 gap-2">
						<button
							type="button"
							onClick={() => downloadSvg(svg, `${filenameBase}.svg`)}
							className="h-10 rounded-[10px] border border-line font-ui text-[13px] text-ink-soft transition-colors duration-200 ease-house hover:border-line-strong hover:text-ink"
						>
							Download SVG
						</button>
						<button
							type="button"
							onClick={() =>
								downloadPng(
									svg,
									`${filenameBase}.png`,
									transparentPng ? null : BACKGROUND_COLOR,
								)
							}
							className="h-10 rounded-[10px] border border-line font-ui text-[13px] text-ink-soft transition-colors duration-200 ease-house hover:border-line-strong hover:text-ink"
						>
							Download PNG
						</button>
					</div>
				</div>
			)}

			<p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
				deterministic · π-derived · runs in your browser
			</p>
		</div>
	);
}
