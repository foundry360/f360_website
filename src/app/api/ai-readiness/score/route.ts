import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { scoreAssessmentWithClaude } from "@/lib/ai-readiness/claude-scoring";
import { assessmentQuestions } from "@/lib/ai-readiness/questions";
import {
  assembleBaseResults,
  buildFullResults,
  calculateResults,
} from "@/lib/ai-readiness/scoring";
import type { AssessmentAnswers } from "@/lib/ai-readiness/types";

type ScoreRequestBody = {
  answers: AssessmentAnswers;
  organization?: string;
};

function validateAnswers(answers: AssessmentAnswers): string | null {
  const missing = assessmentQuestions.filter((question) => typeof answers[question.id] !== "number");
  if (missing.length > 0) {
    return "All assessment questions must be answered before scoring.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ScoreRequestBody;
    const validationError = validateAnswers(body.answers);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const organization = body.organization?.trim() ?? "";

    try {
      const claudeScores = await scoreAssessmentWithClaude(body.answers, organization);
      const results = buildFullResults(
        assembleBaseResults(
          claudeScores.categoryScores,
          claudeScores.overallScore,
          claudeScores.readinessLevel,
        ),
        organization,
      );

      return NextResponse.json({
        success: true,
        scoringMethod: "claude",
        results,
      });
    } catch (claudeError) {
      console.warn("[ai-readiness] Claude scoring unavailable, using rule-based fallback:", claudeError);

      const results = calculateResults(body.answers, organization);

      return NextResponse.json({
        success: true,
        scoringMethod: "fallback",
        results,
        warning:
          claudeError instanceof Error
            ? claudeError.message
            : "Claude scoring unavailable; used rule-based scoring instead.",
      });
    }
  } catch (err) {
    console.error("[ai-readiness] score error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
