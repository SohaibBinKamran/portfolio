"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AiCarousel } from "@/components/home/AiCarousel";
import { aiFit, process, processIntro } from "@/data/home";

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
        {processIntro}
      </p>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {process.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col rounded-3xl bg-white p-3.5 pb-6 shadow-soft"
          >
            <div className="relative mb-5 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-bg-muted">
              <Image src={step.image} alt={`${step.title}, example work`} fill className="object-cover" />
            </div>
            <div className="px-2.5">
              <h3 className="mb-1 text-[22px]">
                {step.title}
                {step.ai && (
                  <sup className="ml-1 font-sans text-[10px] font-medium tracking-wide text-accent-blue">AI</sup>
                )}
              </h3>
              <p className="mb-3 font-serif text-lg italic text-ink-muted">&ldquo;{step.tagline}&rdquo;</p>
              <p className="font-sans text-[15px] text-ink-muted">{step.body}</p>
              <p className="mt-3 font-sans text-[13px] text-ink">{step.outputs.join(" · ")}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="mx-auto mb-8 mt-24 max-w-3xl text-balance text-center text-3xl leading-[1.1] md:text-[42px]">
        <span className="text-[#9b9ba5]">{aiFit.headingMuted}</span> {aiFit.headingStrong}
      </h3>

      <AiCarousel />

      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3.5">
        <p className="w-full text-center font-sans text-[13px] text-ink-muted">{aiFit.toolsLabel}</p>
        {aiFit.tools.map((tool) => (
          <span
            key={tool.name}
            className="group inline-flex items-center gap-2 font-sans text-[15px] text-ink-muted transition-colors hover:text-ink"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.logo}
              alt=""
              width={20}
              height={20}
              className="size-5 opacity-75 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
            />
            {tool.name}
          </span>
        ))}
      </div>
    </section>
  );
}
