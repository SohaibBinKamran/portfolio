import Image from "next/image";
import { hero } from "@/data/xoopah";

const statPosition: Record<string, string> = {
  "left-top": "-left-6 top-10 -rotate-2 md:-left-16",
  "right-top": "-right-6 top-2 rotate-2 md:-right-16",
  "left-bottom": "-left-4 bottom-6 rotate-3 md:-left-14",
  "right-bottom": "-right-4 bottom-16 -rotate-3 md:-right-14",
};

export function Hero() {
  return (
    <section
      className="relative -mt-16 overflow-hidden pb-16 pt-[150px] md:pb-20"
      style={{
        background:
          "radial-gradient(140% 110% at 15% 0%, #6842ac 0%, #8155c9 25%, #6e46b8 55%, #4e2e8f 100%)",
      }}
    >
      <div className="relative mx-auto flex max-w-[880px] flex-col items-center gap-7 px-6 text-center">
        <h1 className="!text-white text-[42px] font-bold leading-[1.03] sm:text-[56px] md:text-[64px] lg:text-[72px]">
          {hero.heading[0]}
          <span className="text-[var(--xo-mint)]">{hero.heading[1]}</span>
        </h1>
        <p className="max-w-[540px] text-[16px] leading-[1.6] text-white/80 md:text-[18px]">
          {hero.intro}
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 pt-1">
          {hero.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/28 bg-white/12 px-4 py-2 font-[family-name:var(--xo-mono)] text-[11.5px] font-bold uppercase tracking-[0.03em] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-[644px] px-10">
        <div className="relative">
          {hero.stats.map((s) => (
            <div
              key={s.label}
              className={`absolute z-10 hidden rounded-[14px] bg-white px-3.5 py-2.5 shadow-[0_14px_26px_-10px_rgba(20,8,45,0.4)] sm:block ${statPosition[s.pos]}`}
            >
              <p className="font-[family-name:var(--xo-sans)] text-[19px] font-bold leading-[1] text-[var(--xo-purple-deep)]">
                {s.value}
              </p>
              <p className="font-[family-name:var(--xo-sans)] text-[9.5px] uppercase tracking-[0.05em] text-[#6b5a8a]">
                {s.label}
              </p>
            </div>
          ))}

          <div className="rotate-[-0.6deg] overflow-hidden rounded-[14px] bg-[#ede7f8] shadow-[0_40px_80px_-20px_rgba(20,8,45,0.55),0_0_0_1px_rgba(255,255,255,0.15)]">
            <div className="flex items-center gap-1.5 bg-[#ded4f5] px-3.5 py-2.5">
              <span className="size-2 rounded-full bg-[#b7a5de]" />
              <span className="size-2 rounded-full bg-[#b7a5de]" />
              <span className="size-2 rounded-full bg-[#b7a5de]" />
            </div>
            <div className="relative aspect-[640/418] w-full">
              <Image
                src="/images/xoopah/hero-dashboard.png"
                alt="Xoopah dashboard overview with contacts, clients, churn rate and rating stats"
                fill
                priority
                sizes="(min-width: 768px) 640px, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
