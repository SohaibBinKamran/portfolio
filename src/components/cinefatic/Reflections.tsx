import { reflections } from "@/data/cinefatic";
import { Eyebrow, Section } from "./Bits";

export function Reflections() {
  return (
    <Section className="py-14">
      <div className="flex flex-col gap-3">
        <Eyebrow>{reflections.eyebrow}</Eyebrow>
        <h2 className="text-[34px] leading-[1.02] sm:text-[44px] md:text-[58px]">
          {reflections.heading}
        </h2>
      </div>

      <div className="mt-10 flex flex-col gap-6 md:flex-row">
        {reflections.cards.map((c) => (
          <div
            key={c.title}
            className="flex flex-1 flex-col gap-2.5 rounded-[14px] border border-[var(--cf-border-soft)] bg-[var(--cf-panel)] px-7 py-8"
          >
            <p className="text-[26px] leading-none text-[var(--cf-crimson)]">&ldquo;</p>
            <h3 className="text-[22px] leading-[1.2] tracking-[0.01em] text-[var(--cf-heading)] sm:text-[24px]">
              {c.title}
            </h3>
            <p className="mt-1 text-[16px] leading-[1.44] text-[var(--cf-body)]">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
