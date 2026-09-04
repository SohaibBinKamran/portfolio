import Image from "next/image";
import { problem } from "@/data/cinefatic";
import { Caption, Eyebrow, PullQuote, RichText, Section } from "./Bits";

export function Problem() {
  return (
    <Section className="py-14">
      <div className="flex flex-col gap-3">
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <h2 className="text-[34px] leading-[1.02] sm:text-[44px] md:text-[58px]">
          {problem.heading}
        </h2>
      </div>

      <div className="mt-6 flex flex-col gap-4 text-[16px] leading-[1.72] text-[var(--cf-body)]">
        {problem.intro.map((p, i) => (
          <RichText key={i} text={p} />
        ))}
      </div>

      <figure className="mt-10">
        <div className="overflow-hidden rounded-[16px] border border-[var(--cf-border)] bg-[var(--cf-panel)] p-4 sm:p-10">
          <Image
            src={problem.image}
            alt={problem.imageAlt}
            width={1760}
            height={1479}
            className="mx-auto block h-auto w-full max-w-[852px]"
            sizes="(max-width: 900px) 100vw, 852px"
          />
        </div>
        <figcaption className="mt-5">
          <Caption>{problem.caption}</Caption>
        </figcaption>
      </figure>

      <div className="mt-10">
        <PullQuote>{problem.quote}</PullQuote>
      </div>
    </Section>
  );
}
