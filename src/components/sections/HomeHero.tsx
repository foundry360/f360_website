import { pageGuttersClass } from "@/lib/layout";
import { site } from "@/lib/site";

/** Home hero — centered headline on dark grid (no side panel). */
export function HomeHero() {
  return (
    <section
      className="relative isolate min-h-[min(52vh,420px)] w-full overflow-x-hidden border-b border-border bg-grid-fade"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />

      <div
        className={`relative z-10 ${pageGuttersClass} flex min-h-[min(52vh,420px)] flex-col items-center justify-center gap-6 py-16 text-center sm:gap-8 sm:py-20`}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {site.tagline}
          </p>
          <div className="mx-auto w-full max-w-full overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <h1
              id="home-hero-heading"
              className="mx-auto w-max max-w-none px-2 text-center text-[clamp(0.95rem,2.2vw+0.55rem,3.75rem)] font-bold leading-tight tracking-tight text-foreground whitespace-nowrap"
            >
              Building&nbsp;Intelligence. Accelerating&nbsp;Innovation
            </h1>
          </div>
        </div>
        <p className="mx-auto max-w-2xl text-lg font-medium leading-snug text-foreground/95 sm:text-xl">
          AI Application Development that Drives Business Transformation
        </p>
        <div className="mx-auto mt-2 h-1 w-24 bg-accent" aria-hidden />
      </div>
    </section>
  );
}
