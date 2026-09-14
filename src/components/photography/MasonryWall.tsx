"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lightbox } from "@/components/photography/Lightbox";
import { photography, type Photo } from "@/data/photography";

const aspectClass: Record<Photo["aspect"], string> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

export function MasonryWall() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : photography[activeIndex];

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {photography.map((photo, i) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            // The whole card scales up on hover (not just the image inside
            // it), so it visibly grows past its own grid cell and overlaps
            // its neighbours — `hover:z-20` lifts it above them while that
            // happens, `hover:shadow-2xl` sells the pop-out as depth rather
            // than a layout glitch. No `overflow-hidden` here: that would
            // clip the very growth this is supposed to show.
            className={`relative z-0 mb-3 block w-full cursor-zoom-in rounded-[10px] transition-transform duration-300 ease-out hover:z-20 hover:scale-[1.35] hover:shadow-[0_30px_50px_-20px_rgba(0,0,0,0.35)] ${aspectClass[photo.aspect]}`}
            aria-label={`Open ${photo.location}`}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[10px] ring-1 ring-inset ring-black/5">
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.location}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: photo.swatch ?? "linear-gradient(160deg,#37485b,#8ea6b8)", backgroundSize: "cover" }}
                />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        photo={active}
        onClose={() => setActiveIndex(null)}
        onPrev={() =>
          setActiveIndex((i) => (i === null ? null : (i - 1 + photography.length) % photography.length))
        }
        onNext={() =>
          setActiveIndex((i) => (i === null ? null : (i + 1) % photography.length))
        }
      />
    </>
  );
}
