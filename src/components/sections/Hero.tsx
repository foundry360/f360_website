import type { ReactNode } from "react";
import { pageGuttersClass } from "@/lib/layout";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function Hero({ eyebrow, title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <div className="relative w-full overflow-hidden border-b border-border bg-grid-fade">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div className={`${pageGuttersClass} flex flex-col items-center gap-8 pb-16 pt-20 text-center sm:pb-20 sm:pt-24`}>
        {eyebrow ? (
          <Reveal className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal delayMs={40} className="w-full">
          <h1 className="mx-auto max-w-[90ch] text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delayMs={80} className="w-full">
          <p className="mx-auto max-w-5xl text-lg leading-relaxed text-muted sm:text-xl">{subtitle}</p>
        </Reveal>
        <Reveal delayMs={120} className="flex w-full flex-wrap justify-center gap-3">
          <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
          {secondaryCta ? (
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          ) : null}
        </Reveal>
      </div>
    </div>
  );
}
