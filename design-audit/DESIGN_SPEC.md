# Design Spec — sohaibbinkamran.com (Framer site audit)

Audited: 2026-07-16. Source: live crawl of https://www.sohaibbinkamran.com/ via computed styles, DOM inspection, and accessibility-tree walkthrough.

> **Known gap:** the automated screenshot capture tool timed out repeatedly during this audit (viewport screenshots and zoom both failed after retries, on a fresh tab too — not page-specific), so no full breakpoint set (1440/768/390 × every page) was saved to `/design-audit/screenshots`. The user has since shared several manual screenshots directly in chat (Home-mobile, About-desktop, Contact-desktop, Work-index-desktop, Cinefatic case-study-desktop), which are analyzed and folded into this spec below — those images weren't file paths I could copy into the repo, so if you still have the originals, drop them into `/design-audit/screenshots` and I'll reference them directly. Still missing: Home desktop/tablet, About/Work/Contact mobile+tablet, and tablet breakpoints generally.

---

## 1. Color Tokens

| Token | Value | Where used |
|---|---|---|
| `bg-base` | `#FFFFFF` | Default section background |
| `bg-cream` | `#FCF9F5` / `#FBF9F5` | Alternate section background (warm off-white) |
| `bg-dark` | `#121212` / `#0D0D0D` | Dark sections (footer, CTA band) |
| `bg-dark-alt` | `#212121` / `#151515` | Dark buttons, dark cards |
| `bg-muted` | `#F6F6F7` / `#F5F5F5` | Subtle card backgrounds |
| `bg-border-soft` | `#EBE8E6` | Hairline dividers on light sections |
| `text-primary` | `#000000` | Headings, primary text on light bg |
| `text-secondary` | `rgba(0,0,0,0.55)` | Body copy / paragraph text on light bg |
| `text-on-dark` | `#FFFFFF`, and `rgba(255,255,255,0.4–0.7)` steps | Text on dark sections, at varying opacity for hierarchy |
| `accent-purple` | `#5E45FF` | Primary accent (CTA highlights, tag chips) |
| `accent-lime` | `#C5FF52` | Secondary/pop accent (used sparingly, likely a badge or highlight) |

**Pattern:** the palette is mostly neutral (black/white/cream/near-black) with exactly two saturated accents (purple + lime), plus a text-opacity ladder (`100/70/60/55/50/40%`) instead of separate gray tokens — that's the mechanism for text hierarchy on both light and dark backgrounds.

**Confirmed from screenshots — a third accent color:**
| Token | Value (approx.) | Where used |
|---|---|---|
| `accent-alert` | `#FF5A3C`-ish coral/orange-red | "Available Now!" status pill on Contact page, and a small pulsing red/orange dot next to the floating testimonial callout on case-study pages |

This confirms the `pulsate` keyframe found in the stylesheet earlier is a **live-status pulse dot**, not just a generic loading indicator.

**Hero background treatment is not one flat color — it's an illustrated background, and it differs per page:**
- **Light pages** (About, and the case-study header band on Cinefatic): a soft grayscale cloud/sky illustration bleeding across the top of the hero.
- **Contact page:** a distinct dark, painterly mountain/rock silhouette illustration on near-black — a different mood/asset from the light cloud art, not just a dark-mode recolor of the same image.
- Home's desktop hero background wasn't captured in the shared screenshots (only mobile) — worth confirming before building, since mobile Home shows small floating annotation badges ("Illustrated Design", "Effortless Web...") next to the headline rather than the cloud art seen elsewhere.

These should be treated as illustration assets (SVG or image), not CSS gradients — recommend requesting/exporting the actual art from Framer rather than approximating with gradients.

Gradients found: a subtle white-to-white fade (fade-out mask, likely for scroll edges/marquees) and a soft white radial highlight overlay (`0deg, rgba(255,255,255,.1) → rgba(255,255,255,0)`), consistent with glassy card highlights.

## 2. Typography

| Role | Font | Weight | Size / Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 (hero) | Instrument Serif | 400 | 64px / 65.28px | -1.28px |
| H3 | Instrument Serif | 400 | 44px / 50.6px | -0.44px |
| H4 | Instrument Serif | 400 | 36px / 45px | -0.36px |
| Body (p) | Satoshi | 500 | 18px / 27.9px | -0.36px |
| Labels/eyebrows | sans-serif (system) | 400 | 12px | normal |
| Nav/UI text | Inter | 500 | 13–16px | tight, ~-1% |

**Notes:**
- Headings consistently use **Instrument Serif** (a display serif) — this is the signature typographic choice of the site, contrasted against a sans body.
- Body copy uses **Satoshi** at weight 500 (not 400) — slightly heavier than typical body weight, giving the paragraphs more visual presence.
- **Inter** shows up for smaller UI chrome (nav, tags, meta text).
- Two decorative/handwritten fonts detected in the font stack (`Gloria Hallelujah`, `Handlee`) — these are likely used for small annotation-style callouts (e.g. a handwritten-style label near the hero, common in Framer templates for a personal touch). Worth confirming visually once screenshots are available.
- No `h2` was found on the homepage — heading levels jump H1 → H3 → H4, which is an accessibility/semantic gap worth fixing in the rebuild (use proper sequential heading levels even if visual size stays the same).
- Negative letter-spacing scales with font size (bigger text = proportionally tighter tracking, roughly -2% of font-size).
- **Confirmed from screenshots — partial-color emphasis inside headings:** headings can mix full-opacity black text with a muted-gray span for de-emphasis, e.g. "**Designer. Builder.** *Lifelong learner.*" on the About page, where the last phrase renders in secondary gray while the rest stays black. Build heading components to accept rich text / multiple spans with independent color, not a single string.
- **Confirmed from screenshots — inline bold keyword emphasis in body copy:** paragraphs in the feature/value-prop cards (About "What sets me apart", Home "Why Me") bold specific keywords mid-sentence (e.g. "using **data-driven experimentation**", "blending your vision with my **creative expertise**"). This is a recurring rich-text pattern across the whole site, not a one-off — content should support inline `**bold**` spans, and components should render markdown-ish rich text rather than plain strings.

## 3. Spacing

Section padding samples (desktop, 1440px viewport):
- `72px 120px 96px` (top/side/bottom) — standard content section
- `120px 120px 290px` — hero/large section with big bottom breathing room
- Card/chip padding: `0px 10px` (small pill tags), `0px 14px` and `0px 8px` (buttons/nav items)

**Inferred scale:** base unit of **8px**, stepping through roughly `8, 10, 14, 16, 20, 24, 32, 40, 56, 72, 96, 120px`. Horizontal section padding is consistently **120px** at desktop width — that's the safe value to encode as the container's max-width gutter in Tailwind config.

## 4. Components / Patterns

- **Border-radius scale:** `6, 10, 12, 13, 14, 16, 18, 20, 24, 32, 56px` — a wide range, but clusters around `12–16px` for buttons/cards and `20–24px` for pill tags/badges. 56px shows up on at least one large rounded container (likely an avatar or hero image frame).
- **Buttons:** dark pill buttons (`bg #121212` / `#212121`, radius 14–16px, 12px UI text) for primary CTAs ("My Work", "Get In Touch"), and ghost/transparent pill tags (radius 24px) for metadata chips ("2024", "SaaS | Product Design").
- **Shadows:** layered multi-stop shadows (up to 6 stacked shadow values per element) combining outer drop shadows with **inset highlights** — this is the classic "glassy/soft-UI" card treatment (light inset top edge + soft outer shadow), not a single flat `box-shadow`. Reproduce with 2–3 stacked Tailwind arbitrary shadows rather than one value.
- **Testimonial cards:** each card has a slight independent rotation (~-2°, -4°, matrix transforms confirmed via computed style) — a fanned/stacked-deck visual treatment, not a plain grid. Likely animates from a stacked pile into a spread on scroll/hover (Framer Motion whileInView).
- **Marquees:** at least two horizontally-scrolling infinite marquees detected — one for the "Organizations" logos strip, one for the "Skills"/tools tag list. Confirmed via a running Web Animation with `duration: 42160ms`, `linear`, infinite direction. Build these with Framer Motion's `animate()` looping x-translation, duplicating the content once for seamless wrap.
- **Fixed elements:** sticky/fixed top navigation bar (88px tall) plus a second fixed element beneath it (140px, purpose unclear from DOM alone — possibly a secondary sticky info bar or the local-time/location hero widget). There's also a floating pill button (142×72px) that's `hidden` at desktop width — this is a mobile/tablet-only floating "Say hi" CTA that appears fixed on small screens.
- **Case-study page template** (confirmed via `/work/xoopah` text scrape and `/work/cinefatic` screenshot) is a reusable structure: Back-to-work link → cloud-illustration header band → Title (serif) + tag chips (e.g. "UX/UI Design / Product Design / Branding") → a **floating testimonial callout card** pinned near the header (avatar + quote + name/role + live-status pulse dot) → Overview → Results → meta row (Industry / Year / Type) → a **product showcase section with a project-specific accent background color** (Cinefatic's is a dark maroon/burgundy, presumably pulled from that product's own brand palette) containing a large "browser-frame" mockup of the live product plus 2–3 phone mockups → one or more **annotated UX-flow sections**: phone mockups connected by hand-drawn-style arrows with short labels explaining the reasoning (e.g. "Clear Comparison", "Focused Browse", "Complete Context") → closing CTA → footer. All 5 case studies (Xoopah, Cinefatic, KNOCCS, OpenSeat, WanderLens) should share one template component driven by content data, with the showcase accent color and mockup images as per-project fields.
- **"Browser-frame" device mockup component (confirmed from screenshots):** every product screenshot across the site — project cards on Home, the Work index cards, and case-study showcases — is presented inside a rounded frame styled like a minimal browser window (3 dots top-left like traffic-light controls, small tab label). This is a strong, repeated pattern and should be built as one reusable `<BrowserFrame>` component wrapping an `<img>`/screenshot, rather than baked into each screenshot asset.
- **Work index cards (confirmed from screenshot):** 2-column grid (last row single card for the odd 5th item), each card a light-gray (`bg-muted`, ~#F5F5F5) rounded container padded around the BrowserFrame mockup, with the project name in serif below the card (outside the gray container) and a smaller repeated label to the right.

## 5. Animations

- **Scroll-triggered reveals:** confirmed — elements sit at `opacity: 0` before entering the viewport and animate to `opacity: 1` (found on the niches/industry tag section and the skills/tools tag section). This is a standard Framer Motion `whileInView` fade pattern — implement with `initial={{opacity:0, y: 16}} whileInView={{opacity:1, y:0}}`.
- **Infinite marquee scroll:** confirmed via Web Animations API inspection (linear, ~42s loop, no easing) on the organizations-logo strip and the tools/skills tag list.
- **Card rotation/fan effect:** testimonial cards carry small persistent rotation transforms — likely animate in with a stagger + slight rotate on scroll-into-view.
- **Decorative rotating ring + pulse dot (confirmed/reinterpreted from screenshots):** the `rotate-right`/`loader8`/`pulsate` keyframes found in the stylesheet aren't just a generic loading spinner — the Home closing-CTA section shows a dashed/dotted ring around the "Let's Talk?" button (matches a slow rotation animation), and case-study testimonial callouts show a small pulsing status dot (matches `pulsate`). Build these as two distinct small components: a `RotatingRing` decorative wrapper and a `PulseDot` live-status indicator.
- **Hover states:** tested synthetically on a project card (Cinefatic) — no transform/filter change was detected on hover via programmatic pointer events. This likely means either (a) there's no dramatic hover effect on cards — just the default Framer link color-swap on text — or (b) the effect depends on real continuous pointer-move tracking that a synthetic hover event doesn't trigger. **Recommend re-checking this visually** once you can interact with the live site directly, especially for the hero "Perhaps you?" element and project cards, before deciding whether to build a hover-scale/tilt effect.
- **Page transitions:** not directly observable without visual confirmation; Framer sites typically use a simple fade/slide between route changes. Flag for visual re-check.
- **Marquee content duplication confirmed:** the mobile Home screenshot shows the Niches tag row and the Skills/tools tag row each with visibly repeated/duplicated tag sets back-to-back — confirms these are seamless-loop marquees (matches the earlier ~42s linear Web Animation finding), not static rows.

## 6. Page-by-Page Structure (Information Architecture)

1. **Home** (`/`)
   - Hero: headline "Crafting Real Impact, through Human-First Design" + status line ("currently flying at Eurowings Digital") + location/local-time widget (Siegen, Germany + live clock) + role tag + "My Work" CTA
   - Selected Work: 3 featured project cards (Cinefatic, KNOCCS, Xoopah) with category/year/type tag chips
   - Testimonials: "They trust me" — fanned/rotated testimonial cards (Zain Khatri, Philipp Rosenbaum, Riaz Ur Rehman) + "Organizations" logo marquee
   - Why Me: 3-column value prop (Design Aligned to Product Goals / Evidence-Driven Craft / Ship Value, Iterate Fast)
   - Niches: industry tag marquee (Aviation, E-Commerce, Ad-Tech, Mobility, CX Platforms, Real Estate, Mortgage) + skills/tools tag marquee (Figma, Notion, Protopie, etc.)
   - Skills: "What I Bring to a Product Team" — 7-item capability list
   - Process: 3-step process (Understand the problem / Explore & prototype / Ship & improve), each with a quoted micro-tagline and outputs description
   - Closing CTA: "Ready to create an exceptional digital experience?" → "Let's Talk?"
   - Footer: name/tagline, nav links, contact info, social links (Behance, Dribbble, LinkedIn)

2. **About** (`/about`)
   - Intro line ("the team's pencil sharpener") + skill tag chips
   - "Who am I?" bio paragraph
   - Experiences: Eurowings Digital, Spur Solutions, Google Developers Student Clubs (title + dates)
   - Features: "What sets me apart?" — 5 differentiators (Strategic Design Thinking, Collaborative Process, Measurable Impact, Full-Stack Design Expertise, Research-Driven Solutions)
   - Footer (shared)

3. **Work** (`/work`)
   - Header: "Case Studies. My Approach, Process, and Impact."
   - Grid/list of all 5 case studies: Xoopah, Cinefatic, KNOCCS, OpenSeat, WanderLens
   - Footer (shared)

4. **Case study template** (`/work/xoopah`, `/work/cinefatic`, `/work/knoccs`, `/work/openseat`, `/work/wanderlens`)
   - Back-to-work link
   - Title + category tags (e.g. Web Design / Product Design / Branding)
   - Overview section
   - Results section
   - Meta row: Industry, Year, Type
   - Client testimonial quote
   - Closing CTA
   - Footer (shared)

5. **Contact** (`/contact`)
   - "Available Now!" status badge
   - "Get in Touch!" heading + intro line
   - Form: Name, Company, Message, Submit
   - "Or email me directly" fallback with mailto link
   - Footer (shared)

**Global chrome:**
- Fixed top navigation, rendered as a floating dark pill bar (not full-width) centered at the top: "Sohaib Bin Kamran" wordmark + Home / About / Work links + a "Say hi" dark CTA button with an icon.
- Mobile/tablet-only floating "Say hi" pill button (hidden at desktop widths)
- **Shared footer (confirmed from screenshots):** black background. Left: name/title, tagline, "Let's Connect!" pill button with icon. Right: two columns — "Navigation" (Home/About/Work/Contact) and "Contacts" (phone, email). Beneath that, a giant, very-low-opacity "SOHAIB" wordmark spans the footer width as a background watermark. Bottom strip (divider line above it): copyright left, a small centered "sbk" logomark, and social icons (Behance, LinkedIn — Dribbble link exists in the DOM but wasn't visible in the footer screenshots, may be elsewhere or icon-only) right.

---

## Open items still needing confirmation
- Home page desktop/tablet hero — only the mobile view was seen; need to confirm whether it uses the cloud illustration (like About) or something else, and confirm the floating "Illustrated Design" / "Effortless Web..." annotation badges seen on mobile.
- Exact hex values for `accent-alert` (orange/coral status pill), and precise crop of the two decorative fonts' (Gloria Hallelujah / Handlee) usage — likely the mobile annotation badges, but not 100% confirmed.
- Whether project cards have a hover effect at all (couldn't confirm via synthetic events; screenshots are static)
- The purpose of the second 140px fixed element below the nav bar
- Page-transition behavior between routes
- Exact accent-lime (`#C5FF52`) usage location — only caught it in a background-color scan, not tied to a specific visible component yet
- Per-project accent/showcase background colors for the other 4 case studies (only Cinefatic's maroon was seen) — likely Xoopah=purple, KNOCCS=purple/indigo, OpenSeat=peach/orange, WanderLens=sage/cream, going by the Work-index card thumbnails, but should confirm each case-study page directly.
- Tablet breakpoint (768px) wasn't represented in any shared screenshot yet.
