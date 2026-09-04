"use client";

import { caseFooter, meta } from "@/data/wanderlens";
import { WlMark } from "./Mark";

export function CaseFooter() {
  return (
    <section className="bg-[var(--wl-forest-deep)] px-6 pb-8 pt-16">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-12 px-2 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-[340px]">
            <div className="flex items-center gap-2.5">
              <WlMark className="h-[28px] w-auto text-white" />
              <span
                className="text-[20px] text-white"
                style={{ fontFamily: "var(--wl-display)", fontWeight: 900 }}
              >
                {caseFooter.wordmark}
              </span>
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--wl-on-dark-soft)]">
              {caseFooter.blurb}
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href={meta.prototypeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[12.5px] text-[var(--wl-on-dark-soft)] transition-colors hover:text-white"
              style={{ fontFamily: "var(--wl-mono)" }}
            >
              PROTOTYPE ↗
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[12.5px] text-[var(--wl-on-dark-soft)] transition-colors hover:text-white"
              style={{ fontFamily: "var(--wl-mono)" }}
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>

        <p
          className="text-center text-[11.5px] text-[var(--wl-ink-faint)]"
        >
          {caseFooter.credit}
        </p>
      </div>
    </section>
  );
}
