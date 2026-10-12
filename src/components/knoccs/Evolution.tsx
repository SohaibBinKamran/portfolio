"use client";

import { useState } from "react";
import { evolution } from "@/data/knoccs";

function ButtonChaos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-2">
      <span className="rounded-[8px] bg-gradient-to-r from-[#778AFA] to-[#DE62EA] px-4 py-2.5 text-[13px] font-semibold text-white">
        Call to Action
      </span>
      <span className="rounded-[8px] bg-[#1A181C] px-4 py-2.5 text-[13px] font-semibold text-white">
        Call to Action
      </span>
      <span className="rounded-[8px] border border-[#534E56] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1A181C]">
        Call to Action
      </span>
      <span className="rounded-[8px] bg-[#EAE7EB] px-4 py-2.5 text-[13px] font-semibold text-[#ADA7B2]">
        Call to Action
      </span>
      <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#EAE7EB] bg-white px-4 py-2 text-[13px] font-semibold text-[#1A181C]">
        <span className="flex size-[20px] items-center justify-center rounded-full bg-[#778AFA] text-[10px] text-white">
          H
        </span>
        Call to Action
      </span>
    </div>
  );
}

function GovernedButton() {
  const [state, setState] = useState<"to-me" | "assign" | "assigned">("to-me");
  return (
    <div className="flex items-center justify-center gap-3 p-2">
      <button
        onClick={() => setState("to-me")}
        className={`rounded-[8px] border px-4 py-2.5 text-[13px] font-medium transition-colors ${
          state === "to-me" ? "border-[#1A181C]" : "border-[#7D7881]"
        } bg-white text-[#1A181C]`}
      >
        Assign to me
      </button>
      <button
        onClick={() => setState("assign")}
        className={`inline-flex items-center gap-1.5 rounded-[8px] border px-4 py-2.5 text-[13px] font-medium transition-colors ${
          state === "assign" ? "border-[#1A181C]" : "border-[#7D7881]"
        } bg-white text-[#1A181C]`}
      >
        Assign
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M4 6l4 4 4-4" stroke="#1A181C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => setState("assigned")}
        className={`inline-flex items-center gap-2 rounded-[8px] border px-3 py-1.5 text-[13px] font-medium transition-colors ${
          state === "assigned" ? "border-[#1A181C]" : "border-transparent"
        } bg-white text-[#1A181C]`}
      >
        <span className="flex size-[24px] items-center justify-center rounded-full bg-[#778AFA] text-[10px] text-white">
          H
        </span>
        Harry
      </button>
    </div>
  );
}

function NavDuplicate() {
  const items = ["Dashboard", "Client", "Conversation"];
  return (
    <div className="flex items-center justify-center gap-4 p-2">
      {["#17112A", "#FFFFFF"].map((bg, i) => (
        <div key={bg} className="w-[150px] rounded-[10px] p-3" style={{ background: bg, border: i === 1 ? "1px solid #EAE7EB" : "none" }}>
          {items.map((label, idx) => (
            <div
              key={label}
              className="mb-1 rounded-[6px] px-2.5 py-2 text-[12px] last:mb-0"
              style={{
                background: idx === 1 ? (i === 0 ? "#4B3B56" : "#F3EFFA") : "transparent",
                color: i === 0 ? "#ADA7B2" : "#534E56",
                opacity: idx === 1 ? 1 : 0.7,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function NavStates() {
  const [state, setState] = useState<"default" | "hover" | "activated">("hover");
  const bg = state === "default" ? "transparent" : "#4B3B56";
  const textColor = "#ADA7B2";
  return (
    <div className="flex flex-col items-center gap-3 p-2">
      <div className="w-[230px] rounded-[10px] bg-[#17112A] p-3">
        {["Dashboard", "Client", "Conversation"].map((label, idx) => (
          <div
            key={label}
            className="mb-1 flex items-center justify-between rounded-[8px] px-3 py-2 text-[13px] last:mb-0"
            style={{
              background: idx === 1 ? bg : "transparent",
              color: idx === 1 && state === "activated" ? "#FFFFFF" : textColor,
              fontWeight: idx === 1 && state === "activated" ? 600 : 400,
            }}
          >
            {label}
            {idx === 1 && (
              <span className="flex size-[18px] items-center justify-center rounded-full bg-[#7620BA] text-[10px] text-white">
                3
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {(["default", "hover", "activated"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
              state === s ? "border-[#1A181C] bg-[#1A181C] text-white" : "border-[#EAE7EB] bg-white text-[#534E56]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

const RENDER: Record<string, { before: React.ReactNode; after: React.ReactNode }> = {
  buttons: { before: <ButtonChaos />, after: <GovernedButton /> },
  nav: { before: <NavDuplicate />, after: <NavStates /> },
};

function Comparison({ item }: { item: (typeof evolution.comparisons)[number] }) {
  const [showAfter, setShowAfter] = useState(true);
  const render = RENDER[item.id];
  const active = showAfter ? item.after : item.before;

  return (
    <div className="kn-panel flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[18px]">{item.title}</h3>
        <div className="inline-flex shrink-0 rounded-full bg-[color:var(--kn-hover-light)] p-1">
          <button
            onClick={() => setShowAfter(false)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
              !showAfter ? "bg-[color:var(--kn-ink)] text-white" : "text-[color:var(--kn-muted)]"
            }`}
          >
            V1.0
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
              showAfter ? "bg-[color:var(--kn-ink)] text-white" : "text-[color:var(--kn-muted)]"
            }`}
          >
            V1.1
          </button>
        </div>
      </div>

      <div className="kn-stage flex min-h-[160px] items-center justify-center rounded-[16px]">
        {showAfter ? render.after : render.before}
      </div>

      <p className="text-[14px] leading-[1.7] text-[color:var(--kn-body)]">
        <strong className="text-[color:var(--kn-ink)]">{active.label}:</strong>{" "}
        {active.description}
      </p>
    </div>
  );
}

export function Evolution() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{evolution.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{evolution.heading}</h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[color:var(--kn-body)]">
          {evolution.intro}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {evolution.comparisons.map((item) => (
            <Comparison key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
