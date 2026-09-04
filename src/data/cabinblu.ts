// CabinBlu case study — copy sourced verbatim from Figma "Portfolio/CabinBlu-Project Diary Study"
// (file MXxffOc1fNdTbvUBfEVA1z, node 869:7278). See design-audit/CABINBLU_HANDOFF.md §5.
// One correction applied per the handoff: a missing space in insight 01's body copy.

export const hero = {
  eyebrow: "UX Research Case Study · Eurowings Digital × Lufthansa Innovation Hub",
  headlineLine1: "Fear of flying doesn't wait for a usability session.",
  headlineLine2: "So we tracked it for 14 real days.",
  sub: "A longitudinal diary study on CabinBlu, a flight-anxiety app — following 12 anxious flyers from booking to boarding to see whether the app actually meets fear where it lives.",
  boardingPass: {
    airline: "Lufthansa",
    kicker: "Boarding Pass — Case Study",
    classTag: "RESEARCH CLASS",
    fields: [
      { label: "PASSENGER", value: "Anxious Flyer" },
      { label: "ROLE", value: "UX Researcher" },
      { label: "METHOD", value: "14-Day Diary" },
      { label: "PARTY", value: "12 Travellers" },
    ],
    fromLabel: "FEAR",
    toLabel: "CALM",
    seatLabel: "SEAT",
    seatValue: "D0–D14",
    classLabel: "RESEARCH CLASS",
    footerLeft: "Gate closes at insight #8 — see below",
    footerRight: "Every insight moves you forward.",
    stripLeft: "LH CASE STUDY | RESEARCH FLIGHT",
    stripRight: "THANK YOU FOR BEING ON BOARD.",
  },
};

export const departures = {
  heading: "✦ Departures — Why This Study, In Five Numbers ✦",
  stats: [
    { value: "12", label: "anxious flyers, moderate → strong avoidance" },
    { value: "14", label: "days tracked per participant" },
    { value: "24", label: "moderated interviews" },
    { value: "5", label: "survey touchpoints along the journey" },
    { value: "3", label: "distinct anxiety trajectories found", accent: true },
  ],
};

export const context = {
  eyebrow: "01 · Context",
  heading: "A calm app is only as good as its fit into a frightened person's real week.",
  body: "CabinBlu offers meditations, education and a personalized flight plan. But content quality alone doesn't guarantee impact — timing, emotional relevance and fit into real travel moments do. We didn't know if CabinBlu changed how fear actually felt over time, or just sat unused beside a fear running on its own schedule.",
  ndaNotice:
    "Participant quotes are drawn from sessions conducted under signed NDAs. Names are replaced with study codes (P1‑1, P2‑3…) and details generalized to protect confidentiality.",
};

export const flightPlan = {
  eyebrow: "02 · Flight Plan",
  heading: "Five questions we filed before takeoff.",
  questions: [
    {
      q: "How does anxiety evolve, Day 0 → Day 14?",
      sub: "Linear, spiking, or does it ever actually go down?",
    },
    {
      q: "What content lands, and when?",
      sub: "Which formats and topics help, and at which moments?",
    },
    {
      q: "What drives — or kills — engagement?",
      sub: "How people actually use the app beyond the first open.",
    },
    {
      q: "Does it support key moments?",
      sub: "Booking, packing, check-in, day-of — present, or absent?",
    },
    {
      q: "What's still unmet?",
      sub: "What friction remains even for people actively trying?",
    },
  ],
};

export const route = {
  eyebrow: "03 · Route",
  heading: "Mixed-method, longitudinal, low-friction.",
  body: "A single usability session can't capture anxiety that builds over two weeks — so the study lived inside participants' real pre-flight window, bookended by moderated interviews.",
  timeline: [
    { day: "D0", label: "Baseline", sub: "Interview + survey" },
    { day: "D3", label: "Check-in", sub: "Survey" },
    { day: "D6", label: "Check-in", sub: "Survey" },
    { day: "D10", label: "Check-in", sub: "Survey" },
    { day: "D14", label: "Closing", sub: "Interview + survey", accent: true },
  ],
  cards: [
    {
      icon: "🧳",
      title: "Recruitment",
      body: "12 leisure & business flyers, ranging from moderate discomfort to strong avoidance — all real or occasional flyers, so findings stayed grounded.",
    },
    {
      icon: "📓",
      title: "Diary phase",
      body: "Participants lived with the app on their own schedule, self-reporting anxiety and experience at five touchpoints in English or German.",
    },
    {
      icon: "🗂️",
      title: "Synthesis",
      body: "24 recordings tagged in Condens; themes clustered in Miro into emotional, cognitive and trust patterns, then mapped onto the journey.",
    },
  ],
};

export const findings = {
  eyebrow: "04 · In-Flight Findings",
  heading: "Eight things the roadmap didn't know yet.",
  sub: "Tap a card to open it. Spanning how anxiety works, what people expect from the app, and where the experience falls short.",
  cards: [
    {
      n: "01",
      title: "Anxiety is anticipatory, and information cuts both ways",
      body: "Most participants already know flying is statistically safe — that was never the issue. The issue is losing control of the situation, and that feeling grows the closer the flight gets. Avoidance and control-seeking coexist in the same person; information calms some and overwhelms others.",
      quote: "I always trust the pilot, but I don't know what's going on inside their heads.",
      attribution: "— P2-4",
    },
    {
      n: "02",
      title: "People are patching the problem, not solving it",
      body: "Coping today is a grab-bag: distraction, alcohol, sedatives, rationalisation, breathing tricks, or just not thinking about it. None of it is structured, and there's no learning effect flight to flight — exactly the gap CabinBlu is positioned to fill, if it goes beyond distraction.",
    },
    {
      n: "03",
      title: "Strong first impression, but not a distinctive one",
      body: "The clean, minimal design and blue palette were read as calming, and navigation felt intuitive. But several participants called it pleasant rather than memorable — a nice app, not yet a trusted companion.",
    },
    {
      n: "04",
      title: "Onboarding is understood, but feels generic",
      body: "The core idea — prepare, learn, manage anxiety — resonates immediately. What's missing is tailoring: people can't tell what to do next, or how the app is adapting to what they just told it about themselves.",
      quote: "I'd say it's just clear what you have to do and what you can do.",
      attribution: "— P2-4, after a week of use",
    },
    {
      n: "05",
      title: "Audio first, but the lines are blurry",
      body: 'Real preference for audio-led exercises during anxious moments — but confusion about what separates an "exercise" from an "audio," why content is locked, and whether Explore should be read or listened to.',
      quote: "I expect it to be more focused on flying itself, not only on anxiety.",
      attribution: "— P2-4",
    },
    {
      n: "06",
      title: "The personalized Flight Plan is appealing, execution gets in its own way",
      body: "Adding a flight and getting a tailored plan felt motivating — structure and confrontation instead of avoidance. But time-entry confused people, and it's unclear what they get back after entering details.",
    },
    {
      n: "07",
      title: "Trust has a visible gap",
      body: 'Anxious users actively interrogate credibility: is this built by psychologists? Backed by data, or by "anxiety gurus"? A disclaimer that it isn\'t medical advice helps — but isn\'t enough alone.',
      quote: "If it's backed by the data and not by … gurus … that should do the trick.",
      attribution: "— P1-3",
    },
    {
      n: "08",
      title: "Emotional fit is mixed - and representation is part of that",
      body: "Structured, gradual exposure was genuinely appreciated, but some content felt childish (the hug feature), and some headlines triggered rather than reassured. Imagery only depicted white travellers — a real inclusivity gap for a global airline product.",
      quote: "It feels not very inclusive.",
      attribution: "— P2-3, on the app's imagery",
    },
  ],
};

export const flightRecorder = {
  eyebrow: "05 · Flight Recorder",
  heading: "Anxiety doesn't fall in a straight line.",
  sub: "The riskiest moment isn't Day 0 — three distinct trajectories emerged, and the most common one dips early, then climbs right as the flight stops being abstract.",
  panel: {
    eyebrow: "05 · Anxiety Over Time",
    heading: "Anxiety doesn't fall in a straight line — and the riskiest moment isn't Day 0.",
    body: "Across the 14-day diaries, three distinct trajectories emerged. The most common pattern: anxiety eases early — novelty and initial engagement help — then climbs back up in the final days, right as the flight stops being abstract. That late window is exactly where the app currently offers the least.",
  },
  legend: [
    { label: "Early improvement, late spike", color: "var(--cb-chart-amber)" },
    { label: "Fluctuating", color: "var(--cb-chart-teal)" },
    { label: "Stable / high throughout", color: "var(--cb-chart-coral)" },
  ],
  axisDays: ["Day 0", "Day 3", "Day 6", "Day 10", "Day 14"],
  markerLabel: "flight day approaches",
  caption:
    "Illustrative trend shapes derived directly from diary entries and closing interviews — directional patterns, not exact anxiety scores. Across most participants: a slight dip from Day 0 → Day 6, driven by initial engagement and novelty, followed by a renewed rise from Day 6 → Day 14 as the flight stops being hypothetical.",
};

export const journey = {
  eyebrow: "06 · Pre-Flight Journey",
  heading: "The app shows up reliably in one place — and that's not where fear is highest.",
  sub: "Mapping diary entries onto the real pre-flight journey surfaced a clear pattern: anxiety hotspots and app presence don't line up. Scroll through the five stops below.",
  stops: [
    {
      stop: "STOP 01 / 05",
      chip: "Gap — app mostly absent",
      chipTone: "gap" as const,
      emoji: "✈️",
      title: "Booking",
      subtitle: "Avoidance & control-seeking",
      body: "Delayed or avoided bookings, and a strong need for control over airline, aircraft type and direct routes — while CabinBlu has nothing to say yet.",
      quotes: [{ text: "I browse for days… part of it is avoiding the commitment.", attribution: "PARTICIPANT, BASELINE" }],
      image: "/images/cabinblu-journey-01-booking.png",
      annotation: '"add first flight" — then?',
      annotationNote: "🕳️ nothing here before you add a flight",
    },
    {
      stop: "STOP 02 / 05",
      chip: "Opportunity — low-effort entry",
      chipTone: "opportunity" as const,
      emoji: "🧳",
      title: "Packing",
      subtitle: "Coping through control",
      body: 'Packing becomes a control-restoration ritual — medication, headphones, snacks, overpacking "just in case." A natural, low-intensity moment for the app to meet people.',
      quotes: [{ text: "I pack everything I might need… just in case.", attribution: "PARTICIPANT, D3 DIARY" }],
      image: "/images/cabinblu-journey-02-packing.png",
      annotation: "explore exists… quietly",
      annotationNote: "📚 content exists, but isn't offered here",
    },
    {
      stop: "STOP 03 / 05",
      chip: "Opportunity — decision moment",
      chipTone: "opportunity" as const,
      emoji: "🎫",
      title: "Check-in",
      subtitle: "The reality checkpoint",
      body: "Anxiety rises because the flight becomes unavoidable. Seat selection turns emotionally loaded — an ideal decision moment for targeted, in-context support.",
      quotes: [
        { text: "This is when it becomes real.", attribution: "PARTICIPANT, D6 DIARY" },
        { text: "I want an aisle seat so I can get up if needed.", attribution: "PARTICIPANT, D6 DIARY" },
      ],
      image: "/images/cabinblu-journey-03-checkin.png",
      annotation: "right question, wrong day",
      annotationNote: "🙋 the app already asks — just at the wrong time",
    },
    {
      stop: "STOP 04 / 05",
      chip: "Opportunity — peak anxiety",
      chipTone: "opportunity" as const,
      emoji: "🛫",
      title: "Airport & gate",
      subtitle: "The most emotionally rich phase",
      body: "Leaving home → journey stress → security → gate → boarding: anxiety climbs step by step and peaks at the gate. Low-effort, passive audio wins here.",
      quotes: [{ text: "Boarding is the moment it becomes real. There's no way back.", attribution: "PARTICIPANT, D10 DIARY" }],
      image: "/images/cabinblu-journey-04-airport.png",
      annotation: "05:41 of calm, if you find it",
      annotationNote: "🎧 audio works — when people can find it fast",
    },
    {
      stop: "STOP 05 / 05",
      chip: "Gap — needs near-zero effort",
      chipTone: "gap" as const,
      emoji: "☁️",
      title: "In the air",
      subtitle: "Peak anxiety, lowest tolerance for effort",
      body: "Users need immediate, passive calm — not a training plan. Content here must ask almost nothing of the user, and be safe to repeat.",
      quotes: [{ text: "I just want to get on the plane at that point.", attribution: "PARTICIPANT, CLOSING INTERVIEW" }],
      image: "/images/cabinblu-journey-05-inair.png",
      annotation: "13 min plan, 0 min patience",
      annotationNote: "🐢 today's plan ≠ one-tap in-air calm",
    },
  ],
};

export const baggageClaim = {
  eyebrow: "07 · Baggage Claim",
  heading: "Turning eight insights into eight concrete bets.",
  sub: "Framed as prioritized opportunities for product, content and design to weigh against effort and roadmap capacity — not a redesign mandate.",
  tags: [
    {
      n: "01",
      insight: "Anxiety peaks pre-flight, not Day 0",
      bet: "Re-weight content toward the final days — motivation early, acute coping tools timed to flight proximity",
    },
    {
      n: "02",
      insight: "App absent during booking & packing",
      bet: "Light-touch nudges at booking confirmation + a packing checklist as low-effort entry points",
    },
    {
      n: "03",
      insight: "Users question credibility",
      bet: "Surface sourcing & credentials directly in-product, beyond a one-line disclaimer",
    },
    {
      n: "04",
      insight: "Onboarding feels generic",
      bet: "Branch onboarding by primary driver — control, catastrophic thinking, physical symptoms",
    },
    {
      n: "05",
      insight: "Audio vs. text confusion",
      bet: "Offer a format toggle or parallel transcript instead of locking content to one mode",
    },
    {
      n: "06",
      insight: "Imagery represents one type of traveller",
      bet: "Diversify the visual language so more real users see themselves in it",
    },
    {
      n: "07",
      insight: "Day-of-flight needs near-zero effort",
      bet: 'A one-tap "in the air now" mode — audio-led, minimal interaction, safe to repeat',
    },
    {
      n: "08",
      insight: "Flight Plan time-entry confuses people",
      bet: "Simplify flight-detail entry, make the payoff explicit after providing it",
    },
  ],
};

export const arrivals = {
  eyebrow: "08 · Arrivals",
  heading: "From transcripts to a prioritized roadmap conversation.",
  items: [
    {
      title: "Reframed where the roadmap should focus",
      body: "Booking-and-packing gaps and the late-stage spike became concrete arguments for re-sequencing content, not just polishing the existing flow.",
    },
    {
      title: "Informed the Eurowings integration conversation",
      body: "Participants reacted directly to CabinBlu living inside the main Eurowings app rather than as a separate download.",
    },
    {
      title: "Built reusable research infrastructure",
      body: "Tagging structures, survey templates and a highlight-reel workflow were carried into other airline-journey research.",
    },
    {
      title: "Future scope",
      body: "Validate the three trajectories at scale, prototype booking/packing nudges, and explore a try-then-pay content model.",
    },
  ],
};

export const postcards = {
  eyebrow: "09 · Postcards From the Field",
  heading: "What this project changed about how I research.",
  cards: [
    {
      emoji: "🪶",
      title: "Researching fear takes a different kind of moderation.",
      body: 'Several participants described panic attacks, sedatives, even an ER visit, within minutes of meeting me. Running sessions in whichever language felt safest, and slowing down before asking "why," mattered as much as the question list.',
    },
    {
      emoji: "📈",
      title: "Don't flatten a messy curve into a tidy story.",
      body: 'It would\'ve been easy to report "anxiety decreases with use." The honest finding — three trajectories, riskiest moment late, not early — was less clean, and far more actionable for the roadmap.',
    },
  ],
};

export const closingCta = {
  heading: "Why wait? Take the leap. Make your design process stress-free today.",
  cta: "Let's Talk?",
};

export const pinGate = {
  kicker: "Boarding Pass - Case Study",
  classTag: "Restricted Gate",
  gateLabel: "Gate - D0-D14",
  heading: "Private Case Study",
  subheading: "Enter 6-Digit Boarding PIN",
  requestLabel: "Request PIN",
  requestHref: "/contact",
  errorMessage: "That PIN didn't check out. Try again.",
  success: "PIN accepted — cleared for boarding.",
};

export const caseStudyFooter = {
  heading: "Final call for boarding ✈️",
  body: "Full transcripts, the Condens report, and the workshop deck are available on request.",
  backToTop: "Back to top",
  getInTouch: "Get in touch",
  credit: "Eurowings Digital × Lufthansa Innovation Hub · Made with care in Siegen / Cologne, Germany",
};
