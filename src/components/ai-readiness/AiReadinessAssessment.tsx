"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { AssessmentWizard } from "@/components/ai-readiness/AssessmentWizard";
import { assessmentViewportContentClass, assessmentViewportSectionClass } from "@/lib/ai-readiness/layout";
import { loadLeadInfo } from "@/lib/ai-readiness/lead-storage";
import { AI_READINESS_PATH, AI_READINESS_RESULTS_PATH } from "@/lib/ai-readiness/routes";
import { scoreAssessmentResults } from "@/lib/ai-readiness/score-assessment";
import {
  defaultAssessmentState,
  loadAssessmentState,
  saveAssessmentState,
} from "@/lib/ai-readiness/storage";
import type { AssessmentAnswers, AssessmentState } from "@/lib/ai-readiness/types";

export function AiReadinessAssessment() {
  const router = useRouter();
  const [state, setState] = useState<AssessmentState>(defaultAssessmentState);
  const [hydrated, setHydrated] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [scoringError, setScoringError] = useState<string>();

  useEffect(() => {
    const savedLead = loadLeadInfo();
    if (!savedLead?.organization) {
      router.replace(`${AI_READINESS_PATH}#get-started`);
      return;
    }

    const savedState = loadAssessmentState();
    if (savedState.phase === "results" && savedState.results) {
      router.replace(AI_READINESS_RESULTS_PATH);
      return;
    }

    setState(savedState);
    setHydrated(true);
  }, [router]);

  useEffect(() => {
    if (hydrated) {
      saveAssessmentState(state);
    }
  }, [state, hydrated]);

  const handleAnswer = useCallback((questionId: string, score: number) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: score },
    }));
  }, []);

  const handleStepChange = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const handleAssessmentComplete = useCallback(
    async (answers: AssessmentAnswers) => {
      const lead = loadLeadInfo();
      setIsScoring(true);
      setScoringError(undefined);

      try {
        const scored = await scoreAssessmentResults(answers, lead?.organization);

        setState((prev) => {
          const nextState: AssessmentState = {
            ...prev,
            answers,
            phase: "results",
            results: scored.results,
            submittedAt: new Date().toISOString(),
          };
          saveAssessmentState(nextState);
          return nextState;
        });

        router.push(AI_READINESS_RESULTS_PATH);
      } catch (error) {
        setScoringError(
          error instanceof Error ? error.message : "Unable to calculate your results. Please try again.",
        );
      } finally {
        setIsScoring(false);
      }
    },
    [router],
  );

  const displayState = hydrated ? state : defaultAssessmentState;

  if (!hydrated) {
    return (
      <Section
        id="assessment-section"
        variant="light"
        verticalSpacing="flushTop"
        aria-label="AI Readiness Assessment"
        className="border-b border-border pt-8"
      >
        <p className="text-sm text-muted">Loading assessment…</p>
      </Section>
    );
  }

  return (
    <Section
      id="assessment-section"
      variant="light"
      verticalSpacing="flushTop"
      aria-label="AI Readiness Assessment"
      className={["border-b border-border pt-8", assessmentViewportSectionClass].join(" ")}
      contentClassName={assessmentViewportContentClass}
    >
      <div className="mb-5 flex shrink-0 flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">
            AI Readiness Assessment
          </p>
          <p className="mt-1 text-sm text-muted">
            {isScoring
              ? "Analyzing your responses with Claude…"
              : "Approximately 3–5 minutes · Progress saved automatically"}
          </p>
        </div>
        <Link
          href={AI_READINESS_PATH}
          className="text-sm font-medium text-muted transition hover:text-accent"
        >
          ← Back to overview
        </Link>
      </div>

      {scoringError ? (
        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
          {scoringError}
        </p>
      ) : null}

      {isScoring ? (
        <div className="flex min-h-[20rem] flex-1 flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Calculating results</p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Claude is reviewing your responses and calculating readiness scores across all five categories.
          </p>
        </div>
      ) : (
        <div className="min-h-0 flex-1">
          <AssessmentWizard
            answers={displayState.answers}
            currentStep={displayState.currentStep}
            onAnswer={handleAnswer}
            onStepChange={handleStepChange}
            onComplete={handleAssessmentComplete}
          />
        </div>
      )}
    </Section>
  );
}
