import Image from "next/image";
import { solution } from "@/data/classquest";
import { Caption, FrameImg, Section, SectionHead } from "./Bits";

export function Solution() {
  return (
    <Section id="solution">
      <SectionHead
        n={solution.n}
        eyebrow={solution.eyebrow}
        title={solution.title}
        intro={solution.intro}
      />

      <div className="mt-10 flex flex-col gap-12">
        {solution.screens.map((s) => (
          <figure key={s.src}>
            <FrameImg src={s.src} alt={s.caption} width={s.w} height={s.h} />
            <Caption>{s.caption}</Caption>
          </figure>
        ))}
      </div>

      <p className="mt-12 max-w-[74ch] text-[16px] leading-[1.66] text-[var(--cq-body)]">
        {solution.formatsLead}
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {solution.formats.map((f) => (
          <figure key={f.name}>
            <p className="mb-2 font-[family-name:var(--cq-mono)] text-[10.5px] uppercase tracking-[0.09em] text-[var(--cq-blue)]">
              {f.name}
            </p>
            <div className="overflow-hidden rounded-[10px] border border-[var(--cq-border)]">
              <Image
                src={f.src}
                alt={`${f.name} micro-learning unit`}
                width={f.w}
                height={f.h}
                sizes="(min-width: 768px) 360px, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </figure>
        ))}
      </div>

      <p className="mt-8 max-w-[74ch] text-[15px] leading-[1.64] text-[var(--cq-muted)]">
        {solution.selfRate}
      </p>

      <figure className="mt-10">
        <FrameImg
          src={solution.sourcePreview.src}
          alt={solution.sourcePreview.caption}
          width={solution.sourcePreview.w}
          height={solution.sourcePreview.h}
        />
        <Caption>{solution.sourcePreview.caption}</Caption>
      </figure>

      <p className="mt-12 max-w-[74ch] text-[16px] leading-[1.66] text-[var(--cq-body)]">
        {solution.closeLead}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start">
        {solution.closeScreens.map((s) => (
          <figure key={s.src}>
            <div className="overflow-hidden rounded-[12px] border border-[var(--cq-border)]">
              <Image
                src={s.src}
                alt={s.caption}
                width={s.w}
                height={s.h}
                sizes="(min-width: 768px) 550px, 100vw"
                className="block h-auto w-full"
              />
            </div>
            <Caption>{s.caption}</Caption>
          </figure>
        ))}
      </div>

      <figure className="mt-10">
        <FrameImg
          src={solution.leaderboard.src}
          alt={solution.leaderboard.caption}
          width={solution.leaderboard.w}
          height={solution.leaderboard.h}
        />
        <Caption>{solution.leaderboard.caption}</Caption>
      </figure>
    </Section>
  );
}
