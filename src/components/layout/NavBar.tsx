"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/about", label: "About", short: "About" },
  { href: "/work", label: "Work", short: "Work" },
  { href: "/travel-photography", label: "Travel & Photography", short: "Travel" },
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

/**
 * One centred pill at every screen size, same dark glass as desktop. There is
 * no hamburger: with four pages the links simply sit in the pill, and on narrow
 * screens that row scrolls sideways (with soft fades on the edges that still
 * have more to reveal). The active page is scrolled into view on every route
 * change. Because nothing opens or closes, it can never drift out of view.
 */
export function NavBar() {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  // Centre the active tab and refresh the edge fades on route or size change.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-current="page"]');
    if (active) {
      el.scrollLeft = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname, measure]);

  const fade = 18;
  const mask = `linear-gradient(to right, ${edge.start ? "#000" : "transparent"} 0, #000 ${fade}px, #000 calc(100% - ${fade}px), ${edge.end ? "#000" : "transparent"} 100%)`;

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 sm:px-6">
      <nav
        data-intro-piece="nav"
        className="flex w-full max-w-fit items-center gap-1 rounded-[14px] border border-white/[0.08] bg-[#1c1c1c]/75 px-2 py-2 font-sans text-sm text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
      >
        <span className="mr-1 shrink-0 px-2 font-sans text-[15px] leading-none text-white md:px-3">
          <span className="md:hidden">SBK</span>
          <span className="hidden md:inline">Sohaib Bin Kamran</span>
        </span>

        <div
          ref={scrollRef}
          onScroll={measure}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className="relative flex min-w-0 items-center gap-0.5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:gap-1 [&::-webkit-scrollbar]:hidden"
        >
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
                className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 transition-colors md:px-3 md:py-1.5 ${
                  active
                    ? "text-white max-md:bg-white/10"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span className="md:hidden">{link.short}</span>
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="group/hi ml-1 flex shrink-0 items-center gap-1.5 rounded-[10px] border border-[#0d0d0d]/20 bg-white/[0.14] px-3 py-2 text-white shadow-[inset_0_10px_18px_-3px_rgba(255,255,255,0.14),inset_0_2px_4px_-1px_rgba(255,255,255,0.08),inset_0_0.6px_1px_rgba(255,255,255,0.07)] transition-colors hover:bg-white/[0.2] md:px-3.5 md:py-1.5"
        >
          <CornerArrow />
          Say hi
        </Link>
      </nav>
    </header>
  );
}
