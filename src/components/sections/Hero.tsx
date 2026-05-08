import type { ReactNode } from "react";
import { pageGuttersClass } from "@/lib/layout";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  /** Default matches the home hero; set `center` for centered layout. */
  align?: "center" | "left";
};

export function Hero({ eyebrow, title, subtitle, align = "left" }: HeroProps) {
  const titleContent = typeof title === "string" ? formatSectionHeadingTitle(title) : title;
  const isLeft = align === "left";

  const h1Class = isLeft
    ? "w-full max-w-5xl text-5xl font-bold leading-[1.1] tracking-[0.015em] text-foreground normal-case sm:text-6xl lg:text-7xl"
    : "mx-auto max-w-[90ch] text-5xl font-semibold leading-tight tracking-tight text-foreground normal-case sm:text-6xl lg:text-7xl";

  const titleBlock = (
    <Reveal delayMs={40} className="w-full">
      <h1 className={h1Class}>{titleContent}</h1>
    </Reveal>
  );

  return (
    <section className="relative isolate min-h-[min(52vh,460px)] w-full overflow-x-hidden border-b border-border bg-grid-fade">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className={[
          `relative z-10 ${pageGuttersClass} flex min-h-[min(52vh,460px)] flex-col justify-center gap-6 py-20 sm:gap-8 sm:py-24 lg:py-28`,
          isLeft ? "items-start text-left" : "items-center text-center",
        ].join(" ")}
      >
        {isLeft ? (
          <div className="flex w-full flex-col items-start gap-3 sm:gap-4">
            <div className="mb-3 h-1 w-24 bg-accent sm:mb-4" aria-hidden />
            {eyebrow ? (
              <Reveal className="w-full">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">{eyebrow}</p>
              </Reveal>
            ) : null}
            {titleBlock}
          </div>
        ) : (
          <>
            {eyebrow ? (
              <Reveal className="w-full">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">{eyebrow}</p>
              </Reveal>
            ) : null}
            {titleBlock}
          </>
        )}
        <Reveal delayMs={80} className="w-full">
          <p
            className={
              isLeft
                ? "max-w-5xl text-base font-medium leading-relaxed text-foreground/95 sm:text-lg"
                : "mx-auto max-w-5xl text-base leading-relaxed text-muted sm:text-lg"
            }
          >
            {subtitle}
          </p>
        </Reveal>
        <Reveal delayMs={120} className={isLeft ? "w-full" : "flex w-full flex-wrap justify-center"}>
          <ButtonLink href="#contact-form" size="sm">
            Consult an Expert
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
