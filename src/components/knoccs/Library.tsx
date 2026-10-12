"use client";

import Image from "next/image";
import { useState } from "react";
import { library, type LibraryItem } from "@/data/knoccs";

const AVATAR_COLORS: { letter: string; hex: string }[] = [
  { letter: "H", hex: "#778AFA" },
  { letter: "S", hex: "#EB7878" },
  { letter: "O", hex: "#DE62EA" },
];

const COLUMN_CLASS: Record<number, string> = {
  1: "columns-1",
  2: "columns-1 md:columns-2",
  3: "columns-1 sm:columns-2 lg:columns-3",
};

function Toggle() {
  const [on, setOn] = useState(true);
  return (
    <button
      aria-pressed={on}
      aria-label="Toggle"
      onClick={() => setOn((v) => !v)}
      className="flex h-[19px] w-[30px] items-center rounded-full p-[2px] transition-colors"
      style={{ background: on ? "#7620BA" : "#ADA7B2" }}
    >
      <span
        className="size-[15px] rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: on ? "translateX(11px)" : "translateX(0)" }}
      />
    </button>
  );
}

function AtomRow() {
  return (
    <div className="kn-panel p-5">
      <h4 className="text-[15px] font-semibold text-[color:var(--kn-ink)]">Atoms</h4>
      <p className="mt-1 text-[13px] text-[color:var(--kn-body)]">Avatar, badge and toggle, reused everywhere.</p>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div className="flex gap-2">
          {AVATAR_COLORS.map((a) => (
            <span
              key={a.letter}
              className="flex size-[28px] items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: a.hex }}
            >
              {a.letter}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {["3", "12"].map((n) => (
            <span
              key={n}
              className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#7620BA] px-1 text-[10px] font-semibold text-white"
            >
              {n}
            </span>
          ))}
        </div>
        <Toggle />
      </div>
    </div>
  );
}

function Card({ item }: { item: LibraryItem }) {
  return (
    <div className="kn-panel mb-6 inline-block w-full break-inside-avoid overflow-hidden align-top">
      <div className="flex items-center justify-center bg-[color:var(--kn-hover-light)] p-3">
        <Image
          src={item.src}
          alt={`${item.title}. ${item.caption}`}
          width={item.w}
          height={item.h}
          className="h-auto w-full object-contain"
          style={{ maxWidth: item.wide ? undefined : Math.round(item.w * 1.5) }}
        />
      </div>
      <div className="px-5 py-4">
        <h4 className="text-[15px] font-semibold text-[color:var(--kn-ink)]">{item.title}</h4>
        <p className="mt-0.5 text-[13px] leading-[1.5] text-[color:var(--kn-body)]">{item.caption}</p>
      </div>
    </div>
  );
}

export function Library() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <span className="kn-eyebrow">{library.eyebrow}</span>
        <h2 className="mt-5 max-w-[640px] text-[32px] sm:text-[40px]">{library.heading}</h2>
        <p className="mt-4 max-w-[680px] text-[16px] leading-[1.7] text-[color:var(--kn-body)]">
          {library.intro}
        </p>

        <div className="mt-12 flex flex-col gap-12">
          {library.groups.map((group) => {
            const wide = group.items.filter((i) => i.wide);
            const rest = group.items.filter((i) => !i.wide);
            return (
              <div key={group.name}>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[color:var(--kn-muted)]">
                  {group.name}
                </h3>

                <div className="mt-5">
                  {wide.map((item) => (
                    <Card key={item.title} item={item} />
                  ))}

                  {(rest.length > 0 || group.atoms) && (
                    <div className={`gap-6 ${COLUMN_CLASS[group.columns]}`}>
                      {rest.map((item) => (
                        <Card key={item.title} item={item} />
                      ))}
                      {group.atoms && (
                        <div className="mb-6 inline-block w-full break-inside-avoid align-top">
                          <AtomRow />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-[16px] border border-dashed border-[color:var(--kn-border)] p-6">
          <h4 className="text-[14px] font-semibold text-[color:var(--kn-ink)]">{library.gaps.heading}</h4>
          <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[color:var(--kn-muted)]">{library.gaps.body}</p>
        </div>
      </div>
    </section>
  );
}
