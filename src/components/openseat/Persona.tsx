import Image from "next/image";
import { persona } from "@/data/openseat";
import { SectionHead, Section } from "./Bits";

export function Persona() {
  return (
    <Section id="persona">
      <SectionHead
        eyebrow={`${persona.n} · ${persona.eyebrow}`}
        title={persona.title}
        intro={persona.intro}
      />

      <div className="mt-[38px] rounded-[6px] border border-[var(--os-border)] bg-white/70 p-[7px]">
        <div className="rounded-[5px] bg-[rgba(240,96,63,0.12)] px-[14px] py-[10px] text-center text-[20px] font-bold text-[var(--os-coral)]">
          Persona
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[16px]">
        <Image
          src="/images/openseat/persona.png"
          alt="Persona board for Alex Stein, 26, a software engineer new to Berlin who wants low-pressure companionship"
          width={1400}
          height={620}
          sizes="(min-width: 1172px) 1172px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </Section>
  );
}
