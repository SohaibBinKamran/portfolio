import { landscape } from "@/data/xoopah";
import { SplitHeading } from "./Bits";

export function Landscape() {
  return (
    <section className="bg-white px-6 py-16 md:px-16 md:py-[88px] lg:px-24">
      <div
        className="relative mx-auto flex w-full max-w-[1120px] flex-col gap-5 overflow-hidden rounded-[24px] px-6 py-10 sm:px-10 md:py-11"
        style={{
          background:
            "radial-gradient(120% 90% at 65% 45%, rgba(255,255,255,0.08), rgba(255,255,255,0) 45%), #4e2e8f",
        }}
      >
        <div className="flex flex-col items-start gap-3">
          <span className="xo-eyebrow !text-[var(--xo-mint)]">{landscape.eyebrow}</span>
          <SplitHeading
            parts={landscape.heading}
            accentClass="text-[var(--xo-mint)]"
            className="!text-white"
          />
        </div>
        <p className="max-w-[520px] text-[14.5px] leading-[1.6] text-white/80">
          {landscape.intro}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {landscape.criteria.map((c) => (
            <span
              key={c.label}
              className="flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-[12.5px] tracking-[0.03em] text-white"
            >
              <img src={c.icon} alt="" aria-hidden className="size-[15px]" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
