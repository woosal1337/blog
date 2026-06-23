import type { Config } from "tailwindcss";
import animations from "tailwindcss-animate";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx,mdx}",
		"./src/**/*.{ts,tsx}",
		"./mdx-components.tsx",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "22px",
			screens: {
				"2xl": "1120px",
			},
		},
		extend: {
			fontFamily: {
				// Terminal aesthetic: everything is Geist Mono. Sans === mono.
				sans: [
					"var(--font-geist-mono)",
					"JetBrains Mono",
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Consolas",
					"monospace",
				],
				mono: [
					"var(--font-geist-mono)",
					"JetBrains Mono",
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Consolas",
					"monospace",
				],
			},

			fontSize: {
				// uppercase tracked terminal label / meta line (DATE · N MIN READ · ...)
				meta: [
					"12px",
					{ lineHeight: "1.33337", letterSpacing: "0.14em", fontWeight: "400" },
				],
				caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.01em" }],
				label: [
					"12px",
					{ lineHeight: "1.33337", letterSpacing: "0.14em", fontWeight: "500" },
				],
				footnote: ["13.5px", { lineHeight: "1.55", letterSpacing: "0" }],
				body: ["15px", { lineHeight: "1.7", letterSpacing: "0" }],
				subhead: ["18px", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
				eyebrow: [
					"clamp(18px, 2vw, 22px)",
					{
						lineHeight: "1.3",
						letterSpacing: "-0.01em",
						fontWeight: "500",
					},
				],
				title: [
					"clamp(22px, 3vw, 28px)",
					{
						lineHeight: "1.2",
						letterSpacing: "-0.015em",
						fontWeight: "600",
					},
				],
				headline: [
					"clamp(30px, 5vw, 40px)",
					{
						lineHeight: "1.08",
						letterSpacing: "-0.02em",
						fontWeight: "600",
					},
				],
				display: [
					"clamp(34px, 6vw, 52px)",
					{
						lineHeight: "1.04",
						letterSpacing: "-0.025em",
						fontWeight: "600",
					},
				],
			},
			colors: {
				border: "rgb(var(--border) / <alpha-value>)",
				input: "rgb(var(--input) / <alpha-value>)",
				ring: "rgb(var(--ring) / <alpha-value>)",
				background: "rgb(var(--background) / <alpha-value>)",
				foreground: "rgb(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "rgb(var(--primary) / <alpha-value>)",
					foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
					foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
					foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "rgb(var(--muted) / <alpha-value>)",
					foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "rgb(var(--accent) / <alpha-value>)",
					foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT: "rgb(var(--popover) / <alpha-value>)",
					foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
				},
				card: {
					DEFAULT: "rgb(var(--card) / <alpha-value>)",
					foreground: "rgb(var(--card-foreground) / <alpha-value>)",
				},
				link: "rgb(var(--link) / <alpha-value>)",
				action: {
					DEFAULT: "rgb(var(--action) / <alpha-value>)",
					hover: "rgb(var(--action-hover) / <alpha-value>)",
					active: "rgb(var(--action-active) / <alpha-value>)",
				},
				tertiary: "rgb(var(--tertiary) / <alpha-value>)",
				raised: "rgb(var(--raised) / <alpha-value>)",
				// oak semantic aliases (terminal palette)
				paper: "rgb(var(--paper) / <alpha-value>)",
				"paper-2": "rgb(var(--paper-2) / <alpha-value>)",
				"paper-3": "rgb(var(--paper-3) / <alpha-value>)",
				ink: "rgb(var(--ink) / <alpha-value>)",
				"ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
				"ink-mute": "rgb(var(--ink-mute) / <alpha-value>)",
				line: "rgb(var(--line) / <alpha-value>)",
				"line-strong": "rgb(var(--line-strong) / <alpha-value>)",
			},
			borderRadius: {
				// Terminal aesthetic: sharp corners everywhere.
				none: "0px",
				sm: "0px",
				DEFAULT: "0px",
				md: "0px",
				lg: "0px",
				xl: "0px",
				"2xl": "0px",
				"3xl": "0px",
				full: "0px",
				pill: "0px",
			},
			boxShadow: {
				story: "none",
				"story-hover": "none",
			},
			maxWidth: {
				shell: "1120px",
				article: "720px",
				wide: "1280px",
				frame: "1120px",
			},
			transitionTimingFunction: {
				house: "cubic-bezier(0.16, 1, 0.3, 1)",
				curtain: "cubic-bezier(0.4, 0, 0.6, 1)",
			},
			transitionDuration: {
				"240": "240ms",
				"400": "400ms",
				"800": "800ms",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				barBounce: {
					"0%, 100%": { height: "3px" },
					"50%": { height: "12px" },
				},
				caretBlink: {
					"0%, 49%": { opacity: "1" },
					"50%, 100%": { opacity: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"bar-bounce": "barBounce 0.6s ease-in-out infinite",
				caret: "caretBlink 1.1s steps(1) infinite",
			},
		},
	},
	plugins: [animations],
} satisfies Config;

export default config;
