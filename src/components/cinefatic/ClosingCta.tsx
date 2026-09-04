import Link from "next/link";
import { closingCta } from "@/data/cinefatic";

export function ClosingCta() {
  return (
    <section className="bg-[#121212] px-6 py-28 text-center">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-9">
        <h2 className="!font-serif text-[32px] font-normal leading-[1.3] !text-white sm:text-[46px]">
          {closingCta.heading[0]}
          <br className="hidden sm:block" /> {closingCta.heading[1]}
        </h2>
        <Link
          href="/contact"
          className="rounded-[16px] bg-white px-9 py-3.5 font-sans text-[16px] font-medium text-[#050505] [box-shadow:var(--shadow-pill)] transition-transform hover:scale-[1.03]"
        >
          {closingCta.cta}
        </Link>
      </div>
    </section>
  );
}
