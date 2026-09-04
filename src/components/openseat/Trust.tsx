import { trust } from "@/data/openseat";
import { SectionHead, Section } from "./Bits";

export function Trust() {
  return (
    <Section id="trust" width="narrow">
      <SectionHead
        eyebrow={`${trust.n} · ${trust.eyebrow}`}
        title={trust.title}
        intro={trust.intro}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {trust.systems.map((s) => (
          <div
            key={s.title}
            className="flex flex-col gap-4 rounded-[18px] border border-[var(--os-border)] bg-[var(--os-card)] p-8"
          >
            <span
              className="flex size-[44px] items-center justify-center rounded-[12px] text-[18px] font-bold"
              style={{
                background:
                  s.tone === "sage" ? "var(--os-sage-tint)" : "var(--os-mustard-tint)",
                color: s.tone === "sage" ? "var(--os-sage)" : "var(--os-mustard)",
              }}
            >
              {s.glyph}
            </span>
            <h3 className="text-[18px] font-bold text-[var(--os-ink)]">{s.title}</h3>
            <p className="text-[14.5px] leading-[1.6] text-[var(--os-body)]">{s.body}</p>
            {s.chips.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[var(--os-border)] px-3.5 py-1.5 text-[12.5px] text-[var(--os-ink)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
