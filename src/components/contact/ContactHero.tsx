import Image from "next/image";
import { contact } from "@/data/contact";
import { ContactForm } from "./ContactForm";

/** lucide `mail` — the glyph on the direct-email chip in `GetInTouch.svg`. */
function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ContactHero() {
  return (
    <section className="relative -mt-16 flex flex-col items-center overflow-clip bg-bg-dark px-6 pb-[100px] pt-[150px]">
      {/* Background: warm glow + grayscale clouds masked in from the edges. */}
      <Image
        src="/images/contact/contact-glow.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-45 mix-blend-overlay"
      />
      <Image
        src="/images/contact/contact-clouds.jpg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-45 mix-blend-luminosity [mask-image:radial-gradient(120%_160%_at_50%_-15%,transparent_60%,#000_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 border-b border-dashed border-white/[0.12]"
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-14">
        <div className="flex max-w-[600px] flex-col items-center gap-[22px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-[24px] border border-[#fa532d] bg-[#ff542e] px-3 py-2 text-[13px] font-medium leading-none tracking-[-0.26px] text-white shadow-[0_0.6px_0.6px_-1.25px_rgba(227,91,0,0.51),0_2.29px_2.29px_-2.5px_rgba(227,91,0,0.45),0_10px_10px_-3.75px_rgba(227,91,0,0.18)]">
            <span className="size-[5px] rounded-full bg-white" />
            {contact.badge}
          </span>
          <h1 className="font-serif text-[44px] leading-[1.15] tracking-[-0.44px] text-white">
            {contact.heading}
          </h1>
          <p className="max-w-[560px] text-[18px] leading-[1.55] tracking-[-0.36px] text-white/60">
            {contact.intro}
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          <ContactForm />

          <div className="flex flex-col items-center gap-4 pb-9 pt-6">
            <p className="font-serif text-[28px] text-white">{contact.directHeading}</p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-[14px] border border-[#303030] bg-bg-dark-alt px-3.5 text-[16px] font-medium tracking-[-0.02em] text-white shadow-[inset_0_0.72px_0.72px_-1.25px_rgba(255,255,255,0.61),inset_0_2.75px_2.75px_-2.5px_rgba(255,255,255,0.54),inset_0_12px_12px_-3.75px_rgba(255,255,255,0.21)] transition-colors hover:bg-[#2a2a2a]"
            >
              <MailIcon />
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
