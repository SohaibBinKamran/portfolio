"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { findings } from "@/data/cabinblu";
import { Eyebrow } from "./Eyebrow";

function AccordionCard({ card, defaultOpen }: { card: (typeof findings.cards)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--cb-card-border)] bg-white">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3.5 px-5 py-4.5 text-left"
      >
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-[var(--cb-sky-tint)] font-mono text-xs text-[var(--cb-blue-accent)]">
          {card.n}
        </span>
        <span className="flex-1 text-[15px] font-bold tracking-tight text-[var(--cb-navy)]">
          {card.title}
        </span>
        <span
          aria-hidden
          className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[var(--cb-blue-accent)] text-[16px] font-bold leading-none text-white"
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 px-5 pb-5 pl-[63px] pr-[40px]">
              <p className="text-[13.8px] leading-relaxed text-[var(--cb-body)]">{card.body}</p>
              {card.quote && (
                <div className="flex flex-col gap-1.5 rounded-tl-[14px] rounded-tr-[14px] rounded-bl-[4px] rounded-br-[14px] bg-[var(--cb-sky-tint)] px-4 py-3">
                  <p className="text-[13.3px] italic text-[var(--cb-navy)]">&ldquo;{card.quote}&rdquo;</p>
                  <p className="cb-eyebrow text-[10.5px] text-[var(--cb-blue-accent)]">{card.attribution}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Findings() {
  return (
    <section className="flex flex-col items-center gap-11 bg-[var(--cb-sky-tint)] px-6 py-16 md:px-20 md:py-[88px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3">
        <Eyebrow>{findings.eyebrow}</Eyebrow>
        <h2 className="text-[32px] leading-tight text-[var(--cb-navy)] md:text-[40px]">{findings.heading}</h2>
        <p className="max-w-[900px] text-[17px] leading-[1.55] text-[var(--cb-body)]">{findings.sub}</p>
      </div>

      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 lg:hidden">
        {findings.cards.map((card) => (
          <AccordionCard key={card.n} card={card} defaultOpen />
        ))}
      </div>
      <div className="mx-auto hidden w-full max-w-[1120px] gap-4 lg:flex">
        <div className="flex flex-1 flex-col gap-4">
          {findings.cards
            .filter((_, i) => i % 2 === 0)
            .map((card) => (
              <AccordionCard key={card.n} card={card} defaultOpen />
            ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {findings.cards
            .filter((_, i) => i % 2 === 1)
            .map((card) => (
              <AccordionCard key={card.n} card={card} defaultOpen />
            ))}
        </div>
      </div>
    </section>
  );
}
