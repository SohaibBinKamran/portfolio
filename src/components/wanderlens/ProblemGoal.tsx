import Image from "next/image";
import { problemGoal } from "@/data/wanderlens";

export function ProblemGoal() {
  return (
    <section className="bg-[var(--wl-paper)] px-6 py-16">
      <div className="mx-auto flex max-w-[1078px] flex-col gap-6">
        {problemGoal.map((card) => (
          <div
            key={card.tone}
            className="flex flex-col items-center gap-6 rounded-[16px] p-8 sm:p-10"
            style={{ background: card.tone === "problem" ? "#faf2e8" : "#f0f2e7" }}
          >
            <div className="flex w-full items-start gap-3">
              <span
                className="flex size-[46px] shrink-0 items-center justify-center rounded-full text-[20px] text-white"
                style={{ background: card.tone === "problem" ? "var(--wl-amber)" : "var(--wl-moss)" }}
                aria-hidden
              >
                {card.tone === "problem" ? "⚠" : "◎"}
              </span>
              <div>
                <p
                  className="text-[13px] uppercase tracking-[0.08em] text-[#5b6354]"
                  style={{ fontFamily: "var(--wl-mono)", fontWeight: 700 }}
                >
                  {card.eyebrow}
                </p>
                <p className="mt-2 text-[19px] font-bold leading-[1.55] text-[var(--wl-forest)] sm:text-[21px]">
                  {card.heading}
                </p>
              </div>
            </div>

            <Image
              src={card.image}
              alt={card.imageAlt}
              width={1200}
              height={280}
              className="w-full max-w-[960px]"
            />

            <p className="text-center text-[15px] leading-[1.55] text-[var(--wl-ink)]">
              → {card.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
