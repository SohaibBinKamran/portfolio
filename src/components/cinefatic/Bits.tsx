import Image from "next/image";
import type { ReactNode } from "react";

/** Renders `**bold**` spans inside otherwise plain copy. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[var(--cf-heading)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="cf-eyebrow">{children}</p>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 ${className}`}>
      <div className="mx-auto w-full max-w-[960px]">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-[16ch] text-[34px] leading-[1.02] sm:text-[44px] md:text-[58px] md:max-w-none">
        {heading}
      </h2>
      {intro ? (
        <p className="mt-2 max-w-[52ch] text-[16px] leading-[1.72] text-[var(--cf-body)]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Cream card with the ticket-stub notch punch-outs on both edges. */
export function StatCard({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note: string;
}) {
  return (
    <div className="relative flex-1 rounded-[8px] bg-[var(--cf-cream)] px-6 py-7">
      <span className="pointer-events-none absolute -left-[11px] top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-[var(--cf-notch)]" />
      <span className="pointer-events-none absolute -right-[11px] top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-[var(--cf-notch)]" />
      <p className="text-[46px] font-bold leading-none text-[var(--cf-rose)] sm:text-[52px]">
        {value}
      </p>
      <p className="mt-3 text-[14px] font-bold text-[var(--cf-on-cream)]">{label}</p>
      <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--cf-on-cream)]/65">{note}</p>
    </div>
  );
}

export function NumberCard({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-[14px] border border-[var(--cf-border-soft)] bg-[var(--cf-panel)] px-6 py-7">
      <p className="text-[12px] font-medium tracking-[0.08em] text-[var(--cf-crimson)]">{n}</p>
      <h3 className="mt-1 text-[20px] font-medium text-[var(--cf-heading)]">{title}</h3>
      <p className="text-[13.8px] leading-[1.6] text-[var(--cf-body)]">{body}</p>
    </div>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-[3px] border-[var(--cf-crimson)] pl-7">
      <p className="cf-hand text-[26px] leading-[1.4] text-[var(--cf-gold)] sm:text-[30px]">
        {children}
      </p>
    </blockquote>
  );
}

/** Short centered rule between major sections (matches the Figma section breaks). */
export function Divider() {
  return (
    <div className="flex justify-center" aria-hidden>
      <span className="block h-px w-[88px] bg-[var(--cf-gold)]/40" />
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-[14px] text-[var(--cf-body-dim)]">{children}</p>
  );
}

/** Phone screenshot in a dark bezel, matching the Figma `border-5` frame. */
export function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border-[5px] border-[var(--cf-panel-deep)] shadow-[0px_22px_44px_-18px_rgba(0,0,0,0.6)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={560}
        height={1215}
        className="block h-auto w-full"
        sizes="190px"
      />
    </div>
  );
}
