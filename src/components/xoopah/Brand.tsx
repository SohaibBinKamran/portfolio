import { brand } from "@/data/xoopah";
import { Eyebrow, Section, SplitHeading } from "./Bits";

export function Brand() {
  return (
    <Section tint>
      <div className="flex flex-col items-start gap-3 max-w-[640px]">
        <Eyebrow>{brand.eyebrow}</Eyebrow>
        <SplitHeading parts={brand.heading} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.4fr_1fr]">
        {brand.swatches
          .filter((s) => s.wide)
          .map((s) => (
            <div
              key={s.name}
              className="flex min-h-[150px] flex-col justify-between rounded-[20px] p-6 shadow-[0_14px_30px_-18px_rgba(36,19,56,0.4)]"
              style={{ background: s.fill }}
            >
              <p className={`text-[14px] font-bold ${s.onDark ? "text-white" : "text-[var(--xo-purple-deep)]"}`}>
                {s.name}
              </p>
              <p className={`text-[13px] opacity-85 ${s.onDark ? "text-white" : "text-[var(--xo-purple-deep)]"}`}>
                {s.hex}
              </p>
            </div>
          ))}
        <div className="flex flex-col gap-4">
          {brand.swatches
            .filter((s) => !s.wide)
            .map((s) => (
              <div
                key={s.name}
                className="flex min-h-[150px] flex-col justify-between rounded-[20px] p-6 shadow-[0_14px_30px_-18px_rgba(36,19,56,0.4)]"
                style={{ background: s.fill }}
              >
                <p className={`text-[14px] font-bold ${s.onDark ? "text-white" : "text-[var(--xo-purple-deep)]"}`}>
                  {s.name}
                </p>
                <p className={`text-[13px] opacity-85 ${s.onDark ? "text-white" : "text-[var(--xo-purple-deep)]"}`}>
                  {s.hex}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 rounded-[20px] bg-white p-6 shadow-[0_14px_30px_-18px_rgba(36,19,56,0.25)] sm:flex-row sm:p-8">
        <div className="flex-1">
          <span className="font-[family-name:var(--xo-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--xo-muted)]">
            {brand.type.display.label}
          </span>
          <p className="pt-1 text-[26px] font-bold leading-[1.1] text-[var(--xo-ink)] sm:text-[30px]">
            {brand.type.display.specimen}
          </p>
          <p className="pt-1 text-[15px] leading-[1.5] text-[var(--xo-body)]">
            {brand.type.display.note}
          </p>
        </div>
        <div className="flex-1">
          <span className="font-[family-name:var(--xo-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--xo-muted)]">
            {brand.type.body.label}
          </span>
          <p className="pt-2 text-[15.5px] leading-[1.5] text-[var(--xo-body)]">
            {brand.type.body.specimen}
          </p>
          <span className="mt-2 inline-block rounded-[6px] bg-[var(--xo-tint)] px-2 py-1 font-[family-name:var(--xo-mono)] text-[13px] text-[var(--xo-purple-deep)]">
            {brand.type.body.chip}
          </span>
        </div>
      </div>
    </Section>
  );
}
