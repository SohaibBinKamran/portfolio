"use client";

import { useState } from "react";
import { board, routes, sources, tierMeta, type Item, type Route, type Tier } from "@/data/arrivals";
import { Flap } from "./Flap";
import { fmt, trendOf } from "./utils";

type Skin = "amber" | "brand";
type Level = "state" | "city";

const routeColor = (id: string) => `var(--r-${id})`;

function Sparkline({ route }: { route: Route }) {
  const pts = route.series.pts;
  const W = 300;
  const H = 96;
  const pl = 14;
  const pr = 14;
  const pt = 22;
  const pb = 22;
  const vals = pts.map((p) => p[1]);
  const mn = Math.min(...vals);
  const mx = Math.max(...vals);
  const span = mx - mn || 1;
  const x = (i: number) => pl + (i * (W - pl - pr)) / (pts.length - 1);
  const y = (v: number) => pt + (1 - (v - mn) / span) * (H - pt - pb);
  const color = routeColor(route.id);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p[1]).toFixed(1)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${route.series.label} by year, rounded to thousands. The axis does not start at zero.`}
      className="block h-auto w-full"
    >
      <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => {
        const end = i === pts.length - 1;
        return (
          <g key={p[0]}>
            <circle cx={x(i)} cy={y(p[1])} r={end ? 4.5 : 3} fill={end ? color : "var(--b-panel)"} stroke={color} strokeWidth={2} />
            <text x={x(i)} y={H - 6} textAnchor="middle" fontSize={9.5} fill="var(--b-faint)" fontFamily="var(--ar-mono)">
              {p[0]}
            </text>
            <text
              x={x(i)}
              y={y(p[1]) - 8}
              textAnchor={i === 0 ? "start" : end ? "end" : "middle"}
              fontSize={9.5}
              fill="var(--b-dim)"
              fontFamily="var(--ar-mono)"
            >
              {Math.round(p[1] / 1000)}k
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TierMark({ tier }: { tier: Tier }) {
  return <span aria-hidden className={`ar-tier ${tier}`} />;
}

function Drawer({ route }: { route: Route }) {
  const [level, setLevel] = useState<Level>("state");
  const [picked, setPicked] = useState(0);
  const t = trendOf(route.series);
  const items: Item[] = level === "state" ? route.states : route.cities;
  const item = items[Math.min(picked, items.length - 1)];
  const max = Math.max(...items.map((i) => i.value), 1);

  const pick = (l: Level) => {
    setLevel(l);
    setPicked(0);
  };

  return (
    <div className="ar-drawer px-4 pb-7 pt-3 sm:px-7">
      <div className="ar-card mt-3 grid items-center gap-5 p-4 sm:grid-cols-[minmax(0,300px)_1fr] sm:px-5">
        <Sparkline route={route} />
        <div>
          <h4 className="ar-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] !text-[color:var(--b-faint)]">
            {route.series.label}, {t.firstYear} to {t.lastYear}
          </h4>
          <p className="mt-1 text-[13px] leading-[1.6] text-[color:var(--b-dim)]">
            {t.up ? "Up" : "Down"} {Math.abs(t.pct).toFixed(1)}% in the last year and {t.total >= 0 ? "up" : "down"}{" "}
            {Math.abs(t.total).toFixed(1)}% since {t.firstYear}. Destatis AZR, each 31 December. The axis is zoomed and doesn&apos;t start at zero.
          </p>
        </div>
      </div>

      <div className="ar-seg mt-5" role="tablist" aria-label="Level of detail">
        <button role="tab" aria-selected={level === "state"} onClick={() => pick("state")}>
          State totals
        </button>
        <button role="tab" aria-selected={level === "city"} onClick={() => pick("city")}>
          City &amp; district
        </button>
      </div>

      <div key={`${route.id}-${level}`} className="mt-3 flex flex-col">
        {items.length === 0 && (
          <p className="px-1 py-3 text-[13px] text-[color:var(--b-faint)]">
            No figure at this level clears the bar for official or press sourcing. That is the finding.
          </p>
        )}
        {items.map((it, i) => (
          <button
            key={it.name}
            className="ar-bar-row"
            aria-pressed={i === picked}
            onClick={() => setPicked(i)}
            onMouseEnter={() => setPicked(i)}
            onFocus={() => setPicked(i)}
          >
            <span className="flex flex-col">
              <span className="text-[13px] font-medium">{it.name}</span>
              <span className="ar-mono mt-0.5 flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.06em] text-[color:var(--b-faint)]">
                <TierMark tier={sources[it.src].tier} />
                {tierMeta[sources[it.src].tier].label} · {it.year}
              </span>
            </span>
            <span className="ar-bar-track">
              <span
                className="ar-bar-fill"
                style={{ width: `${Math.max(3, (it.value / max) * 100)}%`, background: routeColor(route.id) }}
              />
            </span>
            <span className="ar-mono text-right text-[13px] font-semibold tabular-nums">{fmt(it.value)}</span>
          </button>
        ))}
      </div>

      {item && (
        <div className="ar-card mt-3 px-4 py-3 text-[12.5px] leading-[1.6] text-[color:var(--b-dim)]" aria-live="polite">
          <p className="font-semibold text-[color:var(--b-ink)]">
            {item.name} · {fmt(item.value)} · {item.level} · as of {item.year}
          </p>
          <p className="ar-mono mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.06em] text-[color:var(--b-faint)]">
            <TierMark tier={sources[item.src].tier} />
            {tierMeta[sources[item.src].tier].label}: {tierMeta[sources[item.src].tier].blurb}
          </p>
          {item.note && <p className="mt-1.5">{item.note}</p>}
          <a
            href={sources[item.src].url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block underline underline-offset-2 hover:text-[color:var(--b-ink)]"
          >
            {sources[item.src].name}
          </a>
        </div>
      )}

      <div className="ar-note mt-5 px-4 py-4">
        <h4 className="ar-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] !text-[color:var(--b-accent)]">
          Hidden diaspora: naturalisations
        </h4>
        <p className="mt-2 text-[12.5px] leading-[1.65] text-[color:var(--b-dim)]">
          Citizens who naturalise leave the foreigner count but still travel home to visit family, so a flat or shrinking
          total can hide a stable market. The June 2024 citizenship reform (StARModG) allows dual nationality.
        </p>
        {route.natz.items.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {route.natz.items.map((n) => (
              <li key={n.t} className="flex items-baseline gap-3 text-[12.5px]">
                <span
                  className={`ar-trend ${n.dir} min-w-[72px] justify-center`}
                >
                  {n.v}
                </span>
                <span>
                  {n.t}{" "}
                  <a
                    href={sources[n.src].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ar-mono text-[10px] text-[color:var(--b-faint)] underline underline-offset-2"
                  >
                    source
                  </a>
                </span>
              </li>
            ))}
          </ul>
        )}
        {route.natz.none && (
          <p className="mt-2 text-[12.5px] leading-[1.65] text-[color:var(--b-dim)]">{route.natz.none}</p>
        )}
      </div>

      <p className="mt-5 border-l-[3px] border-[color:var(--b-accent)] pl-3 text-[12.5px] leading-[1.65] text-[color:var(--b-dim)]">
        <strong className="font-semibold text-[color:var(--b-accent)]">What&apos;s missing:</strong>{" "}
        {route.caveat}
      </p>
    </div>
  );
}

export function Board() {
  const [skin, setSkin] = useState<Skin>("amber");
  const [openId, setOpenId] = useState<string | null>("kosovo");

  return (
    <section className="px-6 py-20 sm:py-24" id="board">
      <div className="mx-auto max-w-[1120px]">
        <span className="ar-eyebrow">{board.eyebrow}</span>
        <h2 className="mt-5 text-[32px] leading-[1.15] sm:text-[44px]">{board.heading}</h2>
        <p className="mt-5 max-w-[680px] text-[17px] leading-[1.7]">{board.intro}</p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Skin" className="flex flex-wrap gap-2">
            {board.skins.map((s) => (
              <button
                key={s.id}
                onClick={() => setSkin(s.id as Skin)}
                aria-pressed={skin === s.id}
                className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                  skin === s.id
                    ? "border-[color:var(--ar-ink)] bg-[color:var(--ar-ink)] text-[color:var(--ar-bg)]"
                    : "border-[color:var(--ar-rule)] text-[color:var(--ar-body)] hover:border-[color:var(--ar-dim)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <ul className="ar-mono flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[color:var(--ar-body)]" aria-label="Source tiers">
            {(Object.keys(tierMeta) as Tier[]).map((k) => (
              <li key={k} className="flex items-center gap-2" title={tierMeta[k].blurb}>
                <span className="ar-board !inline-block !bg-transparent !p-0">
                  <span aria-hidden className={`ar-tier ${k}`} style={{ ["--b-faint" as string]: "var(--ar-dim)" }} />
                </span>
                {tierMeta[k].label}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 text-[13px] text-[color:var(--ar-dim)]">
          {board.skins.find((s) => s.id === skin)?.note}
        </p>

        {skin === "brand" && (
          <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Brand palette">
            {board.brandSwatches.map((sw) => (
              <span
                key={sw.hex}
                title={`${sw.name} ${sw.hex}`}
                className="ar-mono flex items-center gap-2 rounded-full border border-[color:var(--ar-rule)] py-1 pl-1 pr-3 text-[11px] text-[color:var(--ar-body)]"
              >
                <span className="h-5 w-5 rounded-full border border-white/20" style={{ background: sw.hex }} />
                {sw.hex}
              </span>
            ))}
          </div>
        )}

        <div className="ar-board mt-6" data-skin={skin}>
          <div className="ar-mono hidden grid-cols-[84px_1.2fr_1.5fr_auto] gap-3 px-5 pb-2 pt-3 text-[10px] uppercase tracking-[0.12em] text-[color:var(--b-row-dim)] opacity-70 sm:grid">
            <span>Route</span>
            <span>Community</span>
            <span>Registered (Destatis)</span>
            <span className="min-w-[88px]" />
          </div>

          {routes.map((r, i) => {
            const open = openId === r.id;
            const t = trendOf(r.series);
            return (
              <div
                key={r.id}
                className={`ar-b-row overflow-hidden ${i === 0 ? "rounded-t-[14px] !border-t-0" : ""} ${
                  i === routes.length - 1 ? "rounded-b-[14px]" : ""
                }`}
              >
                <button
                  aria-expanded={open}
                  aria-controls={`drawer-${r.id}`}
                  onClick={() => setOpenId(open ? null : r.id)}
                  className="grid w-full grid-cols-[76px_1fr_auto] items-center gap-x-3 gap-y-3 px-4 py-4 text-left sm:grid-cols-[84px_1.2fr_1.5fr_auto] sm:px-5"
                >
                  <span className="ar-code text-[13px]">{r.code}</span>
                  <span className="flex flex-col">
                    <span className="flex items-center gap-2 text-[17px] font-bold">
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 rounded-full border-[1.5px] border-white/80"
                        style={{ background: routeColor(r.id) }}
                      />
                      {r.dest}
                    </span>
                    <span className="text-[12px] text-[color:var(--b-row-dim)]">{r.name} community</span>
                  </span>
                  <span className="order-last col-span-3 flex flex-col gap-1.5 sm:order-none sm:col-span-1">
                    <span className="flex flex-wrap items-center gap-3">
                      <Flap text={fmt(r.headline)} className="text-[19px]" />
                      <span className={`ar-trend ${t.up ? "up" : "down"}`}>
                        {t.up ? "▲" : "▼"} {t.up ? "+" : "−"}
                        {Math.abs(t.pct).toFixed(1)}% <span className="font-normal opacity-80">{t.prevYear}→{t.lastYear}</span>
                      </span>
                    </span>
                    <span className="ar-mono text-[9.5px] text-[color:var(--b-row-dim)] opacity-80">{r.headlineLabel}</span>
                  </span>
                  <span className="ar-view min-w-[88px] text-center">{open ? "HIDE" : "VIEW DATA"}</span>
                </button>
                {open && (
                  <div id={`drawer-${r.id}`} role="region" aria-label={`${r.name} data`}>
                    <Drawer route={r} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-5 max-w-[760px] text-[13.5px] leading-[1.7] text-[color:var(--ar-dim)]">{board.skinNote}</p>
      </div>
    </section>
  );
}
