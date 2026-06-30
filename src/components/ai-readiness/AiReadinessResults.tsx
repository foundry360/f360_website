"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { ResultsView } from "@/components/ai-readiness/ResultsView";
import { loadLeadInfo, saveLeadInfo } from "@/lib/ai-readiness/lead-storage";
import { enrichResultsReport } from "@/lib/ai-readiness/results-report";
import {
  AI_READINESS_ASSESSMENT_PATH,
  AI_READINESS_PATH,
} from "@/lib/ai-readiness/routes";
import { sampleAssessmentResults } from "@/lib/ai-readiness/sample-results";
import { loadAssessmentState, saveAssessmentState } from "@/lib/ai-readiness/storage";
import type { AssessmentResults, AssessmentState, LeadInfo } from "@/lib/ai-readiness/types";

type AiReadinessResultsProps = {
  calendarUrl: string;
};

async function saveResultsToSupabase(
  state: AssessmentState,
  lead: LeadInfo,
): Promise<string | undefined> {
  if (!state.results || !state.submittedAt || state.resultId) {
    return state.resultId;
  }

  const res = await fetch("/api/ai-readiness", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      results: state.results,
      answers: state.answers,
      submittedAt: state.submittedAt,
      lead,
      ghlContactId: lead.ghlContactId,
    }),
  });

  if (!res.ok) {
    console.error("[ai-readiness] Failed to save results");
    return undefined;
  }

  const data = (await res.json()) as { resultId?: string | null; contactId?: string | null };
  if (data.contactId && !lead.ghlContactId) {
    saveLeadInfo({ ...lead, ghlContactId: data.contactId });
  }
  return data.resultId ?? undefined;
}

function ensureReport(results: AssessmentResults, organization: string): AssessmentResults {
  if (results.headline && results.domainInsights.length > 0) {
    if (organization) {
      return enrichResultsReport(
        {
          overallScore: results.overallScore,
          readinessLevel: results.readinessLevel,
          categoryScores: results.categoryScores,
          strengths: results.strengths,
          opportunities: results.opportunities,
          recommendations: results.recommendations,
          summary: results.summary,
        },
        organization,
      );
    }
    return results;
  }

  return enrichResultsReport(
    {
      overallScore: results.overallScore,
      readinessLevel: results.readinessLevel,
      categoryScores: results.categoryScores,
      strengths: results.strengths,
      opportunities: results.opportunities,
      recommendations: results.recommendations,
      summary: results.summary,
    },
    organization,
  );
}

export function AiReadinessResults({ calendarUrl }: AiReadinessResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSample = searchParams.get("sample") === "true";
  const [results, setResults] = useState<AssessmentResults | null>(isSample ? sampleAssessmentResults : null);
  const [organization, setOrganization] = useState("");
  const [ready, setReady] = useState(isSample);
  const persistInFlight = useRef(false);

  useEffect(() => {
    if (isSample) return;

    const lead = loadLeadInfo();
    const state = loadAssessmentState();

    if (state.phase !== "results" || !state.results) {
      router.replace(AI_READINESS_ASSESSMENT_PATH);
      return;
    }

    const org = lead?.organization ?? "";
    const report = ensureReport(state.results, org);
    setOrganization(org);
    setResults(report);

    if (report !== state.results) {
      saveAssessmentState({ ...state, results: report });
    }

    setReady(true);

    if (!lead || state.resultId || !state.submittedAt || persistInFlight.current) {
      return;
    }

    persistInFlight.current = true;
    void saveResultsToSupabase({ ...state, results: report }, lead)
      .then((resultId) => {
        if (resultId) {
          saveAssessmentState({ ...state, results: report, resultId });
        }
      })
      .finally(() => {
        persistInFlight.current = false;
      });
  }, [isSample, router]);

  if (!ready || !results) {
    return (
      <Section variant="light" verticalSpacing="flushTop" aria-label="AI Readiness Results" className="pt-8">
        <p className="text-sm text-muted">Loading results…</p>
      </Section>
    );
  }

  return (
    <Section
      variant="light"
      verticalSpacing="flushTop"
      aria-label="AI Readiness Results"
      className="border-b border-border pb-16 pt-8"
    >
      <ResultsView
        results={results}
        organization={isSample ? "Example Organization" : organization}
        calendarUrl={calendarUrl}
        isSample={isSample}
      />
    </Section>
  );
}
