import type { ReactNode } from "react";
import { pageGuttersClass } from "@/lib/layout";

type Stat = { value: string; label: string; hint?: string };

/** Outcome metrics band — thematic alignment with foundry360.us platform story (not a performance guarantee). */
export function StatBand({
  stats,
  title,
  belowMetrics,
}: {
  stats: Stat[];
  title?: string;
  belowMetrics?: ReactNode;
}) {
  return (
    <div className="band-light border-y border-border">
      <div className={`${pageGuttersClass} py-20 sm:py-24 lg:py-28`}>
        {title ? (
          <div className="mb-10 sm:mb-12">
            <h2 className="mx-auto text-center whitespace-nowrap font-semibold leading-none tracking-tight text-foreground text-[clamp(12px,calc(0.5rem+3.2vmin),3.5rem)]">
              {title}
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
            <div className="mx-auto max-w-3xl text-justify text-lg leading-relaxed text-muted sm:max-w-4xl sm:text-xl">
              {belowMetrics}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
