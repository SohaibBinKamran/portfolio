import { projects } from "@/data/work";
import { WorkCard } from "@/components/work/WorkCard";

/**
 * Work index gallery — Figma node 912:5677.
 * Two-column grid of project cards: collage cover on a warm `#f0eeeb` panel
 * inside a soft-shadowed rounded frame, serif title beneath. Hover behaviour
 * lives in {@link WorkCard}.
 */
export function WorkGallery() {
  return (
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-x-9 gap-y-9 px-6 pb-28 pt-20 md:grid-cols-2">
      {projects.map((project) => (
        <WorkCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
