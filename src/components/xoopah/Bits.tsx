import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  tint = false,
}: {
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section
      className={`px-6 py-16 md:px-16 md:py-[88px] lg:px-24 ${tint ? "bg-[var(--xo-tint)]" : ""} ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-11">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="xo-eyebrow">{children}</span>;
}

/** Renders a two-tone heading: plain spans then a purple/mint accent span. */
export function SplitHeading({
  parts,
  accentIndex,
  accentClass = "text-[var(--xo-purple)]",
  className = "",
}: {
  parts: string[];
  /** Index of the part to accent. Defaults to the last part. */
  accentIndex?: number;
  accentClass?: string;
  className?: string;
}) {
  const accent = accentIndex ?? parts.length - 1;
  return (
    <h2 className={`text-[28px] leading-[1.14] tracking-[-0.01em] sm:text-[34px] md:text-[42px] md:tracking-[-0.42px] ${className}`}>
      {parts.map((part, i) => (
        <span key={i} className={i === accent && parts.length > 1 ? accentClass : undefined}>
          {part}
        </span>
      ))}
    </h2>
  );
}
