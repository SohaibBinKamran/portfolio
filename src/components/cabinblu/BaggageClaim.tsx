"use client";

import { motion } from "framer-motion";
import { baggageClaim } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";
import { FigmaCrop } from "./FigmaCrop";

// Exact per-tag crop transforms from Figma get_design_context (one shared
// sprite, eight pre-defined crop windows) — not approximated.
const crops = [
  { w: 451.82, h: 301.43, top: -19.14, left: -10.3 },
  { w: 417.65, h: 301.43, top: -19.14, left: -108.35 },
  { w: 438.53, h: 301.43, top: -19.14, left: -222.96 },
  { w: 438.53, h: 307.58, top: -21.57, left: -327.53 },
  { w: 451.82, h: 320.67, top: -178.02, left: -8.66 },
  { w: 429.68, h: 320.67, top: -178.02, left: -106.55 },
  { w: 429.68, h: 320.67, top: -178.02, left: -210.89 },
  { w: 391.34, h: 314.93, top: -174.83, left: -285.59 },
];

export function BaggageClaim() {
  return (
    <section className="flex flex-col items-center gap-11 bg-white px-6 py-16 md:px-14 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{baggageClaim.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">{baggageClaim.heading}</h2>
        <p className="max-w-[900px] text-[17px] leading-[1.55] text-[var(--cb-body)]">{baggageClaim.sub}</p>
      </div>

      <div className="mx-auto grid w-full max-w-[1170px] grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {baggageClaim.tags.map((tag, i) => (
          <motion.div
            key={tag.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <FigmaCrop
              src="/images/cabinblu-tags-sprite.png"
              alt=""
              {...crops[i]}
              className="aspect-square w-[220px] max-w-full"
            />
            <div className="flex flex-col items-center gap-1">
              <p className="cb-eyebrow text-[10px] tracking-wider text-[var(--cb-blue-accent)]">
                TAG №{tag.n} · INSIGHT {tag.n}
              </p>
              <p className="text-xs text-[var(--cb-body)]">{tag.insight}</p>
              <p className="text-[14.5px] font-medium text-[var(--cb-navy)]">{tag.bet}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
