"use client";

import { useState } from "react";
import { tagVariants, cardStates, assignButtonStates, loopInStates, tooltipDirections, components } from "@/data/knoccs";

type ComponentId = "button" | "input" | "tag" | "checkbox" | "card" | "nav" | "tooltip";

const TABS: { id: ComponentId; label: string }[] = [
  { id: "button", label: "Button" },
  { id: "input", label: "Input" },
  { id: "tag", label: "Tag" },
  { id: "checkbox", label: "Checkbox" },
  { id: "card", label: "Conversation Card" },
  { id: "nav", label: "Nav Item" },
  { id: "tooltip", label: "Tooltip" },
];

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke={color} strokeWidth="1.4" />
      <path d="M8 4.8V8l2.4 1.4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5L6.2 11.5L13 4.5" stroke="#7620BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#EBC606" aria-hidden>
      <path d="M8 1.3l1.98 4.2 4.62.55-3.4 3.2.9 4.56L8 11.6l-4.1 2.2.9-4.56-3.4-3.2 4.62-.55L8 1.3z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.75" stroke="#ADA7B2" strokeWidth="1.4" />
      <path d="M13 13l-2.5-2.5" stroke="#ADA7B2" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6l4 4 4-4" stroke="#1A181C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AVATAR_COLORS: Record<string, string> = { H: "#778AFA", S: "#EB7878", O: "#DE62EA" };

function Avatar({ letter }: { letter: string }) {
  return (
    <span
      className="flex size-[24px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ background: AVATAR_COLORS[letter] ?? "#778AFA" }}
    >
      {letter}
    </span>
  );
}

export function Playground() {
  const [tab, setTab] = useState<ComponentId>("button");

  const [assignState, setAssignState] = useState<(typeof assignButtonStates)[number]>("Assign to me");
  const [loopState, setLoopState] = useState<(typeof loopInStates)[number]>("Default");

  const [inputFocused, setInputFocused] = useState(false);

  const [tagId, setTagId] = useState<string>(tagVariants[1].id);

  const [checkboxOn, setCheckboxOn] = useState(true);

  const [cardState, setCardState] = useState<(typeof cardStates)[number]>("Default");

  const [navState, setNavState] = useState<"Default" | "Hover" | "Activated">("Activated");

  const [tooltipDir, setTooltipDir] = useState<(typeof tooltipDirections)[number]>("Up");

  const currentTag = tagVariants.find((t) => t.id === tagId) ?? tagVariants[0];
  const isCardHover = cardState === "Hover";
  const isCardNewIn = cardState === "New In";
  const loopAvatars = { "1": ["H"], "2": ["H", "S"], "3": ["H", "S", "O"], "3+": ["H", "S", "O"] } as const;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{components.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{components.heading}</h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-[1.7] text-[color:var(--kn-body)]">
          {components.intro}
        </p>

        <div className="kn-panel mt-10 flex flex-col overflow-hidden md:flex-row">
          <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-[color:var(--kn-border)] p-4 md:w-[220px] md:flex-col md:overflow-visible md:border-b-0 md:border-r">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-[10px] px-4 py-3 text-left text-[14px] font-semibold transition-colors ${
                  tab === t.id
                    ? "bg-[color:var(--kn-ink)] text-white"
                    : "text-[color:var(--kn-body)] hover:bg-[color:var(--kn-hover-light)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-col">
            <div className="kn-stage m-4 flex min-h-[220px] flex-1 items-center justify-center rounded-[16px] p-10">
              {tab === "button" && (
                <div className="flex flex-col items-center gap-8">
                  <div className="flex items-center gap-3">
                    {assignState === "Assign to me" && (
                      <span className="rounded-[8px] border border-[#1A181C] bg-white px-4 py-2.5 text-[13px] font-medium text-[#1A181C]">
                        Assign to me
                      </span>
                    )}
                    {assignState === "Assign" && (
                      <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#1A181C] bg-white px-4 py-2.5 text-[13px] font-medium text-[#1A181C]">
                        Assign <ChevronDown />
                      </span>
                    )}
                    {assignState === "Assigned" && (
                      <span className="inline-flex items-center gap-2 rounded-[8px] px-2 py-1.5 text-[13px] font-medium text-[#1A181C]">
                        <Avatar letter="H" /> Harry
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 py-1.5 pl-2 pr-3 text-[13px] font-medium text-white">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <circle cx="8" cy="6" r="2.5" stroke="white" strokeWidth="1.3" />
                        <path d="M3.5 13c.5-2.5 2.3-4 4.5-4s4 1.5 4.5 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      {loopState === "Default" ? (
                        "Loop in"
                      ) : (
                        <span className="-ml-1 flex">
                          {loopAvatars[loopState as "1" | "2" | "3" | "3+"].map((l, i) => (
                            <span key={i} className={i > 0 ? "-ml-1.5" : ""}>
                              <Avatar letter={l} />
                            </span>
                          ))}
                          {loopState === "3+" && (
                            <span className="-ml-1.5 flex size-[24px] items-center justify-center rounded-full bg-[#EAE7EB] text-[9px] font-semibold text-[#7D7881]">
                              +1
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {tab === "input" && (
                <div className="w-full max-w-[360px]">
                  <div
                    className="flex h-[40px] items-center gap-2 rounded-[8px] px-3 transition-shadow"
                    style={{
                      background: inputFocused ? "#EDE9F9" : "#F5F4FC",
                      boxShadow: inputFocused ? "0 0 0 2px #7620BA" : "none",
                    }}
                  >
                    <SearchIcon />
                    <input
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder="Search for conversation and more..."
                      className="flex-1 bg-transparent text-[14px] text-[#312D34] placeholder:text-[#ADA7B2] focus:outline-none"
                    />
                    <span className="shrink-0 text-[12px] text-[#ADA7B2]">Ctrl + K</span>
                  </div>
                </div>
              )}

              {tab === "tag" && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium"
                  style={{ background: currentTag.bg, borderColor: currentTag.border, color: currentTag.fg }}
                >
                  {currentTag.icon === "clock" && <ClockIcon color={currentTag.fg} />}
                  {currentTag.label}
                </span>
              )}

              {tab === "checkbox" && (
                <button
                  aria-pressed={checkboxOn}
                  onClick={() => setCheckboxOn((v) => !v)}
                  className="flex size-[22px] items-center justify-center rounded-[5px] border-[1.6px] bg-white transition-colors"
                  style={{ borderColor: checkboxOn ? "#7620BA" : "#ADA7B2" }}
                >
                  {checkboxOn && <CheckIcon />}
                </button>
              )}

              {tab === "card" && (
                <div
                  className="w-full max-w-[320px] rounded-[12px] border p-4 transition-colors"
                  style={{ background: isCardHover ? "#F7F5FA" : "#FFFFFF", borderColor: "#EAE7EB" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {isCardNewIn && <span className="size-[7px] shrink-0 rounded-full bg-[#7620BA]" />}
                      <span className="text-[14px] text-[#1A181C]" style={{ fontWeight: isCardNewIn ? 700 : 500 }}>
                        Liam Wilson
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <StarIcon />
                      <span className="text-[12px] font-medium text-[#7D7881]">6:34 PM</span>
                    </div>
                  </div>
                  <p className="mt-1 truncate text-[13px] text-[#534E56]">Missing Tooltip on Product Images</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#7D7881] bg-[#F7F5FA] px-2 py-1 text-[11px] text-[#312D34]">
                      <ClockIcon color="#312D34" />
                      {isCardHover ? "15 mins" : "30 mins"}
                    </span>
                    <span className="rounded-full border border-[#B52121] bg-[#FFEDED] px-2 py-1 text-[11px] text-[#B52121]">
                      Critical
                    </span>
                    <span className="rounded-full bg-[#EAE7EB] px-2 py-1 text-[11px] text-[#312D34]">+1</span>
                  </div>
                </div>
              )}

              {tab === "nav" && (
                <div className="w-[230px] rounded-[10px] bg-[#0F0B1C] p-3">
                  {["Dashboard", "Client", "Conversation"].map((label, idx) => (
                    <div
                      key={label}
                      className="mb-1 flex items-center justify-between rounded-[8px] px-3 py-2 text-[13px] last:mb-0 transition-colors"
                      style={{
                        background: idx === 1 && navState !== "Default" ? "#4B3B56" : "transparent",
                        color: idx === 1 && navState === "Activated" ? "#FFFFFF" : "#ADA7B2",
                        fontWeight: idx === 1 && navState === "Activated" ? 600 : 400,
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
              )}

              {tab === "tooltip" && (
                <div className="relative inline-flex items-center gap-3 rounded-[4px] bg-[#312D34] px-3 py-2 text-[14px] font-medium text-white">
                  <span
                    className="absolute size-[8px] rotate-45 bg-[#312D34]"
                    style={{
                      top: tooltipDir === "Up" ? "-4px" : tooltipDir === "Down" ? undefined : "10px",
                      bottom: tooltipDir === "Down" ? "-4px" : undefined,
                      left:
                        tooltipDir === "Up" || tooltipDir === "Down"
                          ? "calc(50% - 4px)"
                          : tooltipDir === "Right"
                          ? "-4px"
                          : undefined,
                      right: tooltipDir === "Left" ? "-4px" : undefined,
                    }}
                  />
                  Simple Tooltip
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-[color:var(--kn-border)] px-6 py-4">
              <span className="mr-1 text-[12px] font-semibold text-[color:var(--kn-muted)]">Variant</span>

              {tab === "button" && (
                <>
                  {assignButtonStates.map((s) => (
                    <button
                      key={s}
                      onClick={() => setAssignState(s)}
                      className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                        assignState === s
                          ? "border-[color:var(--kn-ink)] bg-[color:var(--kn-ink)] text-white"
                          : "border-[color:var(--kn-border)] bg-white text-[color:var(--kn-body)]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <span className="mx-2 h-4 w-px bg-[color:var(--kn-border)]" />
                  {loopInStates.map((s) => (
                    <button
                      key={s}
                      onClick={() => setLoopState(s)}
                      className={`rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                        loopState === s
                          ? "border-[color:var(--kn-ink)] bg-[color:var(--kn-ink)] text-white"
                          : "border-[color:var(--kn-border)] bg-white text-[color:var(--kn-body)]"
                      }`}
                    >
                      Loop {s}
                    </button>
                  ))}
                </>
              )}

              {tab === "input" && (
                <span className="text-[13px] text-[color:var(--kn-body)]">
                  Click into the field to see the Focused token (#EDE9F9) and a P2 ring.
                </span>
              )}

              {tab === "tag" &&
                tagVariants.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTagId(t.id)}
                    aria-label={t.label}
                    className="size-[26px] rounded-full border-2 transition-shadow"
                    style={{ background: t.bg, borderColor: t.id === tagId ? "#1A181C" : "transparent" }}
                  />
                ))}

              {tab === "checkbox" && (
                <span className="text-[13px] text-[color:var(--kn-body)]">
                  Click the checkbox in the stage to toggle it.
                </span>
              )}

              {tab === "card" &&
                cardStates.map((s) => (
                  <button
                    key={s}
                    onClick={() => setCardState(s)}
                    className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                      cardState === s
                        ? "border-[color:var(--kn-ink)] bg-[color:var(--kn-ink)] text-white"
                        : "border-[color:var(--kn-border)] bg-white text-[color:var(--kn-body)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}

              {tab === "nav" &&
                (["Default", "Hover", "Activated"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setNavState(s)}
                    className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                      navState === s
                        ? "border-[color:var(--kn-ink)] bg-[color:var(--kn-ink)] text-white"
                        : "border-[color:var(--kn-border)] bg-white text-[color:var(--kn-body)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}

              {tab === "tooltip" &&
                tooltipDirections.map((d) => (
                  <button
                    key={d}
                    onClick={() => setTooltipDir(d)}
                    className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-colors ${
                      tooltipDir === d
                        ? "border-[color:var(--kn-ink)] bg-[color:var(--kn-ink)] text-white"
                        : "border-[color:var(--kn-border)] bg-white text-[color:var(--kn-body)]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
