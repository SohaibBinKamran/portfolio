// Cinefatic case study copy.
// Verbatim from Figma node 869-5598 (Portfolio/Cinefatic-CaseStudy). Marketing copy
// reuse approved (REDESIGN-CONTEXT §7). Cinefatic is a self-directed product design
// project — a city-wide cinema booking app for Karachi.

export const meta = {
  eyebrow: "Case Study 001 — Consumer Mobile App",
  title: ["Making movie night", "a two-minute decision."],
  intro:
    "Karachi had no reliable way to book a cinema ticket online. Cinefatic replaces the phone call nobody answers with a booking flow that takes less time than the trailer.",
  facts: [
    { label: "Role", value: "Product Designer — Research, Strategy & UI/UX" },
    { label: "Timeline", value: "2022 – 2023" },
    { label: "Platform", value: "Mobile App (iOS)" },
    { label: "Market", value: "Karachi, Pakistan" },
  ],
  ticketStub: "Admit One · Cinefatic",
  heroCaptionLeft: "Fig. 01 — Home screen, now-showing carousel",
  heroCaptionRight: "End-to-end: research → strategy → UI/UX",
};

export const heroStats = [
  {
    value: "<2min",
    label: "Average booking time",
    note: "From opening the app to a confirmed seat — including payment.",
  },
  {
    value: "90%",
    label: "Faster than the old way",
    note: "Reduction in time spent versus calling or queuing in person.",
  },
  {
    value: "All",
    label: "Major cinemas, one app",
    note: "Nueplex, Atrium and other major Karachi chains, unified.",
  },
];

export const heroScreens = [
  { src: "/images/cinefatic/hero-screen-left.png", alt: "Cinefatic home screen with a Parasite feature banner", rotate: -8.48 },
  { src: "/images/cinefatic/hero-screen-center.png", alt: "Cinefatic home screen with a Spider-Man: Across the Spider-Verse feature banner", rotate: 0 },
  { src: "/images/cinefatic/hero-screen-right.png", alt: "Cinefatic home screen with a Back to the Future feature banner", rotate: 8.48 },
];

export const problem = {
  eyebrow: "The Problem",
  heading: "So, what's actually broken?",
  intro: [
    "As a regular at the movies, I kept hitting the same wall trying to book a ticket for **Nueplex**, one of Karachi's biggest cinema chains. In a city that runs on WhatsApp and mobile banking, buying a movie ticket still meant a phone call — or a trip you hadn't planned on making.",
    "That frustration raised an obvious question: was this just me, or was Karachi's entire movie-going audience stuck with the same broken system? To find out, I mapped the journey people actually go through to get a seat on opening night.",
    "The answer was consistent across every conversation: there were really only two ways to get a ticket — go to the cinema in person, or call and hope someone picks up. Both were riddled with friction, and neither told you whether the good seats were even still available.",
  ],
  image: "/images/cinefatic/problem-strip.png",
  imageAlt:
    "A six-panel comic following one moviegoer through a failed online search, an unanswered phone call, a forced trip to the cinema, a queue, and finally losing the good seats",
  caption:
    "Fig. 02 — The ticket-buying gauntlet: the only two paths to a Nueplex ticket, before Cinefatic",
  quote:
    "“Is my ticket really booked? I can't even see the seating chart.” — the moment every user described, one way or another.",
};

export const market = {
  eyebrow: "Market Landscape",
  heading: "Why did this problem still exist?",
  intro:
    "The user journey was clearly broken — but that alone doesn't explain why nobody had fixed it. A competitive scan of the booking landscape gave a clear answer: the gap wasn't a feature gap, it was a market gap.",
  logos: [
    { src: "/images/cinefatic/logo-1.png", alt: "Bookme.pk", caption: "Doesn't list Nueplex" },
    { src: "/images/cinefatic/logo-2.png", alt: "Nueplex Cinemas", caption: "No online booking, anywhere" },
    { src: "/images/cinefatic/logo-3.png", alt: "Fandango", caption: "The benchmark, unmatched locally" },
    { src: "/images/cinefatic/logo-4.png", alt: "AMC Theatres", caption: "Global UX bar for cinema apps" },
  ],
  cards: [
    {
      n: "01",
      title: "Limited Platforms",
      body: "Existing sites like Bookme.pk and Bookmyshow.pk simply don't support major cinemas like Nueplex or Atrium.",
    },
    {
      n: "02",
      title: "No Central Hub",
      body: "Karachi has no all-in-one booking app — nothing playing the role Fandango plays in other markets.",
    },
    {
      n: "03",
      title: "Broken Experience",
      body: "Even Nueplex's own website offers no way to book a ticket online. The gap sits at every layer.",
    },
  ],
};

export const pivot = {
  eyebrow: "The Strategic Pivot",
  heading: "From a niche fix to a market-wide solution",
  before:
    "My original idea was small and personal: design a booking flow for Nueplex, the cinema I kept getting stuck on. The research said otherwise. This wasn't a Nueplex problem — it was a Karachi problem, affecting customers of every major chain in the city.",
  quote: "The data pointed past Nueplex. It pointed at every moviegoer in Karachi.",
  after:
    "That reframed the brief: instead of a single-cinema app, I scoped Cinefatic as a comprehensive, Fandango-style platform for the whole city. The pivot mattered for three reasons — it addressed the full breadth of user demand instead of one segment, it captured a genuinely untapped market gap, and it gave the product a real competitive moat by making it the definitive all-in-one platform, not just another single-cinema workaround.",
};

export const prioritization = {
  eyebrow: "Prioritization",
  heading: "Deciding what to build first",
  intro:
    "A city-wide platform opens up a long list of possible features. To ship something meaningful fast, I ran every idea through an Impact vs. Effort exercise and built the MVP entirely from the “quick win” quadrant — high impact for users, low lift to build.",
  image: "/images/cinefatic/matrix.png",
  imageAlt:
    "An Impact versus Effort matrix with feature ideas as sticky notes; QR-code ticket, guest checkout, reviews, seat visualisation and push notifications sit in the high-impact, low-effort quadrant",
  cards: [
    {
      n: "01",
      title: "Centralized Showtime Listings",
      body: "Solves the core information-gathering problem — one place to see what's playing, where, and when.",
    },
    {
      n: "02",
      title: "Online Seat Selection",
      body: "Directly addresses the single biggest frustration from research: not knowing what seats you're actually getting.",
    },
    {
      n: "03",
      title: "Digital Payments",
      body: "Modernizes the transaction and removes the need for any in-person or over-the-phone step entirely.",
    },
  ],
};

export const solution = {
  eyebrow: "Designing the Solution",
  heading: "Four screens, four points of friction",
  intro:
    "Each part of the flow maps directly back to a specific breakdown found in research — from a fragmented discovery experience, all the way to the moment a user decides whether to trust the app with their card.",
  screens: [
    {
      label: "Screen 01",
      title: "Home — driving engagement by simplifying discovery",
      lead: "Before Cinefatic, finding a movie meant piecing information together from several sources. There was no single, reliable place to just look and decide — discovery felt like a chore, not the fun part of a movie night.",
      shots: [
        { src: "/images/cinefatic/s1-home-hero.png", alt: "Home screen with a Spider-Man: Across the Spider-Verse hero banner and Play Trailer / Book Tickets buttons" },
        { src: "/images/cinefatic/s1-home-picks.png", alt: "Home screen showing Cinemas Near You and Top Picks This Week carousels" },
      ],
      points: [
        { title: "Accelerated Discovery", body: "A large, visual hero banner surfaces high-interest movies instantly, cutting search time and driving attention to key titles." },
        { title: "Immediate Personalization", body: "The location selector is the first thing a user sees, so the very first screen is already relevant to them." },
        { title: "Simplified Navigation", body: "Logically grouped carousels reduce cognitive load, letting users scan a large amount of content quickly." },
      ],
    },
    {
      label: "Screen 02",
      title: "Movie detail — building confidence with centralized information",
      lead: "Previously, users had no single place to check ratings, runtimes, and showtimes together — forcing them out of the booking flow entirely, often to a third-party app, just to make a decision.",
      shots: [
        { src: "/images/cinefatic/s2-detail-showtimes.png", alt: "Movie detail screen, Showtimes tab, with a date selector and a list of cinemas" },
        { src: "/images/cinefatic/s2-detail-info.png", alt: "Movie detail screen, Details tab, with synopsis, cast and reviews" },
      ],
      points: [
        { title: "Focused Browse", body: "The screen splits cleanly into Showtimes and Movie Details, so users focus on one task at a time." },
        { title: "Complete Context", body: "Synopsis, cast and reviews all live inside the app, so nobody has to leave for IMDb to make a confident call." },
        { title: "Clear Comparisons", body: "Each cinema is its own self-contained card, turning a messy hierarchy of showtimes into scannable, comparable chunks." },
      ],
    },
    {
      label: "Screen 03",
      title: "Seats & snacks — control and convenience, in one line",
      lead: "Old booking methods gave users zero control over where they'd sit. And buying snacks meant a second, often long, queue at the cinema — one more friction point standing between the user and the movie.",
      shots: [
        { src: "/images/cinefatic/s3-seats-empty.png", alt: "Interactive seat-selection screen with an empty seat map" },
        { src: "/images/cinefatic/s3-seats-selected.png", alt: "Seat-selection screen with two seats selected and a Continue button" },
        { src: "/images/cinefatic/s3-snacks.png", alt: "Snack upsell screen for adding popcorn and drink combos before checkout" },
      ],
      points: [
        { title: "Full Control", body: "An interactive seat map gives users a clear view of the theatre, letting them choose their exact seats." },
        { title: "Integrated Upsell", body: "An optional snack add-on lifts average order value while solving a real pain point: waiting in a second line." },
      ],
    },
    {
      label: "Screen 04",
      title: "Onboarding — maximizing conversion by making sign-up optional",
      lead: "Industry research is clear that forcing account creation is a primary driver of cart abandonment. The challenge was earning long-term sign-ups without putting friction between a user and an already-decided purchase.",
      shots: [
        { src: "/images/cinefatic/s4-signin.png", alt: "Sign-in screen offering account perks alongside a prominent Continue as Guest option" },
      ],
      points: [
        { title: "Value-driven sign-up", body: "Rather than just demanding registration, the screen leads with the actual perks — faster checkout, saved bookings, exclusive offers — turning sign-up into a choice worth making." },
        { title: "A prominent guest path", body: "“Continue as guest” is a primary button, not an afterthought — protecting the sale first and asking for the relationship second." },
      ],
    },
  ],
  callout: {
    stat: "47%",
    body: "of sites fail to make guest checkout prominent enough, per the Baymard Institute — the exact gap Cinefatic's onboarding was built to close.",
  },
};

export const results = {
  eyebrow: "Results",
  heading: "From a phone call to a two-minute flow",
  intro:
    "Cinefatic brought showtimes, seat selection and checkout for Karachi's major cinemas into a single mobile app — replacing a process that used to depend on someone picking up the phone.",
  stats: [
    { value: "<2min", label: "End-to-end booking time", note: "Search, seat, snacks and checkout — start to confirmed ticket." },
    { value: "90%", label: "Time saved vs. the old way", note: "Compared with calling ahead or queueing in person." },
    { value: "1 App", label: "Every major cinema, unified", note: "No more per-cinema calls, sites, or in-person trips." },
  ],
};

export const reflections = {
  eyebrow: "Reflections",
  heading: "What this project taught me",
  cards: [
    {
      title: "Don't let scope match your first frustration",
      body: "I walked in trying to fix my own Nueplex problem. The research kept pointing at something bigger, and the harder discipline was letting the brief grow with the evidence instead of shipping the smaller, safer version I'd originally imagined.",
    },
    {
      title: "Trust is a UX problem before it's a payments problem",
      body: "Nobody hesitates over a seat map. They hesitate over handing a new app their card details. Framing onboarding around trust, not just conversion, is what made the guest-checkout decision an easy one.",
    },
  ],
};

export const closingCta = {
  heading: ["Why wait? Take the leap.", "Make your design process stress-free today."],
  cta: "Let's Talk?",
};
