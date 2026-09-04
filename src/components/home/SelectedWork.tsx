"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { selectedWork } from "@/data/home";

export function SelectedWork() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-5 flex justify-center">
        <SectionLabel>Selected Work</SectionLabel>
      </div>
      <h2 className="mx-auto mb-16 max-w-3xl text-center text-3xl md:text-[44px] md:leading-[1.15]">
        A glimpse into my design journey— projects that makes me proud
      </h2>

      <div className="flex flex-col gap-10">
        {selectedWork.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/work/${project.slug}`}
              className="group block rounded-[20px] bg-bg-dark p-5 shadow-soft transition-transform hover:scale-[1.005] md:p-6"
            >
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/60 px-3 py-1 font-sans text-xs font-medium text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-6 max-w-4xl font-serif text-2xl leading-tight text-white md:text-[40px] md:leading-[1.15]">
                {project.title} - {project.blurb}
              </h3>
              <div className="relative aspect-[1144/576] w-full overflow-hidden rounded-[13px] bg-bg-dark-alt">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
