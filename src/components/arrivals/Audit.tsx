"use client";

import { useState } from "react";
import { audit, type Verdict } from "@/data/arrivals";

const VERDICTS: { id: Verdict; label: string; color: string }[] = [
  { id: "held", label: "Held up", color: "#6fd0a0" },
  { id: "corrected", label: "Corrected", color: "#f0a83b" },
  { id: "softened", label: "Softened", color: "#e8c45a" },
  { id: "replaced", label: "Replaced", color: "#5b9fd6" },
  { id: "removed", label: "Removed", color: "#e0805a" },
];

export function Audit() {
  const [filter, setFilter] = useState<Verdict | "all">("all");
  const [open, setOpen] = useState<number | null>(0);

  const counts = Object.fromEntries(
    VERDICTS.map((v) => [v.id, audit.claims.filter((c) => c.verdict === v.id).length]),
  ) as Record<Verdict, number>;
  const shown = audit.claims
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => filter === "all" || c.verdict === filter);

  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{audit.eyebrow}</span>
        <h2 className="mt-5 max-w-[800px] text-[32px] leading-[1.15] sm:text-[44px]">{audit.heading}</h2>
        <p className="mt-5 max-w-[680px] text-[17px] leading-[1.7]">{audit.intro}</p>

        <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter claims by verdict">
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={`ar-mono rounded-full border px-4 py-2 text-[12px] transition-colors ${
              filter === "all"
                ? "border-[color:var(--ar-ink)] bg-[color:var(--ar-ink)] text-[color:var(--ar-bg)]"
                : "border-[color:var(--ar-rule)] text-[color:var(--ar-body)] hover:border-[color:var(--ar-dim)]"
            }`}
          >
            All · {audit.claims.length}
          </button>
          {VERDICTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setFilter(v.id)}
              aria-pressed={filter === v.id}
              className={`ar-mono flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] transition-colors ${
                filter === v.id
                  ? "border-[color:var(--ar-ink)] bg-[color:var(--ar-panel-2)] text-[color:var(--ar-ink)]"
                  : "border-[color:var(--ar-rule)] text-[color:var(--ar-body)] hover:border-[color:var(--ar-dim)]"
              }`}
            >
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: v.color }} />
              {v.label} · {counts[v.id]}
            </button>
          ))}
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {shown.map(({ c, i }) => {
            const v = VERDICTS.find((x) => x.id === c.verdict)!;
            const isOpen = open === i;
            return (
              <li key={c.claim} className="ar-panel overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-3 px-6 py-5 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="flex flex-col gap-1">
                    <span className="ar-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--ar-dim)]">
                      Claim · {c.origin}
                    </span>
                    <span className="text-[18px] font-bold leading-[1.35] text-[color:var(--ar-ink)]">
                      {c.claim}
                    </span>
                  </span>
                  <span
                    className="ar-mono inline-flex shrink-0 items-center gap-2 self-start rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[color:var(--ar-bg)] sm:self-center"
                    style={{ background: v.color }}
                  >
                    {v.label}
                    <span aria-hidden>{isOpen ? "−" : "+"}</span>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-[color:var(--ar-rule)] bg-[color:var(--ar-panel-2)] px-6 py-5">
                    <p className="max-w-[720px] text-[16px] leading-[1.7]">{c.finding}</p>
                    <p className="ar-mono mt-3 text-[12px] text-[color:var(--ar-dim)]">
                      Checked against: <span className="text-[color:var(--ar-body)]">{c.source}</span>
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
