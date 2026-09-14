"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/data/photography";

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={dir === "left" ? "15 6 9 12 15 18" : "9 6 15 12 9 18"} />
    </svg>
  );
}

// Most real frames are portrait (phone shots) — forcing every photo into a
// landscape 3:2 box would crop a lot off the top and bottom. Frame shape
// follows the photo's own aspect instead, same buckets as the grid.
const aspectClass: Record<Photo["aspect"], string> = {
  landscape: "aspect-[3/2]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

export function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [photo, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-6"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white md:left-8"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white md:right-8"
          >
            <ChevronIcon dir="right" />
          </button>

          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            {/* The "film" frame: a black mount around the image, with the
                roll printed bottom-left and the location bottom-right, like
                a contact-sheet stamp. */}
            <div className="rounded-[6px] bg-[#0a0a0a] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] md:p-4">
              <div className={`relative w-full max-h-[78vh] overflow-hidden rounded-[2px] ${aspectClass[photo.aspect]}`}>
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.location}
                    fill
                    sizes="(max-width: 1024px) 90vw, 56rem"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: photo.swatch ?? "linear-gradient(160deg,#37485b,#8ea6b8)", backgroundSize: "cover" }}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_20px_rgba(0,0,0,0.35)]" />
              </div>
              <div className="flex items-center justify-between px-1 pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                  {photo.roll}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                  {photo.location}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
