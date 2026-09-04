import { pivot } from "@/data/cinefatic";
import { Eyebrow, PullQuote, Section } from "./Bits";

export function Pivot() {
  return (
    <Section className="py-14">
      <div className="flex flex-col gap-3">
        <Eyebrow>{pivot.eyebrow}</Eyebrow>
        <h2 className="max-w-[20ch] text-[34px] leading-[1.02] sm:text-[44px] md:text-[58px]">
          {pivot.heading}
        </h2>
      </div>

      <p className="mt-7 text-[16px] leading-[1.72] text-[var(--cf-body)]">{pivot.before}</p>

      <div className="mt-8">
        <PullQuote>{pivot.quote}</PullQuote>
      </div>

      <p className="mt-8 text-[16px] leading-[1.72] text-[var(--cf-body)]">{pivot.after}</p>
    </Section>
  );
}
