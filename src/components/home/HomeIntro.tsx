"use client";

import { useEffect, useRef } from "react";
import { CursorArrow } from "@/components/ui/CursorArrow";
import { hero } from "@/data/home";

/**
 * First-visit homepage intro (about 3 seconds), prototyped in Loader Lab.
 *
 *  1. Redline: every hero piece appears as a wireframe, scattered.
 *  2. Three named cursors drag the redline pieces into their slots.
 *  3. Measurements check the layout, then the redline inks into the real
 *     page top to bottom (a Bayer dither reveal of the live DOM), and the
 *     Research and Polish cursors become the hero's roaming cursors.
 *
 * The real hero is in the DOM the whole time; it is only hidden visually.
 * A pre-paint script in `app/layout.tsx` sets `html[data-intro="on"]` on
 * every full load or refresh of `/` (never with reduced motion; client-side
 * navigation back to Home does not run it). Without that attribute this component does nothing.
 * Any click, key, wheel or touch skips ahead.
 */

type Rect = { x: number; y: number; w: number; h: number };
/** nav, head, sub, cta, strip, plus c0 to c2 for the work cards on the hybrid layout */
type Key = string;
type Word = { text: string; x: number; y: number; w: number; h: number; node: number; font: string; size: number; spacing: string };
type PieceData = {
  key: Key;
  el: HTMLElement;
  r: Rect;
  label: string;
  words: Word[];
  bars: Rect[];
  pill?: { r: Rect; radius: number };
  image?: Rect;
  t0: number;
  t1: number;
};

const INK = "#0d0d0d";
const ALERT = "#ff5a3c";
const PURPLE = "#5e45ff";
const BLUE = "#265bff";

const BASE: Key[] = ["nav", "head", "sub", "cta"];
const STRIP: Key = "strip"; // optional: the hybrid layout has no strip
const CARD_KEYS: Key[] = ["c0", "c1", "c2"];
const INK0 = 1.95;
const INK_STAGGER = 0.08; // 0.06 when the work cards are on screen too
const INK_DUR = 0.42;
const END = 2.95;

/** where each scattered piece starts (its centre, as a fraction of the viewport) and its tilt in radians */
type Job = { keys: Key[]; cur: number; at: [number, number]; rot: number; grab: number; a: number; b: number };
const JOBS: Job[] = [
  { keys: ["head"], cur: 0, at: [0.38, 0.74], rot: -0.1, grab: -0.25, a: 0.55, b: 1.25 },
  { keys: ["strip"], cur: 1, at: [0.5, 0.2], rot: 0.035, grab: 0.28, a: 0.8, b: 1.6 },
  { keys: ["sub", "cta"], cur: 2, at: [0.79, 0.47], rot: 0.13, grab: 0, a: 1.15, b: 1.8 },
];
/** hybrid layout: the strip stays put and Wireframe drags the work row instead */
const JOBS_WORK: Job[] = [
  { keys: ["head"], cur: 0, at: [0.3, 0.22], rot: -0.08, grab: -0.25, a: 0.55, b: 1.25 },
  { keys: CARD_KEYS, cur: 1, at: [0.5, 0.68], rot: 0.035, grab: 0.28, a: 0.8, b: 1.6 },
  { keys: ["sub", "cta"], cur: 2, at: [0.8, 0.22], rot: 0.13, grab: 0, a: 1.15, b: 1.8 },
];

const CURSORS = [
  { label: "Research", final: hero.role, dir: "ne" as const, bubble: "border-[#4434ad] bg-accent-purple text-white", color: PURPLE },
  { label: "Wireframe", final: null, dir: "nw" as const, bubble: "border-[#1b3fb0] bg-accent-blue text-white", color: BLUE },
  { label: "Polish", final: hero.annotation, dir: "nw" as const, bubble: "border-[#212529] bg-accent-lime text-ink", color: "#7fb80e" },
];

/** arrow tip inside the 26 x 28 CursorArrow box */
const TIP = { ne: [21.59, 2.24], nw: [4.41, 2.24] } as const;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);

const LEVELS = 24;
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};


/** 17 tiled dither masks, level 0 (nothing) to 16 (everything) */
function ditherMasks(): string[] {
  // Fine dust instead of square pixels: a 64px tile of 2px round specks, each
  // with its own random threshold, so the live page condenses out of dust.
  const N = 32, cell = 6; // drawn at 3x: 32 x 32 specks, 2px apart on screen
  const c = document.createElement("canvas");
  c.width = c.height = N * cell;
  const x = c.getContext("2d")!;
  const rand = rng(7);
  const thr = Array.from({ length: N * N }, (_, i) => i);
  for (let i = thr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [thr[i], thr[j]] = [thr[j], thr[i]];
  }
  const out: string[] = [];
  for (let lv = 0; lv <= LEVELS; lv++) {
    x.clearRect(0, 0, c.width, c.height);
    x.fillStyle = "#000";
    x.beginPath();
    for (let k = 0; k < N * N; k++) {
      if (thr[k] / (N * N) >= lv / LEVELS) continue;
      const cx = (k % N) * cell + cell / 2, cy = Math.floor(k / N) * cell + cell / 2;
      x.moveTo(cx + 2.9, cy);
      x.arc(cx, cy, 2.9, 0, Math.PI * 2);
    }
    x.fill();
    out.push(c.toDataURL("image/png"));
  }
  return out;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const toRect = (r: DOMRect): Rect => ({ x: r.left, y: r.top, w: r.width, h: r.height });
const union = (rs: Rect[]): Rect => {
  const x = Math.min(...rs.map((r) => r.x)), y = Math.min(...rs.map((r) => r.y));
  return { x, y, w: Math.max(...rs.map((r) => r.x + r.w)) - x, h: Math.max(...rs.map((r) => r.y + r.h)) - y };
};
const pad = (r: Rect, p: number): Rect => ({ x: r.x - p, y: r.y - p, w: r.w + p * 2, h: r.h + p * 2 });

/** every visible word inside `el`, with its box and font */
function wordsOf(el: Element): Word[] {
  const words: Word[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node: Node | null;
  let idx = 0;
  while ((node = walker.nextNode())) {
    const t = node as Text;
    const cs = getComputedStyle(t.parentElement!);
    const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    // split at hyphens too, so a word broken across two lines stays two boxes
    const re = /[^\s-]+-?|-/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(t.data))) {
      range.setStart(t, m.index);
      range.setEnd(t, m.index + m[0].length);
      const r = range.getBoundingClientRect();
      if (r.width < 1) continue;
      words.push({ text: m[0], x: r.left, y: r.top, w: r.width, h: r.height, node: idx, font, size: parseFloat(cs.fontSize), spacing: cs.letterSpacing });
    }
    idx++;
  }
  return words;
}

/** skeleton bars: one per text node (`byNode`) or one per line */
function barsOf(words: Word[], byNode: boolean): Rect[] {
  const groups: Word[][] = [];
  for (const w of words) {
    const g = groups.find((g) => (byNode ? g[0].node === w.node : Math.abs(g[0].y + g[0].h / 2 - (w.y + w.h / 2)) < w.h / 2));
    if (g) g.push(w);
    else groups.push([w]);
  }
  return groups.map((g) => {
    const u = union(g);
    const h = Math.max(4, g[0].size * 0.42);
    return { x: u.x, y: u.y + u.h / 2 - h / 2, w: u.w, h };
  });
}

function drawPiece(ctx: CanvasRenderingContext2D, p: PieceData, q: number, alpha: number, mono: string) {
  if (q <= 0 || alpha <= 0) return;
  const r = p.r;
  ctx.save();
  ctx.globalAlpha = alpha;
  // inner content wipes in left to right
  ctx.save();
  ctx.beginPath();
  ctx.rect(r.x - 1, r.y - 1, (r.w + 2) * q, r.h + 2);
  ctx.clip();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 0.8;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  for (const w of p.words) {
    ctx.font = w.font;
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = w.spacing === "normal" ? "0px" : w.spacing;
    const m = ctx.measureText(w.text);
    ctx.strokeText(w.text, w.x, w.y + w.h - (m.fontBoundingBoxDescent || w.h * 0.2));
  }
  ctx.fillStyle = INK;
  ctx.globalAlpha = alpha * 0.2;
  for (const b of p.bars) {
    rr(ctx, b.x, b.y, b.w, b.h, Math.min(b.h / 2, 3));
    ctx.fill();
  }
  if (p.pill) {
    rr(ctx, p.pill.r.x, p.pill.r.y, p.pill.r.w, p.pill.r.h, p.pill.radius);
    ctx.fill();
  }
  if (p.image) {
    // classic wireframe image: a box with a cross
    const m = p.image;
    ctx.globalAlpha = alpha * 0.06;
    rr(ctx, m.x, m.y, m.w, m.h, 12);
    ctx.fill();
    ctx.globalAlpha = alpha * 0.35;
    ctx.strokeStyle = INK;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x + m.w, m.y + m.h);
    ctx.moveTo(m.x + m.w, m.y);
    ctx.lineTo(m.x, m.y + m.h);
    ctx.stroke();
    rr(ctx, m.x, m.y, m.w, m.h, 12);
    ctx.stroke();
  }
  ctx.restore();
  // dashed outline draws itself around the box
  const pts = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h], [r.x, r.y]];
  let left = (r.w + r.h) * 2 * q;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(r.x, r.y);
  for (let i = 1; i < 5 && left > 0; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    const k = Math.min(1, left / l);
    ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k));
    left -= l;
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = ALERT;
  pts.slice(0, 4).forEach((pt) => ctx.fillRect(pt[0] - 2, pt[1] - 2, 4, 4));
  if (p.label) {
    ctx.font = `400 10px ${mono}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = INK;
    ctx.globalAlpha = alpha * 0.78;
    ctx.fillText(p.label.slice(0, Math.ceil(p.label.length * q)), r.x, r.y - 6);
  }
  ctx.restore();
}

type Measure = { a: [number, number]; b: [number, number]; label: string; t0: number; t1: number; axis?: boolean };

function drawMeasure(ctx: CanvasRenderingContext2D, m: Measure, lt: number, alpha: number, mono: string) {
  const q = io(seg(lt, m.t0, m.t1));
  if (q <= 0 || alpha <= 0) return;
  const x = lerp(m.a[0], m.b[0], q), y = lerp(m.a[1], m.b[1], q);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = ALERT;
  ctx.fillStyle = ALERT;
  ctx.lineWidth = 1;
  if (m.axis) ctx.setLineDash([8, 4, 1.5, 4]);
  ctx.beginPath();
  ctx.moveTo(m.a[0], m.a[1]);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.setLineDash([]);
  if (!m.axis) {
    const horiz = m.a[1] === m.b[1];
    for (const pt of [m.a, [x, y]]) {
      ctx.beginPath();
      if (horiz) {
        ctx.moveTo(pt[0], pt[1] - 5);
        ctx.lineTo(pt[0], pt[1] + 5);
      } else {
        ctx.moveTo(pt[0] - 5, pt[1]);
        ctx.lineTo(pt[0] + 5, pt[1]);
      }
      ctx.stroke();
    }
    if (m.label && q > 0.6) {
      ctx.font = `500 10px ${mono}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const tw = ctx.measureText(m.label).width + 8;
      const lx = (m.a[0] + m.b[0]) / 2 + (horiz ? 0 : 20);
      const ly = (m.a[1] + m.b[1]) / 2 + (horiz ? -11 : 0);
      rr(ctx, lx - tw / 2, ly - 8, tw, 16, 3);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillText(m.label, lx, ly + 0.5);
    }
  }
  ctx.restore();
}

/**
 * React remounts effects in development (Strict Mode). A cleanup that is
 * followed straight away by a fresh mount resumes the intro instead of
 * dropping it; a real unmount (leaving the page) lets the window lapse.
 */
let resumeUntil = 0;

function setMask(el: HTMLElement, url: string | null) {
  if (url === null) {
    for (const p of ["mask-image", "-webkit-mask-image", "mask-size", "-webkit-mask-size"]) el.style.removeProperty(p);
    return;
  }
  el.style.setProperty("-webkit-mask-image", `url(${url})`);
  el.style.setProperty("mask-image", `url(${url})`);
  el.style.setProperty("-webkit-mask-size", "64px 64px");
  el.style.setProperty("mask-size", "64px 64px");
}

export function HomeIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const finalRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const state = root.getAttribute("data-intro");
    if (state !== "on" && state !== "run" && performance.now() > resumeUntil) return;
    root.setAttribute("data-intro", "run");

    const q = <T extends HTMLElement>(k: string) => document.querySelector<T>(`[data-intro-piece="${k}"]`);
    const ORDER: Key[] = [...BASE, ...(q(STRIP) ? [STRIP] : []), ...CARD_KEYS.filter((k) => q(k))];
    const stagger = ORDER.length > BASE.length + 1 ? 0.06 : INK_STAGGER;
    const els = Object.fromEntries(ORDER.map((k) => [k, q(k)])) as Record<Key, HTMLElement | null>;
    const sky = q("sky");
    const roams = [q("roam-0"), null, q("roam-1")];
    const levels: number[] = ORDER.map(() => -1);

    let raf = 0;
    let stopped = false;
    let finished = false;

    const restore = () => {
      ORDER.forEach((k) => {
        const el = els[k];
        if (!el) return;
        setMask(el, null);
        el.style.removeProperty("opacity");
      });
      sky?.style.removeProperty("opacity");
      root.removeAttribute("data-intro");
    };

    // scrolled already (restored position) or a broken page: just show it
    if (window.scrollY > 40 || BASE.some((k) => !els[k])) {
      finished = true;
      restore();
      return;
    }

    const start = async () => {
      try {
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 800))]);
      } catch {}
      await new Promise((r) => requestAnimationFrame(r));
      if (stopped) return;

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const vw = window.innerWidth, vh = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      const mono = getComputedStyle(root).getPropertyValue("--font-cabinblu-mono").trim() || "ui-monospace, monospace";
      const masks = ditherMasks();

      // ---- measure the real page ----
      const pieces = {} as Record<Key, PieceData>;
      ORDER.forEach((k, i) => {
        const el = els[k]!;
        const box = toRect(el.getBoundingClientRect());
        const cs = getComputedStyle(el);
        const words = wordsOf(el);
        const base = { key: k, el, t0: i * 0.13, t1: i * 0.13 + 0.8 };
        if (k === "head") {
          pieces[k] = { ...base, r: pad(union(words), 8), words, bars: [], label: `H1  Instrument Serif ${Math.round(parseFloat(cs.fontSize))}/${Math.round(parseFloat(cs.lineHeight) || 0)}` };
        } else if (k === "cta") {
          const a = (el.querySelector("a") as HTMLElement) || el;
          const ar = toRect(a.getBoundingClientRect());
          pieces[k] = { ...base, r: pad(ar, 6), words: [], bars: [], pill: { r: ar, radius: 16 }, label: `Pill  ${Math.round(ar.w)} x ${Math.round(ar.h)}` };
        } else if (k === "sub") {
          pieces[k] = { ...base, r: pad(box, 4), words: [], bars: barsOf(words, false), label: `Body  Satoshi ${Math.round(parseFloat(cs.fontSize))}` };
        } else if (CARD_KEYS.includes(k)) {
          const im = el.querySelector("img")?.parentElement ?? null;
          pieces[k] = { ...base, r: box, words: [], bars: barsOf(words, false), image: im ? toRect(im.getBoundingClientRect()) : undefined, label: `Card ${Number(k.slice(1)) + 1}  r20` };
        } else {
          pieces[k] = { ...base, r: box, words: [], bars: barsOf(words, true), label: k === "nav" ? `NAV  h${Math.round(box.h)}` : "" };
        }
      });

      // ---- where each job starts, kept on screen ----
      // drag the work row only when it fits on screen (not on phones, where the cards stack)
      const cardKeys = ORDER.filter((k) => CARD_KEYS.includes(k));
      const fits = (keys: Key[]) => keys.length > 0 && union(keys.map((k) => pieces[k].r)).h * 0.9 < vh * 0.75;
      // Wireframe drags as many cards as fit; failing that the strip; failing that nothing
      const workKeys = [...cardKeys];
      while (workKeys.length && !fits(workKeys)) workKeys.pop();
      const hasStrip = !!pieces[STRIP];
      const plan: Job[] = workKeys.length
        ? JOBS_WORK.map((j) => (j.cur === 1 ? { ...j, keys: workKeys, grab: workKeys.length > 1 ? 0.28 : 0.2 } : j))
        : hasStrip
          ? JOBS
          : JOBS.filter((j) => j.cur !== 1);
      const jobs = plan.map((j) => {
        const b = union(j.keys.map((k) => pieces[k].r));
        const sw = b.w * 0.9, sh = b.h * 0.9, cx = b.x + b.w / 2, cy = b.y + b.h / 2;
        let dx = j.at[0] * vw - cx, dy = j.at[1] * vh - cy;
        if (sw < vw - 32) dx = clamp(dx, 16 + sw / 2 - cx, vw - 16 - sw / 2 - cx);
        if (sh < vh - 90) dy = clamp(dy, 74 + sh / 2 - cy, vh - 16 - sh / 2 - cy);
        return { ...j, box: b, dx, dy };
      });

      // ---- the layout check ----
      const H = pieces.head.r, S = pieces.sub.r, C = pieces.cta.pill!.r, ST = pieces.strip;
      const cx = vw / 2;
      const measures: Measure[] = [
        { a: [cx, H.y - 36], b: [cx, C.y + C.h + 36], label: "", t0: 0.15, t1: 1, axis: true },
        { a: [H.x + H.w + 28, H.y + 8], b: [H.x + H.w + 28, H.y + H.h - 8], label: String(Math.round(H.h - 16)), t0: 0.6, t1: 1.1 },
        { a: [S.x - 24, H.y + H.h - 8], b: [S.x - 24, S.y + 4], label: String(Math.round(S.y + 4 - (H.y + H.h - 8))), t0: 0.8, t1: 1.2 },
        { a: [C.x + C.w + 24, S.y + S.h - 4], b: [C.x + C.w + 24, C.y], label: String(Math.round(C.y - (S.y + S.h - 4))), t0: 0.9, t1: 1.3 },
      ];
      if (ST && ST.bars[0] && ST.r.y + ST.r.h / 2 < vh) {
        const y = ST.r.y + ST.r.h / 2 - 16;
        measures.push({ a: [0, y], b: [ST.bars[0].x, y], label: String(Math.round(ST.bars[0].x)), t0: 1, t1: 1.4 });
      }

      // ---- dot grid, cached ----
      const dots = document.createElement("canvas");
      dots.width = canvas.width;
      dots.height = canvas.height;
      const dx = dots.getContext("2d")!;
      dx.fillStyle = INK;
      for (let y = 8; y < vh; y += 16) for (let x = 8; x < vw; x += 16) dx.fillRect(x * dpr, y * dpr, 1.6 * dpr, 1.6 * dpr);

      // ---- cursor paths ----
      const starts: [number, number][] = [[-40, vh * 0.78], [vw + 40, vh + 10], [vw + 40, vh * 0.2]];
      const exits: [number, number][] = [[-80, vh * 0.55], [vw + 70, vh + 70], [vw + 80, vh * 0.3]];
      const roamTip = (k: number): [number, number] | null => {
        const el = roams[k];
        if (!el || getComputedStyle(el).display === "none") return null;
        const svg = el.querySelector("svg");
        if (!svg) return null;
        const r = svg.getBoundingClientRect();
        const tip = TIP[CURSORS[k].dir];
        return [r.left + tip[0], r.top + tip[1]];
      };
      const cursorAt = (k: number, t: number): [number, number] => {
        const j = jobs.find((q) => q.cur === k);
        if (!j) {
          // nothing to drag: just cross the screen
          const e = io(seg(t, 0.05, END));
          return [lerp(starts[k][0], exits[k][0], e), lerp(starts[k][1], exits[k][1], e)];
        }
        // grab near the bottom edge so the name bubble hangs below the piece, not over it
        const gx = j.box.w * j.grab, gy = j.box.h / 2 - 4;
        const home: [number, number] = [j.box.x + j.box.w / 2 + gx, j.box.y + j.box.h / 2 + gy];
        const local = (e: number): [number, number] => {
          const r = lerp(j.rot, 0, e), s = lerp(0.9, 1, e);
          return [s * (gx * Math.cos(r) - gy * Math.sin(r)), s * (gx * Math.sin(r) + gy * Math.cos(r))];
        };
        const g0 = local(0);
        const from: [number, number] = [j.box.x + j.box.w / 2 + j.dx + g0[0], j.box.y + j.box.h / 2 + j.dy + g0[1]];
        if (t < j.a) {
          const e = io(seg(t, 0.05, j.a));
          return [lerp(starts[k][0], from[0], e), lerp(starts[k][1], from[1], e)];
        }
        if (t < j.b) {
          const e = io(seg(t, j.a, j.b)), g = local(e);
          return [j.box.x + j.box.w / 2 + lerp(j.dx, 0, e) + g[0], j.box.y + j.box.h / 2 + lerp(j.dy, 0, e) + g[1]];
        }
        const rest = (CURSORS[k].final && roamTip(k)) || exits[k];
        const e = io(seg(t, j.b + 0.05, END));
        return [lerp(home[0], rest[0], e), lerp(home[1], rest[1], e)];
      };

      // ---- clock and skipping ----
      let t = 0;
      let last = performance.now();
      const skip = () => {
        if (t < END - 0.3) t = END - 0.3;
      };
      const finish = () => {
        stopped = true;
        finished = true;
        cancelAnimationFrame(raf);
        removeListeners();
        restore();
      };
      const onResize = () => finish();
      const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
      events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
      window.addEventListener("resize", onResize);
      const removeListeners = () => {
        events.forEach((e) => window.removeEventListener(e, skip));
        window.removeEventListener("resize", onResize);
      };
      cleanupFns.push(removeListeners);

      const frame = (now: number) => {
        if (stopped) return;
        t += Math.min(0.05, (now - last) / 1000);
        last = now;
        if (t >= END) return finish();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const fin = io(seg(t, 2.25, END));
        const dotA = 0.16 * out(seg(t, 0, 0.35)) * (1 - fin);
        if (dotA > 0) {
          ctx.globalAlpha = dotA;
          ctx.drawImage(dots, 0, 0);
          ctx.globalAlpha = 1;
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (sky) sky.style.opacity = String(fin);

        // faint empty slots where the dragged pieces belong
        const slotA = 0.5 * out(seg(t, 0.1, 0.4)) * (1 - seg(t, 1.6, 1.95));
        if (slotA > 0) {
          ctx.save();
          ctx.globalAlpha = slotA;
          ctx.strokeStyle = ALERT;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 5]);
          jobs.forEach((j) => j.keys.forEach((k) => {
            const r = pieces[k].r;
            ctx.strokeRect(r.x, r.y, r.w, r.h);
          }));
          ctx.restore();
        }

        const bt = t * 2.6;
        ORDER.forEach((k, i) => {
          const p = pieces[k];
          const ink = io(seg(t, INK0 + i * stagger, INK0 + i * stagger + INK_DUR));
          // the live element: hidden, then dithered in
          const lv = Math.floor(ink * LEVELS + 1e-6);
          if (lv !== levels[i]) {
            levels[i] = lv;
            if (lv <= 0) p.el.style.removeProperty("opacity");
            else {
              p.el.style.opacity = "1";
              setMask(p.el, lv >= LEVELS ? null : masks[lv]);
            }
          }
          if (ink >= 1) return;
          const a = Math.pow(1 - ink, 2);
          const job = jobs.find((j) => j.keys.includes(k));
          ctx.save();
          if (job && t < job.b) {
            const e = io(seg(t, job.a, job.b));
            const cx = job.box.x + job.box.w / 2, cy = job.box.y + job.box.h / 2, s = lerp(0.9, 1, e);
            ctx.translate(cx + lerp(job.dx, 0, e), cy + lerp(job.dy, 0, e));
            ctx.rotate(lerp(job.rot, 0, e));
            ctx.scale(s, s);
            ctx.translate(-cx, -cy);
          }
          if (job) {
            ctx.globalAlpha = a;
            ctx.fillStyle = "rgba(255,255,255,.9)";
            ctx.fillRect(p.r.x, p.r.y, p.r.w, p.r.h);
            ctx.globalAlpha = 1;
          }
          drawPiece(ctx, p, out(seg(bt, p.t0, p.t1)), a, mono);
          ctx.restore();
        });

        // once everything is placed, the measurements check the layout
        const mt = (t - 1.55) * 2.4;
        const mA = 1 - seg(t, 2.15, 2.4);
        measures.forEach((m) => drawMeasure(ctx, m, mt, mA, mono));

        // selection box around whatever a cursor is dragging
        jobs.forEach((j) => {
          if (t <= j.a || t >= j.b + 0.1) return;
          const e = io(seg(t, j.a, j.b)), s = lerp(0.9, 1, e);
          ctx.save();
          ctx.translate(j.box.x + j.box.w / 2 + lerp(j.dx, 0, e), j.box.y + j.box.h / 2 + lerp(j.dy, 0, e));
          ctx.rotate(lerp(j.rot, 0, e));
          ctx.scale(s, s);
          ctx.strokeStyle = CURSORS[j.cur].color;
          ctx.lineWidth = 1.6;
          ctx.strokeRect(-j.box.w / 2, -j.box.h / 2, j.box.w, j.box.h);
          ctx.fillStyle = "#fff";
          for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
            const x = (sx * j.box.w) / 2, y = (sy * j.box.h) / 2;
            ctx.fillRect(x - 4, y - 4, 8, 8);
            ctx.strokeRect(x - 4, y - 4, 8, 8);
          }
          ctx.restore();
        });

        // cursors; Research and Polish swap into the hero's roaming labels
        CURSORS.forEach((c, k) => {
          const el = cursorRefs.current[k];
          if (!el) return;
          const [x, y] = cursorAt(k, t);
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          if (c.final) {
            const sw = seg(t, 2.45, 2.75);
            const f = firstRefs.current[k], g = finalRefs.current[k];
            if (f) f.style.opacity = String(1 - sw);
            if (g) g.style.opacity = String(sw);
          }
        });

        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame((now) => {
        last = now;
        frame(now);
      });
    };

    const cleanupFns: (() => void)[] = [];
    start();
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      cleanupFns.forEach((f) => f());
      if (!finished) resumeUntil = performance.now() + 200;
      restore();
    };
  }, []);

  return (
    <div className="home-intro" aria-hidden>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60] h-screen w-screen" />
      {CURSORS.map((c, k) => (
        <div
          key={c.label}
          ref={(el) => {
            cursorRefs.current[k] = el;
          }}
          className="pointer-events-none fixed left-0 top-0 z-[61] will-change-transform"
          style={{ transform: "translate3d(-200px, -200px, 0)" }}
        >
          <div className="absolute" style={{ left: -TIP[c.dir][0], top: -TIP[c.dir][1] }}>
            <CursorArrow dir={c.dir} />
          </div>
          {[c.label, c.final].map((label, i) =>
            label ? (
              <span
                key={i}
                ref={(el) => {
                  (i === 0 ? firstRefs : finalRefs).current[k] = el;
                }}
                className={`absolute whitespace-nowrap rounded-xl border px-3 py-2 font-sans text-sm font-medium shadow-soft ${c.bubble}`}
                style={{ top: 21.76, opacity: i === 0 ? 1 : 0, ...(c.dir === "ne" ? { right: 3.59 } : { left: 3.59 }) }}
              >
                {label}
              </span>
            ) : null
          )}
        </div>
      ))}
      <button
        type="button"
        tabIndex={-1}
        className="fixed bottom-5 right-5 z-[62] rounded-full bg-ink/75 px-4 py-2 font-sans text-xs font-medium text-white backdrop-blur"
      >
        Skip intro
      </button>
    </div>
  );
}
