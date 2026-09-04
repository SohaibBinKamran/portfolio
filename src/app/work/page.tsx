import type { Metadata } from "next";
import { WorkHeader } from "@/components/work/WorkHeader";
import { WorkGallery } from "@/components/work/WorkGallery";

export const metadata: Metadata = {
  title: "Work | Sohaib Bin Kamran",
  description:
    "Case studies covering my design process from user research and prototyping to final delivery and measurable impact.",
};

export default function WorkPage() {
  return (
    <div data-work-scope className="-mt-12 bg-bg-cream">
      <WorkHeader />
      <WorkGallery />
    </div>
  );
}
