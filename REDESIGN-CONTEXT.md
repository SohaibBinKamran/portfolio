# Redesign Context — Sohaib Bin Kamran Portfolio

Paste-in context for building the redesign one page per chat. Read this first, then work only on the page named in the prompt.

> Supersedes parts of `MIGRATION.md` (which covers the original Framer→code migration and is now stale on build status). Design token/animation detail lives in `design-audit/DESIGN_SPEC.md`.

---

## 1. How to use this file

Each page gets its own chat. Start a chat like this:

```
Read REDESIGN-CONTEXT.md, then build the [PAGE NAME] page.
Figma: [paste node-specific Figma link]
```

Work only on that page. Don't refactor other pages — parallel chats will collide. **Do**
reuse the shared primitives and verified tokens the Home redesign already established
(§5, §6, §12); extend a shared `ui/` component if the design needs it, but don't restyle
one in a way that changes pages you're not building.

**Home (`/`) is done — §12 is the reference build.** New pages should feel like it:
`SectionLabel` eyebrows, `PillButton` CTAs, Satoshi UI text, `ink`/`ink-muted` colours.

---

## 2. Stack

- **Next.js 16.2.10**, App Router, TypeScript, `src/` dir, Turbopack
- **Tailwind CSS v4** — CSS-first config in `src/app/globals.css` via `@theme inline`. **There is no `tailwind.config.js`.** Add tokens as CSS vars inside `@theme inline`.
- **Framer Motion 12** for animation
- **Git repo:** `github.com/SohaibBinKamran/portfolio` (public). Push to `main` → GitHub
  Actions builds a static export and deploys to GitHub Pages at
  **https://sohaibbinkamran.com**. See §23.

```bash
npm run dev
```

Dev server gotcha: an instance may already be running on port 3000 from another chat. `.claude/launch.json` has `autoPort: true`, so `preview_start` will pick a free port rather than failing. If you hit "Another next dev server is already running," either use the running one or `taskkill /PID <pid> /F`.

---

## 3. Figma access — IMPORTANT

**Figma IS connected** via the Figma desktop MCP, authenticated as Sohaib Bin Kamran (Portfolio team among others). Verify with `whoami` if anything seems off.

Note: there are two Figma servers in the tool list. One is an OAuth connector that is **not** authorized and will look broken. The desktop MCP (tools prefixed `mcp__b821...`) **is** authorized. Don't conclude Figma is unavailable from the unauthorized one — test with `whoami` first. (This exact mistake cost a full round-trip last session.)

**Workflow:**

1. Get a **node-specific** URL from the user: `https://figma.com/design/<fileKey>/<name>?node-id=1-2`. Right-click frame → *Copy link to selection*. A bare file URL without `node-id` is not enough for most tools.
2. `get_metadata` with `fileKey` and **no** `nodeId` → lists top-level pages, so you can navigate the file yourself instead of asking for more links.
3. **Load the `figma-design-to-code` guidance before calling `get_design_context`** — the tool requires it, and skipping it produces code that ignores existing tokens and components.
4. `get_variable_defs` → real design variables. Prefer this over eyeballing colors.
5. `get_screenshot` → visual reference, `maxDimension` up to 65536 for detail.

**SVG exports** in `S:\Portfolio 2026\Redesign July\` — mixed freshness. `Home.svg` /
`AboutMe.svg` / `Wanderlens-CaseStudy.svg` are **fresh (Aug 27 2026)** and matched live Figma;
the other case-study SVGs are dated Aug 2 — the **file-status notes in them are stale, but the
Cinefatic pass found the visual layout still matched the live Figma**, so an old case-study SVG
is still usable as a layout cross-check (render it: `sharp(f,{density:72}).resize({width:1100})`
→ slice). Check the file mtime regardless. Text is outlined to paths so `<text>` won't work,
**but embedded raster images ARE extractable** and this is the fastest way to pull logos /
photos / mockups: regex `<image ... xlink:href="data:image/…;base64,…">`, decode each, save.
That's how Home's org logos, testimonial photos, and process-card images were sourced.
Colours: read solid `fill="#…"` / `stop-color` from the SVG, or `get_variable_defs`
(returns nothing for this file — it has no published variables).

---

## 4. Current build state

| Page | Route | Status |
|---|---|---|
| Home | `/` | **Redesigned ✅ (Aug 2026)** — matched to Figma `node 912-2806` + `Home.svg`. See §12. |
| About | `/about` | **Redesigned ✅ (Aug 2026)** — matched to Figma `node 912-3939` + `about me header.svg` / `AboutMe.svg`. See §13. |
| Work index | `/work` | **Redesigned ✅ (Aug 2026)** — matched to Figma `node 912-5204` + `WorkDisplay.svg`. See §14. |
| CabinBlu case study | `/work/cabinblu` | **Aligned to new design ✅ (Aug 2026)** — targeted pass over the existing bespoke build to match Figma `node 869-7278` + `Redesign July/CabinBlu-Project Diary Study.svg` (fresh Aug 28). See §18. |
| WanderLens case study | `/work/wanderlens` | **Built ✅ (Aug 2026)** — matched to Figma `node 859-6787` + `Wanderlens-CaseStudy.svg`. See §15. |
| Cinefatic case study | `/work/cinefatic` | **Built ✅ (Aug 2026)** — matched to Figma `node 869-5598`. See §16. |
| ClassQuest case study | `/work/classquest` | **Built ✅ (Aug 2026)** — matched to Figma `node 869-9558` + `ClassQuest-CaseStudy.svg`. See §17. |
| OpenSeat case study | `/work/openseat` | **Built ✅ (Aug 2026)** — matched to Figma `node 869-11269` + `Redesign July/OpenSeat-Project.svg` (fresh Aug 28). See §19. |
| Contact | `/contact` | **Built ✅ (Aug 2026)** — matched to Figma `node 968-1662` + `Redesign July/GetInTouch.svg`. See §22. |
| Xoopah case study | `/work/xoopah` | **Built ✅ (Sep 2026)** — matched to Figma `node 1050-16034`. See §24. |
| Travel & Photography | `/travel-photography` | **Built ✅ (Sep 2026)** — not from Figma, built from scratch across a long iterative session with the user. 63 real photos, an "Aerial Mode" WebGL globe of everywhere visited. See §25. |
| Other case studies | `/work/[slug]` | **Not built** — no generic template exists. The redesigned `/work` index links CabinBlu, Cinefatic, ClassQuest, WanderLens, OpenSeat, Xoopah — all six now resolve. |

**When building a new page, reuse the shared primitives the Home redesign established (§6) and the verified tokens (§5) — don't reinvent them.**

---

## 5. Design tokens

**Verified against live Figma + `Home.svg` (Aug 2026).** The Figma file has **no published
color variables** (`get_variable_defs` returns nothing) — the design uses raw hex, so tokens
below were read from fills in `Home.svg`. Current `globals.css` `@theme inline` state:

```
bg-base   #ffffff   bg-cream  #fcf9f5   bg-dark  #121212   bg-dark-alt #212121
bg-muted  #f6f6f7   border-soft #ebe8e6 paper    #ffffff
ink       #0d0d0d   ← was #000000; changed in the Home pass (dominant text colour)
ink-muted #5f5f6b   ← NEW. Cool secondary-text grey. Previously faked with `text-ink/55`.
accent-purple #5e45ff   accent-lime #c5ff52   accent-blue #265bff (NEW, unused yet)
accent-alert  #ff5a3c   (unverified — leave until a page actually needs it)
```

Muted-heading spans in the design are `rgba(0,0,0,0.55)` → keep as `text-ink/55`.
Body copy / captions → `text-ink-muted`. Don't retrofit About/Work until you touch them.

Warm neutrals in `Home.svg` (`#fcf9f5`, `#fbf9f5`, `#f5f5f5`, `#fafafa`) all map close
enough to existing tokens — no change needed.

**Fonts** (all via `next/font` in `layout.tsx`, exposed as CSS vars in `@theme inline`):
- **Instrument Serif** 400 → `font-serif` — all headings, italic taglines
- **Satoshi** 500 → `font-sans` — body + **all UI chrome** (buttons, nav labels, eyebrows,
  footer). The Home pass moved chrome text off `font-ui`/Inter onto Satoshi. **Inter
  (`font-ui`) is now legacy — prefer `font-sans` for new UI text.**
- **Gloria Hallelujah** 400 → `font-hand` — NEW. Handwritten; used for testimonial quotes.
- **Case-study-scoped faces** (in `layout.tsx` but only used inside one `.<name>` scope):
  Circular Std (`--font-cabinblu-sans`) + JetBrains Mono (`--font-cabinblu-mono`) — CabinBlu,
  reused as the body face by WanderLens & Cinefatic; Mulish (`--font-mulish`) — WanderLens
  wordmark; Bebas Neue (`--font-bebas`) + Caveat (`--font-caveat`) — Cinefatic hero headline
  & handwritten pull-quotes.

> Satoshi is loaded via Fontshare `<link>` in `layout.tsx`, not CSS `@import` — Tailwind v4's
> `@import "tailwindcss"` expansion pushes later `@import`s out of legal position. Don't move it.

Radius scale 6/12/16/20/24/32/56px. Section gutter 120px desktop.

**Shadows** (`globals.css`): `--shadow-soft`, `--shadow-glass-inset`, and NEW
`--shadow-pill` — the layered drop + inner-glow stack copied 1:1 from the Figma button
SVGs (`Redesign July/button black.svg` / `button white.svg`). Used by `PillButton` (§6).

---

## 6. Architecture & conventions

```
src/app/           routes (page.tsx per route)
src/components/
  layout/          NavBar, Footer (shared, every page)
  ui/              SectionLabel, PillButton, Marquee, SiteCursor, CursorArrow,
                   BrowserFrame, PillTag, PulseDot, RotatingRing (unused — Home dropped it)
  home/            Hero, SelectedWork, Testimonials, WhyMe, Niches, Skills, Process, ClosingCta
  about/           AboutHero, AboutBio, Timeline, AboutFeatures, FeatureIcons
  cabinblu/        18 bespoke components (Hero, Departures, FlightPlan, Journey, …)
src/data/          home.ts, about.ts, work.ts, cabinblu.ts — copy lives here, not inline in JSX
public/images/     all assets
```

**Patterns to follow:**

- **Copy lives in `src/data/*.ts`**, not hardcoded in components. Keep this.
- **Section-per-component.** Page files just compose sections (`page.tsx` is ~20–45 lines).

**Shared primitives established / changed in the Home redesign — use these on new pages:**

- **`ui/CursorArrow`** — the hand-drawn pointer traced from `button and cursor.svg`, extracted
  from the Home hero's inline copy into a shared component in the Work pass. `dir="ne"|"nw"`.
  The Home `Hero.tsx` still has its own identical inline copy (left untouched to avoid
  parallel-chat collisions) — if you touch Home, migrate it to this shared one.
- **`layout/NavBar`** (shared, every page) — the floating pill nav. Redesigned Aug 2026 to
  the **glass** treatment from `Redesign July/main nav.svg` (§21): `bg-[#1c1c1c]/75` +
  `backdrop-blur-xl backdrop-saturate-150` + `rounded-[14px]` + faint `white/8` edge —
  the old build was `/95` opaque and read as flat. Active route highlighted via
  `usePathname()` (`aria-current="page"`, full white vs `white/60`). "Say hi" button is a
  soft-UI glass chip (`bg-white/14` + inner top-glow shadow + `#0d0d0d/20` edge) with a
  `corner-down-right` icon that rotates/nudges on hover. Name "Sohaib Bin Kamran" is
  **Instrument Serif** (`font-serif text-[15px]`) per the SVG; links/button stay `font-ui`.
- **`ui/SiteCursor`** — **site-wide custom pointer, mounted once in `layout.tsx`.** On fine
  pointers ≥ md it adds `.has-custom-cursor` to `<html>`; `globals.css` then does
  `cursor: none !important` on everything under it, and this `CursorArrow` follows the mouse
  on every page. It trails a `font-hand` caption whenever the pointer is over any
  `[data-hover-note]` element (Work cards use this). Touch / no-JS keep the system cursor.
  **Don't add another follow-cursor per page** — this one covers the whole site. The Home
  hero's `RoamingCursor` badges are a *separate* decorative thing (auto-drifting annotations)
  and stay.
- **`ui/SectionLabel`** — the small outlined pill eyebrow above every section heading
  (`rounded-56`, `border-ink/12`, Satoshi 13px, full `ink`). The About/Work designs use the
  same pill. Centre it with a `flex justify-center` wrapper; left-align with a bare `flex`.
- **`ui/PillButton`** — soft-UI pill CTA, `variant="dark" | "light"`, real text. This is the
  redesign's button; replaces ad-hoc `rounded-2xl bg-bg-dark` buttons and the RotatingRing
  circle CTA. Geometry from `button and cursor.svg`: `rounded-[16px]`, `px-9 py-[13px]`,
  `text-[15px] font-medium`, `--shadow-pill` (layered drop + white inner-glow), dark variant
  carries a 1px same-colour inset ring.
- **`ui/Marquee`** — **API changed**: now takes **`children`** (any nodes) + `durationSeconds`
  + `gapClass`, not `items={string[]}`. Renders the set ×4 and translates −50% for a
  seamless infinite loop. Because the track is ×4, a given `durationSeconds` scrolls ~2×
  faster than the old ×2 version — budget ~60–110s for readable tag/logo strips.
- **`ui/BrowserFrame`** — still exists, but **Home's Selected Work no longer uses it.** The
  redesign card is a dark `#121212` `rounded-20` panel: outlined-white `rounded-full` tag
  pills + big Instrument Serif white `"<Title> - <blurb>"` heading *inside* the card, image
  in a plain `rounded-13` frame (no window chrome). Follow the Figma for each page — some
  screenshots may still want BrowserFrame, product-hero collages don't.
- **Testimonial quotes** use `font-hand` (Gloria Hallelujah), colour `text-ink-muted`, with a
  ~64px `rounded-2xl` avatar thumbnail (`border-[3px] border-[#f2f2f2]`, soft shadow).
- **Headings take multi-span rich text**, not plain strings — the design repeatedly mixes full-black and muted spans in one heading (`Designer. Builder.` + muted `Lifelong learner.`). Body copy bolds keywords mid-sentence. Don't flatten these to plain strings.
- **Case studies are bespoke, not templated.** CabinBlu has its own `components/cabinblu/` folder, its own `src/app/work/cabinblu/cabinblu.css` (scoped overrides), and a 356-line data file. If other case studies follow suit, mirror that structure — but confirm with the user, since a shared template may be wanted instead.
- **Client components:** anything using Framer Motion or hooks needs `"use client"`. Page files with `export const metadata` must stay server components.

**Motion vocabulary:** scroll-triggered fade/slide via `whileInView` (`once: true`,
`margin: "-80px"`, stagger `i * 0.08–0.1`); seamless marquees via `ui/Marquee` (set ×4,
`translateX(-50%)` linear — budget 60–110s); two roaming outline-cursor + chat-bubble badges
in the Hero (Framer Motion looped `x`/`y` keyframe drift, `repeatType: "mirror"`, bounded to
the hero, `hidden lg:flex`); pulsing status dot. **Retired in the Home redesign:**
fanned/rotated testimonial cards (now a flat 3-up row, middle raised), rotating dashed ring
on the closing CTA (now a `PillButton`).

---

## 7. Content sourcing — three sources, don't conflate

1. **`sohaib-portfolio-content.md`** — source of truth for *facts* (bio, skills, experience, dates). Has unresolved questions at the bottom.
2. **Figma / live site text** — source for *marketing copy* not in the content file (testimonials, taglines, tag lists). User approved verbatim reuse.
3. **Figma** — source of truth for *layout and visuals*.

Known correction: Eurowings Digital started **May 2024** (content file), not May 2025 (live site is stale). Where sources disagree, ask — the live site isn't automatically right.

**Never invent portfolio facts, metrics, or testimonial quotes.** If copy is missing, use a clearly-marked placeholder and tell the user.

---

## 8. Open questions — ask, don't assume

1. **Project lineup.** ~~Home~~ **RESOLVED for Home (Aug 2026):** Home "Selected Work" is
   exactly **CabinBlu → ClassQuest → Cinefatic** (Xoopah + KNOCCS dropped from Home).
   ClassQuest is an MSc HCI master thesis (`Oct 25 – Apr 26`).
   **RESOLVED for `/work` index (Aug 2026):** the Figma redesign (`node 912-5204`) fixes the
   order at **CabinBlu → Cinefatic → ClassQuest → WanderLens → OpenSeat → Xoopah**. KNOCCS is
   dropped from the index; ClassQuest is added. `work.ts` was rewritten to this list.
2. ~~**Contact form submission**~~ **RESOLVED (Aug 2026):** `ContactForm` POSTs `FormData`
   straight to **Web3Forms** (`https://api.web3forms.com/submit`), which emails the entry to
   Sohaib's inbox — no mail client, no backend. Needs `NEXT_PUBLIC_WEB3FORMS_KEY` in
   `.env.local` (public key by design). Honeypot `botcheck` field for spam. Added an `email`
   field (Name+Company row per Figma, then Email full-width, then Message) so replies are
   possible — a deviation from the 3-field Figma, matches what Framer captured.
3. ~~**Case study structure**~~ **RESOLVED (Aug 2026):** bespoke-per-project, not templated.
   WanderLens (§15), Cinefatic (§16), ClassQuest (§17) each got their own `components/<name>/`
   folder, scoped `work/<name>/<name>.css` token block, and `data/<name>.ts` — mirroring
   CabinBlu, which was itself aligned to the fresh design in §18.
4. **Responsive** — Figma frames are desktop. Get mobile/tablet frames, or agree on breakpoint behavior before building. **`NavBar` is the one exception, fixed Sep 2026 (§26)** — every other page's mobile/tablet pass is still open.
5. Content file's own open items: ~~MSc end date~~ (**About redesign uses `Oct 2023 - Apr 2026` per Figma `node 920-7843`**), KNOCCS/Xoopah metric wording, Spur product count, Behance/LinkedIn URL confirmation.
6. **Eurowings start date on About** — Figma says `May 2025`, `about.ts` keeps **`May 2024`** (content-file + user override, §7). Figma text is stale here.

---

## 9. Verification

**The browser-pane screenshot tool times out every session** ("Browser pane is not displayed,
not compositing frames"). Verify structurally: `javascript_tool` for computed styles /
`getBoundingClientRect` / `document.fonts`, `preview_logs` for real errors, `curl` the route
for the SSR HTML. Then **tell the user you couldn't see it and ask them to eyeball.**

- `read_console_messages` in this environment **does not clear on navigate** — it shows stale
  errors from earlier mid-edit HMR crashes. Cross-check against `preview_logs` (recent `GET /`
  lines) and `curl -sS -o /dev/null -w "%{http_code}"` before believing a reported 500.
- Images report `naturalWidth: 0` / `complete: false` in the non-compositing pane even when
  fine. Confirm with `curl "http://localhost:3000/_next/image?url=%2Fimages%2F<f>&w=1080&q=75"`
  → expect `200` + real byte count.

- **Visual cross-check without the screenshot tool:** render the page's `Redesign July/*.svg`
  to PNG and read it in slices —
  `node -e 'sharp(f,{density:72,unlimited:true}).resize({width:1100}).png()...extract({top,height:1500})'`.
  The Cinefatic pass caught a wrong bg hex, a wrong button label, and an over-clamped quote
  width this way. (SVG text is outlined, but the layout, colours and raster content read fine.)

- **(Sep 2026) The screenshot tool DID work in one session** — so "times out every session"
  above isn't universal. But even when the pane renders, **`requestAnimationFrame` does not
  run at all while the pane is hidden/unfocused** (confirmed directly — a bare rAF loop never
  ticked; the tool reported "Browser pane is currently hidden"). Framer Motion's tween/spring/
  keyframe engine is rAF-driven, so **every Framer-animated element sits frozen at its
  `initial` style** for as long as the pane stays backgrounded — this looks exactly like "my
  new animation is broken" but isn't (cost a lot of back-and-forth on a since-discarded
  feature before landing on this). Plain CSS `@keyframes` (Marquee, WhyMe icon loops)
  and `<video>`/decoder playback are unaffected (compositor/decoder-driven, not rAF). **Don't
  trust "it's not animating" from `getAnimations()` / polled inline-style snapshots as proof
  of a code bug — check `document.hidden` / try a raw rAF probe first**, and if the pane is
  hidden, verify the *logic* (state transitions, event firing via `console.log`, DOM
  structure) instead of the *motion*, then tell the user to eyeball the actual timing live.

Before finishing a page: `curl` the route = 200, SSR HTML contains every section's text, no
*fresh* server errors in `preview_logs`, images serve via the `_next/image` curl check, links
point at real routes.

---

## 10. Per-page kickoff notes

**Home** — ✅ **DONE (Aug 2026).** See §12 for the full changelog. 8 sections: Hero,
SelectedWork, Testimonials + org marquee, WhyMe, Niches (2 marquees), Skills (dark card),
Process, ClosingCta. Built from Figma `node 912-2806` + `Home.svg`.

**About** — ✅ **DONE (Aug 2026).** See §13. 3 sections: AboutHero, AboutBio (bio + Experiences/Education timelines + sticky portrait), AboutFeatures (5-cell bento). Built from Figma `node 912-3939` + `about me header.svg` / `AboutMe.svg`.

**Work index** — ✅ **DONE (Aug 2026).** See §14.

**Contact** — ✅ **DONE (Aug 2026).** See §22. Dark hero (glow + masked grayscale-cloud
bg), "Available Now!" pill, `Get in Touch!` heading, Name/Company/Email/Message form →
Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY`), "Or email me directly" chip. Tested live.

**Case studies** — bespoke-per-project (§8.3). Reference builds: WanderLens (§15),
Cinefatic (§16), ClassQuest (§17), CabinBlu (§18), OpenSeat (§19), Xoopah (§24) — all six
`/work` projects now have a built case study. Each needs a node-specific Figma link. Fonts
beyond the site set get added to `layout.tsx` scoped by a comment (Cinefatic added Bebas
Neue + Caveat; WanderLens added Mulish; ClassQuest and Xoopah added none — both reuse
Circular Std + JetBrains Mono).

---

## 11. Assets

`public/images/` — pre-existing: `hero-clouds.png` (now unused — About redesign dropped it),
`hero-mockup-*` (no longer used — Home dropped them), `portrait.png` (superseded by
`portrait-suit.png` on About), `cabinblu-*` (~23).

**Added in the Work pass** (rendered from Figma `node 912-5204` cover frames):
- `work-{cabinblu,cinefatic,classquest,wanderlens,openseat,xoopah}.png` — the six project
  cover collages. `wanderlens` / `cinefatic` came as single full-res images (downscaled to
  1400px wide with `sharp`); the other four are ~546px Figma renders of multi-layer collages.
  The old `project-{xoopah,knoccs,openseat,wanderlens}.png` + `project-knoccs.jpg` are now
  orphaned (kept in place — may be reusable for case studies).

**Added in the Cinefatic pass** — `public/images/cinefatic/` (19 files), pulled from the
Figma `get_design_context` asset URLs (per section) and downscaled with `sharp`:
`header-bg.png` (comic-collage hero bg, 2200w), `problem-strip.png` (6-panel comic, black
bg = page bg), `matrix.png` (Impact/Effort board, browser-chrome baked in),
`hero-screen-{left,center,right}.png` + `phone-silver.png` (`phone-silver` unused — the
bezel is CSS), `logo-{1..4}.png` (Bookme / Nueplex / Fandango / AMC), `s{1..4}-*.png`
(8 prototype screens). The stale `Redesign July/Cinefatic-CaseStudy.svg` was used only as a
rendered layout cross-check, not for asset extraction.

**Added in the About pass** (extracted from `Redesign July/*.svg`):
- `about-hero-bg.png` — the AboutHero background, **pre-baked**: grayscale sky already
  faded to white from the centre outward. Full-bleed `object-cover` (hero aspect ≈ 1440/584,
  matches the asset), no CSS gradient needed. Source: `about me header.svg` pattern fill.
- `portrait-suit.png` — About portrait (suit photo, 1122×1402). Source: `AboutMe.svg`.
- `logos/{eurowings-digital,spur-solutions,the-vibrators,uni-siegen,iba}.svg` — small
  icon-only org/university marks for the Experiences/Education `Timeline` (Sep 2026, user
  supplied the SVGs directly, not extracted from a Figma export).

**Added in the Home pass** (pulled from Figma live + extracted from `Home.svg`):
- `hero-sky.png` — hero + Skills-card background (the painterly cloud/coast scene)
- `project-{cabinblu,classquest,cinefatic}.png` — Selected Work device-collage cards (1144×576)
- `testimonial-{zain,philipp,riaz}.png` — colleague photos
- `org-{gdsc,packages,eurowings,spursol}.png` — "Organizations where I've made an impact" logos
- `process-{understand,prototype,ship}.png` — Process card images
- `sbk-logo.png` — handwritten "sbk." footer mark (rendered `brightness-0 invert` on dark)
- `btn-dark.svg` / `btn-light.svg` — reference copies of the Figma button SVGs (not used at
  runtime; `PillButton` + `--shadow-pill` recreate them with real text)

The canonical button + cursor spec is `Redesign July/button and cursor.svg` (has both buttons
at correct `rx=16` + both cursor pointers). The Hero cursor path is traced 1:1 from it.

Pull new assets from Figma via `get_design_context` / `get_screenshot` on the node, or
extract embedded rasters from the relevant `Redesign July/*.svg` (see §3). **Ask before
downloading** — state filename, source, and size first.

**Not from Figma:** `public/images/photography/` (63 real user photos, `.webp`) and
`public/images/earth-texture.jpg` (a real-Earth equirectangular map, not Figma-sourced —
see §25). These are the user's own material, not extracted design assets.

---

## 12. Home redesign changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `912-2806` + `Redesign July/Home.svg`.
`get_design_context` on the full frame overflows context → it saved to a tool-results file;
extract the JSON `text` field and grep it, or call `get_design_context` per sub-node.

**Global**
- `globals.css`: `ink` → `#0d0d0d`; added `ink-muted #5f5f6b`, `accent-blue #265bff`,
  `--font-hand` (Gloria Hallelujah, added in `layout.tsx`), `--shadow-pill`.
- New `ui/SectionLabel`, `ui/PillButton`. `ui/Marquee` rewritten (`children` API, seamless ×4).
- All section eyebrows → `SectionLabel` pill. UI chrome text moved Inter → Satoshi.

**Hero** (`components/home/Hero.tsx`)
- Removed the side device mockups. Background is `hero-sky.png`, **`-mt-16`** so it sits
  under the sticky nav (no white strip), sky div `-top-px h-[800px]`, masked fade to white.
  (Was `-mt-12`; the glass-nav rebuild (§21) made the nav ~50px tall so 48px no longer
  covered it — a ~2px light strip showed. `-mt-16` = 64px has real headroom.)
- **Section height `min-h-[882px]`** — matches the design's hero band (the `Home.svg` cloud
  image is 882px tall; `Section - Projects` starts at y≈882). Content `justify-center` with
  extra `pb-40` to bias the headline above centre; the `#ebe8e6` bar sits pinned at the bottom.
- Headline unchanged (`Crafting Real Impact,` muted + `through Human-First Design` ink).
- Status line copy: "currently **crafting** at Eurowings Digital". `PillButton` for "My Work".
- Full-bleed `#ebe8e6` bar: "Siegen, Germany" + a clock **pinned to `Europe/Berlin`**.
- Two `RoamingCursor`s, slow looped `x`/`y` drift, `hidden lg:flex`:
  - purple "UX/Product Designer", left side, cursor at bubble top-**right** pointing **↗** (`dir="ne"`)
  - lime "Perhaps you?", right side, cursor at bubble top-**left** pointing **↖** (`dir="nw"`)
  - `CursorArrow` shape traced 1:1 from `button and cursor.svg`: `#fafafa` fill + thin
    `#080808` outline (stroke-width 1.92). `dir="nw"` = `scaleX(-1)` of the `ne` path.
    (Went through several wrong iterations — hollow arrow, dark-filled — before this.)

**Selected Work** (`SelectedWork.tsx`, `data/home.ts`) — lineup **CabinBlu → ClassQuest →
Cinefatic** (see §8.1). Dark-card treatment (§6), images `project-*.png`. `/work/classquest`
& `/work/cinefatic` routes don't exist yet.

**Testimonials** (`Testimonials.tsx`) — heading `Real feedback,` muted + `real results.` ink;
subheading "From stand-ups to ship day: what my colleagues noticed." Flat 3-up card row
(no rotation), middle card raised, avatars `testimonial-*.png`, quotes in `font-hand`.
Org strip: real logos `org-*.png` in a serif-headed seamless `Marquee`.
**Card hover** — entrance + hover both run on a soft Framer spring
(`stiffness 240 / damping 14 / mass 0.9`, deliberately under-damped for a gentle bounce);
hover lifts the card + scales 1.02 and fades in a warm orange→cream gradient wash + shadow
(500ms). The raised middle card animates its offset through Framer too (was a stiff CSS
`translate`). An earlier "I want the same →" pill on hover was **removed** per user.

**WhyMe** — rebuilt to Figma `912-3173` (user: "not right per the svg"). `bg-bg-cream`
section; **left-aligned** header (SectionLabel + serif `md:text-[44px]` heading + muted
`md:text-lg` sub — was centred). 3 columns, each **centred**: a white `rounded-[18px]`
icon card (`border-[#0a0f29]/8` + soft shadow, 28px icon, `p-4`) over a centred
`font-sans font-medium text-[22px]` title (NOT serif — overrides the global `h3` rule) and
centred muted body. Icons are 3 inline two-tone SVGs traced 1:1 from the Figma asset URLs
(navy `#0A0A30` + accent `#265BFF`): marker / plus-with-dot / heart. No card bg on the
columns (the old build wrapped each in a `bg-bg-muted` card).
**Icon loops** (user request) — CSS `@keyframes` in `globals.css`, applied via arbitrary
`[animation:…]` + `origin-center` + a shared `.wm-icon-anim` class that
`@media (prefers-reduced-motion)` disables: marker **wings** ±11° (`wm-wing` 1.6s
ease-in-out), plus **spins** like a windmill (`wm-windmill` 2.4s linear), heart **beats**
(`wm-beat` 1.15s, double-bump scale). (Speeds bumped once on user feedback.)
**Niches** — heading left-aligned, split muted/ink spans; 2 `Marquee`s slowed (68s / 104s).
**Skills** — dark card gained a faint `hero-sky` wash + a "Get In Touch" outline button;
heading split spans.
**Process** — each card now leads with an image (`process-*.png`) in a `rounded-xl` frame.
**ClosingCta** — RotatingRing circle replaced with `PillButton variant="light"` "Let's Talk?".

**Footer** (`layout/Footer.tsx`, shared) — © 2026; "Navigation"/"Contacts" labels + the giant
"SOHAIB" watermark → Satoshi; center "sbk" text → `sbk-logo.png` (`brightness-0 invert`).

**Also touched (shared):** `components/about/AboutHero.tsx` — migrated to the new `Marquee`
`children` API. (About page has since been fully redesigned — see §13.)

**Iterated after first pass (user feedback):** Selected Work → dark cards; testimonials →
flat row + real avatars + Gloria Hallelujah; org strip → real logos + seamless loop;
Niches marquees slowed (68s / 104s); Process cards got images; clock pinned to Berlin;
hero pulled under the nav; footer "SOHAIB" → Satoshi, "sbk" → logo image; ClosingCta circle
→ `PillButton`; cursors reworked to the `button and cursor.svg` shape + split directions;
`PillButton` geometry matched to the SVG; hero section grown to `min-h-[882px]` to match the
design's hero band; testimonial cards got the soft-spring hover (above); the site-wide
custom cursor landed here too (§20).

**Still open:** visual QA (screenshot tool down — user eyeballing); mobile/tablet (§8.4);
user may still want the literal button SVGs instead of the `PillButton` recreation.

---

## 13. About redesign changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `912-3939` + `Redesign July/about me header.svg`
(hero) + `Redesign July/AboutMe.svg` (portrait). `AboutMe.svg` is **fresh (Aug 27 2026)**,
not the stale Aug 2 version §3 warned about — check mtime. `get_variable_defs` returns
nothing (no published vars). Page is 3 sections; `page.tsx` unchanged (still composes
`AboutHero` / `AboutBio` / `AboutFeatures`).

**Data** (`data/about.ts`) — added `education[]` (Universität Siegen HCI Masters
`Oct 2023 - Apr 2026`; IBA CS Bachelors `Aug 2018 - June 2022`), `TimelineEntry` type,
per-feature `emphasis` keyword (bolded inline in the bento bodies), `bio.whoHeading`.
Eurowings kept at **May 2024** (Figma's `May 2025` is stale — §7, §8.6). Feature titles
already matched the design.

**Iterated after first pass (user requests, Sep 2026):**
- Third experience entry is no longer GDSC — replaced with **"The Vibrators"** /
  "Lead - Design & Communication" / `Aug 2021 - Jun 2022`.
- `TimelineEntry` gained an optional `logo` field. Every experience **and** education entry
  now shows a small org/university mark: `public/images/logos/{eurowings-digital,
  spur-solutions,the-vibrators,uni-siegen,iba}.svg` — icon-only marks, distinct from the
  wordmark logos in `public/images/org-*.png|svg` used by Home's org marquee. Rendered in
  `Timeline.tsx` as a `h-8 w-8` white `rounded-lg` bordered badge (`shadow-soft`,
  `object-contain`) to the left of the title — **tried removing the badge for a bare
  larger icon, user preferred the badge, reverted.**
- `bio.bioText` — "over 3 years of experience" → **"4+ years of experience"**.

**AboutHero** (`components/about/AboutHero.tsx`)
- Background is the **pre-baked** `about-hero-bg.png` (grayscale sky, centre-out white fade
  baked in), full-bleed `object-cover`, `-mt-12` under the sticky nav, short bottom fade to
  white. **Do not** rebuild this fade with CSS radial-gradients — that was tried twice and
  never matched; the SVG bakes it into the raster.
- Quote `md:text-[42px]`, centred, `min-h-[560px]` section.
- Service ticker: `Marquee` (children API) of `rounded-full` translucent-white pills, each
  with a thin 6-point asterisk glyph.

**AboutBio** (`components/about/AboutBio.tsx`)
- Two-col `md:grid-cols-[1fr_minmax(0,440px)]`. Left: serif split heading
  (`Designer. Builder.` ink + `Lifelong learner.` muted), `Who am I?` + bio, then two
  `Timeline`s (Experiences, Education). Right: `portrait-suit.png` in a `rounded-[20px]`
  bordered frame, `md:sticky` (sticky wrapper is a **separate** div from the `relative`
  fill container — next/image rejects `position: sticky` on a fill parent).

**Timeline** (`components/about/Timeline.tsx`, new — shared by both lists)
- Server component. Dashed left connector (`border-l border-dashed border-ink/15`),
  entries `gap-11`. Node = a **static** radar-ping blue dot: 8px core + `ring-4` halo +
  `animate-ping` ring, `-left-[43px]` centred on the connector.
- User feedback: tried scroll-reactive (fade/ping in on `whileInView`, `once:false`) —
  **rejected**, all dots stay visible, no scroll animation.

**AboutFeatures** (`components/about/AboutFeatures.tsx`)
- `SectionLabel` pill "Features" (was plain `font-ui` text), heading "What sets me apart?".
- Section `bg-bg-muted` with a faint (`opacity-12`) grayscale `hero-sky.png` wash along the
  bottom edge.
- Bento: one `rounded-[20px]` bordered white card, 6-col grid — top row 3× `col-span-2`,
  bottom row 2× `col-span-3` (Figma is 3-up / 2-up, not the old 3-up + 1 wide). Line icons
  reused from `about/FeatureIcons.tsx`. Bodies render `emphasis` phrase in `font-semibold
  text-ink`.

**Still open:** visual QA (screenshot tool down — user eyeballed the hero + timeline over
several iterations); mobile/tablet (§8.4).

---

## 14. Work index redesign changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `912-5204` (Portfolio/WorkDisplay) +
`Redesign July/WorkDisplay.svg`. Page is header + gallery; `page.tsx` composes
`WorkHeader` / `WorkGallery`. (Originally also mounted a page-level `WorkCursor` — since
promoted site-wide to `ui/SiteCursor` in `layout.tsx`; see §20.)

**Data** (`data/work.ts`) — rewritten. Lineup + fixed order: **CabinBlu → Cinefatic →
ClassQuest → WanderLens → OpenSeat → Xoopah** (KNOCCS dropped, ClassQuest added — §8.1).
`Project` type gained `imageAlt`, `hoverNote` (the handwritten cursor caption), and optional
`underConstruction` (now unused — Xoopah's case study is built, see §24).

**Assets** — six `work-*.png` covers rendered from the Figma cover frames (see §11).

**Layout**
- Page wrapper: `-mt-12 bg-bg-cream` (cream runs up under the sticky nav — same white-strip
  fix as Home/About heroes; user asked for it explicitly). Carries `data-work-scope` +
  `md:cursor-none`.
- `WorkHeader` — serif `text-[44px]` heading, muted `text-ink/55` "Case Studies." lead-in +
  `text-ink` remainder; Satoshi `font-medium` sub-copy `max-w-[650px]` with **user research**
  and **prototyping** bold. `pt-40 pb-3`. (Figma `857:6307`, header bg `#fbf9f5` ≈ `bg-cream`.)
- `WorkGallery` — `grid md:grid-cols-2 gap-9 max-w-[1240px] px-6 pt-20 pb-28`. Server component.
- `WorkCard` (`"use client"` — Framer Motion, see Hover) — collage on a warm `#f0eeeb` panel
  (`rounded-[14px] px-[28px] py-[43px]`), cover in a `rounded-[10px]` frame with the 6-layer
  Figma shadow (inlined as `PANEL_SHADOW` style, not a Tailwind class — too many layers),
  `aspect-[545.38/326.52]`, serif `28px` title below. Link carries `data-hover-note`.
  Shared panel/cover class strings are `PANEL_CLASS` / `COVER_CLASS` consts (reused by the
  under-construction branch).

**Hover behaviour** (iterated 4× on user feedback — `WorkCard` is now a `"use client"`
Framer Motion component)
- Cover lift is a **Framer spring** (`stiffness 190, damping 13, mass 1`) → `y: -10,
  scale: 1.045` with a soft overshoot/bounce; box-shadow deepens on a `0.5s` easeOut tween
  (springing a shadow string jitters). Driven by `whileHover="hover"` on an outer `motion.div`
  wrapper (so hovering the title also lifts the cover), variants on the inner cover.
  **Rejected earlier:** pure-CSS transitions — expo `cubic-bezier(0.16,1,0.3,1)` (front-loaded
  pop), then `cubic-bezier(0.45,0,0.55,1)` @1200ms (still read as "stiff / not smooth").
  A spring was what the user wanted ("bounce a little in a soft manner").
- Panel tint still CSS `group-hover:bg-[#ece6de]` (`0.5s` ease-out); title `↗` still CSS
  `group-hover`.
- `useReducedMotion()` drops `whileHover` entirely; the `↗` keeps `motion-reduce:transition-none`.

**Under construction** (Aug 2026) — a `Project` with `underConstruction: true` (a project
whose case study route isn't built yet) renders a separate branch in `WorkCard`: a plain `<div>`
(not `<Link>`, `cursor-default select-none`), **no** `data-hover-note` (so `SiteCursor` shows
no caption over it), no Framer hover. Cover is `grayscale opacity-60` under a `bg-[#f0eeeb]/45`
wash with a centred white/blur `rounded-full` "Under Construction" pill (amber `#f5a623` status
dot); title muted to `text-ink/45`. To re-enable: delete the `underConstruction` line in
`work.ts` once the route exists. **No project currently uses this branch** — Xoopah's
`underConstruction` line was removed once `/work/xoopah` shipped (§24).

- **Custom cursor** — ~~`components/work/WorkCursor.tsx`~~ **superseded (Aug 2026): promoted
  to the site-wide `ui/SiteCursor` in `layout.tsx`** (user wanted the custom pointer on every
  page, not just Work). `WorkCursor.tsx` deleted; `page.tsx` no longer mounts it and dropped
  `md:cursor-none` (global CSS handles it). `WorkCard` keeps `data-hover-note` — `SiteCursor`
  still reads it to trail each project's handwritten caption. `data-work-scope` on the
  wrapper is now vestigial (nothing reads it).

**Still open:** visual QA (screenshot tool + fine-pointer emulation both down in this env —
user eyeballing the zoom pace + cursor); mobile/tablet (§8.4) for the gallery grid itself.
Card routing status (Sep 2026 update): all six
`/work/{cabinblu,wanderlens,cinefatic,classquest,openseat,xoopah}` routes now resolve — see
§15–19 and §24. (The shared `NavBar`'s own mobile overflow, flagged repeatedly across §15–24,
was fixed Sep 2026 — see §26.)

---

## 15. WanderLens case study changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `859-6787` (Portfolio/Wanderlens-CaseStudy)
+ `Redesign July/Wanderlens-CaseStudy.svg` (**fresh, Aug 27 2026**, 48 MB). WanderLens is a
**solo HCI thesis concept** — an AR field guide for hiking trails, not a shipped product.
**Bespoke, not templated** (same call as CabinBlu — §6). `get_variable_defs` returns nothing.

**Structure** — `page.tsx` composes 13 sections under a `.wanderlens` scope div:
Hero → ProblemGoal → StoryStrip → Brand → Research → Prototype → Evaluation →
FeaturesImpact → Limitations → Roadmap → Reflections → CaseFooter → ClosingCta.
Global `NavBar` + `Footer` still wrap it from `layout.tsx` (the Figma frame's bottom
"Footer - Desktop" == the global footer). `CaseFooter` is the case-study-specific footer
(WANDERLENS mark, PROTOTYPE / BACK TO TOP); `ClosingCta` is the "Why wait?" dark CTA.

**Scoped system** — `src/app/work/wanderlens/wanderlens.css`, all tokens namespaced under
`.wanderlens` (bespoke green palette, NOT the site tokens):
`--wl-forest #2f4428` · `--wl-moss #7e9a2e` · `--wl-moss-bright #96b73a` ·
`--wl-amber #f2901a` · `--wl-sage #e7e6d3` · `--wl-paper #fbfaf4` ·
`--wl-forest-deep #1d2a18` · `--wl-forest-panel #1f321e`. Muted body `#5b6354`.
Section rhythm: alternating paper / sage / forest, `py-24`, `max-w-[1180px] px-8`.

**Fonts** — added **Mulish** (`--font-mulish`, weights 400/700/800/900) to `layout.tsx`
for the WANDERLENS wordmark + big display numbers only. Body/headings **reuse the
self-hosted Circular Std** (`--font-cabinblu-sans`) and JetBrains Mono
(`--font-cabinblu-mono`) that CabinBlu loads — the comment there says "cabinblu only" but
functionally it's the design's real body face; kept isolation via `.wanderlens` scope.

**Components** (`src/components/wanderlens/`):
- `Mark.tsx` — `WlMark` (inline SVG, the real logo path from `Redesign July/WL Logo.svg`,
  `fill:currentColor`) + `WlEyebrow` (amber tick + mono label, `onDark` variant).
- `PhoneFrame.tsx` — CSS iPhone frame (rounded, notch) wrapping a 393×852 screen export.
- One component per section; copy in `src/data/wanderlens.ts`.

**Assets** — `public/images/wanderlens/` (37 files). Sourced two ways:
1. **Raw rasters extracted from the SVG** (regex `data:image/png;base64,…`, decode) — the
   **12 prototype phone screens** (`screen-*.png`, 393×852) + hero splash + CTA bg.
   (`wanderlens-mark.png` was extracted too but is now unused — `WlMark` renders the real
   `WL Logo.svg` path inline.)
2. **Combined illustration sheets downloaded via `get_design_context` asset URLs, then
   sliced with `sharp`** (in `node_modules`, no global imagemagick): the Figma exports
   pack multi-image rows into ONE sheet and crop per cell via `%` transforms. Wrote a
   generic cropper (renderW = cellW·w%/100, cropX = -cellW·left%/100 · sourceW/renderW …)
   → `story-{1..3}`, `problem-strip`/`goal-strip`, `socio-{1,2}`, `feature-{1..4}`,
   `eval-{1..6}`, `limit-{1..6}`. Cropper params + scratch in this session's scratchpad.
   The sliced illustrations already have their labels/captions baked in (AI sketch style),
   so those sections are just image-in-a-tinted-box; ProblemGoal keeps a real mono/serif
   header above its (header-less) strip.

**Verified** — `next build` clean (route `/work/wanderlens` prerenders static); on the
other chat's :3000 server: 200, all 10 `<h2>`s + section text in SSR, 38 images 0 broken,
13 phone frames, no horizontal overflow, Mulish 900 + Circular Std loaded, gradient +
`-mt-14` under the floating nav, `#research` anchor + target present.

**Iterated after first pass (user feedback, screenshots supplied):**
- `WlMark` — replaced the hand-traced approximation with the **real logo path** from
  `Redesign July/WL Logo.svg` (single evenodd path, `viewBox 0 0 101 144`, `fill:currentColor`
  so it recolours per surface). Used in Brand dark card + both lockups + `CaseFooter`.
- `Research` flow bar — was `flex flex-wrap` and wrapped step 3 onto a second line; now a
  5-track grid `md:grid-cols-[1fr_auto_1fr_auto_1fr]` (steps + arrows), children use
  `display:contents` so the inner divs sit on the real grid tracks. Stacks on mobile.
- `FeaturesImpact` illustration cards — were `object-cover` on an `aspect-[550/265]` box,
  which cropped the baked-in labels off the left edge; switched to `object-contain` (image
  shows in full, card tint letterboxes top/bottom, matching Figma's h-265 box / h-230 image).
- Dark-section headings — the scoped `.wanderlens h2 { color: var(--wl-forest) }` rule
  (specificity 0,1,1) was beating `text-white` (0,1,0). `StoryStrip` + `Reflections` H2s
  now use `!text-white`; `ClosingCta` H2 uses `!font-serif !text-white` (Instrument Serif,
  white) — **keep the `!` prefix on any future dark-section heading in this scope.**

**Still open:** visual QA — **screenshot tool down all session (§9), user eyeballed the
above over several rounds**; remaining: ProblemGoal (does the real mono header read as
duplicated next to the header-less illustration strip?); crop tightness on the other sliced
sheets (`story-*`, `eval-*`, `limit-*`, `socio-*`); mobile/tablet (§8.4). Prototype/CaseFooter
deep-links point at the bare Figma file URL — swap for a real published prototype link when
available.

---

## 16. Cinefatic case study changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `869-5598` (Portfolio/Cinefatic-CaseStudy).
`Redesign July/Cinefatic-CaseStudy.svg` is **stale (Aug 2)** — ignored; everything came from
`get_design_context` per section + the exported asset URLs. `get_variable_defs` returns
nothing. Cinefatic is a **self-directed product design project** — a city-wide cinema
booking app for Karachi (2022–2023). **Bespoke, not templated** (same call as CabinBlu /
WanderLens — §6).

**Structure** — `page.tsx` composes 10 sections under a `.cinefatic` scope div:
Header → Hero → Problem → Market → Pivot → Prioritization → Solution → Results →
Reflections → ClosingCta. Global `NavBar` + `Footer` wrap from `layout.tsx` — the Figma
frame's three trailing `Section` nodes (`869:14147/14201/14207`: Let's-Connect band, SOHAIB
watermark, © + socials) **are** the global footer, so they were not rebuilt.

**Scoped system** — `src/app/work/cinefatic/cinefatic.css`, all tokens namespaced under
`.cinefatic` ("cinema noir" palette, NOT the site tokens):
`--cf-bg #16060b` (page ground + ticket-stub notch fill) · `--cf-panel #3c1521` (raised
cards, phone showcase) · `--cf-panel-deep #170810` (logo tiles, phone bezels) ·
`--cf-cream #f6ead6` (stat cards / callouts) · `--cf-gold #e2a84c` (eyebrows) ·
`--cf-crimson #e13a63` (rules, index numerals, screen labels) · `--cf-rose #a72749`
(display numbers on cream) · heading `#f6ead6` · body `#d8bdb3` · dim `#a98a89` · on-cream
`#271219`. Section rhythm `py-14`, content `mx-auto max-w-[960px] px-6` (Figma body col is
926px; header band is wider at `max-w-[1140px]`).

**Fonts** — added **Bebas Neue** (`--font-bebas`, hero display headline only) and **Caveat**
(`--font-caveat`, handwritten pull-quotes) to `layout.tsx` via `next/font/google`. Body +
section headings **reuse the self-hosted Circular Std** (`--font-cabinblu-sans`); ClosingCta
H2 uses Instrument Serif white (`!font-serif !text-white`, same dark-scope gotcha as §15).

**Components** (`src/components/cinefatic/`) — one per section + `Bits.tsx` (shared
`RichText` for `**bold**` spans, `Eyebrow`, `Section`, `SectionHead`, `StatCard` with the
ticket-stub notch punch-outs, `NumberCard`, `PullQuote`, `Caption`, `Phone` dark-bezel
frame). Copy in `src/data/cinefatic.ts` (verbatim from Figma, reuse approved §7).

**Assets** — `public/images/cinefatic/` (19 files), all pulled from Figma `get_design_context`
asset URLs and downscaled with `sharp`: `header-bg.png` (comic-collage hero bg, 2200w),
`problem-strip.png` (6-panel comic, black bg matches page), `matrix.png` (Impact/Effort
board, browser-framed), 3 `hero-screen-*` + `phone-silver` (unused — bezel is CSS),
4 `logo-*` (Bookme / Nueplex / Fandango / AMC), 8 `s{1..4}-*` prototype screens.

**Verified** — route 200, no server errors, SSR HTML carries all 10 section headings +
"Admit One" + "Baymard", every `_next/image` serves 200, all 6 fonts report `loaded`,
no horizontal overflow at 1280px, all 10 blocks render with sane heights.

**Verified against `Cinefatic-CaseStudy.svg`** (rendered to PNG via `sharp` at density 72,
sliced — the file IS stale for build-status but the *visual layout* still matched the live
Figma). Fixes from that pass: page bg `#16060b` → **`#120509`** (SVG root rect); ClosingCta
button **"Let's Talk?"** (was "Let's Connect!" — that's the footer link, not the CTA);
`PullQuote` max-width clamp removed (Figma quotes run the full 899px); added a short centered
gold rule (`Divider` in `Bits.tsx`) between every major section.

**Still open:** screenshot tool + browser-pane compositing down all session (§9) so the
*built* page was checked structurally + against the SVG, not by eye in-browser; Hero
phone-showcase overlap/rotation and the Solution screen-3 three-phone cluster are close
approximations of the Figma render, not pixel-matched; mobile/tablet (§8.4).
`/work/cinefatic` is linked from the `/work` index (already in `work.ts`).

---

## 17. ClassQuest case study changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `869-9558` (Portfolio/ClassQuest-CaseStudy)
+ `Redesign July/ClassQuest-CaseStudy.svg` (**fresh, Aug 28 2026**, 30 MB) +
`Redesign July/ClassQuest Logo.svg`. ClassQuest is an **MSc HCI master's thesis** — an
AI-assisted class wiki, researched/rebuilt across three Design Science Research phases with
the same 7 students. **Bespoke, not templated** (same call as CabinBlu / WanderLens / Cinefatic).
`get_variable_defs` returns nothing.

**Style** — unlike the noir/green case studies this one is **close to the site system**:
editorial light layout, warm `#f3f3ee` page ground, near-navy headings. It does NOT use
Instrument Serif for headings — it uses **Circular Std Bold** (the `--font-cabinblu-sans`
already loaded) for headings/body and **JetBrains Mono** (`--font-cabinblu-mono`) for
eyebrows/labels/chips. **No new fonts added to `layout.tsx`.** (Figma's `get_design_context`
names Fraunces/IBM Plex Mono as fallbacks — ignore; the real spans are Circular Std + JetBrains Mono.)

**Structure** — `page.tsx` composes 12 sections under a `.classquest` scope div, hairline
`<Separator/>` between each: Hero → Problem (01) → Process (02) → Phase1 (03) → Phase2 (04) →
Phase3 (05) → Brand (06) → Solution (07) → Impact (08) → Guidelines (09) → Reflections (10) →
CaseFooter → ClosingCta. Global `NavBar` + `Footer` wrap from `layout.tsx` (Figma frame's
trailing `Footer - Desktop` == global footer). `ClosingCta` = the shared "Why wait?" dark CTA
(Instrument Serif white `!`-prefixed, "Let's Talk?" white pill → `/contact`).

**Scoped system** — `src/app/work/classquest/classquest.css`, all under `.classquest`:
`--cq-bg #f3f3ee` · `--cq-bg-alt #eceae1` (alternating band) · `--cq-card #fff` ·
`--cq-dark #13182b` · `--cq-ink #161a2b` · `--cq-body #4b4f66` · `--cq-muted #8a8da0` ·
`--cq-blue #2f5fe0` (stats/links) + tint `#e6ecfd` · `--cq-gold #d9971f` (eyebrows) + tint
`#fbe9c9` · green `#1f8a5c`/`#def3e8` · red `#c24545`/`#fbe4e0` · `--cq-border #dedcd2`.
Section rhythm `py-20 md:py-24`, `max-w-[1172px] px-6` (matches Figma's 1172 content col).
`.classquest h1..h4` override the
global serif rule (Circular Std 700) — specificity (0,1,1) beats global (0,0,1), no `!`
needed EXCEPT the dark ClosingCta h2 which needs `!font-normal !text-white !font-[family-name:...]`.

**Components** (`src/components/classquest/`) — `Logo.tsx` (`ClassQuestMark` = cap paths
traced 1:1 from `ClassQuest Logo.svg` w/ fixed gradient; `ClassQuestLockup` = mark + live
`<span>ClassQuest</span>` so the wordmark recolours per surface), `Bits.tsx` (`RichText`
`**bold**`, `Section` w/ `band` prop, `Separator`, `Eyebrow` = circled index + mono gold
label, `DashEyebrow` hero-only, `SectionHead`, `SubHead`, `Note`, `StatCard`, `LabelCard`,
`Callout` gold-left quote card + mono source + tint tag chip, `Aside` gold-left "why" card,
`FrameImg` bordered+shadowed image, `Caption`), one component per section. Copy in
`src/data/classquest.ts` (verbatim from Figma, reuse approved §7). The 4 logo-exploration
thumbnails are **hand-drawn inline monoline SVGs** (`ExploreIcon` in `Brand.tsx`) — they're
tiny decorative sketches in Figma, not extractable raster; final option renders `ClassQuestMark`.

**Assets** — `public/images/classquest/` (14 files), all extracted as embedded rasters from
the SVG (regex `data:image/(png|jpeg);base64`), downscaled with `sharp`: `hero.jpg`,
`dash-before.png` / `dash-after.jpg` (Phase 3 before/after), `s-{sources,editor,library}.jpg`
(Solution screens 1-3), `fmt-{flashcard,mcq,cloze}.jpg`, `source-preview.jpg`,
`quest-complete.jpg`, `progress-dashboard.jpg`, `leaderboard.jpg`, `cta-bg.png` (dark eclipse
for ClosingCta). The SVG's embedded `sbk.` mark (img15) was skipped — global footer handles it.

**Verified** — route `/work/classquest` = 200, `✓ Compiled` clean in the other chat's :3000
dev log, SSR HTML carries all 12 section headings + hero + CaseFooter credit, all 14
`_next/image` serve 200 with real bytes. `work.ts` already had the `classquest` slug so the
`/work` index link now resolves.

**Iterated after first pass (user screenshots):** hero was centred → now left-aligned like
every section; removed the tight `max-w-[..ch]` clamps on the hero H1 + all `SectionHead`
H2s (they were wrapping 3–4 cramped lines) — headings/intros now run the full `max-w-[1172px]`
content column as in Figma (content width there is 1172 / text col 1116). H2 sizes eased to
30/38/44px.

**Still open:** visual QA — **this session could not run its own dev server (Turbopack
single-instance lock on the dir) and the browser pane can't reach the other chat's :3000, and
the screenshot tool is down (§9)** — so the built page was checked structurally + against the
Figma section screenshots, NOT eyeballed in-browser. User should eyeball: hero image framing,
the Brand section (dense — logo-exploration grid, 3 lockup rows, colour swatches, type
specimens, voice cards), and the Solution section's long image stack. Mobile/tablet (§8.4).

---

## 18. CabinBlu case study alignment pass (Aug 2026)

The CabinBlu case study (`/work/cabinblu`) already existed as a bespoke 12-component build
from **Aug 2025**, and it already targeted Figma `MXxffOc1fNdTbvUBfEVA1z` node `869-7278` —
the same node the fresh **`Redesign July/CabinBlu-Project Diary Study.svg`** (Aug 28 2026,
1440×14264, 15 embedded rasters) renders. So the "rebuild to new design" was done as a
**targeted alignment pass** (user's explicit choice), not a from-scratch rebuild. Copy in
`data/cabinblu.ts` was already verbatim-correct and unchanged. Structure unchanged:
`page.tsx` composes Hero → Departures → ContextSection → FlightPlan → RouteSection →
Findings → FlightRecorder → Journey → BaggageClaim → Arrivals → Postcards →
CaseStudyFooter → **ClosingCta (new)**. Global `NavBar`/`Footer` wrap from `layout.tsx`
(the SVG's trailing "Why wait?" band + SOHAIB watermark + © row == global `ClosingCta`-style
CTA and global footer). Scoped system in `src/app/work/cabinblu/cabinblu.css` (navy palette,
`--cb-*` tokens, Circular Std + JetBrains Mono) — unchanged.

**Assets** — the old sprites were low-res renders of the same Figma sheets; replaced in place
with hi-res versions extracted from the SVG's embedded rasters (regex
`data:image/(png|jpeg);base64` → decode; identical aspect ratios so the existing
`FigmaCrop` %-transforms still hold). New: `cabinblu-hero-plane.svg` (vector plane,
**clouds removed** — user supplied `Redesign July/airplace.svg`; kept only the aircraft
paths, viewBox `34 2 284 104` with headroom so the tail fin isn't clipped),
`cabinblu-cta-eclipse.png` (ClosingCta bg). The 5 `cabinblu-journey-0X-*.png` composites
(phone + tape + Caveat caption + note box, all baked) were **re-normalised to a uniform
420×572 canvas with the phone bezel centred at the same x** — they shipped 293–347px wide
with the phone off-centre by up to 23px, which `object-contain` scaled inconsistently.

**Component changes (all iterated on user screenshots):**
- **New `components/cabinblu/ClosingCta.tsx`** + `closingCta` in `data/cabinblu.ts` — the
  shared "Why wait? Take the leap…" dark CTA. Instrument Serif, **`!`-prefixed**
  (`!font-[family-name:var(--font-instrument-serif)] !font-normal !text-white`) to beat the
  `.cabinblu h2` scope rule — same dark-scope gotcha as §15/§16/§17. White "Let's Talk?"
  pill → `/contact`, eclipse bg `mix-blend-lighten opacity-[0.14]`.
- **`components/cabinblu/HeroPlane.tsx`** (new client cpt; `Hero` stays a server component) —
  the plane accelerates right, exits the viewport, teleports off the left edge, glides back
  to rest (`x: [0, 1600, -1600, 0]`, `times: [0, 0.42, 0.4201, 1]`, 13s loop, 2.5s
  `repeatDelay`) + gentle y-bob. `prefers-reduced-motion` → static. The 3 decorative hero
  cloud SVGs are separate and stay put.
- **Hero** — headline split into two block spans (line 1 white wraps naturally, line 2 gold
  starts its own line) per Figma `869:8192`; 66px / `tracking-[-0.66px]` / `leading-[73.92px]`
  desktop. Boarding pass fixed to `aspect-[760/284]` + `object-cover` (was a `2.5`-ratio image
  in a `2.68` box → lopsided navy stub). Eyebrow `tracking-[2px]`. **`-mt-14` + `pt-[132px]
  md:pt-[150px]`** so the navy gradient runs under the `sticky top-4` nav (kills the white
  strip — same fix as every other hero).
- **`Eyebrow.tsx`** — added `font-bold`; all section eyebrows (`01 · Context` … `09 ·
  Postcards`) now render JetBrains Mono **Bold** (weight 700 is loaded in `layout.tsx`).
- **`ContextSection`** NDA notice — was `leading-snug` text against a ~28px icon line box, so
  the 🔒 poked above the text. Now icon + text share `leading-[20.15px]` with `items-start`;
  padding/gap/radius matched to Figma `869:8242` (`px-[19px] py-[17px]`, `gap-[14px]`,
  `rounded-[16px]`).
- **`FlightPlan`** — per-card crop **aspect ratios** added (`521/252`, `356/168`, `356/172`,
  `356/102`, `356/115` from Figma `869:8246`) — RQ4/RQ5 were being forced into the taller
  RQ1–3 frame and squashing. Removed the separate `RQ1…RQ5` badge spans (baked into the
  sprite). `FigmaCrop` gained a `style` prop for `aspectRatio`.
- **`RouteSection`** — added the dashed horizontal connector line behind the D0–D14 timeline
  dots (`border-t border-dashed border-[var(--cb-navy)]/25`, dots `relative z-10`, the
  `#eaf2ff` ring masks it). Figma §03 still uses emoji (🧳📓🗂️), not line icons.
- **`Findings`** — all 8 accordion cards `defaultOpen`; the toggle shows a literal `+`
  (collapsed) / `−` (expanded) instead of a rotating dash.
- **`Journey`** — rebuilt to Figma `869:8551`: text col `md:w-[540px]`, phone col
  `md:w-[400px]`, `justify-between`, phones tilted ∓2–3° alternating, uniform `py-[20px]`
  rows. Chips → `rounded-[20px]` + JetBrains Mono **Bold** uppercase `tracking-[0.66px]`
  with the pink/green tokens. Quote boxes: `14/14/4/14` radius, attribution in real
  `--cb-font-mono` (was system monospace). Phone images use the re-normalised 420×572
  composites at `aspect-[420/572]`.
- **`Arrivals`** (§08 Impact) — removed the tinted box behind the 4 illustration crops; the
  bottom stats strip (`cabinblu-impact-illustration.png` = Figma asset `080438_PM_1`) has a
  `09 · SCALE` heading baked into its top, so it's now rendered through `FigmaCrop`
  (`w=121.54 h=176.16 top=-65.21 left=-8.95`, `aspectRatio: 1120/258`) to show only the
  `~40% / ~30% / ~240M` row, per the SVG.

**PIN gate** (`components/cabinblu/PinGate.tsx`, client + `pinGate` copy in `data/cabinblu.ts`)
— the page is public only through `FlightPlan` (`02 · Flight Plan`). `PinGate` renders the 8
remaining sections (Findings → ClosingCta) but, while locked, blurs them (`blur-[8px]
brightness-[0.98]`, `inert`, `aria-hidden`) behind a **sticky-centred boarding-pass PIN card**
+ a `#cdd9ec→#c6d3e8` wash. Correct PIN → `if (cleared) return <LockedSections/>` early-return
(hard swap, content fades in), `sessionStorage["cabinblu-gate-cleared"]="1"` persists it;
wrong PIN → red border + shake (non-reduced-motion) + auto-clear after 900 ms. Validation is
a **single `useEffect` on `[digits]`** that fires when all 6 slots are filled — the earlier
inline-`setState`-then-`setTimeout` approach was cancelling its own timeout on re-render and
never revealed (the "entering PIN does nothing" bug). PIN = `142635`, hardcoded (client-side
soft gate — the locked content ships in the JS bundle and, once mounted, is in the DOM; not
real auth). Card is a pixel match of `Redesign July/Pin Wall.svg` (node `999-118`): plain
`bg-white rounded-[25px]`, `BOARDING PASS - CASE STUDY` + navy `RESTRICTED GATE` pill, plain
dashed divider (`12 12`, no notch cut-outs — an earlier `Pin Design.svg` had them), lock chip
+ `GATE - D0-D14` (`#4888f3`), Circular-Std-bold `Private Case Study`, 6 `#f7f8f9` slots
(`rx 9`, border `#cbd4e6`, focus `#6481dc`) showing the **entered digits directly** (no
masking), `Request PIN` link → `/contact`, `#4b4f66` barcode footer (bar widths lifted from
the SVG). `NAVY`/`LINK` = `#0c2e6a`/`#4888f3`; mono = `--cb-font-mono` (JetBrains).

**Verified** — route `/work/cabinblu` = 200 throughout; SSR HTML carries every public-section
heading + the PIN card, and (post-mount) the locked sections; `cabinblu-cta-eclipse.png`,
`cabinblu-hero-plane.svg` and the journey images all serve 200 via `_next/image`. **PIN flow
tested live in the browser pane**: fresh visit shows the gate, `142635` removes the dialog +
blur and reveals all 9 `<h2>`s, reload keeps it unlocked via sessionStorage, wrong PIN clears
and stays locked. Card geometry/colours audited against the SVG via `getComputedStyle`
(`radius 25px`, `bg #fff`, 0 notches, digits shown verbatim). Figma crops (§02, §08) simulated
with `sharp`.

**Still open:** the browser-pane **screenshot** compositor blanks out on this page (the
`filter: blur()` over the tall locked region — the §9 issue), so the gate was verified by
DOM/computed-style inspection + SVG render comparison, not a pixel screenshot. Mobile/tablet
(§8.4).

---

## 19. OpenSeat case study changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `869-11269` (Portfolio/OpenSeat-Project)
+ `Redesign July/OpenSeat-Project.svg` (**fresh, Aug 28 2026**, 24 MB). OpenSeat is a
**2-week solo product-design sprint** — a location-based social dining app that lets people
broadcast open seats at their table for others to claim. **Bespoke, not templated** (same
call as CabinBlu / WanderLens / Cinefatic / ClassQuest). `get_variable_defs` returns nothing.

**Style** — editorial light, close to the ClassQuest treatment: warm cream `#fbf2e6` page
ground, near-black `#2b2018` ink, one coral accent used sparingly. Hairline `<Separator/>`
between sections.

**Fonts** — added **Manrope** (`--font-manrope`, weights 400–800) to `layout.tsx` via
`next/font/google` — the design's stated brand face ("a warm sans serif … inviting,
menu-like"). The live Figma frame was built with Circular Std as a placeholder, but the
"Font used" spec card demos Manrope, so the page uses **Manrope for every heading + body**
(`.openseat h1..h4` = Manrope 800). Eyebrows/labels reuse **JetBrains Mono**
(`--font-cabinblu-mono`). ClosingCta H2 = Instrument Serif white, `!`-prefixed (same
dark-scope gotcha as §15–18).

**Structure** — `page.tsx` composes, under a `.openseat` scope div: Hero → Context (01) →
Discovery (02) → Persona (03) → Direction (04) → Solution (05) → Journeys (06) → Trust (07) →
KeyScreens (08) → Beacon (09) → Branding (10) → Retro (11) → CaseFooter → ClosingCta, with a
`<Separator/>` between each. Global `NavBar` + `Footer` wrap from `layout.tsx` (the Figma
frame's trailing `Footer - Desktop` == global footer; the "Why wait?" CTA band == `ClosingCta`).
`CaseFooter` = the case-study-specific "Got a seat open on your team?" credit block.

**Scoped system** — `src/app/work/openseat/openseat.css`, all under `.openseat`:
`--os-bg #fbf2e6` · `--os-card #fff` · `--os-tint #f6ead6` · `--os-dark/--os-ink #2b2018` ·
`--os-body #7a6a5a` · `--os-coral #f0603f` · `--os-coral-deep #d14e30` (eyebrow text) ·
`--os-coral-soft #ed7364` (beacon chips) · `--os-sage #71916f` + tint `#e3ebe0` ·
`--os-mustard #e0a23a` + tint `#f8ecd4` · `--os-border rgba(43,32,24,0.15)`.
`.os-eyebrow` carries the coral dot via `::before`. The file also holds the hero
`@keyframes os-fan-*` (see below).

**Section header system (matches SVG exactly).** Every `869:12xxx` section is a
`flex flex-col gap-[18px]` stack: eyebrow (dot + `NN · Name`, mono `#d14e30`, `tracking 1.75px`)
→ **46px Manrope-800 heading** (`tracking-[-0.46px]`, `w-full`, left-aligned, flush with the
eyebrow) → 15px `leading-[24px]` sub, all at the full **1172px** content column. `SectionHead`
in `Bits.tsx` is this block; it has **no `narrow` mode** (an early version clamped headings to
`max-w-[720px]` — that was the bug the user flagged). Deviations, all from the SVG:
- **§07 Trust** — content column is **1024px**, not 1172. `Section` takes `width="narrow"`.
- **§09 Beacon** — heading is **48px** (`-0.48px`) inside its **521px** left column; phone right.
- **CaseFooter** — heading is **44px** (`-0.44px`), full-width *above* a row of
  `[role chips (border `rgba(43,32,24,0.32)`, `rounded-full`) | right-aligned mono meta]`.

**Section notes**
- **§01 Context** — eyebrow + full-width h2, then a `flex items-center gap-[48px]` row: a
  **fixed `md:w-[643px]`** left column (15px intro + white "core friction / opportunity" card
  `p-[33px]` + dark "design brief" card `p-[34px]`, `gap-[18px]`) and the city illustration in
  the ~481px right column (`max-w-[481px]`), vertically centred against the text block.
- **§02 Discovery** — 3 stat cards (middle one dark `#2b2018`, number in mustard), then the
  pull-quote in a `border-y py-[45px]` band with a 96px Instrument-Serif quote mark.
- **§03 Persona** — nested `bg-white/70 p-[7px]` → `bg-coral/12` "Persona" tab pill, then the
  full-bleed persona board image (`rounded-[16px]`).
- **§06 Journeys / §08 KeyScreens / §09 Beacon** — phones use `Phone` (Bits.tsx), a CSS
  iPhone bezel wrapping a raw portrait screen export.

**Hero phone trio + "paper fan" animation.** `components/openseat/HeroPhones.tsx`: an
absolutely-positioned **688×548 stage** where the three phones overlap in a tight
hand-of-cards fan — side phones tucked *behind* the centre one (~74px overlap each side,
dropped 24px, rotated ∓9°), matched to Figma `869:12213`. The stage scales to its column with
a **pure-CSS container-query transform** (`scale(min(1, 100cqw / 688px))`; wrapper is
`[container-type:inline-size]` + `aspect-ratio`) — no JS measurement, no overflow at any
width. The fan-open on load is **pure CSS** (`@keyframes os-fan-{left,right,center}` in
`openseat.css`, staggered 0 / .18s / .32s). The *resting* transforms are the final fanned
layout, so the hero is correct with JS off and under `prefers-reduced-motion` (media query
kills the anim). Framer Motion was tried first and dropped — it SSR-renders the collapsed
`initial` state, which would strand the phones stacked if hydration lagged.

**Components** (`src/components/openseat/`) — `Bits.tsx` (`RichText` `**bold**`, `Section`
w/ `width` prop, `Separator`, `Eyebrow`, `SectionHead`, `Phone`), `HeroPhones.tsx`, one
component per section. Copy in `src/data/openseat.ts` (verbatim from Figma, reuse approved §7).

**Assets** — `public/images/openseat/` (10 files). Six raw app screens (no bezel) pulled from
`get_design_context` asset URLs: `os-radar` / `os-vibe` / `os-ticket` / `os-confirmed` /
`os-profile` / `os-beacon`. Four illustrations extracted as embedded rasters from the SVG
(regex `data:image/(png|jpeg);base64`): `city.png` (Context hillside city), `persona.png`
(Alex Stein board — baked-in "Persona" title bar cropped off), `logo.png` (chair + signal app
icon, centre-cropped from a wide sheet), `cta-bg.png` (dark eclipse for ClosingCta).

**Verified** — `next build` clean (`/work/openseat` prerenders static). On a throwaway
`next start`: route 200; SSR carries all section headings + CaseFooter; all 10 `_next/image`
serve 200; Manrope 800 loaded; `.openseat` bg `#fbf2e6`; no horizontal overflow 375–1440px;
`getBoundingClientRect` confirms every heading 46/48/44px, left-aligned flush with its
eyebrow, Trust column 1024, hero fan overlaps symmetric (74px, z-order 10/10/20).

**Still open:** in-browser visual QA — screenshot tool + browser-pane compositing down all
session (§9), so everything was checked structurally, NOT eyeballed live; the hero fan-open
animation in particular was never seen play (the dead pane freezes the CSS animation clock).
User should eyeball the hero fan + its animation, the phone grids, and the persona-board crop.
Mobile/tablet (§8.4). `/work/openseat` is already linked from the `/work` index (`work.ts`
had the slug).

---

## 20. Site-wide custom cursor (Aug 2026)

User asked for the Work page's hand-drawn pointer (§14) on **every page**, replacing the
system cursor. Done:

- **`src/components/ui/SiteCursor.tsx`** (new, client) — mounted once in `layout.tsx` `<body>`.
  Generalised from the deleted `work/WorkCursor.tsx`: no scope gate, follows the pointer on
  every route, rAF-throttled, `pointerdown` also updates position. On mount (fine pointers
  only) it adds `.has-custom-cursor` to `<html>` and removes it on unmount.
- **`globals.css`** — `@media (min-width:768px){ .has-custom-cursor, .has-custom-cursor *,
  ::before, ::after { cursor: none !important } }`. Guarded by both the JS `(pointer: fine)`
  check (class only added then) and the `min-width` (matches `SiteCursor`'s `md:` visibility).
  Touch + no-JS keep the native cursor. **Text inputs also lose the I-beam** — the blinking
  caret still shows on focus; revisit if the Contact form feels wrong.
- **`[data-hover-note]`** anywhere on the site makes the cursor trail that element's
  `font-hand` caption (Work cards set it; any future page can).
- Removed from `work/page.tsx`: `<WorkCursor/>` + `md:cursor-none`; `WorkCard` lost
  `md:cursor-none`. `data-work-scope` left in place but now vestigial.
- The Home hero `RoamingCursor` badges are unaffected — different feature (auto-drifting
  decorative annotations, not the pointer).

**Verified** — `/`, `/work`, `/about` return 200, globals CSS chunk contains the
`.has-custom-cursor …{cursor:none}` rule, SSR HTML carries the `z-[9999]` cursor container.
Not eyeballed (browser pane can't reach the running server; screenshot tool down — §9).

---

## 21. Glass NavBar (Aug 2026)

`components/layout/NavBar.tsx` — user: "the main nav should be glass, you made it very 2d."
Rebuilt to match `Redesign July/main nav.svg` (440×88; nav rect `y18 h52 rx14`
`#1C1C1C`/0.88 + `backdrop-filter: blur(5px)`; Say-hi button `91×37 rx10` `#454545` + 3
white inner shadows + `#0D0D0D`/0.2 edge; links "Home" full white, "About"/"Work" white/0.6;
`corner-down-right` icon before "Say hi").

- **Glass:** `bg-[#1c1c1c]/75 backdrop-blur-xl backdrop-saturate-150 rounded-[14px]
  border border-white/[0.08]` + soft drop shadow. The **root cause of the "2d" look was the
  old `/95` opacity** — nearly opaque, so the blur did nothing. Dropped to `/75`.
- **Active route:** `usePathname()` → `aria-current="page"`, active link `text-white`,
  others `text-white/60 hover:text-white`. (`/` exact; others `startsWith`.)
- **Say hi button:** `bg-white/[0.14]` + `border-[#0d0d0d]/20` + inset white top-glow
  `shadow-[inset_0_10px_18px_-3px_rgba(255,255,255,0.14),…]` (soft-UI glass chip, same
  vocabulary as `--shadow-pill` minus the drop layers).
- **Arrow hover:** inline `corner-down-right` SVG (lucide path), 15px, `stroke-[1.75]`;
  on `group-hover/hi` it does `-rotate-12 translate-x-[3px]` with a back-ease
  (`cubic-bezier(0.34,1.56,0.64,1)`) for a little overshoot "turn".
- **Fonts:** rendered `main nav.svg` to PNG — the name "Sohaib Bin Kamran" is **Instrument
  Serif** (`font-serif text-[15px]`, matches the footer's use of the same string); links +
  "Say hi" are Satoshi-ish but kept on the existing `font-ui` inherit (user only asked to
  fix the name). **Superseded Sep 2026 (§26): the whole nav, name included, moved to
  `font-sans` (Satoshi).**

Every page picks this up (shared component).

**Nav height changed** — the rebuilt pill is **~50px** tall (`py-2` + the `Say hi` chip +
1px border). Pages that pull their hero art up under the `sticky top-4` nav need
**`-mt-16` (64px)**, not `-mt-12`/`-mt-14` — 48px left a ~2px light strip once the nav grew.
Home's `Hero.tsx` was bumped to `-mt-16` (+ sky div `-top-px h-[800px]`). **Check the top
edge on About (`-mt-12`), Work (`-mt-12`), OpenSeat (`-mt-14`) and bump to `-mt-16` if a
sliver shows** — those pages weren't re-touched here.

**Verified** — `/`, `/work`, `/about` = 200, compiled clean, SSR HTML carries the new
classes + `aria-current="page"` on the right link per route. Not eyeballed (browser pane
can't reach the server; screenshot tool down — §9) — user to check the blur + arrow hover
+ the Home top edge.

---

## 22. Contact page changelog (Aug 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `968-1662` (Portfolio/GetInTouch) +
`Redesign July/GetInTouch.svg` (fresh, Aug 28 2026). Net-new page. Single section —
global `NavBar` + `Footer` wrap from `layout.tsx` (the Figma frame's trailing
`Footer - Desktop` **is** the global footer, already redesigned §12; not rebuilt). The
NavBar "Say hi" chip already pointed at `/contact`.

**Structure** — `src/app/contact/page.tsx` (server, `export const metadata`) renders
`components/contact/ContactHero.tsx` (server) which contains `ContactForm.tsx` (client).
Copy in `src/data/contact.ts`.

**ContactHero** — dark `bg-bg-dark` section, `-mt-16` under the sticky nav, `pt-[150px]
pb-[100px]`, `overflow-clip`, dashed bottom hairline (`border-white/[0.12]`). Background =
two stacked `next/image fill` layers over the dark ground: `contact-glow.png`
(`opacity-45 mix-blend-overlay`) + `contact-clouds.jpg` (`opacity-45 mix-blend-luminosity`
+ a radial `mask-image` that hides the clouds near top-centre and reveals them at the
edges — traced from the Figma `BG:mask` radial gradient). Content stack (`gap-14`):
"Available Now!" orange pill (`#ff542e`/`#fa532d` border, 5px white dot, orange glow
shadow), `Get in Touch!` (Instrument Serif 44px white), intro paragraph (18px white/60,
max-w-560), then the form, then "Or email me directly" (Instrument Serif 28px) + a
`#212121` mail chip (`mailto:`, lucide mail glyph, inset white-glow shadow).

**ContactForm** (client) — cream `bg-bg-cream rounded-[16px]` card, Name + Company row
(`sm:flex-row`), then Email (full-width, `type=email`), then Message textarea, dark
full-width Submit. Fields: `bg-[rgba(187,187,187,0.15)]` `border-[rgba(136,136,136,0.1)]`
`rounded-[10px]`, `placeholder:text-[#999]`. Native `required` gates submit. **Submission
(open-Q 2, resolved):** POSTs `FormData` to `https://api.web3forms.com/submit` with
`access_key` = `NEXT_PUBLIC_WEB3FORMS_KEY` + a hidden `botcheck` honeypot; Web3Forms emails
the entry to Sohaib. On `{success:true}` the card swaps for a "Message sent" panel and
`form.reset()`s; on failure → inline error pointing at the direct-email chip. No mail client
opens, no server code. If the key is missing it logs + shows the error state.

**Assets** — `public/images/contact/` (2): `contact-clouds.jpg` (grayscale painterly
coast, 1800w, from the SVG's embedded jpeg) + `contact-glow.png` (warm eclipse glow,
1440w, from the SVG's embedded png). The SVG's 3rd raster (256² `sbk.` mark) was skipped —
global footer handles it.

**Verified (Aug 2026, live in-browser)** — killed the stale cross-chat `:3000` server,
ran this session's own on `:3000`, drove `/contact` in the browser pane: page renders
correctly (screenshotted — dark hero, orange "Available Now!" pill, cream form card,
"Or email me directly" chip), `.env.local` key + `api.web3forms.com/submit` confirmed
inlined in the client chunk, and a real test submission returned `success:true` → the
"Message sent" panel rendered. No console errors. Mobile/tablet (§8.4) not yet checked —
form row collapses at `sm`, rest is centred.

**Env** — `.env.local` holds `NEXT_PUBLIC_WEB3FORMS_KEY=8d8aeb15-…ca71` (gitignored). For
CI the key is set inline in `.github/workflows/deploy.yml` (public by design — scoped to the
destination email on web3forms.com). Live and working in production.

**Deviations from Figma** — the Figma form is 3 fields (Name / Company / Message); added a
required **Email** field (full-width, between the Name+Company row and Message) so replies
are possible, matching what the old Framer form captured. The card bg is `bg-bg-cream`
(`#fcf9f5`) vs the SVG's `#fbf9f5` — within §5's "close enough" note.

**Confirmed working (Aug 2026)** — user verified a test submission landed in their inbox.
End-to-end: browser → Web3Forms → email delivered.

**Still open** — Mobile/tablet (§8.4). Optional: route submissions + the visible "Or email
me directly" address through a `hello@<godaddy-domain>` forwarder instead of the personal Gmail.

---

## 23. Deployment (Sep 2026)

**Live: https://sohaibbinkamran.com** — GitHub Pages, static export, off Framer.

- **Repo:** `github.com/SohaibBinKamran/portfolio` (public). `git` + `gh` CLI authenticated
  on the user's machine (gh keyring, account `SohaibBinKamran`).
- **Pipeline:** `.github/workflows/deploy.yml` — on push to `main`: `npm install` (not
  `npm ci` — the Windows-generated lockfile omits Linux-only optional native deps),
  `npm run build`, `actions/deploy-pages`. ~40s end to end.
- **Static export:** `next.config.ts` has `output: "export"`, `trailingSlash: true`,
  `images: { unoptimized: true }`. `public/CNAME` = `sohaibbinkamran.com`, `public/.nojekyll`.
- **DNS (GoDaddy):** apex `A` → 185.199.108–111.153; `www` `CNAME` → `sohaibbinkamran.github.io`.
  Domain removed from the old Framer project. HTTPS enforced (Let's Encrypt via GitHub).
- **`.claude/` is gitignored.** `.env*` is gitignored (see §22 for the CI key).
- Build-blocker fixed to ship: `PinGate.tsx` had a TS error (`status !== "success"` guard
  narrowed away later `=== "success"` checks) → changed to `!cleared`. Added `metadataBase`
  to `layout.tsx`.

**Analytics:** Hotjar (site `6532500`) — inline `<Script id="hotjar" strategy="afterInteractive">`
in `layout.tsx`, loads site-wide. Verified live in the served HTML.

**Favicon:** the `sbk.` handwritten mark (`public/images/sbk-logo.png`, same as the footer).
`src/app/icon.png` (128², transparent) + `src/app/apple-icon.png` (180², white bg) via the
Next file convention — the default `favicon.ico` was deleted. Regenerate with sharp: `trim()`
the source, contain into ~72% of the canvas, center.

**To update the site:** edit, commit, `git push`. Deploy is automatic.

---

## 24. Xoopah case study changelog (Sep 2026)

Built from Figma `MXxffOc1fNdTbvUBfEVA1z` node `1050-16034` (Portfolio/Xoopah-Overview).
Xoopah is a **CRM/ops web platform for small businesses** — unifying DMs, orders, reviews and
payments into one dashboard. **Bespoke, not templated** (same call as every other case study —
§6/§8.3). `get_variable_defs` returns nothing. This closes out the `/work` lineup — all six
projects (CabinBlu, Cinefatic, ClassQuest, WanderLens, OpenSeat, Xoopah) now have a built case
study; `work.ts`'s `underConstruction` flag on Xoopah was removed.

**Style** — calm, confident "hustle" purple system: deep-purple gradient hero/CTA bookends,
white/lavender content sections, a mint-green + pink accent pair. Headings use Circular Std
Bold (`--font-cabinblu-sans`, already loaded); eyebrows/labels use JetBrains Mono
(`--font-cabinblu-mono`). Figma's `get_design_context` names Fraunces as the heading font —
ignored, same as the ClassQuest/OpenSeat note (§17/§19): the real rendered spans are Circular
Std. **No new fonts added to `layout.tsx`.**

**Structure** — `page.tsx` composes, under a `.xoopah` scope div: Hero → Problem → Persona →
Landscape → Brand → Process → Gallery → Close → ClosingCta. The Figma frame's top-level
children are actually three siblings on the canvas — the main content frame ("Xoopah Final",
containing Hero through the small "Xoopah — Web Platform Case Study" credit line), a "CTA"
frame, and a "Container > Footer - Desktop" frame — confirmed by unescaping `get_metadata`'s
XML dump and checking indentation depth (`node -e` script, not visible from the rendered tree
alone). The "CTA" frame is pixel-identical to every other case study's shared "Why wait? Take
the leap..." `ClosingCta` (same copy, same `#121212` bg, same white pill) — reused verbatim
from `components/openseat/ClosingCta.tsx`. "Footer - Desktop" is the global site footer,
already handled by `layout.tsx` — not rebuilt. The tiny "Footer" node (69px tall, one text
line, "Xoopah — Web Platform Case Study") was initially built as a `CaseFooter.tsx` credit
strip between Close and ClosingCta, then **removed on user feedback** (§24.1) — it read as a
stray white band with no content value between the two dark sections.

**Scoped system** — `src/app/work/xoopah/xoopah.css`, all under `.xoopah`:
`--xo-bg #fff` · `--xo-tint #f5f0fc` (lavender section wash) · `--xo-dark #4e2e8f` ·
`--xo-ink #241338` (headings) · `--xo-body #4a3a63` · `--xo-muted #6b5a8a` ·
`--xo-purple #8155c9` (primary accent) · `--xo-purple-deep #4e2e8f` · `--xo-mint #4bea5e`
(Spark Mint) · `--xo-pink #ffb9e8` (Spark Pink) · `--xo-border rgba(36,19,56,0.14)`.
`.xo-eyebrow` carries the dash divider via `::before`. Section rhythm `py-16 md:py-[88px]`,
content `max-w-[1120px]` (Figma's content col).

**Dark-section headings** — same gotcha as every prior case study (§15–19): `.xoopah h1..h4`
sets `color: var(--xo-ink)` at specificity (0,1,0), which beats a plain `text-white` Tailwind
utility (same specificity, but the scoped stylesheet loads after Tailwind's). Hero's `<h1>` and
the Landscape/Close dark-panel headings all needed **`!text-white`** — caught by a live browser
screenshot showing black-on-purple hero text on the first pass, fixed immediately.

**Components** (`src/components/xoopah/`) — `Bits.tsx` (`Section` w/ `tint` prop, `Eyebrow`,
`SplitHeading` — two-tone heading with a configurable `accentIndex`, since Process's heading
accents its *middle* span while every other section accents its *last*), `Hero.tsx` (radial
purple-gradient hero, browser-chrome dashboard mockup, 4 rotated floating stat cards
absolutely positioned around it — hidden below `sm` to avoid mobile clutter), `Problem.tsx`
(5 rotated sticky-note cards), `Persona.tsx` (Gwen Stacy card + goals/frustrations pill rows +
4 driver progress bars), `Landscape.tsx` (dark rounded panel, 5 pill badges with real Figma
icon SVGs), `Brand.tsx` (palette swatches + type specimen card), `Process.tsx` (3-step
sketch → wireframe → final, arrow separators), `Gallery.tsx` (6 rotated product-screenshot
cards, "Six Jobs. One Platform."), `Close.tsx` (purple-gradient stat band), `ClosingCta.tsx`
(copy-pasted from OpenSeat's, since the Figma CTA frame is identical). Copy in
`src/data/xoopah.ts` (verbatim from Figma, reuse approved §7). `CaseFooter.tsx` and its
`caseFooter` data export existed briefly and were deleted — see §24.1.

**Assets** — `public/images/xoopah/` (22 files): 12 raster images pulled from
`get_design_context` asset URLs and downscaled with `sharp` (hero dashboard screenshot,
persona photo, 3 process-step images, 6 gallery product screenshots, 1 CTA glow eclipse — same
`sharp` + temp-file-then-rename pattern as prior passes, since writing straight over the
source file mid-stream threw an `UNKNOWN` fs error on Windows); 10 small decorative SVGs kept
at native size and referenced directly by `<img>` (hero corner-badge icons, Landscape's 5
category icons) — these are simple, exportable Figma vectors, not redrawn.

**Verified (Sep 2026, live in-browser)** — `next dev` on this session's own `:3000`; `/work/xoopah/`
= 200, SSR text carries every section's copy (checked via `get_page_text`); all 22 images load
200 (confirmed via `read_network_requests` — `next.config.ts`'s `images.unoptimized` means they
serve as raw `/images/xoopah/*` requests, not through `/_next/image`, so a direct `_next/image`
curl check isn't meaningful here); no console errors; no horizontal overflow at 1280px. The
Hero's white-heading fix (above) was caught and confirmed via a live screenshot. `/work` index's
Xoopah card now links to a real page (verified by clicking through in-browser) instead of
rendering the grayed-out "Under Construction" state.

**Known env quirk hit again:** screenshots taken after `window.scrollTo` to a non-zero offset
came back blank white (compositor issue, not a code bug — matches §9's documented flakiness);
confirmed the affected sections render correctly via `getComputedStyle`/`getBoundingClientRect`
checks and `get_page_text` instead. Top-of-page screenshots worked fine throughout.

**Still open:** visual QA beyond the hero (scrolled sections checked structurally, not by eye
live, per the quirk above — user should eyeball Persona, Landscape, Brand, Process, Gallery);
mobile/tablet (§8.4) for this page's own sections. (The site-wide `NavBar` overflow flagged
here was fixed Sep 2026 — see §26.)

### 24.1 Follow-up fixes (Sep 2026)

**Removed the CaseFooter credit strip.** User flagged it as a stray white band (with the
"XOOPAH — WEB PLATFORM CASE STUDY" text) sitting between the purple Close section and the dark
ClosingCta — screenshotted and asked for it to go. Deleted `components/xoopah/CaseFooter.tsx`,
its `<CaseFooter />` usage in `page.tsx`, and the now-unused `caseFooter` export in
`data/xoopah.ts`. Verified via `getBoundingClientRect` that Close's bottom edge and ClosingCta's
top edge now sit at the same y (zero gap) — the page.tsx flow is now Hero → Problem → Persona →
Landscape → Brand → Process → Gallery → Close → ClosingCta, matching the list above.

**Typography audit against Figma.** User asked to match font properties site-wide on this page
against the Figma spec. Went back through every `get_design_context` response for the page and
compared font-size/line-height/letter-spacing/weight against what shipped. Most of the page was
already correct (Circular Std Bold headings, Book body, JetBrains Mono labels — all forced by
the shared `.xoopah h1..h4` rule and per-element classes), but found and fixed real mismatches:

- **Hero `<h1>`** — was capped at `md:text-[64px]`, Figma is `72px`; added an `lg:text-[72px]`
  step and corrected `leading-[1.05]` → `leading-[1.03]` (Figma's `74.16/72`). Also dropped a
  dead `tracking-[-0.02em]` class — the scoped `.xoopah h1..h4 { letter-spacing: -0.01em }` rule
  already wins on specificity over any plain Tailwind tracking utility on a heading, and `-1%`
  is the exact ratio every Figma heading in this file actually uses (`-0.42/42`, `-0.72/72`,
  `-0.44/44` all reduce to `0.01`), so the override was inert but is worth knowing about if a
  future heading here ever needs a *different* ratio — it'll need `!tracking-[...]`.
- **Letter-spacing ratio mismatches** (component used a plausible-looking value that didn't
  match the source): Hero stat labels `0.03em → 0.05em`; Persona card role `0.03em → 0.05em`
  and the Goals/Frustrations/What-drives-her mono labels `0.04em → 0.08em`; Landscape pill
  badges `0.01em → 0.03em`; Brand's two specimen labels `0.04em → 0.08em`; Process step numbers
  (01/02/03) `0.03em → 0.06em`; Close's stat labels `0.03em → 0.05em`. Each was derived by
  dividing Figma's `tracking-[Npx]` by its `text-[Mpx]` from the original `get_design_context`
  output and converting to the matching `em` value.
- **Line-height**: Hero stat-card value (`3,351`, `35`, …) had no explicit `leading-*`, so it
  inherited the browser default (~1.2) against Figma's tight `19/19 = 1` — added `leading-[1]`.
  Persona card body copy `leading-[1.5] → leading-[1.55]` (Figma `20.93/13.5`). Brand's display
  specimen ("Grow the business.") `leading-[1.15] → leading-[1.1]` (Figma `33/30`).
- Verified the fixes with `getComputedStyle` in a live browser session rather than trusting the
  source diff alone — confirmed `<h1>` computes to exactly `72px` / `-0.72px` / `74.16px` /
  `700`, and spot-checked the persona role, Goals label, and step-01 number all resolve to the
  precise Figma `letter-spacing` px value.

**Still open:** the same visual-QA gap as above — the letter-spacing/line-height fixes were
verified via computed styles, not by eye, for the sections below the hero fold.

---

## 25. Travel & Photography + Aerial Mode (Sep 2026)

**Not a Figma page.** Built from scratch across a long iterative session directly with the
user — no design spec, no node ID to match. Route: `/travel-photography` (renamed mid-build
from `/photography` — nothing was live yet, so the URL itself changed, not just the label).

**Homepage teaser** — `components/home/OffDuty.tsx`, a new section between `Process` and
`ClosingCta`. "Beyond the pixels" eyebrow, "Same eye, no design system." heading, and a
fanned three-print polaroid stack (`framer-motion` `whileHover` variants) that spreads wider
on hover like a hand of photos opening. The three prints are a fixed, deliberately curated
trio pulled by id (`STACK_IDS = ["berlin-08", "madrid-05", "baku-02"]`) — one per country —
not `photography.slice(0, 3)`, which would've been three Baku photos in a row since the data
is ordered alphabetically by city.

**The full roll** — `app/travel-photography/page.tsx` + `components/photography/MasonryWall.tsx`
+ `Lightbox.tsx`. A real CSS-columns masonry grid; the whole card (not just the image) scales
and lifts `z-index` on hover so it visibly pops over its neighbours. Click opens `Lightbox.tsx`
— a "film mount" treatment (black border, inset shadow) with `roll` (the country) printed
bottom-left and `location` (the city) bottom-right, mono, like a contact-sheet stamp. The
frame's aspect ratio follows each photo's own shape (`landscape`/`portrait`/`square` buckets
in the data) rather than forcing every photo into one fixed box — most of these are portrait
phone shots, so a fixed landscape frame would've cropped heavily.

**`data/photography.ts`** — 63 real photos across 9 cities (Baku, Berlin, Cologne, Dortmund,
Karachi, Lahore, Madrid, Palma de Mallorca, Siegen). `Photo.src`/`swatch`/`date` are all
optional: `src` (a real `/images/photography/*.webp` path) is preferred wherever set, `swatch`
(a CSS gradient) is the fallback for a photo that doesn't exist yet, and `date` is left off
entirely rather than fabricated — EXIF (including capture date) didn't survive the original
HEIC → JPEG conversion. Add real dates back per-photo only if the user supplies them.

**Format history, in order:**
1. User dropped 63 originals into `public/images/photography/` — a mix of `.jpg` and
   `.HEIC` (iPhone), one `.MOV` (skipped — video, not a photo).
2. `sharp` could read HEIC *metadata* but not decode the pixel data — `"Support for this
   compression format has not been built in"` (the prebuilt libvips binary lacks the HEVC
   codec). Fixed with `heic-convert` (a WASM libheif decoder, `npm install --no-save` — a
   one-time conversion tool, never added to `package.json`; re-install it temporarily if more
   HEIC photos ever need converting) piped into `sharp` for a `.rotate()` (real EXIF
   auto-orient) + resize (2200px long edge) + `.jpeg({ quality: 82, mozjpeg: true })` pass.
   Renamed to a clean `city-01.jpg` scheme in the process.
3. **(This pass, Sep 2026)** User re-encoded all 63 `.jpg` → `.webp` themselves and replaced
   them in place, same filenames. `data/photography.ts` updated (all 63 `src` paths) to
   match — a straight extension swap, no other changes needed since `next.config.ts` already
   has `images.unoptimized: true` (static export), so these serve as plain `<img>` requests
   either way; `.webp` needed no config change.

**Aerial Mode** — `components/travel/AerialMode.tsx`, opened from a small "Aerial Mode"
button on `/travel-photography` (placed right after the intro paragraph, back-arrow-before-
title to close rather than a corner ✕ — a corner ✕ collided with the country/city/frame
stat numbers in the same corner). A full-screen WebGL globe of every place visited, built by
porting a working prototype (iterated live as a published Claude Artifact first) into the
real codebase as an actual React component:

- **`three` is a real dependency now** (`npm install three` + `@types/three` as a dev dep —
  modern three.js ships no bundled `.d.ts`). Not a CDN script tag like the prototype used.
- **`data/places.ts`** — 23 real places, 6 countries (Saudi Arabia, Pakistan, Spain, Germany,
  Czechia, Azerbaijan), approximate public lat/lon per city, grouped by `trip` (same-trip
  cities get a thin connecting line on the globe). Cross-referenced against
  `data/photography.ts` by matching `location`: a pin shows a real photo-count badge and
  opens a real slideshow where photos exist (9 of the 23 cities); the other 14 get an honest
  "Nothing here yet" empty state instead of a fabricated one.
- **The globe itself** — `public/images/earth-texture.jpg`, the same real-Earth equirectangular
  texture Three.js's own official examples ship with (not a Figma asset, not hand-painted — an
  earlier hand-painted-continents version was tried and rejected by the user as looking
  "painted by a kid"). `MeshPhongMaterial` + ambient/directional lights, a faint lat/long
  graticule overlay, a soft backface atmosphere-glow shell.
- **Pins** — small red blinking beacons (each on its own out-of-sync phase), not the site's
  usual lime accent — deliberately small and deliberately *not* auto-spread apart. An earlier
  version auto-declustered tightly-packed real-world pins (e.g. the Islamabad/Kashmir/
  Balakot/Mansehra/Murree cluster, all within ~110km of each other) into a small rosette —
  reverted after it physically misplaced Lahore's dot across the India border, since Lahore
  sits only ~24km from it. **Every pin is now at its exact true lat/lon, full stop** — clutter
  is handled by keeping beacons small and by scroll-to-zoom, never by moving a pin's position.
- **Sky** — four layers of twinkling stars (each layer's opacity on its own sine, so the
  shimmer isn't synchronized), a tilted galactic band (points biased toward a plane, purple/
  lime/white tint), and a small pool of shooting stars firing on a random 2.5–8.5s interval.
  Lives in its own `skyGroup` (separate from the globe's rotation group) so dragging the
  Earth never drags the sky with it.
- **Interaction** — drag-to-rotate with real momentum, scroll-to-zoom (clamped, eased), a
  pause/resume toggle for the idle auto-spin, freezes entirely (spin + momentum) while a
  location popup is open. Uses the site's own hand-drawn `CursorArrow`/`SiteCursor` — no
  separate cursor was built for this page. **Pinch-to-zoom on touch (Sep 2026, §26)** — the
  original build only wired `wheel` for zoom; single-finger drag-to-rotate worked on touch
  for free (Pointer Events unify mouse/touch), but a second simultaneous finger had no
  handler, so mobile users could rotate but never zoom.
- **Colour fix** — the same texture + lights rendered noticeably flatter here than in the
  prototype. Real cause: the prototype ran on an old Three.js build (r128, loaded via CDN)
  with a naive, non-colour-managed rendering pipeline that happened to look punchier; this
  build runs current Three.js (0.186), whose *correct* colour-managed pipeline is more
  physically accurate but reads duller for the same inputs. Not a bug to fix internally —
  fixed with a CSS filter directly on the canvas element
  (`saturate(1.55) contrast(1.08) brightness(1.04)`), which reliably punches the output back
  up regardless of the internal colour-space math.

**Verification** — every pass type-checked clean (`npx tsc --noEmit`) and a full
`npm run build` (static export) was run after each substantive change, not just `next dev`.
The click-to-open-popup raycasting was hard to verify by driving a real click through the
automation tooling (the beacons are genuinely small, by design) — confirmed correct instead
by temporarily exposing the scene/camera/raycaster on `window` and reproducing the exact
click math directly in the console, then removing the debug hook before shipping.

---

## 26. Mobile NavBar + Aerial Mode touch/layout fixes (Sep 2026)

User reported the site "not optimized as responsive" on mobile and asked to see the problem
first. Driving the Browser pane at 375×812 (the screenshot tool worked fine this session —
§9's flakiness isn't universal) found the root cause: `NavBar` (§21) had **zero breakpoint
logic** — one flex row carrying the full name, all 4 links, and the "Say hi" button, no
hamburger. At 375px that row needs ~428px, so `document.documentElement.scrollWidth` (428)
exceeded `clientWidth` (375): the name clipped off the left edge, "Travel & Photography"
wrapped awkwardly, "Say hi" pushed toward/past the right edge. Every other Home section
reflowed fine (they already had responsive classes) — this was a `NavBar`-only gap, matching
the "pre-existing site-wide NavBar overflow" noted in passing across §15–24.

**Fix** (`components/layout/NavBar.tsx`):
- Below `md`: name collapses to **"SBK"**, the 4 links + "Say hi" hide, a hamburger button
  (`md:hidden`) toggles a dropdown panel (`absolute … top-[calc(100%+8px)]`, same glass
  treatment as the pill) listing all 4 links + "Say hi" stacked. Closes on route change
  (`useEffect` on `pathname`) and locks `document.body.style.overflow` while open, same
  pattern as `AerialMode`'s overlay lock.
- `md:flex` / `hidden md:flex` gate the desktop link row and "Say hi" chip — unchanged above
  `md`, so the existing glass-pill nav (§21) is untouched on desktop.
- **Font follow-up** (user caught it from a screenshot): the name span was still
  `font-serif` (Instrument Serif) — moved to `font-sans` (Satoshi) along with the rest of the
  nav, which had already been switched from `font-ui` (Inter) to `font-sans` earlier in this
  pass per a direct ask ("make Satoshi for the nav bar, mobile and desktop"). §21's "name is
  Instrument Serif" note is now stale — see the strikethrough there.
- **Alignment follow-up** (user design question, answered then actioned): the mobile pill +
  hamburger were still centred (`flex justify-center` on the `<header>`, inherited from
  desktop). Changed to `justify-start md:justify-center` — a small centred pill floating alone
  read as orphaned on a phone screen; left-aligned logo + hamburger is the expected mobile
  pattern and gives it a clearer anchor. Desktop keeps the centred pill unchanged.
- Verified live at 375×812: `scrollWidth === clientWidth === 375` (no overflow), hamburger
  opens/closes, dropdown links navigate + close the menu, `getComputedStyle(nav).fontFamily`
  resolves to `Satoshi, Inter, "Inter Fallback", sans-serif`. Desktop re-checked unchanged
  after every edit (still centred, still Instrument-Serif-free).

**Aerial Mode pinch-zoom** (`components/travel/AerialMode.tsx`, §25) — separately reported by
the user: "the user cannot pinch the earth to zoom out or zoom in." Cause: zoom was wired only
to the `wheel` event (desktop mice/trackpads); rotation used Pointer Events, which unify
mouse/touch/pen, so single-finger drag-to-rotate worked on touch for free, but nothing tracked
a *second* simultaneous pointer, so pinch had no effect and the browser's default touch-action
was free to hijack the gesture as a page zoom instead.

- Added an `activeTouches` map keyed by `pointerId`, populated on `pointerdown` /
  `pointermove` / `pointerup` / `pointercancel` (filtered to `pointerType === "touch"`). When
  a second touch joins, drag-rotation is suspended (`dragging = false`) and the distance
  between the two touch points is tracked; subsequent moves scale `camTargetDist` by
  `pinchStartDist / currentDist`, clamped to the same `ZOOM_MIN`/`ZOOM_MAX` the wheel handler
  uses — same zoom variable, two input paths.
- Added `touch-none` (CSS `touch-action: none`) to the stage `<div>` so the browser doesn't
  intercept the second finger for its own native pinch-zoom before the JS handler sees it.
- Updated the on-screen hint copy: "SCROLL TO ZOOM" → "SCROLL / PINCH TO ZOOM".
- Verified by dispatching synthetic two-pointer `PointerEvent`s (`pointerType: "touch"`)
  through `javascript_tool` — the real gesture can't be driven through the automation tooling,
  but this exercises the exact same event listeners a real pinch would. Confirmed both
  directions: fingers moving apart zoomed in (globe filled the viewport), fingers moving
  together zoomed back out (visible curvature returned) — screenshotted before/after each.

### 26.1 Aerial Mode overlay chrome — mobile layout (Sep 2026)

Both header blocks in the overlay chrome (`GlobeOverlay` in `AerialMode.tsx`) were built
`absolute left-8/right-8 top-7` with no breakpoint — fine on desktop's wide top edge, broken
at 375px: "Aerial Mode"/"Everywhere I've been" (left) and the 6/23/63 stat trio (right) sat
close enough to collide, and a screenshot from the user's own phone confirmed it. Fixed in
two rounds, both screenshotted live on the user's device:

- **Round 1 (rejected approach):** tried reflowing the stats into a horizontal row *below*
  the title on narrow screens (`flex-col` outer wrapper) — this cleared the collision but the
  user didn't want the stats leaving the corner or changing shape.
- **Round 2 (shipped):** kept both blocks pinned to their own absolute corner
  (`left-4`/`right-4 top-4`, widening to `sm:left-8`/`sm:right-8 sm:top-7`, unchanged from the
  original desktop values) — no reflow between them needed once the *right* block stopped
  needing full row width. Each stat kept its original structure and size exactly
  (`font-mono text-xl text-[#c5ff52]` number over a `text-[9px]` mono label, both
  `text-right`) — the fix is `flex-col items-end` instead of `flex-row` on the outer stats
  wrapper below `sm`, `sm:flex-row sm:gap-6` restoring the desktop row. A narrow right-aligned
  column of three number-over-label blocks never comes near the left title block regardless
  of viewport width, so no reflow trigger is needed either.
- **Bottom control bar** (`DRAG TO ROTATE · SCROLL / PINCH TO ZOOM · CLICK A PIN`) had the
  same class of bug: its wrapper was `absolute bottom-7 left-0 right-0` — full viewport width,
  zero side gutter — so the pill's `px-4` inner padding was the only thing between its text
  and the screen edge, and at 375px the copy wraps to two lines with no breathing room on
  either side (confirmed by another user screenshot). Changed the wrapper to
  `inset-x-4 sm:inset-x-8` (matching the header blocks' gutter) and added `min-w-0` to the
  pill + `shrink-0` to the pause button so the pill (not the button) absorbs the width
  constraint and wraps its own text centred, instead of the flex row overflowing edge-to-edge.
- Verified at 375×812: pill sits with a real ~24px gutter off each edge instead of flush
  against it, wraps its two-line copy centred, pause button stays a fixed circle. Desktop
  (both rounds) re-screenshotted unchanged — same absolute corners, same single-line pill.
