import { PillButton } from "@/components/ui/PillButton";
import { closingCta } from "@/data/home";

export function ClosingCta() {
  return (
    <section className="flex flex-col items-center gap-10 bg-bg-dark px-6 py-32 text-center text-white">
      <h2 className="max-w-xl text-3xl md:text-4xl">{closingCta.heading}</h2>
      <PillButton href="/contact" variant="light">
        {closingCta.cta}
      </PillButton>
    </section>
  );
}
