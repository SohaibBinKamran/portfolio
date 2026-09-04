"use client";

import { motion } from "framer-motion";
import { context } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

export function ContextSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8 bg-white px-6 py-16 md:px-20 md:py-[88px]"
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{context.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">
          {context.heading}
        </h2>
        <p className="max-w-[900px] text-[17px] leading-[1.55] text-[var(--cb-body)]">
          {context.body}
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[1120px] items-start gap-[14px] rounded-[16px] border border-[var(--cb-nda-border)] bg-[var(--cb-nda-bg)] px-[19px] py-[17px]">
        <span aria-hidden className="shrink-0 text-[18px] leading-[20.15px] text-[var(--cb-navy)]">
          🔒
        </span>
        <p className="max-w-[980px] pr-[20px] text-[13px] leading-[20.15px] text-[var(--cb-nda-text)]">
          {context.ndaNotice}
        </p>
      </div>
    </motion.section>
  );
}
