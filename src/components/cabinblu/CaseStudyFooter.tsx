"use client";

import { caseStudyFooter } from "@/data/cabinblu";

export function CaseStudyFooter() {
  return (
    <section className="flex flex-col items-center gap-10 bg-[var(--cb-navy-deep)] px-6 pb-10 pt-[70px] md:px-20">
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-2.5 rounded-2xl border border-dashed border-white/25 bg-[var(--cb-navy-card)] px-9 py-9 text-center">
        <h3 className="text-2xl font-bold text-white">{caseStudyFooter.heading}</h3>
        <p className="max-w-[500px] text-[14.5px] text-[var(--cb-blue-stat-label)]">{caseStudyFooter.body}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3.5">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cb-eyebrow rounded-full bg-[var(--cb-gold)] px-5.5 py-3 text-[12.5px] text-[var(--cb-navy-deep)]"
          >
            {caseStudyFooter.backToTop}
          </button>
          <a
            href="/contact"
            className="cb-eyebrow rounded-full border border-white/30 px-5.5 py-3 text-[12.5px] text-white"
          >
            {caseStudyFooter.getInTouch}
          </a>
        </div>
      </div>
      <p className="cb-eyebrow text-center text-[12.5px] text-[var(--cb-blue-footer-credit)]">
        {caseStudyFooter.credit}
      </p>
    </section>
  );
}
