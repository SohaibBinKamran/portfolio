import Image from "next/image";
import { heroScreens, heroStats, meta } from "@/data/cinefatic";
import { Section, StatCard } from "./Bits";

export function Hero() {
  return (
    <Section className="pt-14 pb-24">
      {/* Ticket-stub meta card */}
      <div className="relative flex flex-col gap-8 rounded-[8px] bg-[var(--cf-cream)] px-8 py-9 sm:flex-row sm:items-stretch sm:px-14">
        <span className="pointer-events-none absolute -left-[11px] top-1/2 hidden size-[22px] -translate-y-1/2 rounded-full bg-[var(--cf-bg)] sm:block" />
        <span className="pointer-events-none absolute -right-[11px] top-1/2 hidden size-[22px] -translate-y-1/2 rounded-full bg-[var(--cf-bg)] sm:block" />
        <dl className="grid flex-1 grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
          {meta.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--cf-rose)]">
                {f.label}
              </dt>
              <dd className="mt-1 text-[14.5px] font-bold text-[var(--cf-on-cream)]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="hidden w-[190px] shrink-0 items-center justify-center border-l-2 border-dashed border-[var(--cf-on-cream)]/35 lg:flex">
          <span
            className="text-[12px] font-bold uppercase tracking-[0.3em] text-[var(--cf-rose)]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {meta.ticketStub}
          </span>
        </div>
      </div>

      {/* Phone showcase */}
      <div className="mt-4 overflow-hidden rounded-[16px] border border-[var(--cf-border)] bg-[var(--cf-panel)] px-4 py-10">
        <div className="mx-auto flex max-w-[560px] items-center justify-center">
          {heroScreens.map((s, i) => (
            <div
              key={s.src}
              className={
                i === 1
                  ? "relative z-10 w-[42%] max-w-[220px]"
                  : "relative z-0 w-[38%] max-w-[200px]"
              }
              style={{
                transform: `rotate(${s.rotate}deg)`,
                marginInline: i === 1 ? "-6%" : "0",
              }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={680}
                height={1482}
                priority={i === 1}
                className="block h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                sizes="220px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col justify-between gap-1 text-[13px] text-[var(--cf-body-dim)] sm:flex-row">
        <span>{meta.heroCaptionLeft}</span>
        <span>{meta.heroCaptionRight}</span>
      </div>

      {/* Snapshot stats */}
      <div className="mt-16 flex flex-col gap-8 sm:flex-row">
        {heroStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </Section>
  );
}
