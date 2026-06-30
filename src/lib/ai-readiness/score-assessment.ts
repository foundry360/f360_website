import type { AssessmentAnswers, AssessmentResults } from "./types";

type ScoreAssessmentResponse = {
  success: boolean;
  scoringMethod: "claude" | "fallback";
  results: AssessmentResults;
  warning?: string;
};

export async function scoreAssessmentResults(
  answers: AssessmentAnswers,
  organization?: string,
): Promise<ScoreAssessmentResponse> {
  const res = await fetch("/api/ai-readiness/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, organization }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? "Failed to calculate assessment results.");
  }

  return (await res.json()) as ScoreAssessmentResponse;
}
