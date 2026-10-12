// Work index project data.
// Lineup + order sourced from Figma redesign node 912-5204 (WorkDisplay):
// CabinBlu -> Cinefatic -> ClassQuest -> WanderLens -> OpenSeat -> Xoopah.
// KNOCCS was dropped from the index in the redesign; ClassQuest was added.
// Cover art is the per-project collage exported from the same Figma frame.
//
// KNOCCS re-added (not templated on the redesign frame) as "KNOCCS - Design
// System" — a distinct case study from the original dropped project, covering
// the design system itself rather than the product screens. Placed right
// after CabinBlu per explicit user direction; the Arrivals Board was later
// placed 2nd, also after CabinBlu, which moved KNOCCS to 3rd.

export type Project = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  /** Handwritten note shown by the cursor annotation on card hover. */
  hoverNote: string;
  /** When true the card is not a link — shows an "Under Construction" tag instead. */
  underConstruction?: boolean;
};

export const projects: Project[] = [
  {
    slug: "cabinblu",
    title: "CabinBlu",
    image: "/images/work-cabinblu.png",
    imageAlt: "CabinBlu app screens with a Lufthansa plane and boarding-pass case-study card",
    hoverNote: "see the research →",
  },
  {
    slug: "arrivals",
    title: "Arrivals Board",
    image: "/images/work-arrivals.png",
    imageAlt: "The Arrivals Board under the headline Numbers with receipts, showing Romanian and Kosovar population counts, trend and sources",
    hoverNote: "flip the board →",
  },
  {
    slug: "knoccs",
    title: "KNOCCS Design System",
    image: "/images/work-knoccs.png",
    imageAlt: "KNOCCS support inbox interface built from its design system's tags, cards and sidebar components",
    hoverNote: "play with the system →",
  },
  {
    slug: "cinefatic",
    title: "Cinefatic",
    image: "/images/work-cinefatic.png",
    imageAlt: "Cinefatic movie-booking web and mobile screens",
    hoverNote: "browse the screens →",
  },
  {
    slug: "classquest",
    title: "ClassQuest",
    image: "/images/work-classquest.png",
    imageAlt: "ClassQuest learning platform across laptop and phone screens",
    hoverNote: "read the thesis →",
  },
  {
    slug: "wanderlens",
    title: "WanderLens",
    image: "/images/work-wanderlens.png",
    imageAlt: "WanderLens travel-journal app shown on three phones",
    hoverNote: "explore the concept →",
  },
  {
    slug: "openseat",
    title: "OpenSeat",
    image: "/images/work-openseat.png",
    imageAlt: "OpenSeat social-dining app shown on three phones",
    hoverNote: "see it come alive →",
  },
  {
    slug: "xoopah",
    title: "Xoopah",
    image: "/images/work-xoopah.png",
    imageAlt: "Xoopah CRM web platform on a laptop with floating metric cards",
    hoverNote: "dive into the dashboard →",
  },
];
