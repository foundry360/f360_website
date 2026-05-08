import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  secondary:
    "border border-border bg-surface-elevated/60 text-foreground hover:border-accent/40 hover:bg-surface-elevated focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ghost:
    "text-foreground/90 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
