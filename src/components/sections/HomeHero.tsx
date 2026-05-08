import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageGuttersClass } from "@/lib/layout";
import { site } from "@/lib/site";

/** Home hero — left-aligned headline on dark grid (no side panel). */
export function HomeHero() {
  return (
    <section
      className="relative isolate min-h-[min(52vh,460px)] w-full overflow-x-hidden border-b border-border bg-grid-fade"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div
        className={`relative z-10 ${pageGuttersClass} flex min-h-[min(52vh,460px)] flex-col items-start justify-center gap-6 py-20 text-left sm:gap-8 sm:py-24 lg:py-28`}
      >
        <div className="flex w-full flex-col items-start gap-3 sm:gap-4">
          <div className="mb-3 h-1 w-24 bg-accent sm:mb-4" aria-hidden />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">{site.tagline}</p>
          <h1
            id="home-hero-heading"
            className="w-full max-w-5xl text-5xl font-bold leading-[1.1] tracking-[0.015em] text-foreground normal-case sm:text-6xl lg:text-7xl"
          >
            <span className="block">
              Building Intelligence<span className="text-accent">.</span>
            </span>
            <span className="block">Accelerating Innovation</span>
          </h1>
        </div>
        <p className="max-w-5xl text-base font-medium leading-relaxed text-foreground/95 sm:text-lg">
          Delivering AI strategies that transform how your business operates, redesigning operating models for AI{"\u2011"}driven execution, guiding the adoption of agent-driven workflows across platforms, and defining the data and governance foundation required to scale.
        </p>
        <ButtonLink href="/contact#contact-form" size="sm">
          Consult an Expert
        </ButtonLink>
      </div>
    </section>
  );
}
