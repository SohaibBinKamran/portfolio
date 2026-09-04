import { meta } from "@/data/classquest";
import { DashEyebrow, FrameImg } from "./Bits";

export function Hero() {
  return (
    <header className="-mt-12 px-6 pt-28 pb-20">
      <div className="mx-auto flex w-full max-w-[1172px] flex-col items-start gap-6 text-left">
        <DashEyebrow>{meta.eyebrow}</DashEyebrow>
        <h1 className="text-[38px] leading-[1.06] sm:text-[52px] md:text-[64px]">
          {meta.title[0]}
          <span className="text-[var(--cq-blue)]">{meta.title[1]}</span>
          {meta.title[2]}
        </h1>
        <p className="max-w-[1080px] text-[18px] leading-[1.6] text-[var(--cq-body)]">
          {meta.intro}
        </p>

        <dl className="mt-4 grid w-full grid-cols-2 gap-8 border-t border-[var(--cq-border)] pt-6 text-left sm:grid-cols-4">
          {meta.facts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1.5">
              <dt className="font-[family-name:var(--cq-mono)] text-[10.5px] uppercase tracking-[0.08em] text-[var(--cq-muted)]">
                {f.label}
              </dt>
              <dd className="text-[14.5px] font-bold text-[var(--cq-ink)]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 w-full">
          <FrameImg
            src="/images/classquest/hero.jpg"
            alt="The ClassQuest landing page — Turn Your Study Material Into Smart Learning Quests"
            width={1400}
            height={1962}
            priority
          />
        </div>
      </div>
    </header>
  );
}
