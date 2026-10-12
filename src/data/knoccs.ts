// KNOCCS Design System case study content.
// Source: Figma "Design System Hands Off" (V1.0 node 7:282, V1.1 node 148:294,
// Cover node 46:2810), built at Spursol for KNOCCS, a customer support inbox.
// Hex values, state names and sample copy are read from that file.
// House rule: no dashes or hyphenated words in on page copy.

export const meta = {
  title: "KNOCCS Design System",
  role: "Product Designer",
  company: "Spursol",
  scope: "Brand, tokens, components",
  timeline: "V1.0 → V1.1",
};

export const hero = {
  eyebrow: "CASE STUDY, DESIGN SYSTEM",
  heading: "The KNOCCS Design System",
  subheading:
    "The mark, the tokens and every component behind a customer support inbox. Play with it below.",
};

export const overview = {
  eyebrow: "OVERVIEW",
  heading: "From screens to a system",
  stats: [
    { from: "5", to: "1", label: "button styles became one governed family" },
    { from: "2", to: "1", label: "hand drawn themes became one token layer" },
    { from: "0", to: "30+", label: "named color and type tokens" },
  ],
};

export const brand = {
  eyebrow: "BRAND",
  heading: "The mark",
  body: "One looping stroke, in the same purple to pink gradient as the Primary palette.",
  principles: [
    {
      id: "ratio",
      title: "One accent, many neutrals",
      body: "Four brand colors against seven greys. Color is kept for what matters.",
    },
    {
      id: "states",
      title: "Every state drawn",
      body: "Default, hover and active, designed before anything counts as done.",
    },
    {
      id: "governed",
      title: "Governance over decoration",
      body: "A documented token beats a clever gradient.",
    },
  ],
};

export const colorGroups = [
  {
    name: "Primary",
    swatches: [
      { name: "P1", hex: "#778AFA" },
      { name: "P2", hex: "#7620BA" },
      { name: "P3", hex: "#EB7878" },
      { name: "P4", hex: "#DE62EA" },
    ],
  },
  {
    name: "Secondary",
    swatches: [
      { name: "S1", hex: "#1A181C" },
      { name: "S2", hex: "#312D34" },
      { name: "S3", hex: "#534E56" },
      { name: "S4", hex: "#7D7881" },
      { name: "S5", hex: "#ADA7B2" },
      { name: "S6", hex: "#EAE7EB" },
      { name: "S7 White", hex: "#FFFFFF" },
    ],
  },
  {
    name: "Accent",
    swatches: [
      { name: "Red", hex: "#B52121" },
      { name: "Red Base", hex: "#FFEDED" },
      { name: "Green", hex: "#066627" },
      { name: "Green Base", hex: "#EDFFF3" },
      { name: "Orange", hex: "#A74B09" },
      { name: "Orange Base", hex: "#FFF6ED" },
      { name: "Blue", hex: "#0C2EA8" },
      { name: "Blue Base", hex: "#E8EAFF" },
    ],
  },
  {
    name: "Hover and surfaces",
    swatches: [
      { name: "Hover Dark", hex: "#4B3B56" },
      { name: "Hover Light", hex: "#F7F5FA" },
      { name: "Focused", hex: "#EDE9F9" },
      { name: "Star", hex: "#EBC606" },
      { name: "Menu BG", hex: "#322A38" },
    ],
  },
];

export const typeScale = [
  { name: "Extra small", size: 12, lineHeight: 16 },
  { name: "Small", size: 14, lineHeight: 20 },
  { name: "Paragraph", size: 16, lineHeight: 24 },
  { name: "Heading 6", size: 20, lineHeight: 28 },
  { name: "Heading 5", size: 24, lineHeight: 32 },
  { name: "Heading 4", size: 28, lineHeight: 36 },
  { name: "Heading 3", size: 32, lineHeight: 40 },
  { name: "Heading 2", size: 36, lineHeight: 44 },
  { name: "Heading 1", size: 48, lineHeight: 56 },
];

export const iconography = [
  "search", "menu", "check", "close", "edit", "filter", "attachment",
  "star", "send", "reply", "delete", "settings", "help", "tag", "dashboard",
];

export const anatomy = {
  eyebrow: "ANATOMY",
  heading: "One card, seven tokens",
  parts: [
    { n: 1, name: "Name", token: "S1", hex: "#1A181C", spec: "14 / 20, semibold when new" },
    { n: 2, name: "Snippet", token: "S3", hex: "#534E56", spec: "14 / 16, one line" },
    { n: 3, name: "Time", token: "S4", hex: "#7D7881", spec: "12 / 16, medium" },
    { n: 4, name: "Star", token: "Star", hex: "#EBC606", spec: "16px icon" },
    { n: 5, name: "Critical tag", token: "Red + Red Base", hex: "#B52121", spec: "pill, 12 / 20" },
    { n: 6, name: "Unread dot", token: "P2", hex: "#7620BA", spec: "9px circle" },
    { n: 7, name: "Hover fill", token: "Hover Light", hex: "#F7F5FA", spec: "full row" },
  ],
};

export const tagVariants = [
  { id: "black", label: "30 mins", bg: "#F7F5FA", border: "#7D7881", fg: "#312D34", icon: "clock" },
  { id: "green", label: "Green", bg: "#EDFFF3", border: "#066627", fg: "#066627", icon: "clock" },
  { id: "blue", label: "Blue", bg: "#E8EAFF", border: "#0C2EA8", fg: "#0C2EA8", icon: "clock" },
  { id: "orange", label: "Orange", bg: "#FFF6ED", border: "#A74B09", fg: "#A74B09", icon: "clock" },
  { id: "red", label: "Red", bg: "#FFEDED", border: "#B52121", fg: "#B52121", icon: "clock" },
  { id: "counter", label: "+5", bg: "#EAE7EB", border: "transparent", fg: "#312D34", icon: null },
] as const;

export const cardStates = ["Default", "Hover", "New In"] as const;

export const assignButtonStates = ["Assign to me", "Assign", "Assigned"] as const;

export const loopInStates = ["Default", "1", "2", "3", "3+"] as const;

export const tooltipDirections = ["Up", "Down", "Right", "Left"] as const;

export const components = {
  eyebrow: "PLAYGROUND",
  heading: "Try the components",
  intro: "Real states, colors and copy from the Figma file.",
};

export type LibraryItem = {
  src: string;
  w: number;
  h: number;
  title: string;
  caption: string;
  wide?: boolean;
};

export const library: {
  eyebrow: string;
  heading: string;
  intro: string;
  groups: { name: string; columns: 1 | 2 | 3; items: LibraryItem[]; atoms?: boolean }[];
  gaps: { heading: string; body: string };
} = {
  eyebrow: "FULL LIBRARY",
  heading: "Everything else it documents",
  intro: "Real frames from the Figma file, grouped by purpose.",
  groups: [
    {
      name: "Navigation and chrome",
      columns: 1,
      items: [
        {
          src: "/images/knoccs/library/header.svg",
          wide: true,
          w: 1488,
          h: 172,
          title: "Header",
          caption: "Light and Dark, with search and agent status.",
        },
        {
          src: "/images/knoccs/library/browser-header.svg",
          wide: true,
          w: 1488,
          h: 176,
          title: "Browser Header",
          caption: "Light and Dark browser chrome.",
        },
        {
          src: "/images/knoccs/library/nav-full.svg",
          wide: true,
          w: 1364,
          h: 802,
          title: "Sidebar Navigation",
          caption: "Five configurations built from one Nav Item.",
        },
      ],
    },
    {
      name: "Status and people",
      columns: 2,
      atoms: true,
      items: [
        {
          src: "/images/knoccs/library/agent-status.svg",
          w: 343,
          h: 144,
          title: "Agent Status",
          caption: "Available and Unavailable, with the toggle.",
        },
      ],
    },
    {
      name: "Menus and forms",
      columns: 3,
      items: [
        {
          src: "/images/knoccs/library/menu-loop-in.svg",
          w: 314,
          h: 398,
          title: "Loop in menu",
          caption: "Checklist with search.",
        },
        {
          src: "/images/knoccs/library/menu-tags.svg",
          w: 314,
          h: 324,
          title: "Tags menu",
          caption: "Filter by tag.",
        },
        {
          src: "/images/knoccs/library/menu-escalate.svg",
          w: 314,
          h: 296,
          title: "Escalate Conversation",
          caption: "The textarea and its actions.",
        },
        {
          src: "/images/knoccs/library/menu-simple.svg",
          w: 314,
          h: 288,
          title: "Simple Menu",
          caption: "Plain actions and a submenu.",
        },
        {
          src: "/images/knoccs/library/menu-user-email.svg",
          w: 314,
          h: 404,
          title: "User and Email menu",
          caption: "People with search.",
        },
        {
          src: "/images/knoccs/library/menu-status.svg",
          w: 314,
          h: 200,
          title: "Status menu",
          caption: "Open, Pending, Resolve.",
        },
        {
          src: "/images/knoccs/library/menu-profile.svg",
          w: 314,
          h: 304,
          title: "Profile menu",
          caption: "Availability and options.",
        },
        {
          src: "/images/knoccs/library/menu-atom.svg",
          w: 468,
          h: 168,
          title: "Menu Atom",
          caption: "The row every menu is built from.",
        },
      ],
    },
    {
      name: "Messaging",
      columns: 2,
      items: [
        {
          src: "/images/knoccs/library/conversation-detail-header.svg",
          wide: true,
          w: 878,
          h: 187,
          title: "Conversation Detail Header",
          caption: "Default and Looped in.",
        },
        {
          src: "/images/knoccs/library/message.svg",
          w: 636,
          h: 741,
          title: "Message",
          caption: "Customer, automated and rich signature.",
        },
        {
          src: "/images/knoccs/library/internal-comment.svg",
          w: 627,
          h: 330,
          title: "Internal Comment",
          caption: "Team and personal comments.",
        },
        {
          src: "/images/knoccs/library/email-chip.svg",
          w: 436,
          h: 180,
          title: "Email Chip",
          caption: "Recipients, with a removable state.",
        },
        {
          src: "/images/knoccs/library/conversation-logs.svg",
          w: 238,
          h: 298,
          title: "Conversation Logs",
          caption: "System events as pills.",
        },
      ],
    },
    {
      name: "Files",
      columns: 2,
      items: [
        {
          src: "/images/knoccs/library/attachments.svg",
          w: 312,
          h: 312,
          title: "File type icons",
          caption: "32 formats, one mark each.",
        },
        {
          src: "/images/knoccs/library/menu-attachments.svg",
          w: 330,
          h: 396,
          title: "Attachments menu",
          caption: "Files with type and size.",
        },
      ],
    },
  ],
  gaps: {
    heading: "Not in the file yet",
    body: "Breadcrumbs, tabs, an elevation scale, grids and breakpoints, and input error states. Candidates for V1.2.",
  },
};

export const evolution = {
  eyebrow: "PROCESS",
  heading: "How it grew up",
  intro: "Two fixes that show the shift from screens to system.",
  comparisons: [
    {
      id: "buttons",
      title: "The button",
      before: {
        label: "V1.0",
        description: "Five styles for one action. A gradient, a dark pill, an outline, a grey and an avatar chip.",
      },
      after: {
        label: "V1.1",
        description: "One Assign Button with three real states. Outlined, with a chevron, and assigned with an avatar.",
      },
    },
    {
      id: "nav",
      title: "The sidebar",
      before: {
        label: "V1.0",
        description: "Light and dark were separate hand copied frames that drifted apart.",
      },
      after: {
        label: "V1.1",
        description: "One Nav Item with Default, Hover and Activated. A theme change becomes a token swap.",
      },
    },
  ],
};

export const closingCta = {
  heading: "Want to see the system in a real screen, or build one like it?",
  cta: "Let's talk",
};
