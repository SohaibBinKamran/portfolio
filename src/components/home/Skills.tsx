"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { capabilities } from "@/data/home";

export function Skills() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-5 flex justify-center">
        <SectionLabel>Skills</SectionLabel>
      </div>
      <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl md:text-4xl">
        <span className="text-ink/55">What I Bring to a </span>
        <span className="text-ink">Product Team</span>
      </h2>
      <p className="mx-auto mb-12 max-w-xl text-center font-sans text-base text-ink-muted">
        I design end-to-end with evidence—partnering with PM and Engineering
        to turn research into clear flows, shippable UI, and measurable
        outcomes.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-bg-dark px-8 py-10 text-white"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-1/2 opacity-10 [mask-image:linear-gradient(180deg,black,transparent)]"
          aria-hidden
        >
          <Image src="/images/hero-sky.png" alt="" fill className="object-cover object-top" />
        </div>
        <div className="relative z-10">
          <h3 className="mb-2 text-2xl md:text-3xl">
            Building digital experiences from discovery to delivery.
          </h3>
          <p className="mb-8 font-sans text-sm text-white/70">
            Delivering products by focusing on full-stack design—from initial
            discovery and user research to final delivery and usability
            testing.
          </p>
          <ul className="mb-8 grid gap-3 font-ui text-sm text-white/80 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="text-accent-lime">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[14px] border border-[#303030] bg-bg-dark-alt px-4 py-2.5 font-ui text-sm text-white transition-transform hover:scale-[1.03]"
          >
            Get In Touch
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
