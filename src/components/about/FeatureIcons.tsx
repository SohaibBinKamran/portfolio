const common = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PlaneIcon() {
  return (
    <svg {...common}>
      <path d="M2 12l19-9-7 19-3-8-8-2z" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 20c0-3 3-5 6-5s6 2 6 5" />
      <path d="M14 15c2.5 0 6 2 6 5" />
    </svg>
  );
}

export function TrophyIcon() {
  return (
    <svg {...common}>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
      <path d="M5 6H3a2 2 0 002 4M19 6h2a2 2 0 01-2 4" />
      <path d="M10 15h4M12 13v6M9 21h6" />
    </svg>
  );
}

export function RocketIcon() {
  return (
    <svg {...common}>
      <path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 2-3-2c-1-1-2-3-2-5 0-4 2-8 5-10z" />
      <circle cx="12" cy="10" r="1.5" />
      <path d="M9 17l-2 4M15 17l2 4" />
    </svg>
  );
}

export function PenNibIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3-6 3 6-3 6-3-6z" />
    </svg>
  );
}
