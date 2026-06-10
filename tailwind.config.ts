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
				"2xl": "980px",
			},
		},
		extend: {
			fontFamily: {
				sans: [
					"-apple-system",
					"BlinkMacSystemFont",
					"Helvetica Neue",
					"Helvetica",
					"Arial",
					"sans-serif",
				],
				mono: [
						"ui-monospace",
					"SF Mono",
					"SFMono-Regular",
					"Menlo",
					"Consolas",
					"monospace",
				],
			},

			fontSize: {
				caption: ["12px", { lineHeight: "1.33337", letterSpacing: "-0.01em" }],
				label: [
					"12px",
					{ lineHeight: "1.33337", letterSpacing: "0.1em", fontWeight: "600" },
				],
				footnote: [
					"14px",
					{ lineHeight: "1.42859", letterSpacing: "-0.016em" },
				],
				body: ["17px", { lineHeight: "1.47059", letterSpacing: "-0.022em" }],
				subhead: ["21px", { lineHeight: "1.381", letterSpacing: "0.011em" }],
				eyebrow: [
					"clamp(19px, 2vw, 24px)",
					{
						lineHeight: "1.16667",
						letterSpacing: "0.009em",
						fontWeight: "600",
					},
				],
				title: [
					"clamp(24px, 3vw, 28px)",
					{
						lineHeight: "1.14286",
						letterSpacing: "0.007em",
						fontWeight: "600",
					},
				],
				headline: [
					"clamp(32px, 5vw, 48px)",
					{
						lineHeight: "1.0834",
						letterSpacing: "-0.003em",
						fontWeight: "600",
					},
				],
				display: [
					"clamp(40px, 6vw, 56px)",
					{
						lineHeight: "1.0714",
						letterSpacing: "-0.005em",
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
			},
			borderRadius: {
				sm: "5px",
				DEFAULT: "10px",
				md: "10px",
				lg: "12px",
				xl: "18px",
				"2xl": "28px",
				pill: "980px",
			},
			boxShadow: {
				story: "2px 4px 12px rgba(0, 0, 0, 0.08)",
				"story-hover": "2px 4px 16px rgba(0, 0, 0, 0.16)",
			},
			maxWidth: {
				shell: "980px",
				article: "692px",
				wide: "1260px",
			},
			transitionTimingFunction: {
				house: "cubic-bezier(0.4, 0, 0.25, 1)",
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
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"bar-bounce": "barBounce 0.6s ease-in-out infinite",
			},
		},
	},
	plugins: [animations],
} satisfies Config;

export default config;
