---
name: chele.bi
description: Apple-grade personal blog and portfolio. Quiet surfaces, enormous clarity, readable above all.
colors:
  canvas: "#ffffff"
  canvas-tint: "#f5f5f7"
  canvas-tint-soft: "#fafafc"
  fill-quaternary: "#e8e8ed"
  ink: "#1d1d1f"
  ink-secondary: "#6e6e73"
  ink-tertiary: "#86868b"
  hairline: "#d2d2d7"
  link-blue: "#0066cc"
  action-blue: "#0071e3"
  action-blue-hover: "#0076df"
  action-blue-active: "#006edb"
  canvas-dark: "#000000"
  surface-raised-dark: "#161617"
  surface-card-dark: "#1d1d1f"
  surface-quaternary-dark: "#333336"
  hairline-dark: "#424245"
  ink-dark: "#f5f5f7"
  ink-secondary-dark: "#86868b"
  link-blue-dark: "#2997ff"
  nav-scrim-light: "#fafafccc"
  nav-scrim-dark: "#161617cc"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(40px, 6vw, 56px)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(32px, 5vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.003em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(24px, 3vw, 28px)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "0.007em"
  eyebrow:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(19px, 2vw, 24px)"
    fontWeight: 600
    lineHeight: 1.17
    letterSpacing: "0.009em"
  subhead:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: "0.011em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.47
    letterSpacing: "-0.022em"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.1em"
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "-0.01em"
  code:
    fontFamily: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
rounded:
  xs: "5px"
  sm: "10px"
  md: "12px"
  lg: "18px"
  xl: "28px"
  pill: "980px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  gutter: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "80px"
  section: "clamp(48px, 8vw, 96px)"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.canvas}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
  button-primary-active:
    backgroundColor: "{colors.action-blue-active}"
  button-secondary:
    backgroundColor: "{colors.fill-quaternary}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-small:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  button-outline:
    backgroundColor: "#ffffff00"
    textColor: "{colors.link-blue}"
    rounded: "{rounded.sm}"
    padding: "8px 24px"
  chip-filter:
    backgroundColor: "{colors.canvas-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  chip-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  card-story:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0px"
  nav-global:
    backgroundColor: "{colors.nav-scrim-light}"
    textColor: "{colors.ink}"
    height: "44px"
  input-search:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  footer:
    backgroundColor: "{colors.canvas-tint}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.caption}"
---

# Design System: chele.bi

## 1. Overview

**Creative North Star: "The Quiet Keynote"**

A keynote slide does one thing. One idea, enormous clarity, generous emptiness around it, and a presenter who never raises their voice. This system rebuilds chele.bi the way Apple builds apple.com and Apple Newsroom: white or true black canvases, one type family, blue reserved for things you can touch, motion that states a fact and stops. Every token in this file was extracted from Apple's production CSS in June 2026 (main.built.css, globalheader.css, the Newsroom stylesheet, the global footer), with editorial chrome patterns taken from the Apple Style Guide pages and the developer.apple.com design surfaces. When in doubt, the answer is whatever apple.com does.

This system explicitly rejects what the current site became: crowded, too much information collapsing into each other, unnecessary information competing on every screen. It also retires the retro 8-bit language (dashed borders, pixel fonts, kanji marquee, glitch, scramble, scanlines) and the gamified self-presentation (skill bars, lvl badges, quests, guild log) on every new surface. Writing and projects get separated into their own spaces. The blog reads like Newsroom. The projects page presents like a product page.

Theme scene: a reader opens a longform post from a tweet at 11pm on a phone in a dark room, and a founder skims the projects page on a 27 inch display at noon. Both are first-class. The theme follows the system by default, with a persistent manual toggle. Light mode is canonical for editorial reading, dark mode is true black, not gray.

**Key Characteristics:**

- Apple-faithful tokens, taken verbatim from apple.com, not approximated.
- Readability is the metric. Article measure capped at 68ch, body 17px.
- Flat at rest. Depth comes from alternating canvases, not borders or shadows.
- One easing curve, four durations. Scroll reveals play once and never repeat.
- Blue means interactive, everywhere, with zero decorative exceptions.
- Shared primitives first. Pages compose Nav, Tile, StoryCard, Prose, Chip, Gallery.

### Layout architecture

Folded here because it governs every page.

- **Breakpoints** (Apple's): small ≤734px, medium 735 to 1068px, large 1069 to 1440px, xlarge ≥1441px.
- **Widths.** Site shell maxes at 980px (the canonical Apple row). Article text column maxes at 692px (Newsroom editorial measure, roughly 68ch at 17px). Galleries and full-bleed tiles may extend to 1260px. Nothing exceeds 1260px except backgrounds.
- **Grid.** 12 columns, 24px gutters. Two-up story grids and three-up project grids both derive from it.
- **Vertical rhythm.** Sections separated by `spacing.section` (clamp 48px to 96px). Inside a section, headline to first element is 0.8em, paragraph to next headline is 1.6em (Apple's stacked-margin system). Spacing varies deliberately: generous between ideas, tight within one.
- **Density rule.** One idea per fold. If two sections compete in a single viewport on a laptop, insert space or delete one.

### Motion doctrine

Philosophy-level rules live here, per-component behavior is specified in Components, exact tokens in `.impeccable/design.json`.

**The One Curve Rule.** Every transition on the site uses `cubic-bezier(0.4, 0, 0.25, 1)`. The single sanctioned exception is the nav flyout curtain at `cubic-bezier(0.4, 0, 0.6, 1)`. No springs, no bounce, no elastic on new surfaces (the badges page lanyard physics is a grandfathered signature, see Components).

**The Four Durations Rule.** 100ms for instant feedback (paddles, hovers on small controls), 240ms for nav and scrim transitions, 300 to 400ms for state and color changes, 800ms for scroll-entry reveals. Nothing else. Every route change fades the incoming page in over 400ms, opacity only, no exit animation.

**The Play Once Rule.** Scroll reveals are a single fade (opacity 0 to 1) plus a 16px rise, 800ms, staggered 0s / 0.05s / 0.2s / 0.4s, triggered once per page load. Elements never re-animate on scroll-up, never parallax, never scrub. Respect `prefers-reduced-motion` by rendering the final state immediately.

**The Silence Rule.** Keyboard-triggered actions, theme switching and pagination are instant. Theme switches use the next-themes `disableTransitionOnChange` pattern already in the root layout so no color transitions flash mid-switch.

### Token plumbing

Tokens land as CSS custom properties in `app/globals.css` (`--canvas`, `--ink`, `--link-blue`, etc.), light values on `:root`, dark values under `.dark` (next-themes class strategy, `defaultTheme="system"`). Tailwind `theme.extend` maps semantic names onto the variables. Components never hardcode hex values. The frontmatter above is normative for every value.

## 2. Colors: The Cupertino Palette

Two neutral canvases per theme, a gray ink ramp, and one blue that only ever means "you can click this."

### Primary

- **Action Blue** (#0071e3): the fill of primary pill buttons and the reading-progress bar. Hover deepens to Action Blue Hover (#0076df), press to Action Blue Active (#006edb). This is Apple's exact button ramp.
- **Link Blue** (#0066cc): inline text links, "Learn more" chevron links, footer links. In dark mode it brightens to Link Blue Dark (#2997ff) because #0066cc fails contrast on black.

### Neutral

- **Canvas** (#ffffff): the light page background and the surface of story cards.
- **Canvas Tint** (#f5f5f7): the alternate section background, footer background, code block background and chip resting fill. Alternating Canvas and Canvas Tint is the entire light-mode elevation system.
- **Canvas Tint Soft** (#fafafc): the nav flyout background and the scrim base.
- **Fill Quaternary** (#e8e8ed): secondary button fill and gallery paddle fill.
- **Ink** (#1d1d1f): primary text in light mode, and the fill of selected chips.
- **Ink Secondary** (#6e6e73): secondary text, deks, captions under images.
- **Ink Tertiary** (#86868b): metadata, dates, footnote text, placeholder text.
- **Hairline** (#d2d2d7): the only border color in light mode. 1px, always.
- **Canvas Dark** (#000000): the dark page background. True black, deliberately.
- **Surface Raised Dark** (#161617), **Surface Card Dark** (#1d1d1f), **Surface Quaternary Dark** (#333336), **Hairline Dark** (#424245): the dark elevation ladder, in that order, from page to card to control to border.
- **Ink Dark** (#f5f5f7) and **Ink Secondary Dark** (#86868b): dark-mode text pair.

### Named Rules

**The Blue Is Interactive Rule.** Blue appears only on elements that respond to a click or tap. Never on headings, never as decoration, never as a background mood. If something blue does nothing when clicked, that is a bug.

**The Two Canvases Rule.** Light-mode depth is expressed by alternating #ffffff and #f5f5f7 sections. Borders and shadows are not depth tools. If a section boundary is unclear, switch the canvas, do not draw a line.

**The True Black Rule.** Dark mode's page canvas is #000000. Surfaces climb the ladder #161617, #1d1d1f, #333336 strictly in elevation order. Never invent intermediate grays.

**The No New Colors Rule.** Album art, book covers and project logos supply incidental color. The system itself never adds a hue beyond blue and the grays, with one semantic exception: System Orange (#f56300) for the tiny "new" label and the Warn callout glyph. Logos and photography are the only other saturation on any page.

## 3. Typography

**Display and Body Font:** the system stack `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif`. On Apple devices this renders SF Pro, which is the point. SF Pro cannot be licensed for web embedding, and the system stack is exactly how a native-feeling Apple surface is built. No webfont download, zero layout shift.
**Code Font:** the system mono stack, `ui-monospace, SF Mono, Menlo, Consolas`. SF Mono on Apple devices, inside code only.

**Character:** invisible craft. The voice comes from scale contrast and spacing, not from a distinctive face. Semibold headlines over regular body, with Apple's optical tracking curve (negative tracking at body sizes, near-zero at display sizes) doing the polish silently.

### Hierarchy

- **Display** (600, clamp 40px to 56px, lh 1.07, ls -0.005em): post titles and page heroes. One per page, maximum.
- **Headline** (600, clamp 32px to 48px, lh 1.08, ls -0.003em): major section openers on home and projects.
- **Title** (600, clamp 24px to 28px, lh 1.14, ls +0.007em): story card titles, article h2.
- **Eyebrow** (600, clamp 19px to 24px, lh 1.17, ls +0.009em): the short kicker line above a headline, in Ink Secondary or Link Blue. Used sparingly, never as repeated section grammar.
- **Subhead** (400, 21px, lh 1.38, ls +0.011em): article deks and section intros.
- **Body** (400, 17px, lh 1.47, ls -0.022em): all interface copy. Article prose uses the same 17px with line-height raised to 1.65 for sustained reading.
- **Label** (600, 12px, ls +0.1em, uppercase): category labels on story cards ("FOLIO", "ESSAY") and nothing else.
- **Caption** (400, 12px, lh 1.33, ls -0.01em): dates, image captions, footer legal, footnotes, in Ink Tertiary.
- **Code** (400, 14px, lh 1.6, SF Mono): code blocks and inline code.

### Named Rules

**The Semibold Ceiling Rule.** No weight above 600, ever. Emphasis beyond semibold comes from size, never from bolder weight.

**The 68ch Rule.** Article prose never exceeds the 692px column. A line of body text that wraps past roughly 68 characters is a layout bug.

**The Optical Tracking Rule.** Tracking follows SF Pro's optical curve: -0.022em at 17px, -0.016em at 14px, -0.01em at 12px, tightening toward zero and slightly negative as display sizes grow. Never apply uniform tracking across sizes.

**The One Family Rule.** The system stack everywhere, the system mono only inside code. Mixing a third family anywhere is prohibited.

## 4. Elevation

Flat at rest, like apple.com. Light-mode depth is tonal (The Two Canvases Rule), dark-mode depth is the surface ladder. Borders are 1px Hairline and appear only where tone cannot separate (table rows, input outlines, nav bottom edge while scrolled). There is exactly one shadow vocabulary, taken from Apple Newsroom story tiles, and it exists to answer hover, not to decorate rest.

### Shadow Vocabulary

- **story-rest** (`box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08)`): the resting shadow on Newsroom-style story cards sitting on Canvas Tint. The only component shadowed at rest.
- **story-hover** (`box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.16)`): the same card on hover, paired with a 2px rise. 300ms, house curve.
- **nav-scrim** (`backdrop-filter: saturate(180%) blur(20px)` over rgba(250, 250, 252, 0.8) light, rgba(22, 22, 23, 0.8) dark): the frosted global nav once the page scrolls. Not a shadow, but it lives in the same "depth on demand" budget.
- **dialog-backdrop** (`backdrop-filter: blur(10px)` over rgba(255, 255, 255, 0.8) light, rgba(0, 0, 0, 0.6) dark): the page receding behind an open dialog, Apple's sequence-overlay values.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat at rest. Shadow is a response to hover, blur is a response to scroll. Nothing floats by default.

**The Two Blurs Rule.** backdrop-filter exists in exactly two places, the global nav scrim and the dialog backdrop. Glass cards and decorative frosted panels are prohibited.

## 5. Components

Every page composes these primitives. Build them once in `components/ui` and `components/blocks`, then forbid one-off variants.

### Buttons

- **Shape:** full pill (980px radius) for inline buttons. Block-level full-width buttons (mobile CTAs) drop to 12px radius, Apple's block-button rule.
- **Primary:** Action Blue fill, white text, 17px, padding 12px 22px. Hover #0076df, active #006edb, both 300ms house curve. No transform on hover.
- **Small:** same anatomy at 14px text, padding 9px 16px, for inline contexts (cards, list rows).
- **Secondary:** Fill Quaternary (#e8e8ed) with Ink text, same geometry. In dark mode, Surface Quaternary Dark (#333336) with Ink Dark text.
- **Outline:** transparent fill, 1px Link Blue border, Link Blue text, 14px, padding 8px 24px, 10px radius (the Apple Style Guide "Helpful? Yes, No" pair). For paired low-emphasis choices only. Hover fills Action Blue with white text, 300ms.
- **Focus:** `outline: none` plus `box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.5)` on focus-visible. Applies to every interactive element on the site.

**The 44 Point Rule.** Every interactive element presents a hit area of at least 44px by 44px (Apple HIG). Visually smaller controls (12px nav links, gallery paddles, theme switcher segments) gain it through padding, never through visual size.

### Text Links

- **Inline (in prose):** Link Blue, no underline at rest inside UI copy, underline always present inside article prose (Newsroom behavior). Hover adds underline in UI copy.
- **Call-to-action links:** Link Blue with a trailing chevron (`›`), e.g. "Read the post ›". The chevron never animates. Hover underlines the text only.
- **Quiet links (nav, footer, post lists):** inherit Ink at 80% opacity, hover to 100%, 200ms. No blue, no underline. Blue is for links inside content, quiet links are chrome.

### Global Nav

- **Geometry:** 44px tall (48px under 735px), full-width, sticky. Content row capped at 980px. Wordmark "Ege" left at 17px semibold, links right at 12px.
- **At top of page:** fully transparent, no border.
- **Scrolled:** nav-scrim frosted background fades in over 240ms with a 1px Hairline bottom edge. Height never changes, so layout never shifts.
- **Links:** quiet links (Ink 80%), active route at 100% with no underline or pill indicator. Items: Blog, Projects, About, Music, Books, Badges. The nav carries links only, no icons and no toggles (the theme switcher lives in the footer).
- **Mobile:** flyout curtain from the top, Canvas Tint Soft (#fafafc light, #161617 dark). Primary links at 28px semibold (the apple.com flyout scale), secondary links (rss, socials) at 12px beneath. 320ms curtain with staggered 260 to 400ms link fade-in, the one choreographed motion on the site.

### Local Nav (underline tabs)

- **Character:** the 52px sub-bar Apple mounts below the global nav on sectioned surfaces (the Apple Style Guide header, the developer.apple.com Design pages).
- **Geometry:** page title left at 21px semibold, section links right as 12px quiet links, 1px Hairline bottom edge, content on the 980px shell.
- **Active state:** a 2px Ink underline sitting flush on the Hairline (Ink Dark in dark mode). No pills, no boxes.
- **Use:** replaces every boxed Tabs component on any future sectioned surface. On small viewports the links scroll horizontally, never wrap, never collapse into a menu.

### Footer

Modeled on the apple.com support and developer footers. Canvas Tint light, Surface Card Dark (#1d1d1f) dark, separated from content by canvas change, never a border. All text at caption size (12px), content on the 980px shell.

- **Breadcrumb band (article pages only):** "Ege › Blog › post title" at 12px Ink Tertiary with chevron separators, 17px vertical padding, 1px Hairline beneath (the Apple support footer trail).
- **Directory band:** two columns of quiet links under 12px semibold headers, "site" (the nav items) and "elsewhere" (rss, X, GitHub, LinkedIn, email). Two columns, never more.
- **Legal band:** 1px Hairline above. "© 2026 Ege Çelebi" in Ink Tertiary, pipe-separated quiet links, and the Theme Switcher right-aligned (the developer.apple.com pattern).

### Page Hero

- **Character:** the Apple Style Guide header band. A full-bleed Canvas Tint band (Surface Raised Dark in dark mode) opening a section page.
- **Anatomy:** Display title, a Caption line beneath (date, count or one-line descriptor), and at most one blue affordance, either a "table of contents ⊕" disclosure link or a single CTA link. Content left-aligned on the 980px shell, vertical padding `spacing.section`.
- **Use:** /blog, /about, /books, /music. The home page uses its own hero, not this band.

### Story Card (the shared blog and content card)

- **Character:** an Apple Newsroom tile. Image leads, text sits in a white well, the whole card is the link.
- **Corner Style:** 18px radius, overflow hidden.
- **Anatomy:** cover image (2:1) on top, then 24px padding containing Label ("ESSAY" 12px uppercase Ink Tertiary), Title (clamp 24 to 28px), one-line summary in Body Ink Secondary, Caption date.
- **"New" label:** the single newest post or project may carry a 12px semibold "new" in System Orange (#f56300) above its title, the apple.com store treatment. One per page, it expires when something newer ships.
- **Surface:** Canvas on a Canvas Tint section, story-rest shadow.
- **Hover:** rises 2px, shadow deepens to story-hover, 300ms. Scale never exceeds 1.015.
- **Textless variant:** for posts without covers the image area is replaced by Canvas Tint with the title set large. Never substitute a gradient.

### Post List Row (the sparse archive)

- **Character:** the opposite of a card. Title left, date right, one row per post, grouped under year headings (Caption, Ink Tertiary).
- **Geometry:** 17px title, 12px date, 16px vertical padding, 1px Hairline between rows.
- **Hover:** the hovered row stays at full opacity while sibling rows dim to 0.5, 300ms, pure CSS. No background fill, no slide.

### Project Tile

- **Character:** an apple.com homepage tile. Full-shell width (up to 1260px for the featured pair), tall, the product is the hero.
- **Anatomy:** centered stack of Eyebrow (project name), Headline (the one-line claim), a "visit ›" CTA link pair, and the product image or logo filling the lower half. Alternates Canvas and Canvas Tint per tile, occasionally inverted (Ink background, Ink Dark text) for one flagship tile per page, Apple's dark-tile rhythm.
- **Corner Style:** flush full-bleed bands on the projects page, 28px radius when displayed as half-width pairs.
- **Motion:** content inside the tile uses the Play Once reveal as it enters the viewport.

### Promo Tile (blue drench)

- **Character:** the developer.apple.com "New to design?" card. A 28px-radius tile drenched in Action Blue with white content: an SF-Symbols-style glyph, a white Headline, white Body at 80% opacity, and a white "start ›" CTA.
- **Rule:** the entire tile is a single link, which is what keeps The Blue Is Interactive Rule intact. Maximum one per page, reserved for the flagship action (the featured project, the RSS pitch). The same blue sits unchanged on the black canvas in dark mode.

### Segmented Filter (books)

The apple.com "Explore the lineup" control: one pill container holding every option as a segment.

- **Container:** pill, 4px inner padding, Fill Quaternary (#e8e8ed) light, Surface Quaternary Dark (#333336) dark.
- **Segments:** 14px Ink text, padding 8px 16px, pill. The selected segment fills Ink with Canvas text (monochrome selection keeps The Blue Is Interactive Rule intact), inverted in dark mode.
- **Overflow:** when options exceed the shell width the container scrolls horizontally. No wrapping, no second row.
- **Transition:** background and color, 200ms.
- **Tags:** post tags render as loose Caption-size pills, Canvas Tint fill, Ink Secondary text, quiet metadata rather than buttons.

### Inputs (search on books and music)

- **Style:** Canvas fill, 1px Hairline border, 12px radius, 17px text, padding 12px 16px, placeholder in Ink Tertiary.
- **Focus:** border keeps Hairline, the 3px blue focus ring appears. No glow, no border color morph.
- **Dark:** Surface Raised Dark fill, Hairline Dark border.

### Dialog

- **Sheet:** the apple.com "Ways to Buy" sheet. Canvas (Surface Card Dark in dark mode), 18px radius, max-width 816px, padding 48px (24px on small viewports). Content left-aligned: optional Eyebrow, Title, Body, one CTA link or button row.
- **Close:** a 36px circle top-right, Fill Quaternary with an Ink × glyph, hover deepens 100ms.
- **Backdrop:** rgba(255, 255, 255, 0.8) with `backdrop-filter: blur(10px)` in light, rgba(0, 0, 0, 0.6) with the same blur in dark (Apple's sequence-overlay values).
- **Motion:** the sheet fades in and rises 8px over 400ms house curve, exits in 150ms, backdrop fades over 240ms.
- **Use:** book details, badge scans, music tracklists, the post contents sheet. Nothing new earns a dialog.

### Article Prose (MDX surface)

- **Column:** 692px, centered. Body 17px at line-height 1.65.
- **Headings:** h2 is Title with 1.6em top margin, h3 is 21px semibold. Heading anchors appear on hover as a quiet `#`.
- **Links:** Link Blue, always underlined.
- **Blockquote:** 21px Subhead in Ink Secondary, indented 24px, no border, no stripe, no background.
- **Code blocks:** Canvas Tint surface, 12px radius, 1px Hairline, SF Mono 14px, no header chrome beyond a quiet copy affordance. Inline code: Canvas Tint pill at 85% of body size, 6px radius.
- **Kbd:** key caps in the code font at Caption size, Canvas fill, 1px Hairline border, 5px radius (the developer.apple.com "/" filter cap).
- **Images:** full column width, 18px radius, Caption centered beneath in Ink Tertiary.
- **Tables:** 14px, 1px Hairline row separators only, no vertical lines, no zebra.
- **Callout blocks (Note, Tip, Warn):** Canvas Tint surface, 12px radius, a 17px leading SF Symbol-style glyph and semibold label. No colored side stripes. Warn may tint its glyph with system orange (#f56300), the glyph only.
- **Footnotes:** Caption size, separated by one Hairline.

### Reading Aids

- **Reading progress:** 2px Action Blue bar fixed at the very top, article pages only, scaleX driven by scroll, no easing (it tracks, it does not animate).
- **Table of contents:** xlarge viewports only, sticky right column, Caption-size quiet links, active heading turns Ink at full opacity and 600 weight. No bars, no indicators.
- **Contents sheet (below xlarge):** the TOC collapses to a "table of contents ⊕" link under the dek. It opens the Dialog as a full Canvas sheet (the Apple Style Guide overlay), × close top-left, post title, then hairline-separated rows of Link Blue headings at 21px, each row a full-width touch target.
- **Post pagination:** the Apple Style Guide "Next" pattern at the end of every post, above the footer. A right-aligned block of "next ›" in Body Ink with the destination title beneath in Link Blue, a mirrored "‹ previous" block left when one exists, 1px Hairline above the pair.

### Gallery (horizontal scroller for polaroids, books, covers)

- **Mechanics:** CSS scroll-snap, items snap-start, 24px gap, scroll padding aligned to the 980px shell so the first item lines up with the text above it.
- **Paddles:** 36px circles, Fill Quaternary with Ink glyph, hover deepens 100ms linear, hidden entirely on touch viewports, disabled state at 30% opacity.
- **No autoplay, no drag inertia scripting, no dots.**
- **Lineup Card (gallery item):** the apple.com "Explore the lineup" card. A 4:5 well at 18px radius on Canvas Tint with the logo centered (logo-less items set the name in Title as a wordmark), then centered beneath: optional "new" label, Title name, Footnote description in Ink Secondary, one small pill CTA. Cards run 260 to 300px wide, snap-start.

### Theme Switcher

The developer.apple.com footer control, verbatim: a segmented pill labeled Light, Dark, Auto, right-aligned in the footer legal band. The container is a pill with a 1px Hairline border, segments at 12px Ink Secondary, and the selected segment fills Action Blue with white text. Auto is the default and follows the system. Switching is instant (The Silence Rule), persisted via next-themes. The nav carries no theme control.

### Iconography

SF-Symbols-style stroke glyphs, the developer.apple.com resources row: 1.5px stroke, no fills, 16 to 24px, drawn in Ink or Ink Secondary, never in color. Navigation affordances are text chevrons (›), disclosure is a circled plus (⊕). A centered icon row with 12px labels is the sanctioned way to list platforms or tools on /projects. Filled or multicolor decorative icons are prohibited.

### Signature Components (grandfathered, reskinned)

- **Music Coverflow** (/music): GSAP coverflow stays as is per explicit decision. Page chrome (search, dialogs, cards) adopts new tokens.
- **Contribution Graph:** kept, recolored to a Link Blue ramp on Canvas Tint cells, framer-motion stagger replaced by the Play Once reveal.
- **Spotify Now Playing:** kept, restyled as a single quiet row: album art at 10px radius, track in Body, artist in Caption, the three animated bars stay but render in Ink Tertiary.
- **Polaroid Gallery:** kept for posts and about, white frames on the Gallery mechanics above, rotation capped at 2 degrees.
- **Number Ticker:** kept for stats that exceed 100, 1.2s ease-out, fires once.

### Page Blueprints

- **Home:** nav, then a hero of Display-size greeting and a 21px Subhead bio whose project names are inline Link Blue links, then "Latest writing" (three Post List Rows plus "All posts ›"), then "Selected work" (two Project Tiles plus "All projects ›"), then the Spotify row, then footer. Five quiet sections, nothing else. The skill bars, education card, tabs and connect grid from the old home are dissolved (see Migration Map).
- **/blog:** Page Hero ("Writing"), the latest post as a full-width featured Story Card, remaining posts in a two-up Story Card grid, then a year-grouped Post List Row archive. RSS link as a CTA link.
- **/blog/[slug]:** reading progress, 692px column, Caption date plus reading time, Display title, Subhead dek, cover at 18px radius, prose, post pagination, then a "keep reading" pair of Story Cards. TOC on xlarge, the contents sheet below it, breadcrumb band atop the footer.
- **/projects (new route):** Page Hero, flagship project full-bleed (inverted dark Project Tile or the page's one Promo Tile), remaining projects as 28px-radius tile pairs, then an "open source" section of Post List Rows with star counts via Number Ticker.
- **/about (new route):** prose bio at article measure, career timeline as Post List Rows grouped by year (absorbs work experience, fellowships, awards, education, languages, and the changelog entries), one Polaroid Gallery. The /changelog nav item dies, its data lives here.
- **/music:** the Apple Music shape. An "artists" Gallery row of square art tiles (rounded 12px, name and track count beneath), then a "songs" playlist view: find-in-library input, a shuffle mini-player row on tint, and track rows (40px art at 4px radius, title over "artist – album" in Caption, duration right, hover fills Canvas Tint) paged 100 at a time.
- **/books:** mirrors the /music shape. A "Shelf" Gallery row of 2:3 covers on tint (title and author beneath), then an "All books" list on the solid canvas: find-in-shelf input, segmented category filter, and rows (32px cover at 4px radius, title over author, category right, hover fills Canvas Tint).

### Migration Map

| Today | Verdict | Becomes |
|---|---|---|
| `header.tsx`, `site-nav.tsx`, kanji marquee | Replace | Global Nav (frosted, 44px), marquee retired |
| `site-footer.tsx` | Restyle | Footer spec above |
| MonoLisa font | Retire | System SF stack, code uses the system mono stack |
| Departure Mono, shimmer, scramble, glitch, scanlines, caret, kanji utilities | Retire | Deleted from globals.css |
| Dashed borders everywhere | Retire | 1px Hairline or canvas change |
| 8-bit ui variants (`components/ui/8bit`) | Retire | Base shadcn primitives restyled to this spec |
| Forced dark mode | Replace | System default plus toggle, light and dark first-class |
| Home skill tree, languages, education, lvl badge | Retire | One-line mentions in /about prose |
| Home tabs (quests, guild log) | Dissolve | quests to /projects, guild log to /about timeline |
| `/stack` page and `data/stack.ts` | Retire | Removed from the site entirely |
| Connect card | Dissolve | Footer quiet links |
| Blog index cards | Replace | Story Card grid plus Post List archive |
| Post layout, `post-toc.tsx`, `reading-progress.tsx` | Restyle | Article Prose and Reading Aids specs |
| `mdx-components.tsx`, `post-blocks.tsx` | Restyle | Article Prose spec, posts themselves untouched |
| `project-card.tsx`, `opensourcecard.tsx`, project logos | Replace | Project Tile, logos kept |
| `changelog-list.tsx`, /changelog nav item | Dissolve | /about timeline rows |
| `contribution-graph.tsx`, `github-stars.tsx`, `number-ticker.tsx` | Keep | Recolor, Play Once reveal |
| `spotify-now-playing.tsx` | Keep | Quiet row restyle |
| `polaroid.tsx`, `polaroid-gallery.tsx` | Keep | Gallery mechanics, capped rotation |
| `/badges` page | Retire | Removed from the site entirely |
| `/music` GSAP coverflow | Keep | As is, chrome reskinned |
| `/books` shelf | Keep | Segmented Filter, Input and Dialog primitives |
| `theme-toggle.tsx`, `mode-toggle.tsx` | Merge | Footer Theme Switcher (Light, Dark, Auto segmented pill) |
| `scramble.tsx` headings in MDX | Replace | Plain headings with hover anchors |

## 6. Do's and Don'ts

### Do:

- **Do** take values from this file literally. #0071e3 means #0071e3, 17px means 17px, 600 means 600. The system's authority comes from exactness.
- **Do** alternate #ffffff and #f5f5f7 to separate sections, and #000000, #161617, #1d1d1f in dark mode, in ladder order.
- **Do** cap article prose at the 692px column and interface rows at the 980px shell.
- **Do** use `cubic-bezier(0.4, 0, 0.25, 1)` with the four durations (100, 240, 300 to 400, 800ms) for every transition, playing scroll reveals once.
- **Do** keep blog posts as the MDX files they are today. The redesign touches `mdx-components.tsx`, never the posts.
- **Do** compose new pages from Story Card, Post List Row, Project Tile, Chip, Gallery and the prose surface before inventing anything.
- **Do** render the final state immediately under `prefers-reduced-motion`.
- **Do** give every interactive element a 44px by 44px hit area, padding visually smaller controls up to it.

### Don't:

- **Don't** recreate "too crowded, too much information collapsing into each other." One idea per fold. When a section feels full, remove something.
- **Don't** carry the 8-bit language onto new surfaces: no dashed borders, no pixel fonts, no kanji marquee, no glitch, scramble, shimmer or scanline effects.
- **Don't** use skill bars, lvl badges, quests or guild logs. No gamified self-presentation.
- **Don't** put blue on anything that is not interactive, and don't use any accent hue beyond the blue ramp.
- **Don't** use weights above 600, a third font family, or uniform letter-spacing across sizes.
- **Don't** use gradient text, bento grids, glassmorphism beyond the nav scrim and dialog backdrop, colored side stripes on callouts or list items, or hover scales above 1.015.
- **Don't** use #000 or #fff in light mode for anything but their canvas roles, and don't substitute gray-900 dark backgrounds for true black.
- **Don't** add springs, bounce, parallax, scroll-scrubbing or re-triggering reveals. Motion states a fact and stops.
- **Don't** let the nav change height or gain layout-shifting borders on scroll. The scrim fades in, geometry stays.
- **Don't** ship a modal where an inline treatment works. Dialogs remain only where they exist today (book details, badge scans, music tracklists).
