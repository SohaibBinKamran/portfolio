import { solution } from "@/data/cinefatic";
import { Phone, Section, SectionHead } from "./Bits";

function ScreenBlock({ screen }: { screen: (typeof solution.screens)[number] }) {
  return (
    <div className="border-t border-[var(--cf-border-soft)] pt-[52px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--cf-crimson)]">
        {screen.label}
      </p>
      <h3 className="mt-2 text-[26px] leading-[1.15] sm:text-[32px] md:text-[38px]">
        {screen.title}
      </h3>
      <p className="mt-3 max-w-[70ch] text-[14.8px] leading-[1.68] text-[var(--cf-body)]">
        {screen.lead}
      </p>

      <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
        <div className="flex flex-1 flex-wrap items-start justify-center gap-4">
          {screen.shots.map((s) => (
            <Phone key={s.src} src={s.src} alt={s.alt} className="w-[46%] max-w-[190px]" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          {screen.points.map((p) => (
            <div key={p.title}>
              <p className="text-[19px] tracking-[0.01em] text-[var(--cf-gold)]">{p.title}</p>
              <p className="mt-1.5 text-[13.8px] leading-[1.62] text-[var(--cf-body)]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Solution() {
  return (
    <Section className="py-14">
      <SectionHead
        eyebrow={solution.eyebrow}
        heading={solution.heading}
        intro={solution.intro}
      />

      <div className="mt-14 flex flex-col gap-16">
        {solution.screens.map((s) => (
          <ScreenBlock key={s.label} screen={s} />
        ))}
      </div>

      <div className="relative mt-14 flex flex-col items-center gap-4 rounded-[8px] bg-[var(--cf-cream)] px-6 py-6 sm:flex-row sm:gap-5">
        <span className="pointer-events-none absolute -left-[11px] top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-[var(--cf-notch)]" />
        <span className="pointer-events-none absolute -right-[11px] top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-[var(--cf-notch)]" />
        <p className="text-[40px] font-bold leading-none text-[var(--cf-rose)]">
          {solution.callout.stat}
        </p>
        <p className="text-[13px] leading-[1.5] text-[var(--cf-on-cream)]">
          {solution.callout.body}
        </p>
      </div>
    </Section>
  );
}
