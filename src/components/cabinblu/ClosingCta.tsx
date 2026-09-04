import Image from "next/image";
import Link from "next/link";
import { closingCta } from "@/data/cabinblu";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[#121212] px-6 py-32 text-center">
      <Image
        src="/images/cabinblu-cta-eclipse.png"
        alt=""
        width={759}
        height={656}
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-0 h-full w-auto object-cover opacity-[0.14] mix-blend-lighten"
      />
      <div className="relative mx-auto flex max-w-[720px] flex-col items-center gap-9">
        <h2 className="!font-[family-name:var(--font-instrument-serif)] text-[34px] !font-normal leading-[1.28] !tracking-normal !text-white sm:text-[46px]">
          {closingCta.heading}
        </h2>
        <Link
          href="/contact"
          className="rounded-[16px] bg-white px-9 py-3.5 text-[16px] font-medium text-[#050505] [box-shadow:var(--shadow-pill)] transition-transform hover:scale-[1.03]"
        >
          {closingCta.cta}
        </Link>
      </div>
    </section>
  );
}
