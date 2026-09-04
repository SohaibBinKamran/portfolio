import { discovery } from "@/data/openseat";
import { SectionHead, Section } from "./Bits";

export function Discovery() {
  return (
    <Section id="discovery">
      <SectionHead
        eyebrow={`${discovery.n} · ${discovery.eyebrow}`}
        title={discovery.title}
        intro={discovery.intro}
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {discovery.stats.map((s) => (
          <div
            key={s.title}
            className={`flex flex-col gap-3 rounded-[18px] border p-7 ${
              s.dark
                ? "border-transparent bg-[var(--os-dark)]"
                : "border-[var(--os-border)] bg-[var(--os-card)]"
            }`}
          >
            <p
              className={`text-[34px] font-extrabold leading-none ${
                s.dark ? "text-[var(--os-mustard)]" : "text-[var(--os-coral)]"
              }`}
            >
              {s.value}
            </p>
            <p
              className={`text-[15.5px] font-bold ${
                s.dark ? "text-white" : "text-[var(--os-ink)]"
              }`}
            >
              {s.title}
            </p>
            <p
              className={`text-[13.5px] leading-[1.55] ${
                s.dark ? "text-[#d9cbbb]" : "text-[var(--os-body)]"
              }`}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <blockquote className="mt-10 flex items-center gap-6 border-y border-[var(--os-border)] py-10 md:py-[45px]">
        <span
          aria-hidden
          className="shrink-0 font-[family-name:var(--font-instrument-serif)] text-[72px] leading-[0.5] text-[var(--os-coral)] md:text-[96px]"
        >
          &ldquo;
        </span>
        <p className="text-[20px] leading-[1.4] text-[var(--os-ink)] md:text-[26px]">
          {discovery.quote}
        </p>
      </blockquote>
    </Section>
  );
}
