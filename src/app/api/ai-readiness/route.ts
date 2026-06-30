import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { syncGhlAssessmentResults } from "@/lib/ai-readiness/ghl";
import { persistAssessmentResults } from "@/lib/ai-readiness/persist-results";
import type { AssessmentAnswers, AssessmentResults, LeadInfo } from "@/lib/ai-readiness/types";

type SubmitPayload = {
  results: AssessmentResults;
  answers: AssessmentAnswers;
  submittedAt: string;
  lead?: LeadInfo;
  ghlContactId?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitPayload;

    if (body.results?.overallScore === undefined) {
      return NextResponse.json({ error: "Assessment results are required." }, { status: 400 });
    }

    if (!body.answers || !body.submittedAt) {
      return NextResponse.json({ error: "Assessment answers and submission time are required." }, { status: 400 });
    }

    const supabaseResult = await persistAssessmentResults({
      results: body.results,
      answers: body.answers,
      submittedAt: body.submittedAt,
      lead: body.lead,
    });

    let ghlResult: Awaited<ReturnType<typeof syncGhlAssessmentResults>> | undefined;
    if (body.lead?.firstName && body.lead?.lastName && body.lead?.email && emailRegex.test(body.lead.email)) {
      ghlResult = await syncGhlAssessmentResults(body.lead, body.results, body.submittedAt);

      if (ghlResult && "skipped" in ghlResult) {
        console.warn("[ai-readiness] GHL results sync skipped:", ghlResult.reason);
      }
    }

    if ("skipped" in supabaseResult) {
      console.warn("[ai-readiness] Supabase save skipped:", supabaseResult.reason);
      return NextResponse.json({
        success: true,
        resultId: null,
        supabase: supabaseResult,
        ghl: ghlResult,
        contactId: ghlResult && "contactId" in ghlResult ? ghlResult.contactId : null,
      });
    }

    return NextResponse.json({
      success: true,
      resultId: supabaseResult.id,
      supabase: { id: supabaseResult.id },
      ghl: ghlResult,
      contactId: ghlResult && "contactId" in ghlResult ? ghlResult.contactId : null,
    });
  } catch (err) {
    console.error("[ai-readiness] submission error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
