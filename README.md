# chele.bi

Personal blog and portfolio of [Ege Chelebi](https://chele.bi) ([@woosal1337](https://x.com/woosal1337)).

A dark, editorial personal site — writing, projects, and a reading shelf — built with Next.js 14 (App Router), MDX, Tailwind CSS, and Biome, deployed on Vercel.

## Highlights

- Editorial dark theme: Geist Sans for reading, Geist Mono for code, hairline borders, one motion curve.
- MDX blog with a left-rail table of contents, callouts, and per-post chrome.
- Post banners generated from the title — a deterministic contour mark (`lib/contour.ts`), no manual cover images.
- Liquid-glass circular controls and frosted-glass tags.
- A single contour identity mark drives the logo and favicons.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- MDX posts colocated under `app/(website)/blog/(post)/[slug]/page.mdx`
- Tailwind CSS with a token layer in `app/globals.css` (dark, editorial)
- Reusable design-system primitives in `components/ds/`, domain blocks in `components/blocks/`
- Biome for linting and formatting

## Local setup

```bash
bun install
bun dev
```

Requires Node >= 20 and Bun. No environment variables required.

## Commands

- `bun dev` — dev server
- `bun run build` — production build
- `bun run check` — Biome lint and format with auto-fix

## License

Code is MIT. Blog content and images are all rights reserved. See [LICENSE](LICENSE).
