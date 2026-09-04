/** ClassQuest case study copy — verbatim from Figma node 869-9558
    (Portfolio/ClassQuest-CaseStudy). Layout/visuals live in components/classquest. */

export const meta = {
  eyebrow: "Master's Thesis Case Study · Human–Computer Interaction",
  title: ["Turning scattered class notes into a ", "shared quest", " for knowledge"],
  intro:
    "ClassQuest is an AI-assisted class wiki that helps students consolidate fragmented course material into citation-backed flashcards, quizzes, and daily study quests — designed and validated across three research-driven iterations.",
  facts: [
    { label: "Role", value: "UX Researcher & Designer" },
    { label: "Duration", value: "3-Phase DSR Study" },
    { label: "Methodology", value: "Design Science Research" },
    { label: "Tools", value: "Figma · Lovable AI · Hotjar" },
  ],
};

export const problem = {
  n: "01",
  eyebrow: "Context & Problem",
  title: 'By exam season, every student’s "study system" is a graveyard of tabs',
  paras: [
    "University portals hold the lecture slides. A WhatsApp group holds someone’s handwritten notes. A shared Drive folder — named by no one in particular — holds the rest. Most students cope by pasting slides into ChatGPT and hoping the summary is right, with no way to check.",
    "This isn’t a willingness problem — students share constantly. It’s an **infrastructure problem**: no tool combines collaborative contribution, AI transformation, retrieval practice, and source transparency in one place.",
  ],
  stats: [
    { value: "11/18", label: "rely on WhatsApp / Telegram as their main note-sharing channel" },
    { value: "18/18", label: "had used AI tools to summarize notes — none fully trusted the output" },
    { value: "0", label: "existing tools combine collaboration + AI curation + retrieval + citations" },
  ],
  callout: {
    quote:
      '"Scattered and inconsistent... messy uploads without the right document name... no tagging or searchability."',
    source: "— Phase 1 exploratory survey, open-ended responses",
    tag: "⌗ n=18",
  },
  close:
    "Existing tools each solve a sliver of it: Anki and Quizlet handle spaced repetition but not collaboration. ChatGPT transforms content but keeps no shared memory or source trail. Notion AI supports individual writing, not collaborative curation. The gap sits exactly where contribution, AI curation, and retrieval-based learning should meet.",
};

export const process = {
  n: "02",
  eyebrow: "Methodology",
  title: "Design Science Research: build, evaluate, learn, rebuild",
  intro:
    "Rather than a single design-test-ship cycle, this project followed **Design Science Research Methodology (DSRM)** — every design decision in the final prototype is traceable back to a specific empirical finding from the phase before it.",
  phases: [
    { label: "Phase 1", title: "Problem Grounding", note: "Anonymous exploratory survey, n=18, via Google Forms" },
    { label: "Phase 2", title: "Mid-Fidelity Cycle", note: "Task-based testing + semi-structured interviews, n=7" },
    { label: "Phase 3", title: "High-Fidelity Cycle", note: "Task testing + survey + Hotjar analytics, same n=7" },
  ],
  close:
    "Reusing the **same seven participants** across Phases 2 and 3 was a deliberate choice — it enabled within-participant comparisons, a more sensitive way to measure whether a redesign actually improved things, rather than just collecting fresh opinions each round.",
};

export const phase1 = {
  n: "03",
  eyebrow: "Phase 1 — Research",
  title: "Validating that the problem is structural, not motivational",
  intro:
    "An 18-person exploratory survey tested whether students actually wanted a shared wiki, and why current habits fell short. Four themes shaped everything downstream.",
  themes: [
    {
      label: "Theme 01",
      title: "AI is already in the workflow — and already distrusted",
      body: "Heavy ChatGPT use for summarizing slides, paired with no way to verify accuracy or sourcing. Cost was the second-biggest complaint.",
    },
    {
      label: "Theme 02",
      title: "Knowledge lives in informal, unsearchable channels",
      body: "WhatsApp/Telegram (11/18), Moodle/ILIAS (8), Drive/Docs (7) — three students had no shared system at all.",
    },
    {
      label: "Theme 03",
      title: "Students want to contribute, with minimal friction",
      body: 'All 18 contribute notes at least occasionally; 17/18 cite "helping others" as their motive — not badges or karma.',
    },
    {
      label: "Theme 04",
      title: "Interest is genuine but skepticism is real",
      body: "12/18 rated the concept 4–5/5; the rest were unconvinced existing LMS tools didn’t already cover it. The design needed to prove value immediately.",
    },
  ],
  close:
    "These findings pointed to a three-stage architecture rather than a single feature: **Contribute → Curate → Learn** — students add material, AI extracts and surfaces it for confirmation (never silently), and the system turns it into retrieval-first practice.",
};

export const phase2 = {
  n: "04",
  eyebrow: "Phase 2 — Mid-Fidelity Cycle",
  title: "The concept worked. The interface didn’t get out of its own way.",
  intro:
    "A mid-fidelity prototype (built in Lovable AI + Figma) was tested through task-based sessions and 15–20 minute interviews with 7 students. The core idea landed — every participant understood the purpose, rating it 7–10/10 informally — but six consistent usability themes surfaced.",
  themes: [
    { label: "Theme 1", title: "Landing page undersold the concept", body: '"Explore Demo" misled 4/7 participants into expecting a tutorial; it dropped them into a live dashboard instead.' },
    { label: "Theme 2", title: 'The upload function hid behind "Wiki"', body: "4/7 participants struggled to even locate where to contribute material." },
    { label: "Theme 3", title: '"Explain & Cite" was the breakout favorite', body: "The most consistently praised feature across every interview." },
    { label: "Theme 4", title: "Weak concepts felt like an undifferentiated dump", body: 'Participants wanted a "portion-wise" breakdown by topic, not one long list.' },
    { label: "Theme 5", title: "Gamification needed calibration", body: "Loved, but one participant warned it needs to feel tied to something tangible to sustain engagement." },
    { label: "Theme 6", title: "Interface felt heavy for new users", body: '"There are a lot of things for a new user to understand" — plus low dark-mode contrast.' },
  ],
  callout: {
    quote:
      '"At some points I think the UI is a little bit heavy. It can be a bit more cleaner, a bit more easy to understand."',
    source: "— P6, mid-fidelity interview",
    tag: "⌗ Theme 6",
  },
};

export const phase3 = {
  n: "05",
  eyebrow: "Phase 3 — High-Fidelity Redesign",
  title: "Twelve changes, each one traceable to a participant’s exact words",
  intro:
    "Every Phase 2 finding became a specific, documented design decision — the core discipline of Design Science Research. Three of the highest-impact changes:",
  rows: [
    {
      insight: '"Explore Demo" created false expectations of a guided tour',
      action: 'Replaced with "See How It Works" + a study-themed hero illustration',
    },
    {
      insight: '4 of 7 participants couldn’t find the upload entry point under "Wiki"',
      action: 'Renamed to "Sources & Wiki," added a descriptive subtitle, surfaced "Upload Sources" directly on the Dashboard',
    },
    {
      insight: 'Horizontal nav + dense panels felt "heavy" to new users',
      action: 'Restructured into a vertical sidebar; replaced the abstract XP counter with a concrete "Exam Ready %" metric',
    },
  ],
  beforeAfter: {
    before: "Before · Mid-Fi",
    after: "After · Hi-Fi",
    caption:
      "The rebuilt Dashboard — vertical sidebar, surfaced upload action, weak spots grouped by topic, and a single Exam Ready metric replacing raw XP.",
  },
  callout: {
    quote:
      '"Navigation was very intuitive now. Previously I was unable to even find it whereas this time I felt completely in control. The text load was reduced which is a win-win for me."',
    source: "— R5, high-fidelity evaluation",
    tag: "⌗ Table 4.4",
  },
};

export const brand = {
  n: "06",
  eyebrow: "Branding & Visual Identity",
  title: "The symbol students spend four years earning the right to wear",
  intro:
    "Every study tool talks about progress. ClassQuest shows it through the one object that has meant academic accomplishment for centuries — the **graduation cap**. No mascot to learn, no metaphor to decode. Students already feel what the mortarboard means the moment they see it. The design task wasn’t to invent new meaning; it was to take that pre-loaded emotional resonance and rebuild it into something that felt modern, energetic, and credible enough to sit in a sidebar at midnight before an exam.",
  exploration: {
    title: "Logo exploration",
    intro:
      "Four directions were considered before arriving at the final mark. Each was tested against the same question: does this immediately communicate student achievement — without looking like clip art?",
    options: [
      { n: "01", icon: "shield", title: "Shield / Badge", body: 'Felt institutional and defensive — more "university seal" than student tool. Said authority, not progress.' },
      { n: "02", icon: "cards", title: "Stacked Flashcards", body: 'Described a single feature, not the destination. Communicated "quiz tool," not "you’re going to graduate."' },
      { n: "03", icon: "cap-flat", title: "Cap — flat 2D outline", body: "Right symbol, wrong form. Flat and strokework made it feel like a placeholder icon rather than a considered brand mark." },
      { n: "04", icon: "cap-3d", title: "Cap — 3D gradient", body: "Faceted planes give depth and energy. The deep-navy-to-sky-blue gradient reads like the cap catching light mid-motion. Immediately legible at both 16 px sidebar and large hero sizes.", final: true },
    ],
    why: {
      title: "Why faceted and 3D?",
      body: "A flat outline cap is accurate but passive — it reads like a label, not a brand. Rendering it with faceted geometry and a directional gradient does two things: it implies depth (the cap has mass, it’s real) and motion (the gradient shifts as if the cap is rotating, mid-air, after the toss). The resulting mark carries the meaning of the symbol without looking like something pulled from an icon library.",
    },
  },
  lockup: {
    title: "Lockup & usage",
    intro:
      'The full lockup — cap mark plus the "ClassQuest" wordmark — is the primary unit. Three surface treatments cover every context the product appears in.',
    rows: [
      {
        label: "Light surface",
        desc: "Default. Used on the landing page, dashboard, wiki editor — anywhere the background is white or off-white.",
        surface: "light",
        rules: ["Cap shows full gradient", "Wordmark in deep navy → #13182B", "Never use on yellow or green surfaces"],
      },
      {
        label: "Dark surface",
        desc: "Used in dark mode, deep-panel headers, or the leaderboard podium screen where the background is navy or near-black.",
        surface: "dark",
        rules: ["Cap gradient unchanged — it reads against dark", "Wordmark flips to white → #FFFFFF", "Never invert the cap to white outline"],
      },
      {
        label: "Icon-only",
        desc: "Favicon, app icon, sidebar collapsed state, and any context under 48 px wide where the wordmark would be unreadable.",
        surface: "icon",
        rules: ["Cap mark only, no wordmark", "Minimum size: 24 × 24 px", "Never crop or clip the tassel tail"],
      },
    ],
    why: {
      title: 'Why "ClassQuest" stays one word, one weight',
      body: '"Class" and "Quest" describe two different things — the cohort you belong to and the journey you’re on — but splitting them visually (different weights, different colors, a line break) makes the brand name feel like a tagline, not a product name. The wordmark stays in a single heavy weight at a fixed tracking so it reads as one destination, not two ideas stapled together. The cap provides all the visual variation the lockup needs.',
    },
  },
  color: {
    title: "Color system",
    intro:
      "Color in the UI is a signal, not a decoration. The palette is deliberately minimal so that when color appears, it’s always telling the student something actionable — and so the cap’s own gradient remains the most vibrant thing on the screen.",
    groups: [
      {
        group: "Brand",
        swatches: [
          { name: "Graduation Gradient", hex: "#1B2A6B → #6BA3EF", use: "Cap icon only — never applied to UI elements", css: "linear-gradient(135deg,#1B2A6B,#6BA3EF)", dark: true },
          { name: "Ink Navy", hex: "#13182B", use: "Wordmark, headings, body text", css: "#13182B", dark: true },
        ],
      },
      {
        group: "Interaction",
        swatches: [
          { name: "Action Blue", hex: "#2F5FE0", use: "CTAs, active states, links", css: "#2F5FE0", dark: true },
          { name: "Blue Tint", hex: "#E6ECFD", use: "Selected states, hover fills", css: "#E6ECFD", dark: false },
        ],
      },
      {
        group: "Semantic",
        swatches: [
          { name: "Mastery Green", hex: "#1F8A5C", use: "Topic complete, correct answer", css: "#1F8A5C", dark: true },
          { name: "Review Amber", hex: "#D9971F", use: "Review due, streak at risk", css: "#D9971F", dark: true },
          { name: "Urgent Red", hex: "#C24545", use: "Weak concept, wrong answer", css: "#C24545", dark: true },
        ],
      },
    ],
  },
  type: {
    title: "Typography",
    intro:
      "A single typeface family covers all product type — chosen for its geometric roundness that echoes the wordmark’s weight, and its exceptional legibility in dense information contexts like a flashcard at 1am.",
    specimens: [
      { role: "Display — Dashboard metrics & topic titles", sample: "Aa Bg 12 Sc", spec: "Weight 800 · size 28–38 px · tracking −0.02em", size: "text-[32px] font-bold" },
      { role: "UI Labels & navigation", sample: "Sources & Wiki", spec: "Weight 600 · size 14–16 px", size: "text-[18px] font-semibold" },
      { role: "Body & quiz content", sample: "What is Mutual Authentication?", spec: "Weight 400 · size 15–17 px · 1.55 line-height", size: "text-[17px]" },
      { role: "Monospace — Citations & chips", sample: "Lecture_04_Slides.pdf · Slide 8", spec: "IBM Plex Mono 400 · size 11–12 px", size: "text-[14px] font-[family-name:var(--cq-mono)]" },
    ],
    note: 'The monospace face used in citation chips is the one exception to the single-family rule. Its literal "document" feel reinforces that a chip is pointing at a real file — not an AI hallucination. The contrast between the rounded product typeface and the typewriter-style citation face is exactly the visual cue that says "this part was verified."',
  },
  voice: {
    title: "Voice & tone",
    items: [
      { glyph: "✦", title: "Plain, never patronising", body: '"2 weak concepts detected" beats "Uh oh, time to catch up!" The product’s whole value is trustworthy information — the copy can’t be chattier than the data it’s presenting.' },
      { glyph: "→", title: "Verbs, not labels", body: 'Every button says what happens when you press it: "Generate Quests," "Upload Sources," "Review Weak Spots." Never "Submit," never "Go," never "Click here."' },
      { glyph: "◎", title: "Numbers earn the encouragement", body: '"You’re 23% better than last week" is a fact the system can stand behind. "Great job today!" is not. The cap on the completion screen does the celebrating — copy stays grounded in the numbers.' },
    ],
  },
};

export const solution = {
  n: "07",
  eyebrow: "Final Solution",
  title: "Walking through the contribute → curate → learn loop",
  intro:
    "The high-fidelity prototype’s nine core screens, each carrying a specific job in the pipeline.",
  screens: [
    { src: "/images/classquest/s-sources.jpg", w: 1500, h: 1228, caption: "1 — Sources & Wiki: Topics are scoped by week, each tagged Healthy / Review Due / New, with mastery and contributor counts visible at a glance." },
    { src: "/images/classquest/s-editor.jpg", w: 1500, h: 974, caption: "2 — Wiki Editor with AI Assist: Students write or paste notes; AI Assist tools (Summarize, Extract key terms, Generate questions) act only on selected text — never silently." },
    { src: "/images/classquest/s-library.jpg", w: 1500, h: 938, caption: "3 — Course Library: Every uploaded source stays visible and attributed, with outdated material flagged rather than hidden." },
  ],
  formatsLead:
    "From curated material, the AI generates retrieval-first micro-learning units — never passive summaries alone — across three formats:",
  formats: [
    { name: "Flashcard", src: "/images/classquest/fmt-flashcard.jpg", w: 1000, h: 753 },
    { name: "MCQ", src: "/images/classquest/fmt-mcq.jpg", w: 1000, h: 734 },
    { name: "Cloze", src: "/images/classquest/fmt-cloze.jpg", w: 1000, h: 653 },
  ],
  selfRate:
    'Every answer self-rates ("I knew this / I was unsure / I didn’t know") and surfaces an Explain & Cite panel — the single most trusted feature across every evaluation phase.',
  sourcePreview: {
    src: "/images/classquest/source-preview.jpg",
    w: 1500,
    h: 1146,
    caption:
      "Source Preview Drawer: One tap from any citation chip opens the exact highlighted excerpt it came from — the deepest layer of a trust architecture built in three tiers: chip → explanation → full excerpt.",
  },
  closeLead:
    "Sessions close with a clear summary rather than a generic celebration screen, and feed straight back into a topic-level Progress Dashboard:",
  closeScreens: [
    { src: "/images/classquest/quest-complete.jpg", w: 1200, h: 750, caption: "Quest Complete" },
    { src: "/images/classquest/progress-dashboard.jpg", w: 1400, h: 1596, caption: "Progress Dashboard — weak spots grouped by topic, not dumped together, directly addressing Phase 2 feedback." },
  ],
  leaderboard: {
    src: "/images/classquest/leaderboard.jpg",
    w: 1500,
    h: 1639,
    caption:
      'Leaderboard & Hall of Fame: Tier-based "Silver Division" framing with promotion/relegation — social motivation without exposing anyone’s real identity or punishing a single bad week.',
  },
};

export const impact = {
  n: "08",
  eyebrow: "Evaluation & Impact",
  title: 'From "tricky to find the upload button" to an 8.14/10',
  intro:
    "The same seven participants who flagged Phase 2’s friction returned to evaluate the high-fidelity rebuild — enabling a genuine before/after read, not just a fresh first impression.",
  stats: [
    { value: "8.14/10", label: "mean overall rating · range 7–9" },
    { value: "7/7", label: "said the redesign was a clear improvement; none missed anything from the old version" },
    { value: "7/7", label: "would use ClassQuest regularly if it were fully functional" },
  ],
  callout: {
    quote:
      '"The previous version seemed a little tricky to use when I had to find the option for uploading sources, but now it was way quicker and easier to do so."',
    source: "— R7, Phase 3 evaluation",
    tag: "⌗ Table 4.4",
  },
  hotjarLead:
    "Behavioral data from Hotjar — recorded across four full sessions — corroborated the self-reported scores rather than contradicting them:",
  metrics: [
    { label: "Engagement", value: "~12 min", body: "average session length, ~12 pages visited per session" },
    { label: "Friction", value: "0 rage clicks", body: "across 156 recorded clicks" },
    { label: "Attention", value: "89.8%", body: "average scroll depth — most of each page was actually read" },
  ],
  close:
    "Top-clicked buttons — Upload Sources, Next, Generate My First Quiz — confirmed participants were moving through the intended contribute → learn pathway, not wandering the edges of the prototype.",
};

export const guidelines = {
  n: "09",
  eyebrow: "Design Guidelines",
  title: "15 guidelines distilled for AI-assisted class wikis",
  intro:
    "Beyond the prototype, the thesis’s second contribution is a set of empirically grounded guidelines — organized into five clusters — for anyone designing a similar system.",
  clusters: [
    {
      group: "Content architecture & contribution",
      items: [
        { g: "G1", text: "Consolidate materials, AI output, and practice in one course-scoped space." },
        { g: "G2", text: "Make the contribution entry point discoverable through multiple paths." },
        { g: "G3", text: "Surface contribution needs contextually, on the topic card itself." },
      ],
    },
    {
      group: "AI transformation & micro-learning",
      items: [
        { g: "G4", text: "Design around retrieval demand, not passive summaries." },
        { g: "G5", text: "Offer differentiated study modes for different goals." },
        { g: "G6", text: "Let students confirm AI extraction before content generation." },
      ],
    },
    {
      group: "Trust calibration & transparency",
      items: [
        { g: "G7", text: "Use source citation chips as the default trust mechanism." },
        { g: "G8", text: "Layer trust: chip → explanation → full source excerpt." },
        { g: "G9", text: "Make AI edits and regeneration visible, never silent." },
        { g: "G10", text: "Communicate that AI output is provisional, not authoritative." },
      ],
    },
    {
      group: "Engagement & motivation",
      items: [
        { g: "G11", text: "Favor light gamification: streaks and tiers over leaderboards alone." },
        { g: "G12", text: "Use a daily set to operationalize spaced review as habit." },
      ],
    },
    {
      group: "Usability & information density",
      items: [
        { g: "G13", text: "Reduce density with vertical nav and progressive disclosure." },
        { g: "G14", text: "Use action-oriented labels that match user mental models." },
        { g: "G15", text: "Invest deliberately in onboarding the contribute → curate → learn loop." },
      ],
    },
  ],
};

export const reflections = {
  n: "10",
  eyebrow: "Reflections & Future Scope",
  title: "What this project actually taught me",
  cards: [
    { label: "Tension", title: "Transparency vs. simplicity", body: "Citation chips, the Explain & Cite panel, and the AI extraction preview all add density in service of trust — exactly what participants also asked to see less of. There’s no clean resolution; only continuous calibration." },
    { label: "Tension", title: 'Voice UI isn’t the only "AI interface"', body: "Designing for a conversational, AI-driven system doesn’t have to mean designing a chat or voice interface — this system stayed fully visual and still felt AI-native through citations and inline assists." },
    { label: "Next", title: "Recurring-feedback → routine suggestions", body: "If a device or topic keeps generating the same correction, the system could proactively suggest converting it into a saved routine — extending an existing pattern rather than inventing a new one." },
    { label: "Next", title: "Test with a functional AI backend", body: "The current evaluation used pre-authored AI content. Real generation latency, occasional errors, and live citation accuracy all need testing before any claims about learning outcomes can be made." },
  ],
  close:
    "The contribution upload flow remained the single hardest problem across both redesign cycles — proof that even a well-validated concept can be undone by one mislabeled button, and that discoverability deserves the same rigor as the feature it’s gating.",
};

export const caseFooter = {
  credit:
    'Case study by Sohaib Bin Kamran · Master in Human-Computer Interaction, University of Siegen · Based on the thesis "User Experience (HCI) for AI-based Knowledge Transfer in Education."',
};

export const closingCta = {
  heading: "Why wait? Take the leap. Make your design process stress-free today.",
  cta: "Let's Talk?",
};
