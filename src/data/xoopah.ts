/** Xoopah case study copy — verbatim from Figma node 1050-16034
    (Portfolio/Xoopah-Overview). Layout/visuals live in components/xoopah. */

export const hero = {
  tags: ["Product Design", "UX Research", "Design System"],
  heading: ["Small business, ", "sorted."],
  intro:
    "Xoopah pulls every DM, order, review and payment small businesses juggle into one calm platform — so owners can stop switching tabs and start growing.",
  stats: [
    { value: "3,351", label: "Contacts", pos: "left-top" },
    { value: "35", label: "Clients", pos: "right-top" },
    { value: "35%", label: "Churn Rate", pos: "left-bottom" },
    { value: "4.6", label: "Avg. Rating", pos: "right-bottom" },
  ],
};

export const problem = {
  eyebrow: "Why Xoopah",
  heading: ["Running a small business often means ", "running five browser tabs."],
  notes: [
    { text: "Books in chaos", dot: "mint" },
    { text: "Invisible online", dot: "purple" },
    { text: "Deadlines slip through the cracks", dot: "pink" },
    { text: "Loyal customers, forgotten", dot: "purple" },
    { text: "Everything done by hand", dot: "mint" },
  ],
};

export const persona = {
  eyebrow: "Who We Designed For",
  heading: ["Meet Gwen, ", "designer by day, founder by night."],
  card: {
    photo: "/images/xoopah/persona-gwen.png",
    name: "Gwen Stacy",
    role: "Fashion label founder · 21 · LA",
    body: "Building her own fashion brand between lectures — visionary, hardworking, and permanently one DM behind.",
  },
  goals: ["Support her family", "Grow the brand abroad", "Study fashion design"],
  frustrations: ["Heavy competition", "Costs pile up fast", "No time to spare"],
  drivers: [
    { label: "Growth", value: 9 },
    { label: "Responsibility", value: 9 },
    { label: "Independence", value: 8 },
    { label: "Incentive", value: 7 },
  ],
};

export const landscape = {
  eyebrow: "Sizing Up the Market",
  heading: ["We mapped the field ", "before drawing a single wireframe."],
  intro:
    "A side-by-side teardown of competing tools — where they win, where small business owners are still left doing the work themselves.",
  criteria: [
    { icon: "/images/xoopah/landscape-icon-pricing.svg", label: "Pricing" },
    { icon: "/images/xoopah/landscape-icon-features.svg", label: "Core features" },
    { icon: "/images/xoopah/landscape-icon-onboarding.svg", label: "Onboarding" },
    { icon: "/images/xoopah/landscape-icon-integrations.svg", label: "Integrations" },
    { icon: "/images/xoopah/landscape-icon-support.svg", label: "Support" },
  ],
};

export const brand = {
  eyebrow: "Brand System",
  heading: ["A palette built for ", "calm, confident hustle"],
  swatches: [
    { name: "Xoopah Purple — primary", hex: "#8155C9", fill: "#8155C9", onDark: true, wide: true },
    { name: "Spark Mint", hex: "#4BEA5E", fill: "#4BEA5E", onDark: false },
    { name: "Spark Pink", hex: "#FFB9E8", fill: "#FFB9E8", onDark: false },
  ],
  type: {
    display: {
      label: "Display — Circular STD",
      specimen: "Grow the business.",
      note: "Used for headlines and moments that need a little warmth.",
    },
    body: {
      label: "Body — Inter",
      specimen:
        "The workhorse face for interface copy, labels and body text — clean at every size.",
      chip: "JetBrains Mono — for data & stats",
    },
  },
};

export const process = {
  eyebrow: "How It Came Together",
  heading: ["From ", "napkin sketch", " to shipped dashboard."],
  steps: [
    { n: "01", title: "Sketch", image: "/images/xoopah/process-sketch.png" },
    { n: "02", title: "Lo-fi wireframe", image: "/images/xoopah/process-wireframe.png" },
    { n: "03", title: "Final screen", image: "/images/xoopah/process-final.png" },
  ],
};

export const gallery = {
  eyebrow: "The Product",
  heading: ["Six Jobs. ", "One Platform."],
  items: [
    { image: "/images/xoopah/gallery-inbox.png", title: "Inbox", note: "the morning glance" },
    { image: "/images/xoopah/gallery-contacthub.png", title: "Contact Hub", note: "every channel, one list" },
    { image: "/images/xoopah/gallery-payments.png", title: "Payments", note: "Stripe & beyond" },
    { image: "/images/xoopah/gallery-reviews.png", title: "Reviews", note: "every rating, one feed" },
    { image: "/images/xoopah/gallery-integrations.png", title: "Integrations", note: "connect the channels" },
    { image: "/images/xoopah/gallery-settings.png", title: "Settings", note: "make it yours" },
  ],
};

export const close = {
  eyebrow: "The Takeaway",
  heading: ["Five tabs, ", "one calm platform."],
  intro:
    "Xoopah brings every conversation, order, review and payment small business owners juggle into a single place — so they can get back to the work only they can do.",
  stats: [
    { value: "3,351", label: "Contacts unified" },
    { value: "35", label: "Active clients" },
    { value: "7", label: "Core modules" },
    { value: "4.6", label: "Avg. rating" },
  ],
};

export const closingCta = {
  heading: "Why wait? Take the leap. Make your design process stress-free today.",
  cta: "Let's Talk?",
};
