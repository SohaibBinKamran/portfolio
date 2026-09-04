import { meta } from "@/data/wanderlens";
import { PhoneFrame } from "./PhoneFrame";

export function Hero() {
  return (
    <section
      className="-mt-14 bg-gradient-to-b from-[var(--wl-hero-a)] to-[var(--wl-hero-b)] px-6 pb-16 pt-[128px]"
      style={{ fontFamily: "var(--wl-sans)" }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col-reverse items-start gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
        <div className="w-full max-w-[640px]">
          <p className="wl-eyebrow flex items-center gap-2.5" style={{ color: "var(--wl-moss)" }}>
            <span className="block h-[2px] w-[18px] bg-[var(--wl-amber)]" />
            {meta.eyebrow}
          </p>

          <h1
            className="wl-wordmark mt-8 text-[64px] leading-[0.96] text-[var(--wl-forest)] sm:text-[84px]"
          >
            {meta.title}
          </h1>

          <p className="mt-6 max-w-[560px] text-[19px] leading-[1.6] text-[#5b6354]">
            {meta.intro}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={meta.prototypeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-[30px] bg-[var(--wl-forest)] px-6 py-3.5 text-[14.5px] font-medium text-white transition-opacity hover:opacity-90"
            >
              View Interactive Prototype ↗
            </a>
            <a
              href="#research"
              className="rounded-[30px] border border-[var(--wl-forest)] px-6 py-3.5 text-[14.5px] font-medium text-[var(--wl-forest)] transition-colors hover:bg-[var(--wl-forest)]/5"
            >
              Read the Research ↓
            </a>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--wl-border)] pt-6">
            {meta.facts.map((f) => (
              <div key={f.label} className="min-w-[140px]">
                <dt
                  className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--wl-moss)]"
                  style={{ fontFamily: "var(--wl-mono)" }}
                >
                  {f.label}
                </dt>
                <dd className="mt-1 text-[14.5px] font-bold text-[var(--wl-forest)]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="w-[210px] shrink-0 md:w-[230px]">
          <PhoneFrame
            src="/images/wanderlens/screen-splash.png"
            alt="WanderLens splash screen with the brand mark over a misty forest"
            priority
          />
        </div>
      </div>
    </section>
  );
}
