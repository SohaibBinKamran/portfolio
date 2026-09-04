import Image from "next/image";
import { meta } from "@/data/cinefatic";

export function Header() {
  return (
    <header className="relative -mt-14 flex min-h-[600px] items-center overflow-hidden px-6 pt-[132px] pb-16">
      <Image
        src="/images/cinefatic/header-bg.png"
        alt=""
        fill
        priority
        aria-hidden
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,4,8,0.92)_0%,rgba(15,4,8,0.72)_45%,rgba(15,4,8,0.42)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,var(--cf-bg))]"
      />
      <div className="relative mx-auto w-full max-w-[1140px]">
        <p className="cf-eyebrow">{meta.eyebrow}</p>
        <h1 className="cf-display mt-5 text-[64px] text-[var(--cf-heading)] sm:text-[92px] md:text-[124px]">
          {meta.title[0]}
          <br />
          {meta.title[1]}
        </h1>
        <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.5] text-[#efe0c6] sm:text-[22px]">
          {meta.intro}
        </p>
      </div>
    </header>
  );
}
