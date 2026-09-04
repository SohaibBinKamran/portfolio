/** OpenSeat case study copy — verbatim from Figma node 869-11269
    (Portfolio/OpenSeat-Project). Layout/visuals live in components/openseat. */

export const meta = {
  eyebrow: "Product Design — UX Research · UI Design · 0→1",
  title: ["Turning solo dining into ", "social connection."],
  intro:
    "OpenSeat is a location-based social dining app that helps people replace the awkwardness of eating alone with a low-stakes, platonic moment of connection — one open seat at a time.",
  designedBy: "Sohaib Kamran",
  badge: "Case study · live",
  facts: [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "2-week sprint" },
    { label: "Tools", value: "Figma · Miro · Notion" },
    { label: "Type", value: "Personal project" },
  ],
  scrollNote: "11 sections available · scroll to claim a seat ↓",
  phoneCaptions: ["Mobile · real-time · platonic", "iOS, high-fidelity prototype"],
};

export const context = {
  n: "01",
  eyebrow: "Context",
  title: "Cities are full of people. Most of them are still eating alone.",
  intro:
    "In dense cities, people are surrounded by others — yet still feel isolated. Existing apps optimize for dating or professional networking. There's a gap for spontaneous, platonic, low-pressure socializing.",
  friction: {
    label: "Core friction",
    body: 'Eating alone can feel stigmatized — the "solo diner" — or simply boring. People weren\'t avoiding it because they disliked their own company; they were avoiding the social risk.',
  },
  opportunity: {
    label: "The opportunity",
    body: "Restaurants sit on unused inventory every night: empty seats at occupied tables. That's a natural, lightweight surface for connection — no new venue required.",
  },
  brief: {
    label: "Design brief, in one line",
    quote:
      '"Make it feel like pulling up a chair — not like signing up for something."',
    note: "Not dating. Not networking. Just a seat, a stranger, and a shared table.",
  },
};

export const discovery = {
  n: "02",
  eyebrow: "Discovery",
  title: "The unlock wasn't loneliness.\nIt was fear of the awkward part.",
  intro:
    "To understand what actually stops people from connecting, I ran guerrilla interviews with 5 young professionals and 3 solo travelers.",
  stats: [
    {
      value: "8",
      title: "Guerrilla interviews",
      body: "Young professionals and solo travelers, sourced in the field rather than recruited — kept the answers unrehearsed.",
      dark: false,
    },
    {
      value: "0",
      title: "People scared of strangers",
      body: 'Not one participant cited "meeting a stranger" as the blocker. The fear was entirely downstream of that moment.',
      dark: true,
    },
    {
      value: "2",
      title: "Real fears, named repeatedly",
      body: "Awkwardness and safety — in that order — surfaced across nearly every conversation.",
      dark: false,
    },
  ],
  quote:
    "People didn't want romance or a deep friendship — they wanted simple human presence during a meal.",
};

export const persona = {
  n: "03",
  eyebrow: "Persona",
  title: "Meet the New-in-Town Nomad.",
  intro:
    "Every decision downstream — from the vibe tags to the seat timer — was pressure-tested against this one person's Friday night.",
};

export const direction = {
  n: "04",
  eyebrow: "Direction",
  title: "Three jobs the product had to do well.",
  intro: "Everything in the flows below traces back to one of these three.",
  jobs: [
    {
      tag: "01 / Immediate",
      title: "This is for right now",
      body: "Not a plan for next week. No scheduling weeks ahead — seats appear and expire in real time.",
    },
    {
      tag: "02 / Effortless",
      title: "Claiming feels quick and clear",
      body: "First-come-first-served, one slide gesture, no back-and-forth negotiation to get a seat.",
    },
    {
      tag: "03 / Safe + un-awkward",
      title: "Expectations set before anyone meets",
      body: "Trust signals and social contracts are visible before two strangers ever sit down.",
    },
  ],
};

export const solution = {
  n: "05",
  eyebrow: "The Solution",
  title: "OpenSeat: broadcast the seat, not the date.",
  intro:
    "A location-based app where people can broadcast open seats at their table, and others can claim them instantly.",
  pillars: [
    {
      title: "Immediacy",
      body: "No scheduling weeks ahead — every table on the radar is happening tonight, right now.",
    },
    {
      title: "Seat claiming",
      body: "First-come-first-served creates simple, honest urgency — no messaging back and forth to confirm.",
    },
    {
      title: "Vibe check",
      body: 'Preset "table moods" reduce ambiguity and pressure before anyone sits down.',
    },
  ],
};

export const journeys = {
  n: "06",
  eyebrow: "Mapping the Journeys",
  title: "Two roles, one shared table.",
  intro:
    "I mapped Host and Guest as separate flows, then designed the UI to minimize steps while increasing confidence at each one.",
  host: {
    label: "Host flow",
    steps: [
      "Check in at the restaurant",
      "Select number of available seats",
      "Set the table vibe",
      "Broadcast the table live",
    ],
  },
  guest: {
    label: "Guest flow",
    steps: [
      "Discover nearby tables on the Radar map",
      "View a Table Ticket — who's there, vibe, seats left",
      "Claim a seat",
      "Walk to the table",
    ],
  },
  phones: [
    { src: "/images/openseat/os-radar.png", alt: "The Radar map screen showing nearby open tables" },
    { src: "/images/openseat/os-ticket.png", alt: "The Table Ticket detail screen" },
    { src: "/images/openseat/os-vibe.png", alt: "Setting the number of seats and the table vibe" },
  ],
};

export const trust = {
  n: "07",
  eyebrow: 'Solving the "Creep Factor"',
  title: "Designing for trust before anyone shows up.",
  intro:
    "First-come-first-served can feel risky. Two systems make the social contract explicit before two strangers ever meet.",
  systems: [
    {
      glyph: "T",
      tone: "sage",
      title: "Trust Tier System",
      body: "You can't claim a seat unless you're Verified — ID plus phone number, encrypted and never shared with other guests or restaurant staff.",
      chips: [] as string[],
    },
    {
      glyph: "V",
      tone: "mustard",
      title: "Vibe Tags",
      body: "Hosts define the atmosphere up front, so nobody guesses wrong about what kind of evening they're walking into.",
      chips: ["Chatty", "Silent / Reading", "Networking", "Quick Eat"],
    },
  ],
};

export const keyScreens = {
  n: "08",
  eyebrow: "Key Screens & Interactions",
  title: "What I actually designed.",
  intro:
    "Five moments carry most of the product's emotional weight — discovery, invitation, commitment, confirmation, and identity.",
  screens: [
    {
      src: "/images/openseat/os-radar.png",
      alt: "The Radar discovery map",
      title: "The Radar",
      body: 'A map-first discovery experience showing live tables nearby, with expiring timers ("14m left") to signal real-time intent.',
    },
    {
      src: "/images/openseat/os-vibe.png",
      alt: "Set the Table Vibe screen",
      title: "Set the Table Vibe",
      body: "Hosts choose the atmosphere before broadcasting — this is where the social contract gets written.",
    },
    {
      src: "/images/openseat/os-ticket.png",
      alt: "Slide to claim a seat",
      title: "Slide-to-Claim → Lock",
      body: "A slide gesture prevents accidental claims. Once claimed, the seat locks for 10 minutes — enough time to arrive, and the visible seat counter counts down.",
    },
    {
      src: "/images/openseat/os-ticket.png",
      alt: "The Table Ticket screen",
      title: "The Table Ticket",
      body: "A ticket-like detail screen that makes the offer feel official — a direct line to message the host, with the timer showing before the seat expires.",
    },
    {
      src: "/images/openseat/os-profile.png",
      alt: "Trust and safety profile screen",
      title: "Trust + Safety Profile",
      body: "Phone and government ID verification live front-and-center, with a clear line about how that data is (and isn't) shared.",
    },
    {
      src: "/images/openseat/os-confirmed.png",
      alt: "Seat confirmed screen",
      title: "From lock to arrival",
      body: 'Confirmation, Beacon Mode, and the trust profile — the three screens that carry a guest from "claimed" to "at the table."',
    },
  ],
};

export const beacon = {
  n: "09",
  eyebrow: "Signature Feature",
  title: "Beacon Mode.",
  paras: [
    'In a crowded restaurant, "finding the right person" is often the most awkward ten seconds of the whole evening. Beacon Mode turns it into something almost playful.',
    'Within ~10 meters of each other, both phones flash the same bright color. No waving. No scanning faces. No texting "I\'m by the window." Just hold up your phone and look for the color.',
  ],
  chips: ["Range · ~10 meters", "Signal · shared color", "Result · zero guessing"],
};

export const branding = {
  n: "10",
  eyebrow: "Visual Identity & Branding",
  title: "A mark that tells the whole story.",
  intro:
    "The logo is the thesis of the product compressed into one icon: a chair, mid-broadcast.",
  markTitle: "Chair + signal = the whole pitch.",
  markBody: [
    "The chair depicts the seat being reserved — the literal unit of value in the product. The signal waves radiating off it depict that seat's live connection to other people nearby: it's not just an empty chair, it's an **open** one, actively broadcasting.",
    "I set it on a warm, saturated orange field rather than the app's usual soft cream — the logo needed to read instantly at icon size, where the cream palette goes flat. Everywhere else in the product, that same orange is used sparingly, as a call to action rather than a background.",
  ],
  swatches: [
    { name: "Broadcast Coral", hex: "#F0603F", fill: "#F0603F", onDark: true },
    { name: "Warm Cream", hex: "#FBF2E6", fill: "#FBF2E6", onDark: false },
    { name: "Vibe Sage", hex: "#71916F", fill: "#71916F", onDark: true },
    { name: "Timer Mustard", hex: "#E0A23A", fill: "#E0A23A", onDark: true },
    { name: "Ink", hex: "#2B2018", fill: "#2B2018", onDark: true },
  ],
  font: {
    label: "Font used",
    specimen: "Aa Table Ticket",
    note: "Manrope: a warm sans serif for headlines and body gives the interface an inviting, menu-like character instead of a corporate one.",
  },
};

export const retro = {
  n: "11",
  eyebrow: "Retrospective",
  title: "What worked, and what's next.",
  intro:
    "A two-week sprint is enough to prove a direction, not enough to close every gap.",
  worked: {
    label: "What worked well",
    items: [
      'The Vibe Tag system tested well because it removes the pressure to "perform socially" — expectations are set before anyone sits down.',
    ],
  },
  improve: {
    label: "What I'd improve in v2",
    items: [
      "**The flake problem:** introduce a Karma Score — no-shows reduce a user's ability to claim future seats.",
      "**Bill splitting:** currently assumes separate checks; an easy split flow would smooth the exit experience.",
    ],
  },
};

export const caseFooter = {
  eyebrow: "Thanks for reading",
  title: "Got a seat open on your team?",
  roles: ["Product Designer", "UX Researcher", "UI/UX Designer", "Product Owner"],
  meta: ["OpenSeat — Personal Project", "Figma · Miro · Notion", "© Sohaib Kamran"],
};

export const closingCta = {
  heading: "Why wait? Take the leap. Make your design process stress-free today.",
  cta: "Let's Talk?",
};
