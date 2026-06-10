# chele.bi

Personal blog and portfolio of [Ege Çelebi](https://chele.bi) ([@woosal1337](https://x.com/woosal1337)).

Apple-faithful design system (tokens extracted from apple.com production CSS, documented in [DESIGN.md](DESIGN.md)), built with Next.js 14 App Router, MDX, Tailwind CSS, and Biome.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- MDX posts colocated under `app/(website)/blog/(post)/[slug]/page.mdx`
- Tailwind CSS with a token layer in `app/globals.css` (light and dark, system-following)
- Reusable design-system primitives in `components/ds/`
- framer-motion for select interactions (polaroids, number ticker, contribution graph)
- Biome for linting and formatting

## Local setup

```bash
bun install
cp .env.example .env.local   # fill in your own tokens
bun dev
```

Requires Node >= 20 and Bun.

## Environment variables

| Variable | Used for |
|---|---|
| `GITHUB_TOKEN` | contribution graph, repository stars |
| `X_API_KEY`, `X_API_SECRET`, `X_MY_ACCESS_TOKEN`, `X_MY_ACCESS_TOKEN_SECRET` | X follower count |
| `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` | now playing row |

All third-party fetches fall back to mock data when tokens are absent.

## Commands

- `bun dev` — dev server
- `bun run build` — production build
- `bun run check` — Biome lint and format with auto-fix

## License

Code is MIT. Blog content and images are all rights reserved. See [LICENSE](LICENSE).
