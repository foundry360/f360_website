import { categoryMeta, CATEGORY_ORDER, assessmentQuestions } from "./questions";
import { generateRecommendations } from "./recommendations";
import { enrichResultsReport } from "./results-report";
import type {
  AssessmentAnswers,
  AssessmentResults,
  CategoryScore,
  ReadinessLevel,
} from "./types";

export function getReadinessLevel(score: number): ReadinessLevel {
  if (score >= 80) return "Transforming";
  if (score >= 60) return "Operational";
  if (score >= 40) return "Developing";
  return "Emerging";
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

export function calculateCategoryScores(answers: AssessmentAnswers): CategoryScore[] {
  return CATEGORY_ORDER.map((categoryId) => {
    const questions = assessmentQuestions.filter((q) => q.category === categoryId);
    const scores = questions
      .map((q) => answers[q.id])
      .filter((s): s is number => typeof s === "number");

    return {
      category: categoryId,
      label: categoryMeta[categoryId].label,
      score: average(scores),
    };
  });
}

export function calculateOverallScore(categoryScores: CategoryScore[]): number {
  return average(categoryScores.map((c) => c.score));
}

const levelSummaries: Record<ReadinessLevel, string> = {
  Emerging:
    "Your organization is in the early stages of AI readiness. While interest may exist, foundational elements—strategy, governance, and technology infrastructure—need attention before AI can deliver meaningful business outcomes. Focus on building leadership alignment and establishing baseline policies.",
  Developing:
    "Your organization has begun exploring AI but lacks consistent execution across departments. Some areas show promise while others remain manual or ad hoc. Prioritize formalizing your AI strategy, expanding training, and strengthening governance before scaling initiatives.",
  Operational:
    "Your organization demonstrates solid AI readiness with established practices in several key areas. You are positioned to expand AI adoption responsibly. Focus on optimizing workflows, deepening integration, and measuring ROI to move from operational to transformative outcomes.",
  Transforming:
    "Your organization is among the leaders in AI readiness. Strong strategy, governance, and technology foundations enable you to pursue advanced AI initiatives with confidence. Focus on continuous improvement, innovation, and sharing best practices across teams.",
};

export function calculateResults(answers: AssessmentAnswers, organization = ""): AssessmentResults {
  const categoryScores = calculateCategoryScores(answers);
  const overallScore = calculateOverallScore(categoryScores);
  const readinessLevel = getReadinessLevel(overallScore);

  return buildFullResults(
    assembleBaseResults(categoryScores, overallScore, readinessLevel),
    organization,
  );
}

export function assembleBaseResults(
  categoryScores: CategoryScore[],
  overallScore: number,
  readinessLevel: ReadinessLevel,
) {
  const sorted = [...categoryScores].sort((a, b) => b.score - a.score);
  const strengths = sorted
    .filter((c) => c.score >= 60)
    .slice(0, 3)
    .map((c) => `${c.label}: ${describeStrength(c.score)}`);

  const opportunities = sorted
    .filter((c) => c.score < 60)
    .reverse()
    .slice(0, 3)
    .map((c) => `${c.label}: ${describeOpportunity(c.score)}`);

  const { recommendations } = generateRecommendations(categoryScores);

  return {
    overallScore,
    readinessLevel,
    categoryScores,
    strengths: strengths.length > 0 ? strengths : ["Your assessment reveals areas to build upon across all categories."],
    opportunities:
      opportunities.length > 0
        ? opportunities
        : ["Continue refining practices to maintain your competitive advantage."],
    recommendations,
    summary: levelSummaries[readinessLevel],
  };
}

export function buildFullResults(
  base: ReturnType<typeof assembleBaseResults>,
  organization = "",
): AssessmentResults {
  return enrichResultsReport(base, organization);
}

function describeStrength(score: number): string {
  if (score >= 80) return "An organization-wide strength with mature practices";
  if (score >= 70) return "Well-established with room to optimize";
  return "A relative strength compared to other areas";
}

function describeOpportunity(score: number): string {
  if (score < 25) return "Critical gap requiring immediate attention";
  if (score < 40) return "Significant opportunity for foundational improvement";
  if (score < 50) return "Needs structured investment and leadership focus";
  return "Opportunity to formalize and scale existing efforts";
}
