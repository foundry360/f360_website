import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "default" | "sm" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  secondary:
    "border border-border bg-surface-elevated/60 text-foreground hover:border-accent/40 hover:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ghost:
    "text-foreground/90 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  dark:
    "bg-[#050505] text-white hover:brightness-125 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

const sizes: Record<Size, string> = {
  default: "rounded-full px-5 py-2.5 text-sm",
  sm: "rounded-full px-8 py-3 text-xs sm:px-10 sm:py-3.5 sm:text-sm",
  lg: "rounded-full px-6 py-3 text-base sm:text-lg",
  xl: "rounded-full px-8 py-3.5 text-base sm:px-10 sm:py-4 sm:text-lg md:text-xl",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
