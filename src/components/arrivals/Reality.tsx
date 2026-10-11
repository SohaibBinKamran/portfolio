"use client";

import { useState } from "react";
import { reality } from "@/data/arrivals";

export function Reality() {
  const [active, setActive] = useState(reality.rungs[0].id);
  const rung = reality.rungs.find((r) => r.id === active) ?? reality.rungs[0];

  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{reality.eyebrow}</span>
        <h2 className="mt-5 max-w-[760px] text-[32px] leading-[1.15] sm:text-[44px]">
          {reality.heading}
        </h2>
        <p className="mt-5 max-w-[640px] text-[17px] leading-[1.7]">{reality.intro}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div role="tablist" aria-label="Levels of geography" className="flex flex-col gap-2">
            {reality.rungs.map((r, i) => {
              const on = r.id === active;
              return (
                <button
                  key={r.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(r.id)}
                  className={`flex items-center justify-between gap-4 rounded-[14px] border px-5 py-4 text-left transition-colors ${
                    on
                      ? "border-[color:var(--ar-amber)] bg-[color:var(--ar-panel-2)]"
                      : "border-[color:var(--ar-rule)] bg-[color:var(--ar-panel)] hover:bg-[color:var(--ar-panel-2)]"
                  }`}
                  style={{ marginLeft: `${i * 14}px` }}
                >
                  <span className="flex flex-col">
                    <span className="text-[17px] font-bold text-[color:var(--ar-ink)]">{r.level}</span>
                    <span className={`ar-mono text-[11px] uppercase tracking-[0.1em] ar-status-${r.status}`}>
                      {r.statusLabel}
                    </span>
                  </span>
                  <span aria-hidden className={`h-3 w-3 shrink-0 rounded-full ar-dot-${r.status}`} />
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="ar-panel flex flex-col gap-6 p-7 sm:p-9">
            <div>
              <span className={`ar-mono text-[11px] uppercase tracking-[0.12em] ar-status-${rung.status}`}>
                {rung.statusLabel}
              </span>
              <h3 className="mt-2 text-[26px] leading-[1.2]">{rung.level} level</h3>
            </div>
            <dl className="flex flex-col gap-5 text-[16px] leading-[1.7]">
              <div>
                <dt className="ar-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--ar-dim)]">Source</dt>
                <dd className="mt-1 text-[color:var(--ar-ink)]">{rung.source}</dd>
              </div>
              <div>
                <dt className="ar-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--ar-dim)]">What exists</dt>
                <dd className="mt-1">{rung.detail}</dd>
              </div>
              <div>
                <dt className="ar-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--ar-dim)]">In practice</dt>
                <dd className="ar-mono mt-1 rounded-[10px] bg-[color:var(--ar-bg)] px-4 py-3 text-[13px] leading-[1.7] text-[color:var(--ar-ink)]">
                  {rung.example}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="mt-12 max-w-[760px] text-[19px] leading-[1.65] text-[color:var(--ar-ink)]">
          {reality.verdict}
        </p>
      </div>
    </section>
  );
}
