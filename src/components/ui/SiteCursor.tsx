"use client";

import { useEffect, useRef, useState } from "react";
import { CursorArrow } from "@/components/ui/CursorArrow";

type CursorState = { x: number; y: number; visible: boolean; note: string | null };

/**
 * Site-wide custom pointer. On fine pointers (≥ md) the system cursor is hidden
 * — via the `has-custom-cursor` class this adds to <html>, which `globals.css`
 * keys off — and this hand-drawn cursor (the same shape as the Home hero's
 * roaming annotations) follows the mouse on every page, trailing a handwritten
 * caption whenever the pointer is over a `[data-hover-note]` element.
 * rAF-throttled; no-ops for coarse pointers.
 */
export function SiteCursor() {
  const [s, setS] = useState<CursorState>({ x: 0, y: 0, visible: false, note: null });
  const frame = useRef<number | null>(null);
  const next = useRef<CursorState>(s);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const flush = () => {
      frame.current = null;
      setS(next.current);
    };
    const schedule = () => {
      if (frame.current == null) frame.current = requestAnimationFrame(flush);
    };

    const onMove = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const noteEl = el?.closest<HTMLElement>("[data-hover-note]");
      next.current = {
        x: e.clientX,
        y: e.clientY,
        visible: true,
        note: noteEl?.dataset.hoverNote ?? null,
      };
      schedule();
    };

    const onLeave = () => {
      next.current = { ...next.current, visible: false, note: null };
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-custom-cursor");
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden flex-col items-start transition-opacity duration-200 md:flex ${
        s.visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: `translate3d(${s.x - 4}px, ${s.y - 2}px, 0)` }}
    >
      <CursorArrow dir="nw" />
      <span
        className={`ml-3 -mt-0.5 whitespace-nowrap rounded-xl border border-ink/15 bg-white/95 px-3 py-1.5 font-hand text-[13px] leading-none text-ink shadow-soft backdrop-blur-sm transition-all duration-200 ${
          s.note ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
        }`}
      >
        {s.note ?? ""}
      </span>
    </div>
  );
}
