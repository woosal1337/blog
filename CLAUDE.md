# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/blog website for chele.bi, built with Next.js 14 (App Router) and deployed on Vercel. Uses MDX for content pages, Tailwind CSS for styling, and Biome for linting/formatting.

## Commands

- `bun dev` — start dev server
- `bun run build` — production build
- `bun run check` — run Biome linter and formatter with auto-fix (`biome check --write .`)
- `bun run lint` — run Next.js lint

Package manager is **Bun**. Runtime requires Node >= 20.

## Architecture

- **`app/layout.tsx`** — Root layout wraps everything in ThemeProvider and TooltipProvider, plus Vercel Analytics.
- **`app/(website)/`** — Main route group: home (`page.tsx`), `/books`. The website layout sets site-wide metadata.
- **`components/`** — organized into `ds/` (design-system primitives), `blocks/` (domain-specific: post chrome, polaroids, contribution graph), `ui/` (shadcn/ui primitives), `hooks/`, and `providers/` (theme provider wrapping `next-themes`).
- **`data/`** — static data files (`books.ts`).
- **`lib/utils.tsx`** — `cn()` class merge helper, navigation items, career timeline, changelog entries, and project definitions. This is the central data file for site content.
- **`server/thirdparty.ts`** — server-side data fetching for GitHub (GraphQL) and X/Twitter APIs, cached for 1 hour via `unstable_cache`. Has a `USE_MOCK_DATA_FOR_DEVELOPMENT` flag with mock data fallbacks.
- **`mdx-components.tsx`** — custom MDX overrides (responsive images via `next/image`, external link icons).

## Key Conventions

- Path alias: `@/*` maps to project root.
- Apple-faithful design system documented in **DESIGN.md** (normative). Sans is the system font stack (renders SF Pro on Apple devices); code uses the system mono stack (SF Mono on Apple devices).
- CSS variables hold RGB triplets consumed as `rgb(var(--x) / <alpha>)` in Tailwind. Light and dark are both first-class, `class` strategy via `next-themes`, default `system`.
- Reusable primitives live in `components/ds/` (direct file imports, no barrel). Compose these before inventing new components.
- UI components follow shadcn/ui patterns with Radix UI primitives. Config in `components.json`.
- Biome is used instead of ESLint/Prettier. Notable disabled rules: `noNonNullAssertion`, `noForEach`, `noArrayIndexKey`, `noSvgWithoutTitle`, `useButtonType`.
- Page extensions: `.mdx`, `.ts`, `.tsx` — MDX uses experimental Rust compiler (`mdxRs: true`) with `remark-gfm`.
- `reactStrictMode` is **false** in `next.config.mjs`.

## Animation Approach

Motion follows DESIGN.md: one easing curve `cubic-bezier(0.4, 0, 0.25, 1)`, durations 100/240/300-400/800ms, scroll reveals play once (`components/ds/reveal.tsx`), filtering and theme switches are instant.

- **CSS only** for nearly everything: hovers, the nav scrim, the gallery (scroll-snap), reveals.
- **framer-motion** survives only in kept legacy components: polaroids, number ticker, contribution graph, github stars.
- GSAP and animejs were removed from the project.

## Environment Variables

Required in `.env.local` (see `.env.example`):

- `GITHUB_TOKEN` — GitHub API token for contribution graph and repository data
- `X_API_KEY`, `X_API_SECRET` — X/Twitter API app credentials
- `X_MY_ACCESS_TOKEN`, `X_MY_ACCESS_TOKEN_SECRET` — X/Twitter user tokens

## SEO

`app/robots.ts` and `app/sitemap.ts` generate SEO files. OpenGraph and Twitter metadata configured in root layout.
