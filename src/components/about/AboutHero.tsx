import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { heroQuote, heroTags } from "@/data/about";

/** Thin six-point asterisk that precedes each service pill (Figma node 911-1997). */
function Sparkle() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      aria-hidden
      className="shrink-0 text-ink/35"
    >
      <path
        d="M12 2v20M4 5l16 14M20 5L4 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AboutHero() {
  return (
    <section className="relative -mt-12 flex min-h-[560px] flex-col items-center justify-center gap-11 overflow-hidden px-6 py-24 text-center md:min-h-[600px]">
      {/* Pre-baked desaturated sky, already faded to white toward the centre
          (Figma "about me header" — full-bleed pattern fill). */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/images/about-hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </div>

      <h1 className="max-w-3xl font-serif text-3xl leading-snug tracking-tight md:text-[42px] md:leading-[1.25]">
        {heroQuote}
      </h1>

      <div className="w-full max-w-3xl">
        <Marquee durationSeconds={40} gapClass="gap-3">
          {heroTags.map((tag) => (
            <span
              key={tag}
              className="flex shrink-0 items-center gap-2 rounded-full border border-ink/[0.08] bg-white/70 px-5 py-2.5 font-sans text-sm text-ink-muted shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm"
            >
              <Sparkle />
              {tag}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
