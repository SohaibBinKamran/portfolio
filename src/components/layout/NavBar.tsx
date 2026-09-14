"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/travel-photography", label: "Travel & Photography" },
];

/** corner-down-right — the "Say hi" glyph from `main nav.svg`. */
function CornerArrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/hi:-rotate-12 group-hover/hi:translate-x-[3px]"
    >
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
      {open ? (
        <path d="M5 5l14 14M19 5L5 19" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-4 z-50 flex justify-start px-4 sm:px-6 md:justify-center">
      <nav className="flex w-full max-w-fit items-center gap-1 rounded-[14px] border border-white/[0.08] bg-[#1c1c1c]/75 px-2 py-2 font-sans text-sm text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150">
        <span className="mr-1 truncate px-3 font-sans text-[15px] leading-none text-white">
          <span className="md:hidden">SBK</span>
          <span className="hidden md:inline">Sohaib Bin Kamran</span>
        </span>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="group/hi ml-1 hidden items-center gap-1.5 rounded-[10px] border border-[#0d0d0d]/20 bg-white/[0.14] px-3.5 py-1.5 text-white shadow-[inset_0_10px_18px_-3px_rgba(255,255,255,0.14),inset_0_2px_4px_-1px_rgba(255,255,255,0.08),inset_0_0.6px_1px_rgba(255,255,255,0.07)] transition-colors hover:bg-white/[0.2] md:flex"
        >
          <CornerArrow />
          Say hi
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-[10px] text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="absolute left-4 right-4 top-[calc(100%+8px)] flex flex-col gap-1 rounded-[14px] border border-white/[0.08] bg-[#1c1c1c]/95 p-2 font-sans text-sm text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 md:hidden">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="group/hi mt-1 flex items-center justify-center gap-1.5 rounded-[10px] border border-[#0d0d0d]/20 bg-white/[0.14] px-3.5 py-2.5 text-white shadow-[inset_0_10px_18px_-3px_rgba(255,255,255,0.14),inset_0_2px_4px_-1px_rgba(255,255,255,0.08),inset_0_0.6px_1px_rgba(255,255,255,0.07)] transition-colors hover:bg-white/[0.2]"
          >
            <CornerArrow />
            Say hi
          </Link>
        </div>
      )}
    </header>
  );
}
