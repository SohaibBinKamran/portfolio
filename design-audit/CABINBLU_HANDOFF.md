# Handoff — CabinBlu Case Study (`/work/cabinblu`)

**Written:** 2026-08-04. **Purpose:** everything a fresh chat needs to build the CabinBlu case study without re-deriving context or re-reading the 14,000px Figma frame from scratch.

Read alongside [`MIGRATION.md`](../MIGRATION.md) (project history, content sourcing rules) and [`DESIGN_SPEC.md`](./DESIGN_SPEC.md) (the *site's* design system — note that this page deliberately departs from it, see §3).

---

## 1. What is being built

A single, bespoke, flagship case-study page at `/work/cabinblu`, built from the Figma frame **"Portfolio/CabinBlu-Project Diary Study"**.

- **File key:** `MXxffOc1fNdTbvUBfEVA1z`
- **Root node:** `869:7278` — 1440 × 14,264px
- **Content:** a 14-day longitudinal diary study of CabinBlu (a flight-anxiety app) for **Eurowings Digital × Lufthansa Innovation Hub**. 12 participants, 24 moderated interviews, 5 survey touchpoints, 3 anxiety trajectories.

This is the strongest content in the repo. It is fully written in Figma — every headline, body paragraph, quote and caption is final copy (reproduced in §5 so you don't have to re-extract it).

### Scope boundary — read this

`/work/[slug]` **does not exist** and this work does **not** create it. Per `MIGRATION.md` §5, the shared case-study template was deliberately held pending a content strategy for Xoopah / Cinefatic / KNOCCS / OpenSeat / WanderLens. That hold stands.

CabinBlu gets its **own route file** with its own visual language. Do not generalise it into a template, and do not let it drag the other five into scope. Be aware it sets an implicit bar — the other four will look thin beside it — but that is a separate, later conversation.

---

## 2. Decisions already made (do not re-litigate)

| Topic | Decision |
|---|---|
| **Route** | `/work/cabinblu` — bespoke page, not a `[slug]` template instance |
| **Placement** | Added to `src/data/work.ts` as a 6th project, positioned **first** in the array — it's the primary piece the user wants seen first |
| **Work-index card title** | Just **"CabinBlu"** — matches the bare-title convention of the other five |
| **Work-index thumbnail** | **User will supply later.** Use a placeholder. See §7 for the caveat |
| **Interactivity** | Fully interactive — working accordion, animated chart, scroll-revealed journey |
| **Accordion load state** | **All closed except the first card**, which is open |
| **Assets** | Exported from Figma into `public/images/` — do not approximate |
| **Anxiety chart** | **Export the SVG directly from Figma.** Do not hand-author or approximate the curves |
| **Responsive** | **Desktop (1440) is the priority.** Responsive where cheap; documented fallback where not. See §6 |
| **Publishing clearance** | Confirmed cleared. The NDA disclosure and P1-3/P2-4 participant coding in the design are sufficient — ship as designed |
| **Page chrome ending** | **Build chat's call.** See §4 |
| **`/contact`** | Route doesn't exist. Links stay pointing at `/contact` and 404 for now — known and accepted |
| **Typefaces** | **Pull exact family names out of Figma.** See §3 |

---

## 3. Visual identity — this page breaks the site's design system

This is the single most important thing to internalise. `DESIGN_SPEC.md` describes the portfolio's language: Instrument Serif headings, Satoshi body, neutral white/cream/black with purple `#5E45FF` and lime accents.

**CabinBlu uses none of that.** It is a Lufthansa-branded takeover page:

- **Deep navy** backgrounds and headings (roughly `#0B2C6B` / `#12275C` family)
- **Gold/amber** accent for emphasis lines and the D14 timeline endpoint (roughly `#F0A81E`)
- **Pale blue** section backgrounds (roughly `#EEF3FF`) and quote-block fills
- **Teal** and **coral/red** as chart series colors
- A **geometric sans** for headings and body — *not* Instrument Serif
- A **monospace**, letterspaced, uppercase style for section eyebrows (`● 04 · IN-FLIGHT FINDINGS`)
- Hand-drawn/sketch illustration style for the opportunity cards; handwritten annotation style on the journey map

### Extracting the real values

**There is no token layer.** `get_variable_defs` on the root returns `{}` — every color is a raw hex on the node, and the file has exactly one page ("Assets"). The hex values above are **eyeballed from screenshots and are not authoritative.**

Before writing any component:

1. Load the `figma-design-to-code` guidance (prefer the `/figma-design-to-code` skill; fallback `skill://figma/figma-design-to-code/SKILL.md`). This is mandatory before calling `get_design_context`.
2. Call `get_design_context` **per section node** (IDs in §5) — never on the root, it will blow past the token limit.
3. Harvest exact hexes, font families, weights, sizes, line-heights and radii from that output.

### Where the tokens should live

Add a **page-scoped** token block — do **not** pollute the global `@theme` in `src/app/globals.css` with `cabinblu-*` colors used by exactly one route. Suggested: a `.cabinblu` scope class or a co-located CSS module defining `--cb-navy`, `--cb-gold`, `--cb-sky`, etc. The page must not inherit the global `h1..h6 { font-family: var(--font-serif) }` rule from `globals.css:52` — that rule will fight you on every heading. Override it explicitly within the page scope.

**Fonts:** get the exact families from `get_design_context`. If the heading face turns out to be Satoshi it's already loaded via the Fontshare link in `src/app/layout.tsx`. If it's anything else, add it via `next/font` alongside `Instrument_Serif` and `Inter`. The mono face for eyebrows likewise — check before adding a dependency.

---

## 4. Page structure

Top to bottom, with Figma node IDs. Heights are Figma pixels at 1440 wide.

| # | Section | Node | H | Build notes |
|---|---|---|---|---|
| — | **Hero** | `869:8171` | 1024 | Navy gradient sky, cloud shapes, ✦/✧ sparkles, Eurowings × LHIND logos, gold-highlighted second headline line, and an **illustrated Lufthansa boarding pass** ("FEAR ⟶ CALM", seat "D0–D14", RESEARCH CLASS). The boarding pass is the hero asset — export it |
| 01 | **Departures / stat board** | `869:8202` | 340 | Five stats in a row: 12 / 14 / 24 / 5 / 3. Trivially responsive. Candidate for count-up on scroll |
| — | **Context** | `869:8232` | 517 | Section intro + the 🔒 NDA disclosure block |
| 02 | **Flight Plan** | `869:8246` | 811 | Five research questions, each a question + a clarifying subline |
| 03 | **Route** | `869:8284` | 746 | Horizontal dashed timeline D0 → D3 → D6 → D10 → D14 (D14 node is gold, the rest navy), then 3 method cards (Recruitment / Diary phase / Synthesis) with icon glyphs |
| 04 | **In-Flight Findings** | `869:8368` | 1647 | **The accordion.** 8 cards in a 2-col grid, numbered 01–08, several with a tinted pull-quote block and a mono attribution line. First card open on load, rest closed |
| 05 | **Flight Recorder** | `869:8505` | 1219 | Light intro, then a **dark navy panel** containing a repeated heading/body, 3 legend pills, and the 3-line SVG trajectory chart with a dashed "flight day approaches" marker at Day 14. Note the copy is intentionally near-duplicated between the light intro and the dark panel — that's how it's drawn |
| 06 | **Pre-Flight Journey** | `869:8551` | 3335 | **The biggest section.** 5 stops (Booking / Packing / Check-in / Airport & gate / In the air), alternating left-right, each with a phone mockup, a status chip (Gap vs Opportunity), a title + emoji, a subtitle, body, 1–2 quote blocks, and **taped-on handwritten annotation cards** overlapping the mockups |
| 07 | **Baggage Claim** | `869:8710` | 1168 | 8 hand-drawn sketch illustrations in a 4×2 grid, each a "luggage tag": mono `TAG №01 · INSIGHT 01` label, the insight, then the recommended bet in navy |
| 08 | **Arrivals / Impact** | `869:8771` | 1013 | 4 impact statements |
| 09 | **Postcards From the Field** | `869:8801` | 629 | 2 reflections with 🪶 and 📈 glyphs |
| — | **Case-study footer** | `869:8826` | 366 | "Final call for boarding ✈️" + availability line + "Back to top" / "Get in touch" + a credit line |
| — | **Site CTA** | `869:14031` | 656 | "Why wait? Take the leap…" / "Let's Talk?" |
| — | **Site footer** | `869:14044` | 791 | Standard footer + SOHAIB watermark |
| — | **Nav** | `869:8098` | 88 | Standard site nav |

### Open call for the build chat: the ending

The Figma stacks a bespoke boarding-themed outro **and** the standard site CTA **and** the site footer — three closing moments in a row, ~1,800px of ending. The user's instruction was explicitly *"let the build chat judge."*

The site's `NavBar` and `Footer` already render globally from `src/app/layout.tsx`, so they come for free. The real question is whether the bespoke outro plus `ClosingCta` is redundant. Make a call, and **state which you chose and why** when reporting back.

---

## 5. Copy deck

Final copy, extracted from the Figma layer names. HTML entities decoded. Use this verbatim — do not rewrite, tighten or "improve" it.

### Hero
> **Eyebrow:** UX Research Case Study · Eurowings Digital × Lufthansa Innovation Hub
>
> **H1 (line 1, white):** Fear of flying doesn't wait for a usability session.
> **H1 (line 2, gold):** So we tracked it for 14 real days.
>
> **Sub:** A longitudinal diary study on CabinBlu, a flight-anxiety app — following 12 anxious flyers from booking to boarding to see whether the app actually meets fear where it lives.

**Boarding pass card:** `Lufthansa | Boarding Pass — Case Study | RESEARCH CLASS` · PASSENGER *Anxious Flyer* · ROLE *UX Researcher* · METHOD *14-Day Diary* · PARTY *12 Travellers* · **FEAR ⟶ CALM** · SEAT *D0–D14* · footer strip: "Gate closes at insight #8 — see below" / "Every insight moves you forward." / "LH CASE STUDY | RESEARCH FLIGHT" / "THANK YOU FOR BEING ON BOARD."

### 01 · Departures
> **Heading:** ✦ Departures — Why This Study, In Five Numbers ✦

| Value | Label |
|---|---|
| 12 | anxious flyers, moderate → strong avoidance |
| 14 | days tracked per participant |
| 24 | moderated interviews |
| 5 | survey touchpoints along the journey |
| 3 | distinct anxiety trajectories found |

### Context
> **Eyebrow:** 01 · Context
> **Heading:** A calm app is only as good as its fit into a frightened person's real week.
>
> CabinBlu offers meditations, education and a personalized flight plan. But content quality alone doesn't guarantee impact — timing, emotional relevance and fit into real travel moments do. We didn't know if CabinBlu changed how fear actually felt over time, or just sat unused beside a fear running on its own schedule.
>
> 🔒 Participant quotes are drawn from sessions conducted under signed NDAs. Names are replaced with study codes (P1‑1, P2‑3…) and details generalized to protect confidentiality.

### 02 · Flight Plan
> **Eyebrow:** 02 · Flight Plan
> **Heading:** Five questions we filed before takeoff.

| Question | Subline |
|---|---|
| How does anxiety evolve, Day 0 → Day 14? | Linear, spiking, or does it ever actually go down? |
| What content lands, and when? | Which formats and topics help, and at which moments? |
| What drives — or kills — engagement? | How people actually use the app beyond the first open. |
| Does it support key moments? | Booking, packing, check-in, day-of — present, or absent? |
| What's still unmet? | What friction remains even for people actively trying? |

### 03 · Route
> **Eyebrow:** 03 · Route
> **Heading:** Mixed-method, longitudinal, low-friction.
>
> A single usability session can't capture anxiety that builds over two weeks — so the study lived inside participants' real pre-flight window, bookended by moderated interviews.

**Timeline:** Baseline / *Interview + survey* / **D0** — Check-in / *Survey* / **D3** — Check-in / *Survey* / **D6** — Check-in / *Survey* / **D10** — Closing / *Interview + survey* / **D14** *(gold)*

**Cards:**
- 🧳 **Recruitment** — 12 leisure & business flyers, ranging from moderate discomfort to strong avoidance — all real or occasional flyers, so findings stayed grounded.
- 📓 **Diary phase** — Participants lived with the app on their own schedule, self-reporting anxiety and experience at five touchpoints in English or German.
- 🗂️ **Synthesis** — 24 recordings tagged in Condens; themes clustered in Miro into emotional, cognitive and trust patterns, then mapped onto the journey.

### 04 · In-Flight Findings
> **Eyebrow:** 04 · In-Flight Findings
> **Heading:** Eight things the roadmap didn't know yet.
> **Sub:** Tap a card to open it. Spanning how anxiety works, what people expect from the app, and where the experience falls short.

Grid order in Figma is **column-major**: left column 01, 03, 05, 07 / right column 02, 04, 06, 08. Preserve numeric order in the DOM for reading order and let CSS handle the visual placement.

**01 — Anxiety is anticipatory, and information cuts both ways**
Most participants already know flying is statistically safe — that was never the issue. The issue is losing control of the situation, and that feeling grows the closer the flight gets. Avoidance and control-seeking coexist in the same person; information calms some and overwhelms others.
> "I always trust the pilot, but I don't know what's going on inside their heads." — P2-4

*(Note: the Figma layer reads "calms some andoverwhelms others" — a missing space. Fix it.)*

**02 — People are patching the problem, not solving it**
Coping today is a grab-bag: distraction, alcohol, sedatives, rationalisation, breathing tricks, or just not thinking about it. None of it is structured, and there's no learning effect flight to flight — exactly the gap CabinBlu is positioned to fill, if it goes beyond distraction.
*(no quote)*

**03 — Strong first impression, but not a distinctive one**
The clean, minimal design and blue palette were read as calming, and navigation felt intuitive. But several participants called it pleasant rather than memorable — a nice app, not yet a trusted companion.
*(no quote)*

**04 — Onboarding is understood, but feels generic**
The core idea — prepare, learn, manage anxiety — resonates immediately. What's missing is tailoring: people can't tell what to do next, or how the app is adapting to what they just told it about themselves.
> "I'd say it's just clear what you have to do and what you can do." — P2-4, after a week of use

**05 — Audio first, but the lines are blurry**
Real preference for audio-led exercises during anxious moments — but confusion about what separates an "exercise" from an "audio," why content is locked, and whether Explore should be read or listened to.
> "I expect it to be more focused on flying itself, not only on anxiety." — P2-4

**06 — The personalized Flight Plan is appealing, execution gets in its own way**
Adding a flight and getting a tailored plan felt motivating — structure and confrontation instead of avoidance. But time-entry confused people, and it's unclear what they get back after entering details.
*(no quote)*

**07 — Trust has a visible gap**
Anxious users actively interrogate credibility: is this built by psychologists? Backed by data, or by "anxiety gurus"? A disclaimer that it isn't medical advice helps — but isn't enough alone.
> "If it's backed by the data and not by … gurus … that should do the trick." — P1-3

**08 — Emotional fit is mixed - and representation is part of that**
Structured, gradual exposure was genuinely appreciated, but some content felt childish (the hug feature), and some headlines triggered rather than reassured. Imagery only depicted white travellers — a real inclusivity gap for a global airline product.
> "It feels not very inclusive." — P2-3, on the app's imagery

### 05 · Flight Recorder
> **Eyebrow:** 05 · Flight Recorder
> **Heading:** Anxiety doesn't fall in a straight line.
> **Sub:** The riskiest moment isn't Day 0 — three distinct trajectories emerged, and the most common one dips early, then climbs right as the flight stops being abstract.

**Inside the dark panel:**
> **Eyebrow:** 05 · Anxiety Over Time
> **Heading:** Anxiety doesn't fall in a straight line — and the riskiest moment isn't Day 0.
>
> Across the 14-day diaries, three distinct trajectories emerged. The most common pattern: anxiety eases early — novelty and initial engagement help — then climbs back up in the final days, right as the flight stops being abstract. That late window is exactly where the app currently offers the least.

**Legend pills:** ● Early improvement, late spike *(amber)* · ● Fluctuating *(teal)* · ● Stable / high throughout *(coral)*

**Axes:** y-axis `higher` / `lower`; x-axis `Day 0` `Day 3` `Day 6` `Day 10` `Day 14`; dashed vertical marker labelled `flight day approaches`.

**Caption:** Illustrative trend shapes derived directly from diary entries and closing interviews — directional patterns, not exact anxiety scores. Across most participants: a slight dip from Day 0 → Day 6, driven by initial engagement and novelty, followed by a renewed rise from Day 6 → Day 14 as the flight stops being hypothetical.

### 06 · Pre-Flight Journey
> **Eyebrow:** 06 · Pre-Flight Journey
> **Heading:** The app shows up reliably in one place — and that's not where fear is highest.
> **Sub:** Mapping diary entries onto the real pre-flight journey surfaced a clear pattern: anxiety hotspots and app presence don't line up. Scroll through the five stops below.

**STOP 01 / 05** — chip: `Gap — app mostly absent`
✈️ **Booking** · *Avoidance & control-seeking*
Delayed or avoided bookings, and a strong need for control over airline, aircraft type and direct routes — while CabinBlu has nothing to say yet.
> "I browse for days… part of it is avoiding the commitment." — PARTICIPANT, BASELINE

Annotations: *"add first flight" — then?* / 🕳️ nothing here before you add a flight

**STOP 02 / 05** — chip: `Opportunity — low-effort entry`
🧳 **Packing** · *Coping through control*
Packing becomes a control-restoration ritual — medication, headphones, snacks, overpacking "just in case." A natural, low-intensity moment for the app to meet people.
> "I pack everything I might need… just in case." — PARTICIPANT, D3 DIARY

Annotations: *explore exists… quietly* / 📚 content exists, but isn't offered here

**STOP 03 / 05** — chip: `Opportunity — decision moment`
🎫 **Check-in** · *The reality checkpoint*
Anxiety rises because the flight becomes unavoidable. Seat selection turns emotionally loaded — an ideal decision moment for targeted, in-context support.
> "This is when it becomes real." — PARTICIPANT, D6 DIARY
> "I want an aisle seat so I can get up if needed." — PARTICIPANT, D6 DIARY

Annotations: *right question, wrong day* / 🙋 the app already asks — just at the wrong time

**STOP 04 / 05** — chip: `Opportunity — peak anxiety`
🛫 **Airport & gate** · *The most emotionally rich phase*
Leaving home → journey stress → security → gate → boarding: anxiety climbs step by step and peaks at the gate. Low-effort, passive audio wins here.
> "Boarding is the moment it becomes real. There's no way back." — PARTICIPANT, D10 DIARY

Annotations: *05:41 of calm, if you find it* / 🎧 audio works — when people can find it fast

**STOP 05 / 05** — chip: `Gap — needs near-zero effort`
☁️ **In the air** · *Peak anxiety, lowest tolerance for effort*
Users need immediate, passive calm — not a training plan. Content here must ask almost nothing of the user, and be safe to repeat.
> "I just want to get on the plane at that point." — PARTICIPANT, CLOSING INTERVIEW

Annotations: *13 min plan, 0 min patience* / 🐢 today's plan ≠ one-tap in-air calm

> ⚠️ **Annotation placement is not in reading order in Figma.** The two annotation cards near stop 01 belong to stop 01, but the pair that visually sits between stops 01 and 02 (*explore exists… quietly*) belongs to **stop 02's** mockup, and similarly further down. Verify each annotation's parent frame against the screenshot before wiring it up — getting these attached to the wrong stop is the easiest mistake in this section.

### 07 · Baggage Claim
> **Eyebrow:** 07 · Baggage Claim
> **Heading:** Turning eight insights into eight concrete bets.
> **Sub:** Framed as prioritized opportunities for product, content and design to weigh against effort and roadmap capacity — not a redesign mandate.

| Tag | Insight | Bet (navy, emphasised) |
|---|---|---|
| TAG №01 · INSIGHT 01 | Anxiety peaks pre-flight, not Day 0 | Re-weight content toward the final days — motivation early, acute coping tools timed to flight proximity |
| TAG №02 · INSIGHT 02 | App absent during booking & packing | Light-touch nudges at booking confirmation + a packing checklist as low-effort entry points |
| TAG №03 · INSIGHT 03 | Users question credibility | Surface sourcing & credentials directly in-product, beyond a one-line disclaimer |
| TAG №04 · INSIGHT 04 | Onboarding feels generic | Branch onboarding by primary driver — control, catastrophic thinking, physical symptoms |
| TAG №05 · INSIGHT 05 | Audio vs. text confusion | Offer a format toggle or parallel transcript instead of locking content to one mode |
| TAG №06 · INSIGHT 06 | Imagery represents one type of traveller | Diversify the visual language so more real users see themselves in it |
| TAG №07 · INSIGHT 07 | Day-of-flight needs near-zero effort | A one-tap "in the air now" mode — audio-led, minimal interaction, safe to repeat |
| TAG №08 · INSIGHT 08 | Flight Plan time-entry confuses people | Simplify flight-detail entry, make the payoff explicit after providing it |

### 08 · Arrivals
> **Eyebrow:** 08 · Arrivals
> **Heading:** From transcripts to a prioritized roadmap conversation.

- **Reframed where the roadmap should focus** — Booking-and-packing gaps and the late-stage spike became concrete arguments for re-sequencing content, not just polishing the existing flow.
- **Informed the Eurowings integration conversation** — Participants reacted directly to CabinBlu living inside the main Eurowings app rather than as a separate download.
- **Built reusable research infrastructure** — Tagging structures, survey templates and a highlight-reel workflow were carried into other airline-journey research.
- **Future scope** — Validate the three trajectories at scale, prototype booking/packing nudges, and explore a try-then-pay content model.

### 09 · Postcards From the Field
> **Eyebrow:** 09 · Postcards From the Field
> **Heading:** What this project changed about how I research.

- 🪶 **Researching fear takes a different kind of moderation.** Several participants described panic attacks, sedatives, even an ER visit, within minutes of meeting me. Running sessions in whichever language felt safest, and slowing down before asking "why," mattered as much as the question list.
- 📈 **Don't flatten a messy curve into a tidy story.** It would've been easy to report "anxiety decreases with use." The honest finding — three trajectories, riskiest moment late, not early — was less clean, and far more actionable for the roadmap.

*(Glyph-to-reflection pairing is ambiguous in the layer order — check the rendered Figma before assigning.)*

### Case-study footer
> **Final call for boarding ✈️**
> Full transcripts, the Condens report, and the workshop deck are available on request.
> `Back to top` · `Get in touch`
> Eurowings Digital × Lufthansa Innovation Hub · Made with care in Siegen / Cologne, Germany

---

## 6. Responsive

**Desktop 1440 is the priority and the only designed breakpoint.** There is no mobile or tablet frame anywhere in the Figma file (confirmed — the document has one page, "Assets").

Build responsive in the same pass **where it's cheap** — these stack or reflow without design decisions:

- 01 stat board (5-across → 2-across → list)
- 02 research questions
- 03 method cards (3-col → 1-col); timeline goes vertical
- 04 accordion (2-col → 1-col — trivial, and the accordion pattern is inherently mobile-friendly)
- 07 luggage tags (4×2 → 2×4 → 1-col)
- 08 impact, 09 reflections

**Three sections are genuinely hard.** Do not invent an elaborate mobile treatment for these — implement a simple, honest fallback and flag it:

| Section | Fallback |
|---|---|
| **Hero boarding pass** | Fixed-ratio image that scales down; below ~600px it becomes unreadable. Either crop to the left portion or drop to a simplified text version |
| **05 trajectory chart** | Wrap in a horizontally-scrollable container at a fixed min-width rather than reflowing the SVG. The caption carries the finding in prose, so no information is lost |
| **06 journey map** | Collapse the alternating layout to a single column: mockup above, text below, per stop. **The taped annotation cards are absolutely positioned overlays** — below the breakpoint, either drop them or reflow them as inline captions beneath the mockup. Do not attempt to preserve the overlap |

Report mobile behavior back to the user with screenshots rather than shipping it silently — they've prioritised desktop, not waived review.

---

## 7. Integration with the existing site

### `src/data/work.ts`
Add CabinBlu as the **first** entry:

```ts
{ slug: "cabinblu", title: "CabinBlu", image: "<pending>" },
```

Existing order after it: Xoopah, Cinefatic, KNOCCS, OpenSeat, WanderLens.

### Thumbnail — pending from the user
The user will supply the `/work` card image later. Use a placeholder until then (`BrowserFrame` already renders a labelled empty state when `src` is undefined — see `src/components/ui/BrowserFrame.tsx:31`).

⚠️ **Raise this when the thumbnail arrives:** every card on `/work` is wrapped in `BrowserFrame`, which draws browser chrome (three traffic-light dots + a tab label). CabinBlu is a **mobile app research study**. If the supplied thumbnail is a phone screenshot or the boarding-pass hero, browser chrome will read wrong around it. Don't decide this blind now — flag it to the user at the time and offer either a chrome-less card variant or a different crop.

### Home page
`src/data/home.ts` drives a separate `selectedWork` list (3 featured projects) rendered by `src/components/home/SelectedWork.tsx`. **Not covered by any decision so far.** Ask the user whether CabinBlu should also be featured on the homepage, and if so at what position and with which tag chips — `SelectedWork` renders `blurb` and `tags` fields that `work.ts` doesn't have.

### Known-broken link — accepted
The case-study footer's "Get in touch" and the site CTA both point at `/contact`, which does not exist. The user has explicitly accepted the 404 for now. Do not build `/contact` as part of this work, and do not silently rewrite the links to `mailto:` — leave them and note it.

### Route placement
`/work/cabinblu` as `src/app/work/cabinblu/page.tsx`. If `/work/[slug]` is ever built later, Next.js gives static segments precedence over dynamic ones, so this page will keep winning — no conflict.

---

## 8. Assets

~25 raster images are embedded in the frame. Export them all from Figma into `public/images/` — do not approximate any of them.

| Group | Count | Notes |
|---|---|---|
| Eurowings + LHIND logos | 2 | Hero, small |
| Boarding pass illustration | 1 | Hero centrepiece |
| Plane + cloud illustrations | ~3 | Hero decoration |
| Phone mockups | 5 | One per journey stop, in device frames with tape |
| Sketch illustrations | 8 | Luggage tags — hand-drawn style, AI-generated (`ChatGPT Image Jul 19, 2026…` layer names) |
| Misc / section decoration | ~6 | Verify individually |

**Recommendations:**
- Namespace filenames: `cabinblu-hero-boardingpass.png`, `cabinblu-journey-01-booking.png`, `cabinblu-tag-01.png`, … — `public/images/` is already flat and shared with the rest of the site.
- Prefer the `download_assets` / `get_design_context` asset URLs over screenshotting sections.
- **The trajectory chart must be exported as SVG, not raster** (explicit user decision) so the curves are the real Figma beziers. Animate it by animating `stroke-dashoffset` on the three paths.
- Sketch illustrations are the heaviest group — check total page weight and consider `next/image` with explicit `sizes`. Eight large PNGs in one viewport-adjacent grid will hurt.
- Get **explicit user permission before downloading**, stating filename/source/size. That's the established convention in this repo (`MIGRATION.md` §5).

---

## 9. Interaction spec

| Element | Behavior |
|---|---|
| **04 accordion** | Card 01 open on load, 02–08 closed. Click/tap header to toggle. `+`/`−` icon swap. Height animated (Framer Motion is already a dependency). Must be real buttons with `aria-expanded` + `aria-controls`, keyboard-operable |
| **05 chart** | Three SVG paths draw in on scroll via `stroke-dashoffset`, staggered. Legend pills are labels, not filters, unless you want to add that |
| **06 journey** | Each stop scroll-reveals (`whileInView`, `once: true`) — matches the existing `SelectedWork.tsx` pattern. Annotation cards can reveal slightly after their stop |
| **01 stat board** | Optional count-up on first view. Nice-to-have, not in the design |
| **Section reveals** | Site-wide convention: `initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-80px"}}` |
| **"Back to top"** | Smooth scroll |
| **Reduced motion** | Respect `prefers-reduced-motion` — the chart draw-in and stat count-up should resolve instantly. This page is *about* anxiety; motion sensitivity is on-theme, not a footnote |

---

## 10. Suggested build order

Each phase should end with a rendered check via the browser preview tools — `MIGRATION.md` §2 notes that nothing in this repo has ever actually been looked at in a browser, so don't extend that streak.

**Phase 1 — Foundation**
Load `figma-design-to-code`. Run `get_design_context` on 2–3 representative section nodes. Extract exact fonts, hexes, radii. Set up page-scoped tokens and the heading-font override. Create `src/app/work/cabinblu/page.tsx` and `src/data/cabinblu.ts` (all copy from §5, content-driven like the rest of the repo). Add the entry to `work.ts`. Render a bare page and confirm typography and color read correctly.

**Phase 2 — Assets**
Inventory every image node. Get user permission. Export to `public/images/` with the naming scheme. Export the chart as SVG separately.

**Phase 3 — Easy sections**
01 stat board, Context, 02 questions, 03 route, 08 impact, 09 reflections, case-study footer. These are ~half the page and mostly layout. Resolve the ending-redundancy question here.

**Phase 4 — Accordion (04)**
The interaction-heaviest self-contained piece. Get accessibility right here since nothing else on the site has a comparable pattern to copy.

**Phase 5 — Chart (05)**
Dark panel + SVG import + draw-in animation + reduced-motion handling.

**Phase 6 — Journey map (06)**
The biggest and fiddliest. Do it last, with full context. Watch the annotation-to-stop mapping (§5 warning).

**Phase 7 — Luggage tags (07)**
Simple grid, but heavy on images — do image optimisation here.

**Phase 8 — Responsive + polish**
Breakpoints per §6. Screenshot mobile and desktop, report back to the user.

---

## 11. Open items to raise with the user

1. **Work-index thumbnail** — pending. Plus the `BrowserFrame` chrome question when it arrives (§7).
2. **Homepage feature** — should CabinBlu join `selectedWork` in `src/data/home.ts`, and with what blurb/tags? Not yet decided.
3. **Ending redundancy** — build chat decides, but tell the user which way it went and why.
4. **Meta / SEO** — no page `metadata` decided. Needs a title, description and ideally an OG image. Worth asking, since this is the piece meant to be seen first.
5. **`/contact`** — accepted as 404 for now, but it's linked from every page on the site. Worth revisiting as its own task.
6. **Precedent** — once this ships, the other five case studies have no detail pages at all. Flag it; don't act on it.
