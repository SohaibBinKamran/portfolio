"use client";

import { motion } from "framer-motion";
import { arrivals } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";
import { FigmaCrop } from "./FigmaCrop";

// Exact per-icon crop transforms from Figma get_design_context (one shared
// sprite, four pre-defined crop windows) — not approximated.
const crops = [
  { w: 835.89, h: 430.62, top: -120.57, left: -78.47 },
  { w: 740.25, h: 381.36, top: -103.81, left: -233.33 },
  { w: 623.93, h: 381.36, top: -103.81, left: -328.47 },
  { w: 715.98, h: 381.36, top: -109.34, left: -549.31 },
];

export function Arrivals() {
  return (
    <section className="flex flex-col items-center gap-14 px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{arrivals.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">{arrivals.heading}</h2>
      </div>

      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {arrivals.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center gap-4.5 text-center"
          >
            <FigmaCrop
              src="/images/cabinblu-impact-sprite.png"
              alt=""
              {...crops[i]}
              className="aspect-square w-full max-w-[220px]"
            />
            <div className="flex flex-col gap-1">
              <p className="text-[15px] font-bold tracking-tight text-[var(--cb-navy)]">{item.title}</p>
              <p className="text-[13.3px] leading-relaxed text-[var(--cb-body)]">{item.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <FigmaCrop
        src="/images/cabinblu-impact-illustration.png"
        alt="~40% of passengers report some flight anxiety; ~30% of those avoid flying altogether; ~240M people at risk at Lufthansa Group scale"
        w={121.54}
        h={176.16}
        top={-65.21}
        left={-8.95}
        className="mx-auto w-full max-w-[1120px]"
        style={{ aspectRatio: "1120 / 258" }}
      />
    </section>
  );
}
