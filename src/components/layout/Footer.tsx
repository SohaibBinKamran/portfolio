import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <p className="font-serif text-2xl">Sohaib Bin Kamran, Product Designer</p>
          <p className="text-sm text-white/60">
            User-centered design from discovery to delivery.
          </p>
          <Link
            href="/contact"
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/20"
          >
            <span aria-hidden>⟳</span> Let&apos;s Connect!
          </Link>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <p className="font-sans text-sm font-medium text-white">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-sm font-medium text-white">Contacts</p>
            <a href="tel:+491631818182" className="text-sm text-white/70 hover:text-white">
              +49 163 1818182
            </a>
            <a
              href="mailto:sohaibkamran7@gmail.com"
              className="text-sm text-white/70 hover:text-white"
            >
              sohaibkamran7@gmail.com
            </a>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-sans text-[min(22vw,260px)] font-medium leading-none tracking-tight text-white/[0.05]"
      >
        SOHAIB
      </p>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 px-6 py-6 text-xs text-white/50">
        <span>&copy; 2026 Sohaib Bin Kamran</span>
        <Image
          src="/images/sbk-logo.png"
          alt="sbk."
          width={44}
          height={44}
          className="h-7 w-auto opacity-50 brightness-0 invert"
        />
        <div className="flex items-center gap-4">
          <a
            href="https://www.behance.net/sohaibkamran2"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Bē
          </a>
          <a
            href="https://www.linkedin.com/in/sohaib-bin-kamran/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            in
          </a>
        </div>
      </div>
    </footer>
  );
}
