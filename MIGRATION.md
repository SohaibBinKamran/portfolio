# Migration Document — Sohaib Bin Kamran Portfolio (Framer → Code)

Context primer for planning/ideating a redesign with Claude. Written from the state of the project as of this build pass — paste this into a new conversation to get full situational awareness without re-deriving it.

## 1. What this project is

Migrating a live Framer portfolio (**https://www.sohaibbinkamran.com/**) to a coded Next.js site that should look/feel identical to the original but be a real, maintainable codebase. Not a redesign from scratch — a faithful rebuild, with room to redesign deliberately later (which is presumably why this doc exists).

**Stack:** Next.js 16 (App Router, TypeScript, `src/` dir), Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`), Framer Motion. No git repo initialized yet (explicit user choice).

## 2. Current build status

| Page | Route | Status |
|---|---|---|
| Home | `/` | Built, real content + real images |
| About | `/about` | Built, real content + real portrait |
| Work index | `/work` | Built, real screenshots for all 5 projects |
| Case study template | `/work/[slug]` | **Not built.** See §6. |
| Contact | `/contact` | Not built |

Nothing has been visually screenshotted by Claude — the browser tool's screenshot/zoom capability was broken all session (consistent timeouts, not page-specific). Everything was verified structurally (DOM, computed styles, console/network logs) instead of visually. **Whoever picks this up next should actually look at the rendered pages before trusting them further.**

## 3. Content sourcing model (important — three different sources, don't conflate them)

This took several rounds of clarification to establish; worth preserving so it isn't relitigated:

1. **`sohaib-portfolio-content.md`** (project root) — source of truth for *facts*: bio, skills, work experience, dates. Verified against resumes, has its own "Needs Your Confirmation" list at the bottom (MSc end date, a metric wording, Spur product count, etc. — still unresolved).
2. **Live site verbatim text** — for *marketing copy* that exists on sohaibbinkamran.com but not in the content file at all (testimonials, process-step taglines, "Why Me" paragraphs, skill/tool tag lists). User explicitly approved reusing this verbatim since it's their own published copy, just not yet transcribed into the content file.
3. **Figma SVG exports** (`S:\Portfolio 2026\About.svg`, `Work Page.svg`, `Work Open.svg`) — source of truth for *visual layout* of About, Work index, and the case-study template. These had all text outlined to vector paths (0 real `<text>` elements) and embedded raster images as base64 `<image>` data — see §7 for how they were processed.

**Known conflict, resolved:** content file said Eurowings Digital started May 2024; live site said May 2025. User confirmed **May 2024** is correct — the live site is stale on this one point. Anywhere the two disagree, ask rather than assume the live site is authoritative, since it isn't always.

## 4. Design system

Full audit in **`design-audit/DESIGN_SPEC.md`** — colors, typography, spacing, component patterns, animations, page-by-page IA, all with confidence caveats. Condensed reference:

- **Colors:** neutral base (`#FFFFFF` / cream `#FCF9F5` / near-black `#121212`) + accents purple `#5E45FF`, lime `#C5FF52`, coral/alert `#FF5A3C` (approximate). Text hierarchy via opacity steps on black/white, not separate gray tokens.
- **Type:** Instrument Serif (headings, weight 400), Satoshi via Fontshare CDN (body, weight 500), Inter (nav/UI chrome). Headings support mixed-color spans (e.g. one phrase full-black, another at 45-55% opacity) — this shows up repeatedly, build heading components to accept rich text, not plain strings.
- **Spacing/radius:** 8px base spacing unit, 120px desktop section gutters. Radius clusters at 12–16px (buttons/cards) and 20–24px (pills).
- **Shadows:** layered outer+inset "soft-UI" style, not flat box-shadow.
- **Motion:** scroll-triggered fade/slide-in (Framer Motion `whileInView`), two infinite marquees (~24–45s linear loop, content duplicated for seamless wrap), fanned/rotated testimonial cards, a decorative rotating dashed ring around the closing CTA, a pulsing status dot near case-study testimonial callouts.
- **Recurring component pattern:** a "browser-frame" device mockup (rounded frame, 3 traffic-light dots, tab label) wraps every product screenshot site-wide — built once as `BrowserFrame.tsx`, reused everywhere.

## 5. Key decisions made (so they aren't re-litigated)

- **Cinefatic and OpenSeat case studies have no source copy anywhere** (not in content.md, not scraped, not in Figma beyond the Work index thumbnail). Decision: placeholder these two: **user will supply real content later.**
- **Case-study template scope:** the Figma "Work Open" file is a much richer template than what's live (User Persona, Brand Colors, Competitor Analysis, Sketches, Lofi Screens sections) — but it's fully populated only for Xoopah. Decision: **hold off building `/work/[slug]` entirely** until content strategy for the other 4 projects is decided (options on the table: Xoopah gets the rich template and others stay simple; everyone gets the rich template with placeholders; or something else).
- **Screenshots as design reference:** the browser tool's screenshot capability never worked this session. Worked around it for the Figma files by rasterizing the SVGs with `sharp` (already a transitive Next.js dependency) and reading the resulting PNGs — see §7 if this comes up again.
- **Image sourcing:** several real assets (hero cloud illustration, hero device mockups, portrait, all 5 project screenshots) were downloaded from the live Framer CDN or extracted from the Figma files' embedded base64 images, always with explicit user permission before downloading, stated filename/source/size each time. All live in `public/images/`.
- **No git repo** — user declined git init when scaffolding. Worth revisiting once there's enough built to want history.

## 6. Known gaps / open items

- Case-study template (`/work/[slug]`) and Contact page (`/contact`) not built.
- Home page's desktop/tablet hero art was never confirmed visually (only mobile was seen) — currently uses the same cloud illustration as About; may be wrong.
- Hover states on project cards are unconfirmed — synthetic hover events showed no transform change, but that could be a testing artifact, not an actual absence of a hover effect.
- Tablet breakpoint (768px) has no reference screenshots at all.
- `accent-alert` coral color and the two decorative fonts (Gloria Hallelujah, Handlee) spotted in the live site's stylesheet are approximated/unplaced, not confirmed.
- Content file's own open questions are still open: MSc end date (Apr 2026 vs Sep 2025 — two resumes disagree), KNOCCS/Xoopah metric wording, Spur product count (6 vs 7), an 8-participant diary study's product attribution, current Behance/LinkedIn URL confirmation.
- Footer's Dribbble link exists in the live site's DOM but was never located visually in any footer screenshot — may be icon-only or positioned somewhere not yet seen.

## 7. Asset & tooling notes (for reproducing the workflow, not for redesign content)

- `sharp` (bundled with Next.js) rasterizes SVGs to PNG when the browser screenshot tool is unavailable: `sharp(file, {limitInputPixels: false}).resize({width: 1600}).png().toFile(out)`. Figma exports with text-outlined-to-paths have 0 `<text>`/`<tspan>` elements — don't bother grepping for copy, read the rasterized image instead.
- Embedded base64 images in an SVG can be pulled out directly via regex on `(?:xlink:href|href)="(data:image\/[a-zA-Z+]+;base64,[^"]+)"` — this is how the real portrait and all 5 project screenshots were recovered instead of using placeholders.
- `public/images/` currently holds: `hero-clouds.png`, `hero-mockup-laptop.png`, `hero-mockup-phones.png`, `hero-mockup-right.png`, `portrait.png`, `project-{xoopah,cinefatic,knoccs,openseat,wanderlens}.{png,jpg}`.

## 8. Suggested framing for a redesign conversation

If the goal now is to *ideate* a redesign rather than continue the faithful rebuild: the current build is a reasonable "before" baseline — it's a working, faithful copy of the Framer site's Home/About/Work-index pages. A redesign conversation could reasonably start from either the **DESIGN_SPEC.md audit** (what the current visual language is) or from **§6's gaps** (what's unresolved or thin) as a list of things a redesign gets to make an intentional decision about instead of inheriting by default.
