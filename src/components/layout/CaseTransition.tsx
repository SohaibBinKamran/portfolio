"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Card to case study transition, prototyped in Loader Lab (#2 affinity notes +
 * #5 orb). Mounted once in the root layout so it survives the route change.
 *
 *  1. Clicking a project card ripples, and the page washes to the project's colour.
 *  2. First case study of the visit: research notes fly out of the card and
 *     cluster into themes, then synthesise into dots. Later ones: the card's
 *     image itself peels into dots.
 *  3. The dots wrap into an orb, which is the loading state. It holds until the
 *     case study has rendered and its hero image has loaded.
 *  4. The orb bursts and the dots land on the hero image, then the real page
 *     shows through.
 *
 * Skipped for reduced motion, modified clicks and back/forward navigation. Any
 * click while it plays skips ahead to the landing.
 */

type Rect = { x: number; y: number; w: number; h: number };
type RGB = [number, number, number];
type Theme = { bg: string; ink: string };

const SEEN_KEY = "sbk-case-seen";

const TITLES: Record<string, string> = {
  cabinblu: "CabinBlu",
  classquest: "ClassQuest",
  cinefatic: "Cinefatic",
  wanderlens: "WanderLens",
  openseat: "OpenSeat",
  xoopah: "Xoopah",
  knoccs: "KNOCCS",
  arrivals: "Arrivals Board",
};

const THEMES: Record<string, Theme> = {
  cabinblu: { bg: "#10356c", ink: "#ffffff" },
  classquest: { bg: "#c9d8fb", ink: "#0d2a73" },
  cinefatic: { bg: "#2b1a22", ink: "#f6ead6" },
};

/** Real findings, three themes per project; only these get the first-visit notes beat. */
const NOTES: Record<string, { labels: string[]; colors: string[]; words: string[][] }> = {
  cabinblu: {
    labels: ["Triggers", "Coping", "Needs"],
    colors: ["#f4b942", "#bcd3ff", "#ffffff"],
    words: [
      ["peaks before Day 0", "booking for days", "check in", "trust gap"],
      ["aisle seat", "pack everything", '"just in case"', "control"],
      ["near zero effort", "less generic", "more inclusive", "calm on the day"],
    ],
  },
  classquest: {
    labels: ["Channels", "AI trust", "Contributing"],
    colors: ["#ffffff", "#9db8ff", "#ffe27a"],
    words: [
      ["WhatsApp", "Telegram", "graveyard of tabs", "11 of 18"],
      ["18 of 18 used AI", "none trusted it", "show citations", "skeptical"],
      ["low friction", "upload was hidden", '"Explore Demo" misled', "gamify lightly"],
    ],
  },
  cinefatic: {
    labels: ["Pains", "Wants", "Bets"],
    colors: ["#e13a63", "#f6ead6", "#e2a84c"],
    words: [
      ["calling ahead", "queueing", "no central hub", "broken flow"],
      ["pick my seat", "snacks too", "every cinema", "guest checkout"],
      ["under 2 min", "90% faster", "one app", "trust first"],
    ],
  },
};

const PURPLE = "#5e45ff";
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const io = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const out = (t: number) => 1 - Math.pow(1 - t, 3);
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;

/** sample an image into a w x h grid with object-fit: cover against `box` */
function sample(img: HTMLImageElement | null, box: Rect, w: number, h: number): { d: Uint8ClampedArray } {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d", { willReadFrequently: true })!;
  x.fillStyle = "#777";
  x.fillRect(0, 0, w, h);
  try {
    if (img && img.complete && img.naturalWidth) {
      const ia = img.naturalWidth / img.naturalHeight, ba = box.w / box.h;
      let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
      if (ia > ba) {
        sw = sh * ba;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = sw / ba;
        sy = (img.naturalHeight - sh) / 2;
      }
      x.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
    return { d: x.getImageData(0, 0, w, h).data };
  } catch {
    return { d: new Uint8ClampedArray(w * h * 4).fill(120) };
  }
}

function themeFrom(slug: string, d: Uint8ClampedArray): Theme {
  if (THEMES[slug]) return THEMES[slug];
  let r = 0, g = 0, b = 0;
  const n = d.length / 4;
  for (let i = 0; i < d.length; i += 4) {
    r += d[i];
    g += d[i + 1];
    b += d[i + 2];
  }
  r /= n; g /= n; b /= n;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum > 165) {
    const m = (v: number) => Math.round(lerp(v, 255, 0.55));
    return { bg: `rgb(${m(r)},${m(g)},${m(b)})`, ink: "#0d0d0d" };
  }
  const m = (v: number) => Math.round(v * 0.3);
  return { bg: `rgb(${m(r)},${m(g)},${m(b)})`, ink: "#ffffff" };
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const lines: string[] = [];
  let line = "";
  for (const w of text.split(" ")) {
    const n = line ? line + " " + w : w;
    if (ctx.measureText(n).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = n;
  }
  if (line) lines.push(line);
  return lines;
}

/** the case study's hero: the largest image showing near the top, else a centred stand-in */
function findTarget(vw: number, vh: number): { r: Rect; img: HTMLImageElement | null; real: boolean } {
  let best: HTMLImageElement | null = null;
  let area = 0;
  document.querySelectorAll<HTMLImageElement>("main img").forEach((im) => {
    const b = im.getBoundingClientRect();
    const vis = Math.max(0, Math.min(b.right, vw) - Math.max(b.left, 0)) * Math.max(0, Math.min(b.bottom, vh) - Math.max(b.top, 0));
    if (vis > area && b.width > vw * 0.25 && b.height > vh * 0.15) {
      area = vis;
      best = im;
    }
  });
  if (best && area > vw * vh * 0.12) {
    const b = (best as HTMLImageElement).getBoundingClientRect();
    return { r: { x: b.left, y: b.top, w: b.width, h: b.height }, img: best, real: true };
  }
  const w = Math.min(vw - 32, 1000), h = w * 0.5;
  return { r: { x: (vw - w) / 2, y: Math.max(70, (vh - h) / 2), w, h }, img: null, real: false };
}

export function CaseTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef(pathname);
  const busy = useRef(false);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (busy.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduce.matches) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.origin !== location.origin) return;
      const m = a.pathname.match(/^\/work\/([^/]+)\/?$/);
      if (!m || !TITLES[m[1]]) return;
      e.preventDefault();
      e.stopPropagation();
      run(a, m[1], e.clientX, e.clientY);
    };

    const run = (a: HTMLAnchorElement, slug: string, cx: number, cy: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return router.push(a.getAttribute("href")!);
      busy.current = true;
      const vw = window.innerWidth, vh = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      const ctx = canvas.getContext("2d")!;
      const root = getComputedStyle(document.documentElement);
      const fam = (v: string, fb: string) => root.getPropertyValue(v).trim() || fb;
      const hand = fam("--font-gloria", "cursive"), serif = fam("--font-instrument-serif", "serif"), mono = fam("--font-cabinblu-mono", "monospace");

      // ---- the clicked card ----
      const img = a.querySelector("img");
      const ar = a.getBoundingClientRect();
      const ib = img ? img.getBoundingClientRect() : ar;
      const ir: Rect = { x: ib.left, y: ib.top, w: ib.width, h: ib.height };
      // a finer grid than the prototype: more, smaller specks read as dust
      const GW = 92, GH = Math.round(clamp(GW * (ir.h / ir.w), 28, 70));
      const { d: px } = sample(img, ir, GW, GH);
      const theme = themeFrom(slug, px);
      const title = TITLES[slug];
      const notesDef = NOTES[slug];
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      const later = seen || !notesDef;
      const orbAt = later ? 0.6 : 1.75;
      const minL = later ? orbAt + 0.15 : orbAt + 0.35;
      const bgA = later ? [0.15, 0.5] : [0.25, 0.65];
      const pushAt = bgA[1] + 0.05;

      // ---- notes (first visit only) ----
      const narrow = vw < 640;
      const ns = clamp(vw / 900, 0.85, 1.5);
      const clusters: [number, number][] = narrow
        ? [[vw * 0.5, vh * 0.27], [vw * 0.5, vh * 0.5], [vw * 0.5, vh * 0.73]]
        : [[vw * 0.23, vh * 0.5], [vw * 0.5, vh * 0.5], [vw * 0.77, vh * 0.5]];
      const rand = rng(slug.length * 31 + 7);
      type Note = { word: string; ci: number; color: string; from: [number, number]; scatter: [number, number]; rot: number; crot: number; cluster: [number, number]; d: number };
      const notes: Note[] = [];
      if (notesDef && !later) {
        notesDef.words.forEach((list, ci) =>
          list.forEach((word, i) => {
            notes.push({
              word, ci, color: notesDef.colors[ci],
              from: [ir.x + 30 + rand() * Math.max(1, ir.w - 60), ir.y + 30 + rand() * Math.max(1, ir.h - 60)],
              scatter: [vw * (0.12 + rand() * 0.76), vh * (0.12 + rand() * 0.72)],
              rot: (rand() - 0.5) * 0.6, crot: (rand() - 0.5) * 0.08,
              cluster: [clusters[ci][0] + ((i % 2) - 0.5) * 80 * ns, clusters[ci][1] + (Math.floor(i / 2) - 0.5) * 64 * ns * (narrow ? 0.8 : 1)],
              d: rand() * 0.18,
            });
          })
        );
      }

      // ---- particles: the card image wrapped round a globe ----
      type Part = { u: number; v: number; sx: number; sy: number; sz: number; ni: number; ox: number; oy: number; img: RGB; note: RGB; d: number; k: number; a: number; ph: number };
      const parts: Part[] = [];
      const pr = rng(40 + slug.length);
      for (let i = 0; i < GW * GH; i++) {
        const gx = i % GW, gy = Math.floor(i / GW), u = (gx + 0.5) / GW, v = (gy + 0.5) / GH;
        const o = i * 4;
        const lat = (v - 0.5) * Math.PI * 0.92, lon = u * Math.PI * 2;
        const ni = notes.length ? Math.floor(pr() * notes.length) : 0;
        parts.push({
          u, v, sx: Math.cos(lat) * Math.cos(lon), sy: Math.sin(lat), sz: Math.cos(lat) * Math.sin(lon), ni,
          ox: (pr() - 0.5) * 66 * ns, oy: (pr() - 0.5) * 50 * ns,
          img: [px[o], px[o + 1], px[o + 2]],
          note: notes.length ? hex(notes[ni].color) : [px[o], px[o + 1], px[o + 2]],
          d: pr() * 0.25,
          k: 0.55 + pr() * 0.9, // speck size varies, like dust
          a: 0.55 + pr() * 0.45,
          ph: pr() * Math.PI * 2,
        });
      }
      // loose specks drifting round the orb while it loads
      const halo = Array.from({ length: 360 }, () => {
        const th = pr() * Math.PI * 2, ph = Math.acos(2 * pr() - 1), rr = 1.08 + Math.pow(pr(), 2) * 0.55;
        return { x: Math.sin(ph) * Math.cos(th) * rr, y: Math.cos(ph) * rr, z: Math.sin(ph) * Math.sin(th) * rr, k: 0.4 + pr() * 0.8, sp: 0.3 + pr() * 0.5 };
      });
      const TAU = Math.PI * 2;
      const lighter = theme.ink.toLowerCase() === "#ffffff" || theme.ink.toLowerCase() === "#f6ead6";

      // ---- clock ----
      document.body.style.overflow = "hidden";
      canvas.style.display = "block";
      let t = 0, last = performance.now(), L: number | null = null, pushed = false, raf = 0, finished = false;
      let target = { r: { x: vw * 0.15, y: vh * 0.3, w: vw * 0.7, h: vw * 0.35 } as Rect, real: false };
      let skipped = false;
      const skip = () => {
        // jump to the orb, navigate now, and land as soon as the page is ready
        skipped = true;
        doPush();
      };
      const doPush = () => {
        if (pushed) return;
        pushed = true;
        router.push(a.getAttribute("href")!);
      };
      canvas.onclick = skip;

      const cleanup = () => {
        if (finished) return;
        finished = true;
        cancelAnimationFrame(raf);
        canvas.style.display = "none";
        canvas.onclick = null;
        document.body.style.overflow = "";
        busy.current = false;
      };

      const norm = (p: string) => p.replace(/\/+$/, "");
      const target_path = norm(a.pathname);

      const frame = (now: number) => {
        if (finished) return;
        t += Math.min(0.05, (now - last) / 1000);
        last = now;
        if (skipped && t < orbAt + 0.2) t = orbAt + 0.2;
        if (!pushed && t >= pushAt) doPush();

        // page ready? then the orb lets go
        if (L === null && pushed && t >= (skipped ? orbAt + 0.2 : minL)) {
          if (norm(pathRef.current) === target_path) {
            const found = findTarget(vw, vh);
            if (found.real ? !!found.img && found.img.complete && found.img.naturalWidth > 0 : t > minL + 0.6) {
              target = found;
              L = t;
            } else if (t > minL + 5) {
              target = found;
              L = t;
            }
          } else if (t > minL + 8) {
            L = t; // navigation never completed: land on the stand-in
          }
        }
        if (L !== null) {
          const f = findTarget(vw, vh);
          if (f.real) target = f;
        }
        const Lt = L ?? Infinity;
        const land = L === null ? Infinity : L + (later ? 0.5 : 0.6);
        const done = L === null ? 0 : seg(t, land - 0.05, land + 0.25);
        if (L !== null && t > land + 0.35) return cleanup();

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, vw, vh);
        const bgIn = io(seg(t, bgA[0], bgA[1]));

        // ripple at the click
        const rp = seg(t, 0, 0.45);
        if (rp > 0 && rp < 1) {
          ctx.save();
          ctx.strokeStyle = PURPLE;
          ctx.globalAlpha = 1 - rp;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 6 + rp * 60, 0, 7);
          ctx.stroke();
          ctx.restore();
        }

        // colour wash, with a dot grid that clears when the orb lets go
        ctx.save();
        ctx.globalAlpha = bgIn * (1 - done);
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, vw, vh);
        ctx.restore();
        if (bgIn > 0) {
          ctx.save();
          ctx.globalAlpha = 0.14 * bgIn * (1 - seg(t, Lt, Lt + 0.5)) * (1 - done);
          ctx.fillStyle = theme.ink;
          for (let y = 8; y < vh; y += 16) for (let x = 8; x < vw; x += 16) ctx.fillRect(x, y, 1.4, 1.4);
          ctx.restore();
        }

        // notes fly out and cluster
        const toDots = later ? 1 : seg(t, 1.25, 1.75);
        if (!later && toDots < 1) {
          const la = seg(t, 0.9, 1.2) * (1 - seg(t, 1.25, 1.5));
          if (la > 0 && notesDef) {
            ctx.save();
            ctx.globalAlpha = la;
            ctx.fillStyle = theme.ink;
            ctx.font = `400 ${Math.round(18 * ns)}px ${hand}`;
            ctx.textAlign = "center";
            clusters.forEach((p, i) => ctx.fillText(notesDef.labels[i], p[0], p[1] - 80 * ns * (narrow ? 0.7 : 1)));
            ctx.restore();
          }
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          for (const n of notes) {
            const fly = out(seg(t, 0.15 + n.d, 0.6 + n.d)), cl = io(seg(t, 0.7 + n.d * 0.5, 1.2 + n.d * 0.5));
            const x = lerp(lerp(n.from[0], n.scatter[0], fly), n.cluster[0], cl), y = lerp(lerp(n.from[1], n.scatter[1], fly), n.cluster[1], cl);
            const rot = lerp(n.rot * fly, n.crot, cl), s = lerp(0.4, 1, out(seg(t, 0.15 + n.d, 0.45 + n.d))) * ns;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.scale(s, s);
            ctx.globalAlpha = (1 - toDots) * bgIn;
            ctx.fillStyle = "rgba(0,0,0,.18)";
            ctx.fillRect(-35 + 1.5, -27 + 2.5, 70, 54);
            ctx.fillStyle = n.color;
            ctx.fillRect(-35, -27, 70, 54);
            ctx.fillStyle = "#0d0d0d";
            ctx.font = `400 8.5px ${hand}`;
            const ls = wrapText(ctx, n.word, 60);
            ls.forEach((l, q) => ctx.fillText(l, 0, (q - (ls.length - 1) / 2) * 12));
            ctx.restore();
          }
        }

        // dots: card (or notes) to orb, then onto the hero
        const show = later ? seg(t, 0.12, 0.2) : seg(t, 1.2, 1.3);
        if (show > 0 && done < 1) {
          const rot = t * 0.9, cr = Math.cos(rot), sr = Math.sin(rot), tl = -0.3, ct = Math.cos(tl), stl = Math.sin(tl);
          const base = clamp(Math.min(vw, vh) * 0.2, 90, 170);
          const OR = (later ? base * 0.8 : base) + Math.sin(t * 2.4) * 5, OX = vw / 2, OY = vh * 0.47;
          const tr = target.r, cell = tr.w / GW;
          // on dark washes the specks add up like light; on light ones they stay matte
          if (lighter) ctx.globalCompositeOperation = "lighter";
          const haloA = seg(t, orbAt - 0.2, orbAt + 0.3) * (1 - seg(t, Lt, Lt + 0.3)) * show;
          if (haloA > 0) {
            ctx.fillStyle = theme.ink;
            for (const h of halo) {
              const a = t * h.sp, ca = Math.cos(a), sa = Math.sin(a);
              const x = h.x * ca - h.z * sa, z = h.x * sa + h.z * ca;
              ctx.globalAlpha = haloA * (0.15 + 0.35 * ((z + 1.6) / 3.2));
              ctx.beginPath();
              ctx.arc(OX + x * OR, OY + h.y * OR, h.k, 0, TAU);
              ctx.fill();
            }
          }
          for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            const x = p.sx * cr - p.sz * sr;
            let z = p.sx * sr + p.sz * cr;
            const y = p.sy * ct - z * stl;
            z = p.sy * stl + z * ct;
            const depth = (z + 1.4) / 2.4;
            if (depth < 0.42 && t < Lt) continue;
            const ox = OX + x * OR, oy = OY + y * OR;
            let sx0: number, sy0: number, col0: RGB;
            if (later) {
              sx0 = ir.x + p.u * ir.w;
              sy0 = ir.y + p.v * ir.h;
              col0 = p.img;
            } else {
              const n = notes[p.ni];
              sx0 = n.cluster[0] + p.ox;
              sy0 = n.cluster[1] + p.oy;
              col0 = p.note;
            }
            const inP = later ? io(clamp((t - 0.15 - p.d * 0.6) / 0.45)) : io(clamp((t - 1.25 - p.d) / 0.5));
            const outP = io(clamp((t - Lt - p.d * 0.7) / 0.5));
            const lx = tr.x + p.u * tr.w, ly = tr.y + p.v * tr.h;
            let qx = lerp(sx0, ox, inP), qy = lerp(sy0, oy, inP);
            qx = lerp(qx, lx, outP) + Math.pow(Math.sin(outP * Math.PI), 3) * 60 * Math.cos(i);
            qy = lerp(qy, ly, outP) + Math.pow(Math.sin(outP * Math.PI), 3) * 60 * Math.sin(i * 1.3);
            const cmix = clamp(inP * 1.2);
            const c = [0, 1, 2].map((q) => Math.round(lerp(col0[q], p.img[q], cmix)));
            const lit = lerp(1, 0.45 + 0.75 * depth, inP * (1 - outP));
            const glow = 55 * inP * (1 - outP);
            ctx.fillStyle = `rgb(${Math.min(255, c[0] * lit + glow)},${Math.min(255, c[1] * lit + glow)},${Math.min(255, c[2] * lit + glow * 1.2)})`;
            ctx.globalAlpha = show * (1 - done * 0.999) * lerp(1, p.a, inP * (1 - outP * 0.6));
            // diameter: a halftone dot on the card, fine dust on the orb, a halftone dot again on landing
            const d = lerp(lerp(later ? Math.min(3, ((cell * ir.w) / tr.w) * 0.55) : 2, 0.6 + depth * 1.2, inP), Math.min(5, cell * 0.4), outP) * p.k;
            // a little shimmer while it floats
            const sh = 0.9 * inP * (1 - outP);
            const fx = qx + Math.sin(t * 3.1 + p.ph) * sh, fy = qy + Math.cos(t * 2.7 + p.ph) * sh;
            if (d < 1.3) ctx.fillRect(fx - d / 2, fy - d / 2, d, d);
            else {
              ctx.beginPath();
              ctx.arc(fx, fy, d / 2, 0, TAU);
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = "source-over";
          // loading readout under the orb
          const la = seg(t, orbAt - 0.1, orbAt + 0.1) * (1 - seg(t, Lt, Lt + 0.15));
          if (la > 0) {
            const pct = L === null ? Math.min(96, Math.round(lerp(30, 90, seg(t, orbAt, minL + 1)))) : 100;
            ctx.save();
            ctx.globalAlpha = la;
            ctx.fillStyle = theme.ink;
            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";
            ctx.font = `400 22px ${serif}`;
            ctx.fillText(`Opening ${title}`, OX, OY + OR + 52);
            ctx.font = `400 10px ${mono}`;
            ctx.globalAlpha = la * 0.7;
            ctx.fillText(`${pct}%`, OX, OY + OR + 74);
            ctx.restore();
          }
        }

        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame((now) => {
        last = now;
        frame(now);
      });
      // a failsafe so a visitor is never stuck behind the overlay
      setTimeout(() => {
        if (!finished) {
          cleanup();
          if (!pushed) router.push(a.getAttribute("href")!);
        }
      }, 15000);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-[80] h-screen w-screen"
      style={{ display: "none" }}
    />
  );
}
