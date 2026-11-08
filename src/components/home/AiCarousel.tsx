"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { aiFit } from "@/data/home";

const DURATION = 5000;
const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/* ---------- slide visuals ---------- */

function Panel({ children, active, delay = 150 }: { children: React.ReactNode; active: boolean; delay?: number }) {
  return (
    <div
      style={{ transitionDelay: active ? `${delay}ms` : "0ms" }}
      className={`relative w-full max-w-[360px] rounded-2xl border border-border-soft bg-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 ${ease} ${
        active ? "translate-y-0 opacity-100" : "translate-y-3.5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function Hand({ children, className, active }: { children: React.ReactNode; className: string; active: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute whitespace-nowrap font-hand text-[15px] text-accent-blue transition-opacity duration-500 ${
        active ? "opacity-100 delay-700" : "opacity-0"
      } ${className}`}
    >
      {children}
    </span>
  );
}

function DiffLine({ kind, children }: { kind: "add" | "del" | "same"; children: React.ReactNode }) {
  const tone =
    kind === "add" ? "bg-[#eef6f0] text-[#1e6b35]" : kind === "del" ? "bg-[#fdf1f0] text-[#a3291b]" : "text-ink";
  return (
    <div className={`grid grid-cols-[28px_1fr] pr-4 font-mono text-[13px] leading-[1.9] ${tone}`}>
      <span className="text-center text-ink-muted">{kind === "add" ? "+" : kind === "del" ? "−" : ""}</span>
      {children}
    </div>
  );
}

function FrameVisual({ active }: { active: boolean }) {
  const rows = [
    ["Goal", "Playground uses the tokens"],
    ["Rule", "No new colors"],
    ["Done when", "Zero hardcoded values"],
  ];
  return (
    <Panel active={active}>
      <div className="px-5 py-5">
        <p className="mb-1.5 font-serif text-[22px]">Brief</p>
        {rows.map(([k, v]) => (
          <p key={k} className="grid grid-cols-[86px_1fr] border-t border-border-soft py-2.5 font-sans text-[14.5px]">
            <span className="text-[13px] font-medium text-ink-muted">{k}</span>
            {v}
          </p>
        ))}
      </div>
      <Hand active={active} className="-right-1.5 -top-8 -rotate-[4deg]">
        before any prompt
      </Hand>
    </Panel>
  );
}

function CodeHeader({ file, meta }: { file: string; meta: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft px-4 pb-2.5 pt-3 font-sans text-[13px]">
      <span>{file}</span>
      <span className="text-xs text-ink-muted">{meta}</span>
    </div>
  );
}

function PromptVisual({ active }: { active: boolean }) {
  return (
    <Panel active={active}>
      <CodeHeader file="Playground.tsx" meta="Claude Code" />
      <div className="pt-1.5">
        <DiffLine kind="del">background: #7620BA</DiffLine>
        <DiffLine kind="add">background: var(--kn-p2)</DiffLine>
        <DiffLine kind="same">border: var(--kn-line)</DiffLine>
      </div>
      <p className="mt-1.5 border-t border-border-soft px-4 py-3 font-sans text-[12.5px] text-ink-muted">
        45 values moved to tokens
      </p>
    </Panel>
  );
}

function ReviewVisual({ active }: { active: boolean }) {
  const [approved, setApproved] = useState(true);
  const pill = "rounded-full border px-4 py-2 font-sans text-[13px] font-medium transition-colors duration-200";
  return (
    <Panel active={active}>
      <CodeHeader file="arrivals.ts" meta="Needs review" />
      <div className="pt-1.5">
        <DiffLine kind="del">total: 81,000</DiffLine>
        <DiffLine kind="add">total: 181,430</DiffLine>
      </div>
      <div className="mt-2 flex gap-2 border-t border-border-soft px-4 pb-4 pt-3.5">
        <button
          type="button"
          aria-pressed={approved}
          onClick={() => setApproved(true)}
          className={`${pill} ${approved ? "border-ink bg-ink text-white" : "border-border-soft bg-white text-ink hover:border-ink"}`}
        >
          Approve
        </button>
        <button
          type="button"
          aria-pressed={!approved}
          onClick={() => setApproved(false)}
          className={`${pill} ${!approved ? "border-ink bg-ink text-white" : "border-border-soft bg-white text-ink hover:border-ink"}`}
        >
          Request changes
        </button>
      </div>
      <Hand active={active} className="-bottom-8 right-1 -rotate-[3deg]">
        checked the source
      </Hand>
    </Panel>
  );
}

const stackRest = ["-translate-y-9 scale-90", "-translate-y-[18px] scale-95", ""];
const stackOpenSm = [
  "-translate-x-[60px] translate-y-1.5 -rotate-[9deg] scale-90",
  "translate-x-[60px] translate-y-1.5 rotate-[9deg] scale-90",
  "-translate-y-2.5",
];

function ShipVisual({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Shipped projects. Hover or tap to fan them open"
      aria-pressed={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      className={`relative mx-auto h-[300px] w-full max-w-[340px] cursor-pointer outline-none transition-opacity duration-500 md:h-[330px] md:max-w-[400px] ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {aiFit.shipped.map((p, i) => (
        <div
          key={p.name}
          className={`absolute inset-x-0 top-11 overflow-hidden rounded-2xl border border-border-soft bg-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.3)] transition-all duration-[600ms] ${ease} ${
            open ? `${stackOpenSm[i]} ${stackOpenClass(i)}` : stackRest[i]
          }`}
        >
          <div className="flex items-center gap-[5px] border-b border-border-soft px-3 py-[9px]">
            <i className="size-2 rounded-full bg-[#e3e1dc]" />
            <i className="size-2 rounded-full bg-[#e3e1dc]" />
            <i className="size-2 rounded-full bg-[#e3e1dc]" />
            {i === aiFit.shipped.length - 1 && (
              <span className="ml-auto inline-flex items-center gap-1.5 font-sans text-xs font-medium">
                <i className="size-[7px] rounded-full bg-[#1f9d55]" />
                Live
              </span>
            )}
          </div>
          <div className="relative aspect-[560/335] w-full bg-bg-muted">
            <Image src={p.image} alt={p.name} fill sizes="400px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}

// md breakpoint fan distances, kept as full class strings so Tailwind can see them
function stackOpenClass(i: number) {
  return [
    "md:-translate-x-[125px] md:translate-y-2.5 md:-rotate-[10deg]",
    "md:translate-x-[125px] md:translate-y-2.5 md:rotate-[10deg]",
    "md:-translate-y-2.5 md:shadow-[0_28px_48px_-20px_rgba(0,0,0,0.4)]",
  ][i];
}

const visuals = [FrameVisual, PromptVisual, ReviewVisual, ShipVisual];

/* ---------- carousel ---------- */

export function AiCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const [stopped, setStopped] = useState(false);
  const startRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const touchX = useRef<number | null>(null);
  const progressRef = useRef(0);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const count = aiFit.steps.length;

  const go = useCallback(
    (n: number, user = false) => {
      setIndex(((n % count) + count) % count);
      progressRef.current = 0;
      startRef.current = performance.now();
      if (user) setStopped(true);
    },
    [count],
  );

  // Only run the timer while the carousel is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting;
      if (e.isIntersecting) startRef.current = performance.now() - progressRef.current * DURATION;
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = (t: number) => {
      if (visibleRef.current && !pausedRef.current && !stopped) {
        const f = Math.min((t - startRef.current) / DURATION, 1);
        progressRef.current = f;
        const bar = barRefs.current[index];
        if (bar) bar.style.width = `${f * 100}%`;
        if (f >= 1) go(index + 1);
      } else {
        startRef.current = t - progressRef.current * DURATION;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, reduce, go, stopped]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Where AI fits, four steps"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1, true);
        if (e.key === "ArrowLeft") go(index - 1, true);
      }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1), true);
      }}
      className="mx-auto max-w-5xl rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4"
    >
      <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
        <div
          className={`flex ${reduce ? "" : `transition-transform duration-700 ${ease}`}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {aiFit.steps.map((step, i) => {
            const Visual = visuals[i];
            const active = i === index;
            return (
              <div
                key={step.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
                className="grid w-full shrink-0 grid-cols-1 items-center gap-6 px-5 py-7 md:min-h-[400px] md:grid-cols-[0.85fr_1.15fr] md:gap-8 md:px-16 md:py-14"
              >
                <div>
                  <span className="font-sans text-[13px] tabular-nums text-ink-muted">
                    {i + 1} / {count}
                  </span>
                  <h4 className="mb-3.5 mt-2.5 text-5xl leading-none md:text-[76px]">{step.title}</h4>
                  <p className="max-w-[300px] font-sans text-[17px] text-ink-muted">{step.caption}</p>
                </div>
                <div
                  className={`relative flex justify-center rounded-[18px] ${
                    i === 3 ? "" : "bg-bg-cream px-7 py-10"
                  }`}
                >
                  <Visual active={active || !!reduce} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-6">
        <div className="grid flex-1 grid-cols-4 gap-3">
          {aiFit.steps.map((step, i) => (
            <button
              key={step.title}
              type="button"
              onClick={() => go(i, true)}
              aria-current={i === index ? "step" : undefined}
              aria-label={step.title}
              className={`flex flex-col gap-2 py-1 text-left font-sans text-sm transition-colors ${
                i === index ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              <span className="hidden md:inline">{step.title}</span>
              <span className="block h-0.5 overflow-hidden bg-border-soft">
                <span
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  className="block h-full bg-ink"
                  style={{ width: i < index ? "100%" : i === index && (stopped || reduce) ? "100%" : "0%" }}
                />
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { label: "Previous step", d: "M15 6l-6 6 6 6", n: index - 1 },
            { label: "Next step", d: "M9 6l6 6-6 6", n: index + 1 },
          ].map((a) => (
            <button
              key={a.label}
              type="button"
              aria-label={a.label}
              onClick={() => go(a.n, true)}
              className="grid size-11 place-items-center rounded-full border border-border-soft bg-white transition-colors hover:border-ink"
            >
              <svg viewBox="0 0 24 24" className="size-[18px] fill-none stroke-ink" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={a.d} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
