export interface StickerTextSource {
	type: "text";
	text: string;
	color?: string;
	fontFamily?: string;
	fontWeight?: number | string;
}

export interface StickerSvgSource {
	type: "svg";
	svg: string;
}

export interface StickerImageSource {
	type: "image";
	src: string;
	name?: string;
}

export type StickerSource =
	| StickerTextSource
	| StickerSvgSource
	| StickerImageSource;

export interface StickerOptions {
	source?: StickerSource;
	outline?: { width?: number; color?: string };
	shadow?: {
		color?: string;
		opacity?: number;
		blur?: number;
		distance?: number;
		angle?: number;
	};
	peel?: {
		radius?: number;
		stiffness?: number;
		grabWidth?: number;
		maxAngle?: number;
		release?: "reset" | "stay" | "snap";
	};
	back?: { color?: string; gloss?: number; roughness?: number };
	sound?: { src?: string; volume?: number; enabled?: boolean };
	tilt?: number;
	wind?: number;
	quality?: "low" | "medium" | "high";
}

export interface StickerState {
	readonly ready: boolean;
	readonly dragging: boolean;
	readonly progress: number;
}

export interface StickerInstance {
	setSource(source: StickerSource): Promise<void>;
	setOptions(options: Partial<StickerOptions>): void;
	reset(): void;
	resize(): void;
	getState(): Readonly<StickerState>;
	destroy(): void;
}

export interface StickerForgeModule {
	createSticker(
		target: HTMLElement | string,
		options?: StickerOptions,
	): Promise<StickerInstance>;
	defineStickerForge(tagName?: string): void;
	sanitizeSvgMarkup(markup: string): string;
}
