import type { ReactNode } from "react";
import { pageGuttersClass } from "@/lib/layout";

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Visually quieter background band */
  variant?: "default" | "muted" | "grid" | "light" | "dark" | "accentSoft";
  /** Extra vertical padding for hero-style bands */
  verticalSpacing?: "default" | "tall";
  className?: string;
  /** Exposed to screen readers as region label */
  "aria-label"?: string;
};

/** Max-width wrapper + vertical rhythm for every major homepage band. */
export function Section({
  id,
  children,
  variant = "default",
  verticalSpacing = "default",
  className = "",
  "aria-label": ariaLabel,
}: SectionProps) {
  const bg =
    variant === "light"
      ? "band-light"
      : variant === "dark"
        ? "band-dark"
        : variant === "accentSoft"
          ? "band-accent-soft"
          : variant === "muted"
            ? "bg-surface/80"
            : variant === "grid"
              ? "bg-grid-fade bg-surface/40"
              : "";

  const py =
    verticalSpacing === "tall" ? "py-28 sm:py-36 lg:py-44" : "py-20 sm:py-28";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`scroll-mt-24 ${py} ${bg} ${className}`.trim()}
    >
      <div className={pageGuttersClass}>{children}</div>
    </section>
  );
}
