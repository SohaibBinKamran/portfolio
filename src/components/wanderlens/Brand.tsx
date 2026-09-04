import { brand } from "@/data/wanderlens";
import { WlEyebrow, WlMark } from "./Mark";

export function Brand() {
  return (
    <section className="bg-[var(--wl-paper)] px-6 py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-2 sm:px-8">
        <header>
          <WlEyebrow>{brand.eyebrow}</WlEyebrow>
          <h2 className="mt-4 max-w-[1000px] text-[32px] font-bold leading-[1.15] text-[var(--wl-forest)] sm:text-[42px]">
            {brand.heading}
          </h2>
          <p className="mt-3 max-w-[1000px] text-[16.5px] leading-[1.6] text-[#5b6354]">
            {brand.sub}
          </p>
        </header>

        {/* mark + rationale */}
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex h-[244px] items-center justify-center rounded-[28px] bg-[var(--wl-forest)] p-12">
            <WlMark className="h-[144px] w-auto text-[var(--wl-moss)]" />
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-[var(--wl-forest)] sm:text-[26px]">
              {brand.markHeading}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.6] text-[#5b6354]">{brand.markBody}</p>
            <ul className="mt-5 flex flex-col gap-3.5">
              {brand.markPoints.map((p) => (
                <li key={p.lead} className="flex gap-3.5 text-[16px] leading-[1.6]">
                  <span className="mt-[9px] block size-2 shrink-0 rounded bg-[var(--wl-amber)]" />
                  <span className="text-[var(--wl-ink)]">
                    <span className="font-bold text-[var(--wl-forest)]">{p.lead}</span> {p.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* light / dark lockups */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {[
            { label: "Light Background", dark: false },
            { label: "Dark Background", dark: true },
          ].map((l) => (
            <div
              key={l.label}
              className="flex flex-1 flex-col items-center gap-5 rounded-[16px] border border-[var(--wl-border)] px-4 pb-5 pt-7"
              style={{ background: l.dark ? "var(--wl-forest)" : "#fff" }}
            >
              <WlMark
                className="h-[46px] w-auto"
                style={{ color: l.dark ? "var(--wl-moss)" : "var(--wl-forest)" }}
              />
              <span
                className="text-[14px] uppercase tracking-[0.05em]"
                style={{
                  fontFamily: "var(--wl-mono)",
                  fontWeight: 800,
                  color: l.dark ? "var(--wl-on-dark-muted)" : "#5b6354",
                }}
              >
                {l.label}
              </span>
            </div>
          ))}
        </div>

        {/* colors */}
        <div>
          <h3 className="text-[24px] font-bold text-[var(--wl-forest)] sm:text-[26px]">Brand Colors</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {brand.colors.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-[16px] border border-[var(--wl-border)] bg-white">
                <div className="h-24 w-full" style={{ background: c.hex }} />
                <div className="flex flex-col gap-[3px] p-4">
                  <p className="text-[15px] font-bold text-[var(--wl-forest)]">{c.name}</p>
                  <p className="text-[12px] text-[#5b6354]" style={{ fontFamily: "var(--wl-mono)" }}>
                    {c.hex}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-[1.5] text-[#5b6354]">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* typography */}
        <div>
          <h3 className="text-[24px] font-bold text-[var(--wl-forest)] sm:text-[26px]">Typography</h3>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {brand.type.map((t, i) => (
              <div key={t.label} className="rounded-[16px] border border-[var(--wl-border)] bg-white p-7">
                <p
                  className="text-[11px] uppercase tracking-[0.08em] text-[var(--wl-moss)]"
                  style={{ fontFamily: "var(--wl-mono)" }}
                >
                  {t.label}
                </p>
                <p
                  className="mt-2 text-[30px] text-[var(--wl-forest)]"
                  style={{
                    fontFamily: i === 0 ? "var(--wl-display)" : "var(--wl-sans)",
                    fontWeight: i === 0 ? 900 : 500,
                  }}
                >
                  {t.sample}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[#5b6354]">{t.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* guidelines */}
        <div>
          <h3 className="text-[24px] font-bold text-[var(--wl-forest)] sm:text-[26px]">
            Brand &amp; Visual Guidelines
          </h3>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {brand.guidelines.map((g) => (
              <div key={g.title} className="rounded-[16px] bg-[var(--wl-sage)] p-6">
                <p className="text-[16px] font-bold text-[var(--wl-forest)]">{g.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[#5b6354]">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
