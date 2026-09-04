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
          <strong key={i} className="font-bold text-[var(--os-ink)]">
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
  width = "wide",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** "wide" = 1172px content column (default). "narrow" = 1024px (Figma §07). */
  width?: "wide" | "narrow";
}) {
  return (
    <section id={id} className={`px-6 py-16 md:py-[72px] ${className}`}>
      <div
        className={`mx-auto w-full ${
          width === "narrow" ? "max-w-[1024px]" : "max-w-[1172px]"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export function Separator() {
  return (
    <div aria-hidden className="mx-auto h-px w-full max-w-[1440px] bg-[var(--os-border)]" />
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="os-eyebrow">{children}</span>;
}

/** Figma §01–§11 share one header block: eyebrow → 46px bold heading → 15px
    sub, all left-aligned at the full content width, stacked with an 18px gap. */
export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-[18px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="w-full whitespace-pre-line text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[46px] md:tracking-[-0.46px]">
        {title}
      </h2>
      {intro ? (
        <p className="w-full text-[15px] leading-[24px] text-[var(--os-body)]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** CSS iPhone frame wrapping a portrait app-screen export. */
export function Phone({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[299/613] w-full rounded-[2.6rem] border-[10px] border-[#1c1c22] bg-[#1c1c22] shadow-[0_30px_60px_-25px_rgba(43,32,24,0.45)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 360px, 90vw"
          className="object-cover object-top"
        />
      </div>
      <span
        aria-hidden
        className="absolute left-1/2 top-[10px] h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#1c1c22]"
      />
    </div>
  );
}
