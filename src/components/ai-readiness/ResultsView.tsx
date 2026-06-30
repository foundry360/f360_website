"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Button } from "@/components/ui/Button";
import { ScoreDonut } from "@/components/ai-readiness/ScoreDonut";
import {
  buildResultsPdfFilename,
  downloadResultsPdf,
} from "@/lib/ai-readiness/download-results-pdf";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";
import { AI_READINESS_PATH } from "@/lib/ai-readiness/routes";
import { site } from "@/lib/site";
import type { AssessmentResults } from "@/lib/ai-readiness/types";

type ResultsViewProps = {
  results: AssessmentResults;
  organization?: string;
  calendarUrl: string;
  isSample?: boolean;
};

const roadmapStepLabels: Record<string, string> = {
  first: "First",
  next: "Next",
  then: "Then",
};

export function ResultsView({ results, organization, calendarUrl, isSample = false }: ResultsViewProps) {
  const orgLabel = organization || "Your organization";
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string>();

  async function handleDownloadPdf() {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadError(undefined);

    try {
      await downloadResultsPdf({
        filename: buildResultsPdfFilename(organization),
        results,
        organization,
        calendarUrl,
      });
    } catch {
      setDownloadError("Unable to generate the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <Link
          href={AI_READINESS_PATH}
          className="text-sm font-medium text-muted transition hover:text-accent"
        >
          ← Return to overview
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" disabled={isDownloading} onClick={handleDownloadPdf}>
            {isDownloading ? "Generating PDF…" : "Download PDF"}
          </Button>
        </div>
      </div>

      {isSample ? (
        <p className="mt-4 text-sm text-muted">
          Sample results are displayed so the output page can be reviewed before a completed assessment is available.
        </p>
      ) : null}

      {downloadError ? (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
          {downloadError}
        </p>
      ) : null}

      <div className="bg-white text-foreground">
        <div className="border-b border-border pb-4 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{site.name}</p>
          <p className="mt-1 text-sm text-muted">AI Readiness Assessment Results{organization ? ` · ${organization}` : ""}</p>
        </div>

        <section className="mt-10 lg:mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Overall Readiness Analysis</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl lg:text-5xl">
                {formatSectionHeadingTitle(results.headline)}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{results.executiveNarrative}</p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{results.summary}</p>
            </div>
            <div className="flex shrink-0 justify-center lg:justify-end">
              <ScoreDonut
                score={results.overallScore}
                size="lg"
                sublabel="Readiness Score"
                className="rounded-2xl border border-border bg-white px-8 py-6"
              />
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-muted sm:text-left">
              Category Scores
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {results.categoryScores.map((cat) => (
                <ScoreDonut key={cat.category} score={cat.score} size="md" label={cat.label} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground normal-case sm:text-3xl">
            Key Recommended Actions
          </h2>
          <ol className="mt-8 grid gap-6 lg:grid-cols-3">
            {results.keyActions.map((action) => (
              <li key={action.order} className="flex h-full flex-col rounded-2xl border border-border bg-white p-6">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-dim text-sm font-bold tabular-nums text-accent"
                  aria-hidden
                >
                  {action.order}
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent">{action.focus}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{action.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 border-t border-border pt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Domain Breakdown</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground normal-case sm:text-3xl">
            Findings and recommendations by category
          </h2>
          <div className="mt-10 space-y-8">
            {results.domainInsights.map((domain) => (
              <article key={domain.category} className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-6 border-b border-border pb-5 sm:gap-8">
                  <ScoreDonut score={domain.score} size="sm" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{domain.label}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted">Domain score</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">Analysis</h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{domain.analysis}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                      Recommended Actions
                    </h4>
                    <ul className="mt-3 space-y-3">
                      {domain.recommendedActions.map((action) => (
                        <li key={action} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground normal-case sm:text-3xl">
            Prioritized Roadmap
          </h2>
          <ol className="mt-8 space-y-6">
            {results.roadmap.map((phase, index) => (
              <li key={phase.step} className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <div className="flex flex-wrap items-start gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-sm font-bold tabular-nums text-accent"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                      {roadmapStepLabels[phase.step]}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">{phase.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {phase.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-white p-8 text-center sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Next Step</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground normal-case sm:text-3xl">
            Ready for a deeper assessment and discovery?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Foundry360 can validate these findings with stakeholders, review supporting evidence, and convert the roadmap
            into an execution plan for {orgLabel}.
          </p>
          {calendarUrl ? (
            <p className="mx-auto mt-6 max-w-2xl text-sm text-muted">
              Schedule discovery: {calendarUrl}
            </p>
          ) : null}
          <div className="mt-8">
            {calendarUrl ? (
              <ButtonLink href={calendarUrl} variant="primary" size="sm" target="_blank" rel="noopener noreferrer">
                Schedule discovery
              </ButtonLink>
            ) : (
              <ButtonLink href="#contact-form" variant="primary" size="sm">
                Schedule discovery
              </ButtonLink>
            )}
          </div>
        </section>

        <p className="mt-10 border-t border-border pt-8 text-xs leading-relaxed text-muted sm:text-sm">
          How results are determined: This preliminary assessment is based on the maturity options selected, the target
          score for each question, and the weighting assigned to each readiness category. The output is intended to guide
          discovery and prioritization, not to serve as a formal audit, certification, or compliance determination.
        </p>
      </div>
    </div>
  );
}
