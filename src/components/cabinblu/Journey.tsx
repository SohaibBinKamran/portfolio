"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { journey } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

export function Journey() {
  return (
    <section className="flex flex-col items-center gap-14 bg-white px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{journey.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-[1.12] text-[var(--cb-navy)] md:text-[40px] md:leading-[44.8px]">
          {journey.heading}
        </h2>
        <p className="max-w-[900px] text-[17px] leading-[26.35px] text-[var(--cb-body)]">
          {journey.sub}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-16 md:gap-8">
        {journey.stops.map((stop, i) => {
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={stop.stop}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col items-center justify-between gap-10 py-[20px] md:flex-row md:gap-6 ${
                reversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex w-full shrink-0 justify-center md:w-[400px]"
              >
                <div
                  className={`relative aspect-[420/572] w-full max-w-[340px] md:max-w-[400px] ${
                    reversed ? "md:rotate-[3deg]" : "md:-rotate-2"
                  }`}
                >
                  <Image
                    src={stop.image}
                    alt={`CabinBlu app screen for the ${stop.title} moment, hand-annotated: "${stop.annotation}" — ${stop.annotationNote}`}
                    fill
                    sizes="400px"
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Copy */}
              <div className="flex w-full flex-col items-start gap-[6px] md:w-[540px] md:shrink-0">
                <div className="flex flex-wrap items-center gap-[10px]">
                  <span className="font-[family-name:var(--cb-font-mono)] text-[12px] leading-[18.6px] text-[var(--cb-body)]">
                    {stop.stop}
                  </span>
                  <span
                    className="rounded-[20px] px-[12px] py-[5px] font-[family-name:var(--cb-font-mono)] text-[11px] font-bold uppercase leading-[17px] tracking-[0.66px]"
                    style={
                      stop.chipTone === "gap"
                        ? { background: "var(--cb-gap-bg)", color: "var(--cb-gap-text)" }
                        : { background: "var(--cb-opportunity-bg)", color: "var(--cb-opportunity-text)" }
                    }
                  >
                    {stop.chip}
                  </span>
                </div>
                <h3 className="pt-[7px] text-[24px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--cb-navy)] md:text-[26px] md:leading-[29.12px]">
                  <span aria-hidden>{stop.emoji}</span> {stop.title}
                </h3>
                <p className="text-[14.5px] font-bold leading-[22.48px] text-[var(--cb-blue-accent)]">
                  {stop.subtitle}
                </p>
                <p className="max-w-[538px] pb-[10px] pt-[7px] text-[14.8px] leading-[22.94px] text-[var(--cb-body)]">
                  {stop.body}
                </p>
                <div className="flex w-full max-w-[380px] flex-col gap-[10px]">
                  {stop.quotes.map((q) => (
                    <div
                      key={q.text}
                      className="flex flex-col gap-[6px] rounded-tl-[14px] rounded-tr-[14px] rounded-bl-[4px] rounded-br-[14px] bg-[var(--cb-sky-tint)] px-[16px] py-[11px]"
                    >
                      <p className="text-[13.3px] leading-[20.62px] text-[var(--cb-navy)]">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <p className="font-[family-name:var(--cb-font-mono)] text-[10.5px] uppercase leading-[16.27px] tracking-[0.525px] text-[var(--cb-blue-accent)]">
                        — {q.attribution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
