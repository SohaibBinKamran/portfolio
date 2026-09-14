import { close } from "@/data/xoopah";
import { SplitHeading } from "./Bits";

export function Close() {
  return (
    <section
      className="px-6 py-16 md:py-[88px]"
      style={{
        background:
          "radial-gradient(120% 90% at 65% 45%, rgba(255,255,255,0.09), rgba(255,255,255,0) 45%), radial-gradient(140% 110% at 15% 0%, #6842ac 0%, #8155c9 30%, #6237a8 70%, #4e2e8f 100%)",
      }}
    >
      <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3.5 text-center">
        <span className="xo-eyebrow !text-[var(--xo-mint)]">{close.eyebrow}</span>
        <SplitHeading
          parts={close.heading}
          accentClass="text-[var(--xo-mint)]"
          className="!text-white text-[32px] sm:text-[38px] md:text-[44px]"
        />
        <p className="max-w-[520px] pt-1 text-[15px] leading-[1.6] text-white/82">
          {close.intro}
        </p>
        <div className="grid w-full grid-cols-2 gap-3.5 pt-6 sm:grid-cols-4">
          {close.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 rounded-[14px] border border-white/22 bg-white/10 px-2.5 py-[19px]"
            >
              <span className="text-[24px] font-bold text-[var(--xo-mint)]">{s.value}</span>
              <span className="font-[family-name:var(--xo-mono)] text-[10px] uppercase tracking-[0.05em] text-white/75">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
