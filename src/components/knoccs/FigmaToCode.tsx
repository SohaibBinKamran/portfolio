"use client";

import { useState } from "react";
import { figmaToCode } from "@/data/knoccs";

const TOKEN_LABEL: Record<string, string> = {
  p1: "P1", p2: "P2", p3: "P3", p4: "P4",
  s1: "S1", s2: "S2", s5: "S5", s6: "S6", s7: "S7",
  red: "Red", green: "Green", blue: "Blue", orange: "Orange",
  focused: "Focused", "hover-light": "Hover Light", "hover-dark": "Hover Dark",
};

export function FigmaToCode() {
  const [presetId, setPresetId] = useState(figmaToCode.presets[0].id);
  const [checked, setChecked] = useState(true);
  const [focused, setFocused] = useState(false);
  const preset = figmaToCode.presets.find((p) => p.id === presetId) ?? figmaToCode.presets[0];
  const p2Count = figmaToCode.rows.filter((r) => r.usesP2).length;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{figmaToCode.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{figmaToCode.heading}</h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7]">{figmaToCode.intro}</p>

        {/* Token chain */}
        <div className="mt-10 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {figmaToCode.chain.map((c, i) => (
            <div key={c.label} className="flex flex-1 items-center gap-3">
              <div className="kn-panel flex-1 px-5 py-4">
                <div className="text-[11px] uppercase tracking-[0.12em] text-[color:var(--kn-muted)]">{c.label}</div>
                <div className="mt-1 font-[family-name:var(--kn-mono)] text-[14px] text-[color:var(--kn-ink)]">
                  {i === 1 ? <span style={{ color: preset.hex }}>{c.value}</span> : c.value}
                </div>
              </div>
              {i < figmaToCode.chain.length - 1 && (
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden className="hidden shrink-0 md:block">
                  <path d="M0 6h21M16 1l5 5-5 5" stroke="#7620BA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Live token swap */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="kn-panel p-7">
            <h3 className="text-[15px] font-semibold text-[color:var(--kn-ink)]">Change P2 once</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {figmaToCode.presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPresetId(p.id)}
                  aria-pressed={p.id === presetId}
                  className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium text-[color:var(--kn-ink)] transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: p.id === presetId ? p.hex : "var(--kn-border)",
                    background: p.id === presetId ? "var(--kn-hover-light)" : "transparent",
                  }}
                >
                  <span className="size-3.5 rounded-full" style={{ background: p.hex }} />
                  {p.name}
                </button>
              ))}
            </div>
            <p className="mt-5 text-[13px] leading-[1.6] text-[color:var(--kn-muted)]">
              {p2Count} of {figmaToCode.rows.length} components use P2. None of them hardcode it.
            </p>
          </div>

          {/* Stage: the twins, wired to --kn-p2 */}
          <div
            className="kn-stage flex min-h-[260px] flex-col justify-center gap-6 p-8 transition-colors"
            style={{ ["--kn-p2" as string]: preset.hex }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChecked((c) => !c)}
                aria-pressed={checked}
                aria-label="Checkbox"
                className="flex size-[22px] items-center justify-center rounded-[6px] border-2 bg-white transition-all duration-200 active:scale-90"
                style={{ borderColor: checked ? "var(--kn-p2)" : "var(--kn-s5)" }}
              >
                {checked && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8.5L6.2 11.5L13 4.5" stroke="var(--kn-p2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className="text-[14px] text-white/85">Checkbox</span>
            </div>

            <div
              className="flex h-[40px] max-w-[320px] items-center rounded-[8px] px-3 transition-shadow"
              style={{
                background: focused ? "var(--kn-focused)" : "#F5F4FC",
                boxShadow: focused ? "0 0 0 2px var(--kn-p2)" : "none",
              }}
            >
              <input
                aria-label="Search field"
                placeholder="Search, then click into me"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent text-[14px] text-[color:var(--kn-s2)] placeholder:text-[color:var(--kn-s5)] focus:outline-none"
              />
            </div>

            <div className="flex max-w-[320px] items-center gap-3 rounded-[10px] bg-[color:var(--kn-hover-light)] px-3 py-3">
              <span className="size-[8px] shrink-0 rounded-full" style={{ background: "var(--kn-p2)" }} />
              <span className="text-[14px] font-bold text-[color:var(--kn-s1)]">Liam Wilson</span>
              <span className="ml-auto text-[12px] font-medium text-[color:var(--kn-s4)]">New In</span>
            </div>

            <div className="flex w-[190px] items-center gap-2.5 rounded-[8px] bg-[#0F0B1C] px-3 py-2.5">
              <span
                className="flex size-[18px] items-center justify-center rounded-full text-[10px] text-white"
                style={{ background: "var(--kn-p2)" }}
              >
                3
              </span>
              <span className="text-[13px] font-semibold text-white">Activated</span>
            </div>
          </div>
        </div>

        {/* Mapping table */}
        <div className="kn-panel mt-6 overflow-hidden">
          <div className="hidden grid-cols-[1.1fr_1.3fr_1.2fr_1fr] gap-4 border-b border-[color:var(--kn-border)] bg-[color:var(--kn-hover-light)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--kn-muted)] md:grid">
            <span>Figma component</span>
            <span>States</span>
            <span>Coded twin</span>
            <span>Tokens</span>
          </div>
          <ul className="divide-y divide-[color:var(--kn-border)]">
            {figmaToCode.rows.map((r) => (
              <li
                key={r.figma}
                className="grid gap-2 px-6 py-4 transition-colors hover:bg-[color:var(--kn-hover-light)] md:grid-cols-[1.1fr_1.3fr_1.2fr_1fr] md:items-center md:gap-4"
              >
                <div>
                  <div className="text-[14px] font-semibold text-[color:var(--kn-ink)]">{r.figma}</div>
                  {r.node && (
                    <div className="font-[family-name:var(--kn-mono)] text-[11px] text-[color:var(--kn-muted)]">
                      node {r.node}
                    </div>
                  )}
                </div>
                <div className="text-[13px] text-[color:var(--kn-body)]">{r.states}</div>
                <div className="font-[family-name:var(--kn-mono)] text-[12px] text-[color:var(--kn-ink)]">{r.code}</div>
                <div className="flex flex-wrap gap-1.5">
                  {r.tokens.map((t) => (
                    <span
                      key={t}
                      title={`--kn-${t}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--kn-border)] px-2 py-0.5 text-[11px] text-[color:var(--kn-body)]"
                    >
                      <span
                        className="size-2.5 rounded-full border border-black/10"
                        style={{ background: t === "p2" ? preset.hex : `var(--kn-${t})` }}
                      />
                      {TOKEN_LABEL[t] ?? t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
