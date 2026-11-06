"use client";

import { motion } from "framer-motion";
import { impact } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

export function Impact() {
  return (
    <section className="bg-white px-6 py-16 md:px-14 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{impact.eyebrow}</Eyebrow>
        <h2 className="max-w-[760px] text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">
          {impact.heading}
        </h2>
        <p className="max-w-[760px] text-[17px] leading-[1.55] text-[var(--cb-body)]">{impact.intro}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.changes.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-2xl border border-[var(--cb-navy)]/10 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-[18px] font-medium text-[var(--cb-navy)]">{c.title}</p>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--cb-body)]">{c.body}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-[14px] text-[var(--cb-body)]">{impact.footnote}</p>
      </div>
    </section>
  );
}
