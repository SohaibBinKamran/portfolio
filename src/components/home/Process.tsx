"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { process } from "@/data/home";

export function Process() {
  return (
    <section className="bg-bg-cream px-6 py-24">
      <div className="mb-5 flex justify-center">
        <SectionLabel>Process</SectionLabel>
      </div>
      <h2 className="mx-auto mb-4 max-w-2xl text-center text-3xl md:text-4xl">
        How I bring ideas to life
      </h2>
      <p className="mx-auto mb-16 max-w-xl text-center font-sans text-base text-ink-muted">
        Discover my step-by-step process that guides you from the initial
        idea to a final, polished product.
      </p>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {process.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col rounded-2xl bg-white p-4 shadow-soft"
          >
            <div className="relative mb-5 aspect-[512/338] w-full overflow-hidden rounded-xl bg-bg-muted">
              <Image
                src={step.image}
                alt={`${step.title} — example work`}
                fill
                className="object-cover"
              />
            </div>
            <div className="px-2 pb-2">
              <h3 className="mb-1 text-xl">{step.title}</h3>
              <p className="mb-3 font-serif text-lg italic text-ink/60">
                &ldquo;{step.tagline}&rdquo;
              </p>
              <p className="font-sans text-sm text-ink-muted">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
