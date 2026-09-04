// About page copy.
// Bio/experience facts sourced from sohaib-portfolio-content.md (Eurowings start
// date confirmed as May 2024 by user, overriding the live site + Figma's stale
// "May 2025"). Skill tags, education, and "What sets me apart" copy reused
// verbatim from the redesign Figma (node 912-3939), same basis as home.ts.

export const heroQuote =
  "You could say I'm the team's 'pencil sharpener': always ready to refine, iterate, and get to the point.";

export const heroTags = [
  "Design Research & Analysis",
  "Design Systems & Style Guide",
  "Ethnographic Research",
  "Design Thinking",
  "Product Design",
  "UI/UX Design",
  "Design Leadership & Strategy",
];

export const bio = {
  headingStrong: "Designer. Builder.",
  headingMuted: "Lifelong learner.",
  whoHeading: "Who am I?",
  bioText:
    "I am a product designer with over 3 years of experience delivering B2C, B2B, and SaaS products. My expertise is in full-stack design, from discovery to delivery, including user research, information architecture, and design systems. I specialize in using data-driven experimentation while partnering with cross-functional teams and leadership to align design with business goals.",
};

export type TimelineEntry = {
  title: string;
  subtitle: string;
  dates: string;
};

export const experiences: TimelineEntry[] = [
  {
    title: "Eurowings Digital",
    subtitle: "Working Student, Digital Product & Communication Management",
    dates: "May 2024 - Present",
  },
  {
    title: "Spur Solutions",
    subtitle: "Junior UX Designer",
    dates: "July 2022 - Sept 2023",
  },
  {
    title: "Google Developers Student Clubs",
    subtitle: "Co-Lead Design",
    dates: "Nov 2021 - May 2022",
  },
];

export const education: TimelineEntry[] = [
  {
    title: "Masters in Human Computer Interaction (HCI)",
    subtitle: "Universität Siegen",
    dates: "Oct 2023 - Apr 2026",
  },
  {
    title: "Bachelors of Science in Computer Science",
    subtitle: "Institute of Business Administration",
    dates: "Aug 2018 - June 2022",
  },
];

// `emphasis` phrases are bolded inline in the body (design mixes regular +
// full-black bold spans in every feature description).
export const features = [
  {
    title: "Strategic Design Thinking",
    body: "I design with your business goals in mind, using data-driven experimentation to ensure impactful results.",
    emphasis: "data-driven experimentation",
  },
  {
    title: "Collaborative Process",
    body: "I work closely with you, blending your vision with my creative expertise.",
    emphasis: "creative expertise",
  },
  {
    title: "Measurable Impact",
    body: "My work has a proven track record of success, from helping dev teams close.",
    emphasis: "record of success",
  },
  {
    title: "Full-Stack Design Expertise",
    body: "I handle every step of the design process, from initial discovery and user research to IA, visual design, prototyping, and usability testing.",
    emphasis: "discovery and user research",
  },
  {
    title: "Research-Driven Solutions",
    body: "I leverage data and user feedback to inform my designs. I use both qualitative and quantitative research methods, including interviews, surveys, and A/B testing, to ensure solutions are built for real user needs.",
    emphasis: "interviews, surveys, and A/B testing",
  },
];
