// WanderLens case study copy.
// Sourced verbatim from Figma redesign node 859-6787 (Portfolio/Wanderlens-CaseStudy)
// + Redesign July/Wanderlens-CaseStudy.svg. Layout/visuals: same Figma frame.
// WanderLens is a solo HCI thesis concept — an AR field guide for hiking trails.

export const meta = {
  eyebrow: "SOLO Project · UX Research & Product Design",
  title: "WANDERLENS",
  intro:
    "An augmented-reality field guide that turns an ordinary hike into a layered, social, slightly game-able adventure — designed and researched end-to-end as a Human-Computer Interaction thesis.",
  prototypeUrl: "https://www.figma.com/proto/MXxffOc1fNdTbvUBfEVA1z/Sohaib-Portfolio",
  facts: [
    { label: "Role", value: "UX Researcher & Designer (solo)" },
    { label: "Scope", value: "Research → Prototype → Evaluation" },
    { label: "Tool", value: "Figma" },
  ],
};

export const problemGoal = [
  {
    tone: "problem" as const,
    eyebrow: "The Problem",
    heading:
      "Hiking apps got really good at the GPS dot. They never got good at the rest of the trail.",
    image: "/images/wanderlens/problem-strip.png",
    imageAlt:
      "Three sketches: an easy A-to-B map, a confused hiker at a trail sign, and a note nobody left behind",
    note: "For new hikers, unfamiliar trails feel more intimidating than inviting",
  },
  {
    tone: "goal" as const,
    eyebrow: "High-Level Goal",
    heading: "Design an AR-First companion for the trail, not the screen",
    image: "/images/wanderlens/goal-strip.png",
    imageAlt:
      "Three sketches: intuitive wayfinding, shared trail discoveries, and light gamification",
    note: "Help people explore with confidence while keeping their eyes on nature",
  },
];

export const story = {
  eyebrow: "Why this matters",
  heading: "Three minutes into any new trail",
  sub: "This is the moment WanderLens is designed for — not the trailhead, not the summit, but the uncertain middle.",
  cards: [
    { image: "/images/wanderlens/story-1.png", alt: "01 / Trailhead — new trail, no familiar signs" },
    { image: "/images/wanderlens/story-2.png", alt: "02 / The fork — right turn? bird call? mark it or move on?" },
    { image: "/images/wanderlens/story-3.png", alt: "03 / The drift — without answers, the hike becomes about finishing, not experiencing" },
  ],
  kickerLead: "WanderLens turns that uncertainty into ",
  kickerAccent: "the most interesting part of the walk.",
};

export const brand = {
  eyebrow: "Brand & Visual Identity",
  heading: "Building a mark that means three things at once",
  sub: "Before a single screen was wired up in Figma, WanderLens needed a visual language that felt as comfortable on a trailhead signpost as it does inside an AR overlay.",
  markHeading: "Three chevrons, one idea",
  markBody:
    "The mark is built from three nested, descending chevrons — a deliberately ambiguous shape that reads as a mountain ridge in profile, a canopy seen from below, and the switchback bend of a trail, all at once. That ambiguity is the point: it lets one symbol stand in for the product's three pillars without needing three separate icons.",
  markPoints: [
    {
      lead: "The point",
      rest: "— direction of travel. The same downward arrow shape reappears literally as the AR guidance arrow inside the app.",
    },
    {
      lead: "The three layers",
      rest: "— AR Navigation, Community Content, and Gamified Learning: the three objectives stacked into one form.",
    },
    {
      lead: "The moss green",
      rest: "— new growth, never the deep, settled green of the wordmark, so the mark always feels slightly in motion.",
    },
  ],
  colors: [
    { name: "Moss", hex: "#7E9A2E", note: 'Primary actions, the AR arrow, anything that means "go."' },
    { name: "Forest", hex: "#2F4428", note: "Wordmark, navigation chrome, the colour of trust." },
    { name: "Sage", hex: "#E7E6D3", note: 'Calm backdrop — "fog on the trail." Used behind achievements.' },
    { name: "Amber", hex: "#F2901A", note: "Gamification only — badges, streaks. Never a primary button." },
    { name: "Paper", hex: "#FBFAF4", note: "Default surface — quiet enough that photos and AR stay the hero." },
  ],
  type: [
    {
      label: "Display — Muli",
      sample: "WANDER",
      note: "Geometric and a little blunt — the same directness as a wooden trailhead signpost. Used for headlines and big numbers only.",
    },
    {
      label: "Body — SF Pro",
      sample: "Navigate trails",
      note: "Quiet and legible. It needs to disappear into the background on a 12km hike, not compete for attention.",
    },
  ],
  guidelines: [
    {
      title: "Curious, not clinical",
      body: "Educational AR overlays are framed as a discovery you just made, never a data sheet you're forced to read.",
    },
    {
      title: "Encouraging, not gamified-to-death",
      body: "Badges and points motivate younger users without turning the trail into a leaderboard for everyone else.",
    },
    {
      title: "Local, not generic",
      body: 'Trails are named and geotagged to real places — Siegerlandhalle, not "Trail #4" — because specificity builds trust.',
    },
  ],
};

export const research = {
  eyebrow: "Research Phase",
  heading: "Reading the literature before drawing a single screen",
  sub: "Fourteen academic sources, a three-app competitive teardown, and a 200-person survey shaped every decision in the prototype that followed.",
  flow: [
    {
      num: "01",
      title: "Literature Review + Competitive Analysis",
      body: "Run in parallel to ground every feature in existing evidence.",
    },
    { num: "02", title: "Figma Design Phase", body: "AR, community, and gamification features built into a clickable prototype." },
    {
      num: "03",
      title: "Guerrilla Testing + Interviews",
      body: "5 impromptu tests, then 5 semi-structured interviews across a 49-year age range.",
    },
  ],
  themes: [
    {
      title: "AR in Outdoor Navigation",
      points: [
        "AR + GPS overlays measurably improve wayfinding (Singh et al., 2022).",
        "Location-based AR storytelling boosts engagement and recall (Nóbrega et al., 2017).",
        "Game-like AR exploration increases children's interest in nature (Sørensen & Kvaløy, 2024).",
      ],
      risk: "Risk: battery + GPS drift → WanderLens optimizes AR rendering and works offline.",
    },
    {
      title: "Gamification & Engagement",
      points: [
        "Competency, autonomy, and social interaction drive AR motivation (Li et al., 2022).",
        "Real-time feedback and presence improve immersion (Marto & Gonçalves, 2022).",
        "Public-space AR gamification raises social interaction (Noreikis et al., 2019).",
      ],
      risk: "Risk: reward fatigue → seasonal challenges & evolving leaderboards.",
    },
    {
      title: "Community-Driven Content",
      points: [
        "Participatory AR lets communities shape shared spaces (Clarke, 2021).",
        "Knowledge mobilization strengthens digital community engagement (Biljon, 2020).",
      ],
      risk: "Risk: misinformation → verification, expert review & upvoting.",
    },
  ],
  teardownTitle: "Competitive teardown",
  teardown: [
    { app: "AllTrails", strength: "Deep trail database, strong review system", gap: "No AR — purely map & review based" },
    { app: "ViewRanger", strength: '"Skyline" AR waypoint overlay', gap: "Basic AR, weak social/community layer" },
    { app: "Wikitude", strength: "Flexible, powerful AR dev platform", gap: "Not hiking-specific; needs heavy customization" },
  ],
  teardownKicker: {
    lead: "No existing app combines ",
    parts: ["AR guidance", " + ", "community content", " + ", "education"],
    tail: " in one platform. That gap became the brief.",
  },
  surveyTitle: "What 200 hikers actually wanted",
  survey: [
    { stat: "85%", label: "Ease of navigation", body: "Top priority — intuitive AR directions that blend in rather than overwhelm." },
    { stat: "78%", label: "Interactive content", body: "Wanted AR that teaches them about flora, fauna, and trail history as they walk." },
    { stat: "65%", label: "Community interaction", body: "Wanted to share discoveries and trail recommendations with other hikers." },
  ],
  surveyNote: "Survey, n = 200 frequent hikers & outdoor users",
  socioTitle: "Socio-informatics principles applied",
  socio: [
    {
      image: "/images/wanderlens/socio-1.png",
      alt: "Community Building — shared trail discoveries build connection",
      caption:
        "Technology that facilitates shared experience builds genuine community bonding (Doe & White, 2023) — the foundation for WanderLens' geotagged, user-contributed content.",
    },
    {
      image: "/images/wanderlens/socio-2.png",
      alt: "Inclusivity — designed for access from day one",
      caption:
        "Accessibility research (Lee & Kim, 2024) shaped the commitment to voice navigation, high-contrast visuals, and scalable text from day one — not as an afterthought.",
    },
  ],
};

export const prototype = {
  eyebrow: "Design Phase",
  heading: "From research findings to a clickable Figma prototype",
  sub: "Every screen below answers a specific gap surfaced in the research — built for simplicity and accessibility first, AR spectacle second.",
  groups: [
    {
      num: "01",
      title: "Getting in, getting oriented",
      sub: "Deliberately quiet — onboarding shouldn't compete with the AR moments to come.",
      screens: [
        {
          image: "/images/wanderlens/screen-splash.png",
          title: "Brand entrance",
          body: "The misty forest backdrop and mark double as both a loading screen and a first impression.",
        },
        {
          image: "/images/wanderlens/screen-signin.png",
          title: "Sign in",
          body: "One filled button, one outline. Kept boring on purpose.",
        },
        {
          image: "/images/wanderlens/screen-explore.png",
          title: "Explore",
          body: "Trail cards lead with a photo and the stats AllTrails buries: rating, difficulty, distance, time.",
        },
      ],
    },
    {
      num: "02",
      title: "AR Navigation — the feature every interviewee named first",
      sub: "From a familiar map metaphor into a fully overlaid camera view.",
      screens: [
        {
          image: "/images/wanderlens/screen-trail-detail.png",
          title: "Trail detail",
          body: "Length, elevation, and time read like a spec sheet, not marketing copy.",
        },
        {
          image: "/images/wanderlens/screen-route-preview.png",
          title: "Route preview",
          body: 'A familiar satellite map before the hiker commits to "Start Navigating."',
        },
        {
          image: "/images/wanderlens/screen-ar-guidance.png",
          title: "Live AR guidance",
          body: 'The floating arrow overlaid on the real path — "It\'s like Pokémon Go but for nature," P1, 22.',
        },
      ],
    },
    {
      num: "03",
      title: "Immersive exploration & community content",
      sub: 'The answer to "no centralized way to document and share discoveries."',
      screens: [
        {
          image: "/images/wanderlens/screen-poi-tag.png",
          title: "Point-of-interest tag",
          body: "A marker appears mid-trail when someone has left something behind to find.",
        },
        {
          image: "/images/wanderlens/screen-classic-raven.png",
          title: "Classic Raven",
          body: 'Geotagged, user-uploaded content — "If I recorded a bird sound and someone else finds it, that\'s pretty amazing," P3, 16.',
        },
        {
          image: "/images/wanderlens/screen-community-feed.png",
          title: "Community feed",
          body: "Trail stories sit alongside the people who told them — social proof, not a stats dashboard.",
        },
      ],
    },
    {
      num: "04",
      title: "Gamification & progress",
      sub: "Built to motivate without becoming the point of the hike.",
      screens: [
        {
          image: "/images/wanderlens/screen-achievements.png",
          title: "Achievements",
          body: '"Longest Activity: 14kms" — milestones framed as personal record, not competition.',
        },
        {
          image: "/images/wanderlens/screen-profile.png",
          title: "Profile & journal",
          body: "Stats and saved trails live next to a build-your-own trail journal.",
        },
        {
          image: "/images/wanderlens/screen-saved-tracks.png",
          title: "Saved tracks",
          body: "Bookmarking for the offline-first hikers who plan ahead.",
        },
      ],
    },
  ],
  statNumber: "12+",
  statLabel: "screens prototyped in Figma",
  statNote: "Iterated, not shipped once. The prototype went through several rounds of usability refinement before evaluation.",
};

export const evaluation = {
  eyebrow: "Evaluation Phase",
  heading: "Testing the prototype on real hikers, not just paper",
  sub: "A guerrilla round to catch the obvious problems fast, followed by five semi-structured interviews built to stress-test the concept across a genuinely wide range of people.",
  guerrilla: {
    title: "Guerrilla Testing — 5 participants",
    points: [
      "Universal appeal: even the one non-hiker in the group still found the prototype engaging.",
      "AR navigation was the clear standout feature across the board.",
      "Community-building elements (finding others by shared trail interests) landed well.",
      "Younger participants responded strongly to achievements and badges.",
    ],
  },
  suggestions: {
    title: "Suggestions surfaced",
    points: [
      "Offline map support, for areas with no signal.",
      "Ability to add and share custom, user-created trails.",
      "More immersive storytelling — blending AR with richer visual effects.",
    ],
  },
  interviewsTitle: "Five interviews, a 49-year age range",
  personas: [
    "22 · Vietnamese · Environmental Science student",
    "58 · German · Retired Electrical Engineer",
    "16 · Pakistani · High School Student",
    "35 · Albanian · Logistics Manager",
    "65 · Indian · Retired Teacher",
  ],
  cards: [
    { image: "/images/wanderlens/eval-1.png", alt: 'AR resonates across ages — "Like Pokémon Go, but for nature." 22, student' },
    { image: "/images/wanderlens/eval-2.png", alt: 'Community adds real value — "Someone finds my bird sound — amazing." 16, student' },
    { image: "/images/wanderlens/eval-3.png", alt: 'Gamification motivates — "Points would make me hike more." 55, logistics manager' },
    { image: "/images/wanderlens/eval-4.png", alt: 'Simplicity matters — "I\'d stop and check if it\'s easy." 58, retired engineer' },
    { image: "/images/wanderlens/eval-5.png", alt: 'Offline is essential — "If it works offline, I\'ll use it every time." 66, retired teacher' },
    { image: "/images/wanderlens/eval-6.png", alt: 'AR as a learning tool — "Nature\'s guidebook, but cooler." 23, student' },
  ],
};

export const features = {
  eyebrow: "Socio-informatics Perspective",
  heading: "Every feature maps to a human need, not just a checkbox",
  sub: "WanderLens isn't only an AR app — it's a socio-technical system designed around four deliberate outcomes.",
  cards: [
    { image: "/images/wanderlens/feature-1.png", alt: "Community-Building — shared trail discoveries become collective memory", bg: "var(--wl-forest-panel)" },
    { image: "/images/wanderlens/feature-2.png", alt: "Inclusivity — voice, contrast, and scalable text open the trail to more people", bg: "#8da145" },
    { image: "/images/wanderlens/feature-3.png", alt: "Learning & Engagement — AR turns flora, fauna, and history into discoveries", bg: "#e9e6d7" },
    { image: "/images/wanderlens/feature-4.png", alt: "Sustainability Awareness — challenges and rewards encourage eco-friendly hiking", bg: "#faddbc" },
  ],
};

export const limitations = {
  eyebrow: "Known Unknowns",
  heading: "Being honest about what's hard",
  sub: "An AR hiking app inherits constraints that a map app never has to think about.",
  cards: [
    { image: "/images/wanderlens/limit-1.png", alt: "1 Hardware dependency — fallback to standard maps on older devices" },
    { image: "/images/wanderlens/limit-2.png", alt: "2 Connectivity & battery — offline-first maps + lighter AR reduce energy draw" },
    { image: "/images/wanderlens/limit-3.png", alt: "3 User diversity — voice options, progressive disclosure, AR only when wanted" },
    { image: "/images/wanderlens/limit-4.png", alt: "4 Safety & privacy — transparent policies and user-controlled visibility" },
    { image: "/images/wanderlens/limit-5.png", alt: "5 Content moderation — verification, expert review, and community upvoting" },
    { image: "/images/wanderlens/limit-6.png", alt: "6 Cost & scalability — phased rollout, starting with one regional trail network" },
  ],
};

export const roadmap = {
  eyebrow: "Future Scope",
  heading: "What comes after?",
  columns: [
    {
      tag: "Short-Term",
      title: "Validate at scale",
      items: ["Finalize prototype testing", "Launch a public beta for real-trail trials"],
    },
    {
      tag: "Mid-Term",
      title: "Sharpen the AR",
      items: ["AI-powered AR object recognition for flora & fauna", "Expand gamification with seasonal challenges"],
    },
    {
      tag: "Long-Term",
      title: "Grow the ecosystem",
      items: ["Partnerships with eco-tourism organizations", "Wearable integration for hands-free AR navigation"],
    },
  ],
};

export const reflections = {
  eyebrow: "Reflections & Takeaways",
  heading: "What this project taught me",
  cards: [
    {
      num: "01",
      title: "Designing for a sense, not a screen",
      body: 'Success in AR isn\'t measured by UI polish — it\'s measured by how fast someone stops looking at the phone and starts looking at the trail. The interviews confirmed it directly: older participants wanted to "stop and check," never walk staring at a screen.',
    },
    {
      num: "02",
      title: "Research earns the right to design",
      body: "Running the literature review and competitive analysis before touching Figma meant every AR, community, and gamification decision had a citation or a data point behind it — not just a hunch.",
    },
    {
      num: "03",
      title: "One interface, a 49-year age gap",
      body: "Designing simultaneously for a 16-year-old who wants achievements and a 65-year-old who wants voice guidance taught me that inclusivity isn't a feature — it's a constraint that should shape every screen.",
    },
  ],
};

export const caseFooter = {
  wordmark: "WANDERLENS",
  blurb:
    "A solo Human-Computer Interaction thesis exploring how augmented reality can make local nature exploration more accessible, social, and worth looking up for.",
  credit: "Case study by Sohaib Bin Kamran · WanderLens HCI Thesis",
};

export const closingCta = {
  heading: "Why wait? Take the leap. Make your design process stress-free today.",
  cta: "Let's Talk?",
};
