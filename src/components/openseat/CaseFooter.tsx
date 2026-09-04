import { caseFooter } from "@/data/openseat";
import { Eyebrow } from "./Bits";

export function CaseFooter() {
  return (
    <section className="px-6 pt-16 pb-[50px]">
      <div className="mx-auto flex w-full max-w-[1172px] flex-col items-start gap-[18px]">
        <Eyebrow>{caseFooter.eyebrow}</Eyebrow>
        <h2 className="w-full text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[36px] md:text-[44px] md:tracking-[-0.44px]">
          {caseFooter.title}
        </h2>
        <div className="flex w-full flex-col gap-6 pt-1 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex flex-wrap gap-2.5">
            {caseFooter.roles.map((r) => (
              <span
                key={r}
                className="rounded-full border border-[rgba(43,32,24,0.32)] px-[15px] py-[9px] text-[11.5px] text-[var(--os-ink)]"
              >
                {r}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 font-[family-name:var(--os-mono)] text-[12px] text-[var(--os-body)] md:items-end md:text-right">
            {caseFooter.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
