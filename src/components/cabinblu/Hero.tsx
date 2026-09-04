import Image from "next/image";
import { hero } from "@/data/cabinblu";
import { HeroPlane } from "./HeroPlane";

export function Hero() {
  const { boardingPass: bp } = hero;

  const boardingPassAlt = [
    `Lufthansa boarding pass styled case-study card.`,
    `${bp.fields.map((f) => `${f.label}: ${f.value}`).join(", ")}.`,
    `${bp.fromLabel} to ${bp.toLabel}. ${bp.seatLabel}: ${bp.seatValue}. ${bp.classLabel}.`,
    `${bp.footerLeft} ${bp.footerRight}`,
  ].join(" ");

  return (
    <section
      className="relative -mt-14 flex flex-col items-center gap-[70px] overflow-hidden pt-[132px] pb-0 md:gap-[110px] md:pt-[150px]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgb(10,37,87) 0%, rgb(18,58,133) 38%, rgb(54,103,196) 72%, rgb(111,160,230) 100%)",
      }}
    >
      <Image
        src="/images/cabinblu-hero-cloud-1.svg"
        alt=""
        width={54}
        height={36}
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[150px] opacity-70"
      />
      <Image
        src="/images/cabinblu-hero-cloud-2.svg"
        alt=""
        width={70}
        height={47}
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-[430px] opacity-60"
      />
      <Image
        src="/images/cabinblu-hero-cloud-3.svg"
        alt=""
        width={40}
        height={27}
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[700px] opacity-60"
      />
      <span aria-hidden className="pointer-events-none absolute left-[22%] top-[110px] text-[15px] text-[#f4b942] opacity-50 drop-shadow-[0_0_3px_rgba(244,185,66,0.5)]">✦</span>
      <span aria-hidden className="pointer-events-none absolute right-[30%] top-[225px] text-[10px] text-[#f4b942] opacity-50 drop-shadow-[0_0_3px_rgba(244,185,66,0.5)]">✧</span>
      <span aria-hidden className="pointer-events-none absolute right-[12%] top-[90px] text-[9px] text-[#f4b942] opacity-50 drop-shadow-[0_0_3px_rgba(244,185,66,0.5)]">✧</span>

      <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-start gap-[14px] px-8">
        <Image
          src="/images/cabinblu-hero-logos.png"
          alt="Eurowings Digital × Lufthansa Innovation Hub"
          width={130}
          height={35}
          className="h-[35px] w-[130px] object-cover"
        />

        <p className="cb-eyebrow flex items-center gap-2.5 tracking-[2px] text-[#bfd6ff]">
          <span aria-hidden className="h-[7px] w-[7px] rounded-[3.5px] bg-[#f4b942]" />
          {hero.eyebrow}
        </p>

        <h1 className="text-[38px] font-bold leading-[1.12] tracking-[-0.66px] text-white sm:text-[50px] lg:text-[66px] lg:leading-[73.92px]">
          <span className="block">{hero.headlineLine1}</span>
          <span className="block text-[#f4b942]">{hero.headlineLine2}</span>
        </h1>

        <p className="max-w-[784px] pb-[25px] text-[17px] leading-[1.55] text-[#dce8ff] md:text-[19px] md:leading-[29.45px]">
          {hero.sub}
        </p>

        {/* The boarding pass is a single flattened Figma asset, not markup — reproduce it faithfully. */}
        <div className="relative aspect-[760/284] w-full max-w-[760px] overflow-hidden">
          <Image
            src="/images/cabinblu-hero-boardingpass.png"
            alt={boardingPassAlt}
            fill
            sizes="760px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Plane bleeds off the right edge, level with the sub / top of the boarding pass */}
        <HeroPlane />
      </div>

      <Image
        src="/images/cabinblu-hero-wave.svg"
        alt=""
        width={1440}
        height={96}
        aria-hidden
        className="relative z-10 h-16 w-full md:h-24"
      />
    </section>
  );
}
