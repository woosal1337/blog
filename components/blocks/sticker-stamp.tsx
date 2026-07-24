"use client";

import type {
	StickerForgeModule,
	StickerInstance,
} from "@/types/sticker-forge";
import { useTheme } from "next-themes";
import * as React from "react";

const CURL_PAD = 60;
const PAPER_PAD = 16;
const RESTICK_DELAY_MS = 2400;

const THEMES = {
	dark: { paper: "#141417", outline: "#2c2c33", back: "#e9e6df" },
	light: { paper: "#f7f5f0", outline: "#ffffff", back: "#ffffff" },
} as const;

const FORGE_SRC: string = "/embed/sticker-forge.es.js";

let forge: Promise<StickerForgeModule> | null = null;
function loadForge() {
	forge ??= import(
		/* webpackIgnore: true */ FORGE_SRC
	) as Promise<StickerForgeModule>;
	return forge;
}

let logo: Promise<string> | null = null;
function loadLogoSvg() {
	logo ??= fetch("/contour-logo/contour-logo-white.svg")
		.then((r) => (r.ok ? r.text() : ""))
		.catch(() => "");
	return logo;
}

function inlineLogoImages(clone: SVGSVGElement, logoSvg: string) {
	if (!logoSvg) return;
	const doc = new DOMParser().parseFromString(logoSvg, "image/svg+xml");
	const root = doc.documentElement;
	const vbw =
		Number(root.getAttribute("viewBox")?.split(/\s+/)[2] ?? 256) || 256;
	const inner = root.innerHTML.replaceAll(
		'stroke="#fff"',
		'stroke="currentColor"',
	);
	for (const img of Array.from(clone.querySelectorAll("image"))) {
		if (!img.getAttribute("href")?.startsWith("/contour-logo/")) continue;
		const x = Number(img.getAttribute("x") ?? 0);
		const y = Number(img.getAttribute("y") ?? 0);
		const w = Number(img.getAttribute("width") ?? vbw) || vbw;
		const g = clone.ownerDocument.createElementNS(
			"http://www.w3.org/2000/svg",
			"g",
		);
		g.setAttribute(
			"transform",
			`translate(${x} ${y}) scale(${(w / vbw).toFixed(4)})`,
		);
		g.innerHTML = inner;
		img.replaceWith(g);
	}
}

function toStickerMarkup(
	svg: SVGSVGElement,
	ink: string,
	paper: string,
	logoSvg: string,
): string {
	const vb = svg.viewBox.baseVal;
	const w = svg.clientWidth || vb.width;
	const scale = w / vb.width;
	const h = vb.height * scale;
	const clone = svg.cloneNode(true) as SVGSVGElement;

	for (const t of Array.from(clone.querySelectorAll("text"))) {
		t.removeAttribute("class");
		t.setAttribute(
			"font-family",
			"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
		);
	}
	const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
	while (walker.nextNode()) {
		const node = walker.currentNode;
		if (node.parentElement?.closest("text") && node.nodeValue) {
			node.nodeValue = node.nodeValue.toUpperCase();
		}
	}
	inlineLogoImages(clone, logoSvg);

	const art = clone.innerHTML.replaceAll("currentColor", ink);
	const tx = PAPER_PAD - vb.x * scale;
	const ty = PAPER_PAD - vb.y * scale;
	const W = Math.round(w + PAPER_PAD * 2);
	const H = Math.round(h + PAPER_PAD * 2);
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" rx="14" fill="${paper}"/><g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">${art}</g></svg>`;
}

function makeCanvasTransparent(host: HTMLElement): boolean {
	const canvas = host.querySelector("canvas");
	const gl = canvas?.getContext("webgl2");
	if (!canvas || !gl) return false;
	canvas.tabIndex = -1;
	canvas.style.outline = "none";
	const clear = gl.clear.bind(gl);
	const clearColor = gl.clearColor.bind(gl);
	gl.clear = (mask: number) => {
		if (gl.getParameter(gl.FRAMEBUFFER_BINDING) === null) {
			const v = gl.getParameter(gl.COLOR_CLEAR_VALUE) as Float32Array;
			clearColor(v[0], v[1], v[2], 0);
			clear(mask);
			clearColor(v[0], v[1], v[2], v[3]);
			return;
		}
		clear(mask);
	};
	return true;
}

export function StickerStamp({
	tilt,
	children,
}: {
	tilt: number;
	children: React.ReactNode;
}) {
	const boxRef = React.useRef<HTMLDivElement>(null);
	const hostRef = React.useRef<HTMLDivElement>(null);
	const [live, setLive] = React.useState(false);
	const { resolvedTheme } = useTheme();

	React.useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let cancelled = false;
		let instance: StickerInstance | null = null;
		let restick: ReturnType<typeof setTimeout> | null = null;
		const host = hostRef.current;

		const onPeelEnd = (event: Event) => {
			const detail = (
				event as CustomEvent<{ progress?: number; willReset?: boolean }>
			).detail;
			if (!detail || detail.willReset || (detail.progress ?? 0) < 0.6) return;
			if (restick) clearTimeout(restick);
			restick = setTimeout(() => {
				if (!cancelled) instance?.reset();
			}, RESTICK_DELAY_MS);
		};

		(async () => {
			const svg = boxRef.current?.querySelector("svg");
			if (!svg || !host) return;
			try {
				const [mod, logoSvg] = await Promise.all([loadForge(), loadLogoSvg()]);
				if (cancelled) return;
				const theme = resolvedTheme === "light" ? THEMES.light : THEMES.dark;
				const ink = getComputedStyle(svg).color;
				const markup = toStickerMarkup(svg, ink, theme.paper, logoSvg);
				host.addEventListener("peelend", onPeelEnd);
				instance = await mod.createSticker(host, {
					source: { type: "svg", svg: markup },
					outline: { width: 10, color: theme.outline },
					shadow: {
						color: "#000000",
						opacity: resolvedTheme === "light" ? 0.18 : 0.42,
						blur: 20,
						distance: 10,
						angle: 42,
					},
					back: { color: theme.back, gloss: 0.6, roughness: 0.35 },
					sound: { enabled: true, volume: 0.45 },
					tilt,
					wind: 0.3,
				});
				if (cancelled || !makeCanvasTransparent(host)) {
					instance.destroy();
					instance = null;
					return;
				}
				instance.resize();
				setLive(true);
			} catch {}
		})();

		return () => {
			cancelled = true;
			if (restick) clearTimeout(restick);
			host?.removeEventListener("peelend", onPeelEnd);
			instance?.destroy();
			setLive(false);
		};
	}, [resolvedTheme, tilt]);

	return (
		<div className="relative">
			<div
				ref={boxRef}
				className="opacity-80 transition-opacity duration-400 ease-house"
				style={{
					transform: `rotate(${tilt}deg)`,
					opacity: live ? 0 : undefined,
				}}
			>
				{children}
			</div>
			<div
				ref={hostRef}
				aria-hidden="true"
				className="absolute transition-opacity duration-400 ease-house"
				style={{
					inset: -CURL_PAD,
					opacity: live ? 1 : 0,
					pointerEvents: live ? "auto" : "none",
				}}
			/>
		</div>
	);
}
