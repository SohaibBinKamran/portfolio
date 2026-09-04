"use client";

import { motion } from "framer-motion";
import { postcards } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

export function Postcards() {
  return (
    <section className="flex flex-col items-center gap-11 bg-white px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-start gap-11">
      <div className="flex max-w-[680px] flex-col gap-3">
        <Eyebrow>{postcards.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">{postcards.heading}</h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {postcards.cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex flex-col justify-center gap-3.5 rounded-[18px] border border-[var(--cb-card-border)] p-8 shadow-[0px_16px_34px_-22px_rgba(11,46,110,0.3)]"
          >
            <span
              aria-hidden
              className="absolute right-6 top-5 flex h-14 w-[46px] items-center justify-center rounded border-2 border-dashed border-[var(--cb-blue-accent)] text-xl opacity-50"
            >
              {card.emoji}
            </span>
            <h3 className="max-w-[400px] text-base font-bold tracking-tight text-[var(--cb-navy)]">
              {card.title}
            </h3>
            <p className="max-w-[400px] text-[14.5px] leading-relaxed text-[var(--cb-body)]">{card.body}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
