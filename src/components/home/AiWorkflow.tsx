"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { aiWorkflow, aiGuardrails } from "@/data/home";

const toneStyles = {
  may: { dot: "bg-[#4ade80]", ring: "border-[#4ade80]/30", mark: "✓" },
  never: { dot: "bg-[#f87171]", ring: "border-[#f87171]/30", mark: "✕" },
  show: { dot: "bg-[#60a5fa]", ring: "border-[#60a5fa]/30", mark: "◉" },
} as const;

export function AiWorkflow() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-center gap-5 text-center">
          <SectionLabel>{aiWorkflow.label}</SectionLabel>
          <h2 className="max-w-2xl text-3xl md:text-4xl">{aiWorkflow.heading}</h2>
          <p className="max-w-xl font-sans text-base text-ink-muted">{aiWorkflow.intro}</p>
        </div>

        {/* Primary tools */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {aiWorkflow.primary.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-bg-cream p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-sans text-[12px] font-medium text-white">
                <span className="size-1.5 rounded-full bg-[#4ade80] [animation:wm-beat_1.6s_ease-in-out_infinite]" />
                Daily driver
              </span>
              <h3 className="mt-5 text-[26px]">{tool.name}</h3>
              <p className="mt-1 font-serif text-lg italic text-ink/60">{tool.role}</p>
              <p className="mt-4 font-sans text-[15px] leading-[1.65] text-ink-muted">{tool.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Supporting tools */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiWorkflow.supporting.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-ink/[0.08] p-6 transition-colors duration-200 hover:border-ink/25"
            >
              <h3 className="font-sans text-[17px] font-medium text-ink">{tool.name}</h3>
              <p className="mt-2 font-sans text-sm leading-[1.6] text-ink-muted">{tool.body}</p>
            </motion.div>
          ))}
        </div>

        {/* The loop */}
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {aiWorkflow.loop.map((step, i) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink font-sans text-[13px] font-medium text-white">
                {i + 1}
              </span>
              <span className="font-sans text-sm leading-[1.6] text-ink">{step}</span>
            </li>
          ))}
        </ol>

        {/* Guardrails */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-24 rounded-3xl bg-bg-dark px-6 py-12 text-white sm:px-10 md:px-12"
        >
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center rounded-[56px] border border-white/20 px-3 py-[7px] font-sans text-[13px] font-medium tracking-tight text-white">
              {aiGuardrails.label}
            </span>
            <h3 className="text-3xl md:text-4xl">{aiGuardrails.heading}</h3>
            <p className="max-w-xl font-sans text-base text-white/65">{aiGuardrails.intro}</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {aiGuardrails.columns.map((col) => {
              const t = toneStyles[col.tone];
              return (
                <div key={col.title} className={`rounded-2xl border ${t.ring} bg-white/[0.04] p-6`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex size-6 items-center justify-center rounded-full ${t.dot} text-[12px] font-bold text-[#0d0d0d]`}>
                      {t.mark}
                    </span>
                    <h4 className="font-sans text-[17px] font-medium text-white">{col.title}</h4>
                  </div>
                  <ul className="mt-5 flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-3 font-sans text-sm leading-[1.6] text-white/75">
                        <span aria-hidden className={`mt-[0.6em] size-1 shrink-0 rounded-full ${t.dot}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {aiGuardrails.proof.map((p) => (
              <Link
                key={p.project}
                href={p.href}
                className="group font-sans text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="font-medium text-white">{p.project}</span>
                <span className="mx-2 text-white/30">/</span>
                {p.note}
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
