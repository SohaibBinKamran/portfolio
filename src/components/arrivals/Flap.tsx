"use client";

import { useEffect, useRef, useState } from "react";

type Cell = { c: string; tick: number };
type Anim = { text: string; cells: Cell[] };

/**
 * Split flap text. Renders the final text on the server (so it is readable
 * without JS), then, once scrolled into view, cascades each digit through
 * random values left to right before landing. Respects reduced motion.
 */
export function Flap({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [anim, setAnim] = useState<Anim | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: ReturnType<typeof setInterval>[] = [];
    const run = () => {
      setAnim({ text, cells: text.split("").map((c) => ({ c, tick: 0 })) });
      text.split("").forEach((ch, i) => {
        if (!/\d/.test(ch)) return;
        let t = 0;
        const max = 7 + i;
        const iv = setInterval(() => {
          t += 1;
          setAnim((prev) =>
            prev && prev.text === text
              ? {
                  text,
                  cells: prev.cells.map((p, j) =>
                    j === i
                      ? { c: t >= max ? ch : String(Math.floor(Math.random() * 10)), tick: p.tick + 1 }
                      : p,
                  ),
                }
              : prev,
          );
          if (t >= max) clearInterval(iv);
        }, 45);
        timers.push(iv);
      });
    };

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearInterval);
    };
  }, [text]);

  const cells: Cell[] =
    anim && anim.text === text ? anim.cells : text.split("").map((c) => ({ c, tick: 0 }));

  return (
    <span ref={ref} className={`ar-flaps ${className}`} style={style} aria-label={text} role="img">
      {cells.map((p, i) => (
        <span
          key={`${i}-${p.tick}`}
          aria-hidden
          className={`ar-flap${p.tick ? " is-tick" : ""}${/[0-9A-Za-z]/.test(text[i] ?? "") ? "" : " is-sep"}`}
        >
          {p.c}
        </span>
      ))}
    </span>
  );
}
