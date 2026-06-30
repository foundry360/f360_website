import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { AssessmentAnswers, AssessmentResults, LeadInfo } from "@/lib/ai-readiness/types";

export type PersistAssessmentInput = {
  results: AssessmentResults;
  answers: AssessmentAnswers;
  submittedAt: string;
  lead?: LeadInfo;
};

function getCategoryScore(results: AssessmentResults, category: string): number {
  return results.categoryScores.find((c) => c.category === category)?.score ?? 0;
}

export async function persistAssessmentResults(
  input: PersistAssessmentInput,
): Promise<{ id: string } | { skipped: true; reason: string }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { skipped: true, reason: "Supabase is not configured" };
  }

  const { results, answers, submittedAt, lead } = input;

  const { data, error } = await supabase
    .from("ai_readiness_results")
    .insert({
      submitted_at: submittedAt,
      overall_score: results.overallScore,
      readiness_level: results.readinessLevel,
      strategy_score: getCategoryScore(results, "strategy"),
      people_score: getCategoryScore(results, "people"),
      process_score: getCategoryScore(results, "processes"),
      governance_score: getCategoryScore(results, "governance"),
      technology_score: getCategoryScore(results, "technology"),
      answers,
      results,
      contact_email: lead?.email || null,
      contact_first_name: lead?.firstName || null,
      contact_last_name: lead?.lastName || null,
      organization: lead?.organization || null,
      organization_size: lead?.organizationSize || null,
      title: lead?.title || null,
      phone: lead?.phone || null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { id: data.id };
}
