import Image from "next/image";
import type { ReactNode } from "react";

/** Renders `**bold**` spans inside otherwise plain copy. */
export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[var(--cq-ink)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

export function Section({
  id,
  children,
  className = "",
  band = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  band?: boolean;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-20 md:py-24 ${band ? "bg-[var(--cq-bg-alt)]" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1172px]">{children}</div>
    </section>
  );
}

export function Separator() {
  return <div aria-hidden className="h-px w-full bg-[var(--cq-border)]" />;
}

/** Numbered eyebrow: circled index + mono gold label. */
export function Eyebrow({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="flex size-[22px] items-center justify-center rounded-full border border-[var(--cq-gold)] font-[family-name:var(--cq-mono)] text-[9px] text-[var(--cq-gold)]">
        {n}
      </span>
      <span className="cq-eyebrow">{children}</span>
    </div>
  );
}

/** Plain dash eyebrow used only on the hero. */
export function DashEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span aria-hidden className="h-px w-[26px] bg-[var(--cq-muted)]" />
      <span className="cq-eyebrow !text-[var(--cq-body)]">{children}</span>
    </div>
  );
}

export function SectionHead({
  n,
  eyebrow,
  title,
  intro,
}: {
  n: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow n={n}>{eyebrow}</Eyebrow>
      <h2 className="text-[30px] leading-[1.12] sm:text-[38px] md:text-[44px]">
        {title}
      </h2>
      {intro ? (
        <RichText
          text={intro}
          className="max-w-[1000px] text-[17px] leading-[1.6] text-[var(--cq-body)]"
        />
      ) : null}
    </div>
  );
}

/** Subheading inside a section (e.g. "Logo exploration"). */
export function SubHead({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[21px] font-bold text-[var(--cq-ink)]">{title}</h3>
      {intro ? (
        <RichText
          text={intro}
          className="max-w-[1000px] text-[16px] leading-[1.62] text-[var(--cq-body)]"
        />
      ) : null}
    </div>
  );
}

export function Note({ text }: { text: string }) {
  return (
    <RichText
      text={text}
      className="max-w-[1000px] text-[15px] leading-[1.62] text-[var(--cq-muted)]"
    />
  );
}

export function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex-1 rounded-[16px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-7 py-6">
      <p className="text-[38px] font-bold leading-none text-[var(--cq-blue)]">
        {value}
      </p>
      <p className="mt-3 text-[14px] leading-[1.5] text-[var(--cq-body)]">
        {label}
      </p>
    </div>
  );
}

/** Small mono-labelled card (themes, metrics, tensions). */
export function LabelCard({
  label,
  labelColor = "muted",
  title,
  body,
}: {
  label: string;
  labelColor?: "muted" | "red" | "green" | "blue";
  title?: string;
  body: string;
}) {
  const colors: Record<string, string> = {
    muted: "text-[var(--cq-muted)]",
    red: "text-[var(--cq-red)]",
    green: "text-[var(--cq-green)]",
    blue: "text-[var(--cq-blue)]",
  };
  return (
    <div className="flex flex-col gap-2 rounded-[14px] border border-[var(--cq-border)] bg-[var(--cq-card)] px-6 py-6">
      <p
        className={`font-[family-name:var(--cq-mono)] text-[11px] uppercase tracking-[0.09em] ${colors[labelColor]}`}
      >
        {label}
      </p>
      {title ? (
        <h4 className="text-[16.5px] font-bold leading-[1.3] text-[var(--cq-ink)]">
          {title}
        </h4>
      ) : null}
      <RichText
        text={body}
        className="text-[14px] leading-[1.58] text-[var(--cq-body)]"
      />
    </div>
  );
}

/** White card with a gold left border — quotes + "why" asides. */
export function Callout({
  quote,
  source,
  tag,
}: {
  quote: string;
  source?: string;
  tag?: string;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--cq-border)] border-l-[3px] border-l-[var(--cq-gold)] bg-[var(--cq-card)] px-7 py-6">
      <p className="text-[17px] leading-[1.55] text-[var(--cq-ink)]">{quote}</p>
      {source || tag ? (
        <p className="mt-3 flex flex-wrap items-center gap-3 font-[family-name:var(--cq-mono)] text-[11px] uppercase tracking-[0.06em] text-[var(--cq-muted)]">
          {source ? <span>{source}</span> : null}
          {tag ? (
            <span className="rounded-[4px] bg-[var(--cq-gold-tint)] px-2 py-[3px] text-[var(--cq-gold)]">
              {tag}
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

/** Bordered + shadowed image frame (the hero / dashboard treatment). */
export function FrameImg({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(min-width: 1128px) 1128px, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--cq-border)] p-px shadow-[0px_30px_60px_-30px_rgba(20,20,40,0.25)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full rounded-[17px]"
      />
    </div>
  );
}

/** Gold-left "why" aside: bold title + explanatory body. */
export function Aside({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[12px] border border-[var(--cq-border)] border-l-[3px] border-l-[var(--cq-gold)] bg-[var(--cq-card)] px-7 py-6">
      <h4 className="text-[16px] font-bold text-[var(--cq-ink)]">{title}</h4>
      <RichText
        text={body}
        className="mt-2 max-w-[82ch] text-[14px] leading-[1.62] text-[var(--cq-body)]"
      />
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[13.5px] leading-[1.5] text-[var(--cq-muted)]">
      {children}
    </p>
  );
}
