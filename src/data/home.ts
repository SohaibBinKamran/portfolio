// Home page copy.
// Structural facts (name, role, employer) sourced from sohaib-portfolio-content.md.
// Marketing copy (testimonials, process taglines, "why me" paragraphs, tag lists)
// reused verbatim from the live sohaibbinkamran.com site, per user confirmation —
// this content doesn't exist in the content file, only on the published site.

export const hero = {
  headlineMuted: "Crafting Real Impact,",
  headlineStrong: "through Human-First Design",
  status: "currently crafting at Eurowings Digital",
  location: "Siegen, Germany",
  role: "UX/Product Designer",
  annotation: "Perhaps you?",
  cta: "My Work",
};

export const selectedWork = [
  {
    slug: "cabinblu",
    title: "CabinBlu",
    blurb: "Tracking flight anxiety for 14 real days, not one usability session",
    tags: ["UX Research → Diary Study", "May 26 – Aug 26"],
    image: "/images/project-cabinblu.png" as string | undefined,
  },
  {
    slug: "classquest",
    title: "ClassQuest",
    blurb: "Turning scattered class notes into a shared quest for knowledge",
    tags: ["MSc. HCI – Master Thesis", "Oct 25 – Apr 26"],
    image: "/images/project-classquest.png" as string | undefined,
  },
  {
    slug: "cinefatic",
    title: "Cinefatic",
    blurb: "Making movie reservation easier for people of Karachi",
    tags: ["Research & Product Design", "2024"],
    image: "/images/project-cinefatic.png" as string | undefined,
  },
];

export const testimonials = [
  {
    quote:
      "He joined as a UX trainee and quickly stood out, especially in heuristics. He ramps fast, from interviews to sketches to high-fi. Always user-first, adapts on the fly, never pressures seniors, and brings energy to a serious team.",
    name: "Zain Khatri",
    role: "Sr. Product Designer | Leasepoint",
    avatar: "/images/testimonial-zain.png",
  },
  {
    quote:
      "Working with Sohaib in our UX Research team was a real pleasure. He's full of creative ideas, super reliable, and always gets things done fast. His energy and quick grasp of complex topics made a real difference in our projects!",
    name: "Philipp Rosenbaum",
    role: "Senior UX Researcher | Eurowings Digital",
    avatar: "/images/testimonial-philipp.png",
  },
  {
    quote:
      "Working with Sohaib at Spur Solutions was a true pleasure. His design expertise and creativity brought a fresh perspective to every project, and his dedication made him a valuable asset to our team.",
    name: "Riaz Ur Rehman",
    role: "Head of UX | Spur Solutions",
    avatar: "/images/testimonial-riaz.png",
  },
];

export const testimonialsSubheading =
  "From stand-ups to ship day: what my colleagues noticed.";

export const organizations = [
  { name: "Google Developer Student Clubs", logo: "/images/org-gdsc.png" },
  { name: "Packages Limited", logo: "/images/org-packages.png" },
  { name: "Eurowings Digital", logo: "/images/org-eurowings.png" },
  { name: "Spur Solutions", logo: "/images/org-spursol.png" },
];

export const whyMe = [
  {
    title: "Design Aligned to Product Goals",
    body: "I partner with PMs, engineers, and data to frame the right problem, set success metrics, and scope pragmatically so design pushes the roadmap forward.",
  },
  {
    title: "Evidence-Driven Craft",
    body: "Discovery, heuristics, rapid prototyping, and usability tests guide the work. Accessibility and performance are non-negotiable; decisions are grounded in research and analytics.",
  },
  {
    title: "Ship Value, Iterate Fast",
    body: "Build with engineering from day one, release in small slices, measure impact, and iterate. From design-system components to A/B tests. The goal is adoption and measurable results.",
  },
];

export const niches = [
  "Aviation",
  "E-Commerce",
  "Ad-Tech",
  "Mobility",
  "CX Platforms",
  "Real Estate",
  "Mortgage",
];

export const toolTags = [
  "Design Research & Analysis",
  "Design Systems & Style Guide",
  "Ethnographic Research",
  "Design Thinking",
  "Design Leadership & Strategy",
  "Cognitive Psychology & Perception",
  "Product Design",
  "UI/UX Design",
  "Agile Methodologies",
  "Service Design",
  "Figma",
  "Notion",
  "Protopie",
  "MIRO",
  "Framer",
  "Maze",
  "Sketch",
  "Balsamiq",
  "Trello",
  "Condens",
  "JIRA",
  "Confluence",
  "Adobe Suite",
  "Useberry",
  "HotJar",
  "Cursor",
  "Loveable",
];

export const capabilities = [
  "Product Discovery & User Flows",
  "Usability Testing & Heuristic Evaluation",
  "Information Architecture",
  "Prototyping & Wireframing",
  "Design Systems & Components",
  "Accessibility Design",
  "Agile/Scrum & Stakeholder Management",
];

export const process = [
  {
    title: "Understand the problem",
    tagline: "Find what's really broken",
    body: "I turn ambiguity into a clear problem statement, who's stuck, where, and why. Outputs: interview notes, journey maps, insights, success metrics.",
    image: "/images/process-understand.png",
  },
  {
    title: "Explore & prototype",
    tagline: "Make ideas real fast",
    body: "I go from flows → wireframes → prototypes to test direction early and reduce rework. Outputs: IA/flows, lo-fi → hi-fi iterations, design-system aligned UI.",
    image: "/images/process-prototype.png",
  },
  {
    title: "Ship & improve",
    tagline: "Deliver, learn, iterate",
    body: "I collaborate with engineers to ship clean specs, QA thoroughly, and track impact. Outputs: handoff specs, experiment results, metrics, follow-up iterations.",
    image: "/images/process-ship.png",
  },
];

export const closingCta = {
  heading: "Ready to create an exceptional digital experience?",
  cta: "Let's Talk?",
};
