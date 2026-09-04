import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Soft-UI pill button matching the Figma button SVGs (dark / light), with real
 * text. The layered drop + inner-glow shadow lives in `--shadow-pill`.
 */
export function PillButton({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) {
  const tone =
    variant === "dark"
      ? "bg-bg-dark text-white ring-1 ring-inset ring-bg-dark"
      : "bg-white text-[#050505]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[16px] px-9 py-[13px] font-sans text-[15px] font-medium leading-none [box-shadow:var(--shadow-pill)] transition-transform hover:scale-[1.03] ${tone} ${className}`}
    >
      {children}
    </Link>
  );
}
