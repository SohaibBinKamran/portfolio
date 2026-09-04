"use client";

import { motion } from "framer-motion";
import { route } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

export function RouteSection() {
  return (
    <section className="flex flex-col items-center gap-16 bg-white px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{route.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">{route.heading}</h2>
        <p className="max-w-[900px] text-[17px] leading-[1.55] text-[var(--cb-body)]">{route.body}</p>
      </div>

      {/* Timeline — horizontal on desktop, vertical below sm */}
      <div className="relative mx-auto flex w-full max-w-[900px] flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[24px] right-[24px] top-[15px] hidden border-t border-dashed border-[var(--cb-navy)]/25 sm:block"
        />
        {route.timeline.map((stop) => (
          <div key={stop.day} className="relative z-10 flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold shadow-[0px_0px_0px_6px_#eaf2ff]"
              style={
                stop.accent
                  ? { background: "var(--cb-gold)", color: "var(--cb-navy)" }
                  : { background: "var(--cb-navy)", color: "white" }
              }
            >
              {stop.day}
            </div>
            <div className="flex flex-col sm:mt-2.5 sm:items-center">
              <span className="text-[12px] font-bold text-[var(--cb-navy)]">{stop.label}</span>
              <span className="text-[10.5px] text-[var(--cb-body)]">{stop.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-4.5 md:grid-cols-3">
        {route.cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col gap-2 rounded-[20px] border border-[var(--cb-card-border)] px-6 py-6"
          >
            <span aria-hidden className="text-[26px] leading-none text-[var(--cb-navy)]">
              {card.icon}
            </span>
            <h3 className="pt-1 text-base font-bold tracking-tight text-[var(--cb-navy)]">{card.title}</h3>
            <p className="text-[13.8px] leading-relaxed text-[var(--cb-body)]">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
