import { assessmentViewportContentClass, assessmentViewportSectionClass } from "@/lib/ai-readiness/layout";
import { Section } from "@/components/layout/Section";

type ResultsCalculatingPanelProps = {
  /** When true, fills the assessment viewport height (assessment page). */
  fullViewport?: boolean;
};

export function ResultsCalculatingPanel({ fullViewport = false }: ResultsCalculatingPanelProps) {
  return (
    <Section
      variant="light"
      verticalSpacing="flushTop"
      aria-label="Calculating AI readiness results"
      aria-busy="true"
      className={[
        "border-b border-border pt-8",
        fullViewport ? assessmentViewportSectionClass : "",
      ]
        .filter(Boolean)
        .join(" ")}
      contentClassName={fullViewport ? assessmentViewportContentClass : undefined}
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">
          AI Readiness Assessment
        </p>
        <p className="mt-1 text-sm text-muted">Analyzing your responses…</p>
      </div>

      <div
        className={[
          "flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-12 text-center",
          fullViewport ? "min-h-0 flex-1" : "min-h-[20rem]",
        ].join(" ")}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Calculating results</p>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Reviewing your responses and calculating readiness scores across all five categories.
        </p>
      </div>
    </Section>
  );
}
