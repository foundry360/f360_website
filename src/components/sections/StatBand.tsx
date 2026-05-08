import type { ReactNode } from "react";
import { pageGuttersClass } from "@/lib/layout";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

type Stat = { value: string; label: string; hint?: string };

/** Outcome metrics band — thematic alignment with foundry360.us platform story (not a performance guarantee). */
export function StatBand({
  stats,
  title,
  overline,
  belowMetrics,
}: {
  stats: Stat[];
  title?: ReactNode;
  /** Line above the main title (e.g. section theme). */
  overline?: ReactNode;
  belowMetrics?: ReactNode;
}) {
  const renderedTitle = typeof title === "string" ? formatSectionHeadingTitle(title) : title;

  return (
    <div className="band-light border-y border-border">
      <div className={`${pageGuttersClass} py-20 sm:py-24 lg:py-28`}>
        {title != null && title !== "" ? (
          <div className="mb-10 sm:mb-12">
            {overline ? (
              <p className="mx-auto mb-4 max-w-5xl text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:mb-5 sm:text-base">
                {overline}
              </p>
            ) : null}
            <h2 className="mx-auto w-full max-w-none text-pretty text-center text-[clamp(14px,calc(0.55rem+4.2vmin),4.5rem)] font-semibold leading-tight tracking-tight text-foreground normal-case">
              {renderedTitle}
            </h2>
          </div>
        ) : null}
        <div className="grid gap-0 text-center sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col items-center px-4 py-8 sm:px-8 sm:py-10",
                i > 0 ? "border-t border-border/50 sm:border-t-0 sm:border-l sm:border-border/50" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl lg:text-6xl">{s.value}</p>
              <p className="mt-2 text-base font-medium text-foreground sm:text-lg">{s.label}</p>
              {s.hint ? (
                <p className="mx-auto mt-3 max-w-sm text-balance text-sm leading-relaxed text-muted sm:max-w-md sm:text-base">
                  {s.hint}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        {belowMetrics ? (
          <div className="mt-10 sm:mt-12">
            <div className="mx-auto max-w-5xl text-justify text-base leading-relaxed text-muted sm:max-w-6xl sm:text-lg lg:max-w-7xl">
              {belowMetrics}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
