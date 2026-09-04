"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
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

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50 flex justify-center px-6">
      <nav className="flex items-center gap-1 rounded-[14px] border border-white/[0.08] bg-[#1c1c1c]/75 px-2 py-2 font-ui text-sm text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150">
        <span className="mr-1 px-3 font-serif text-[15px] leading-none text-white">
          Sohaib Bin Kamran
        </span>
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
        <Link
          href="/contact"
          className="group/hi ml-1 flex items-center gap-1.5 rounded-[10px] border border-[#0d0d0d]/20 bg-white/[0.14] px-3.5 py-1.5 text-white shadow-[inset_0_10px_18px_-3px_rgba(255,255,255,0.14),inset_0_2px_4px_-1px_rgba(255,255,255,0.08),inset_0_0.6px_1px_rgba(255,255,255,0.07)] transition-colors hover:bg-white/[0.2]"
        >
          <CornerArrow />
          Say hi
        </Link>
      </nav>
    </header>
  );
}
