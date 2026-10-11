"use client";

import { routes } from "@/data/arrivals";
import { Flap } from "./Flap";
import { fmt, trendOf } from "./utils";

/** A departures board strip, display only: the five routes and their Destatis headline counts. */
export function HeroBoard() {
  return (
    <div className="ar-board mt-14" data-skin="amber">
      <div className="ar-mono hidden grid-cols-[84px_1.3fr_1.3fr_auto] gap-3 px-5 pb-2 pt-3 text-[10px] uppercase tracking-[0.12em] text-[color:var(--b-row-dim)] opacity-70 sm:grid">
        <span>Route</span>
        <span>Community</span>
        <span>Registered in Germany</span>
        <span className="text-right">Δ 2024→25</span>
      </div>
      {routes.map((r, i) => {
        const t = trendOf(r.series);
        return (
          <div
            key={r.id}
            className={`ar-b-row grid grid-cols-[84px_1fr] items-center gap-x-3 gap-y-2 px-5 py-4 sm:grid-cols-[84px_1.3fr_1.3fr_auto] ${
              i === 0 ? "rounded-t-[14px] !border-t-0" : ""
            } ${i === routes.length - 1 ? "rounded-b-[14px]" : ""}`}
          >
            <span className="ar-code text-[14px]">{r.code}</span>
            <span className="flex flex-col">
              <span className="text-[17px] font-bold text-[color:var(--b-row-ink)]">{r.dest}</span>
              <span className="text-[12px] text-[color:var(--b-row-dim)]">{r.name} community</span>
            </span>
            <span className="col-span-2 sm:col-span-1">
              <Flap text={fmt(r.headline)} className="text-[20px] sm:text-[22px]" />
            </span>
            <span className={`ar-trend ${t.up ? "up" : "down"} col-span-2 justify-self-start sm:col-span-1 sm:justify-self-end`}>
              {t.up ? "▲" : "▼"} {t.up ? "+" : "−"}
              {Math.abs(t.pct).toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
