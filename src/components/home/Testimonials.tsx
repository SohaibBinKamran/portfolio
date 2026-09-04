"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  organizations,
  testimonials,
  testimonialsSubheading,
} from "@/data/home";

export function Testimonials() {
  return (
    <section className="bg-bg-cream px-6 py-24">
      <div className="mb-5 flex justify-center">
        <SectionLabel>They trust me</SectionLabel>
      </div>
      <h2 className="mb-4 text-center text-3xl md:text-4xl">
        <span className="text-ink/55">Real feedback, </span>
        <span className="text-ink">real results.</span>
      </h2>
      <p className="mx-auto mb-16 max-w-lg text-center font-sans text-base text-ink-muted">
        {testimonialsSubheading}
      </p>

      <div className="mx-auto mb-24 grid max-w-5xl items-start gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => {
          const raised = i === 1;
          return (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: raised ? -16 : 0 }}
            whileHover={{ y: raised ? -30 : -12, scale: 1.02 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              opacity: { duration: 0.5, delay: i * 0.1 },
              y: { type: "spring", stiffness: 240, damping: 14, mass: 0.9 },
              scale: { type: "spring", stiffness: 240, damping: 14, mass: 0.9 },
            }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border-4 border-black/[0.04] bg-white p-6 shadow-sm transition-shadow duration-500 hover:shadow-xl"
          >
            {/* warm gradient wash on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f8cca0] via-[#fce1c4] to-[#fdf3d8] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 h-16 w-16 overflow-hidden rounded-2xl border-[3px] border-[#f2f2f2] shadow-soft">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <blockquote className="flex-1 font-hand text-[15px] leading-[1.9] text-ink-muted transition-colors duration-500 group-hover:text-ink/75">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-sans text-base font-medium text-ink">{t.name}</p>
                <p className="font-sans text-[13px] text-ink/55">{t.role}</p>
              </figcaption>
            </div>
          </motion.figure>
          );
        })}
      </div>

      <p className="mb-10 text-center font-serif text-3xl md:text-[34px]">
        Organizations where I&apos;ve made an impact.
      </p>
      <Marquee durationSeconds={44} gapClass="gap-16">
        {organizations.map((o) => (
          <Image
            key={o.name}
            src={o.logo}
            alt={o.name}
            width={190}
            height={44}
            className="h-9 w-auto object-contain opacity-80 md:h-10"
          />
        ))}
      </Marquee>
    </section>
  );
}
