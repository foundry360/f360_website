import { categoryMeta } from "./questions";
import { categoryRecommendations } from "./recommendations";
import type {
  AssessmentCategory,
  AssessmentResults,
  CategoryScore,
  DomainInsight,
  KeyAction,
  ReadinessLevel,
  RoadmapPhase,
} from "./types";

const levelHeadlines: Record<ReadinessLevel, string> = {
  Emerging: "Early Foundation, Significant Opportunity",
  Developing: "Moderate Progress, High Potential",
  Operational: "Strong Foundation, Ready to Scale",
  Transforming: "Advanced Readiness, Continuous Evolution",
};

const focusLabels: Record<AssessmentCategory, string> = {
  strategy: "Strategy Focus",
  people: "People Focus",
  processes: "Process Focus",
  governance: "Governance Focus",
  technology: "Technology Focus",
};

function analyzeDomain(score: number): string {
  if (score >= 80) {
    return "This area demonstrates mature practices and can serve as a model for scaling AI responsibly across the organization.";
  }
  if (score >= 65) {
    return "Solid progress is visible, though executive ownership, documentation, and operating rhythm could be made more explicit.";
  }
  if (score >= 50) {
    return "Foundational elements are emerging, but standards, accountability, and repeatable practices need stronger definition.";
  }
  if (score >= 35) {
    return "Early activity exists, but consistent policies, controls, and cross-functional alignment remain limited.";
  }
  return "This area requires immediate foundational investment before AI use cases can scale with confidence.";
}

function buildExecutiveNarrative(
  organization: string,
  readinessLevel: ReadinessLevel,
  overallScore: number,
  categoryScores: CategoryScore[],
): string {
  const org = organization || "Your organization";
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);
  const weakest = sorted.slice(0, 2).map((c) => c.label.toLowerCase());
  const strongest = sorted
    .slice()
    .reverse()
    .slice(0, 2)
    .map((c) => c.label.toLowerCase());

  const gapPhrase =
    weakest.length >= 2
      ? `${weakest[0]} and ${weakest[1]}`
      : weakest[0] ?? "foundational controls";

  const strengthPhrase =
    strongest.length >= 2
      ? `meaningful progress in ${strongest[0]} and ${strongest[1]}`
      : `progress in ${strongest[0] ?? "key areas"}`;

  if (readinessLevel === "Emerging") {
    return `${org} shows an emerging AI readiness foundation with ${strengthPhrase}. The most important gaps are in ${gapPhrase}, where clearer ownership, policy maturity, and operating standards should be established before scaling AI more broadly.`;
  }
  if (readinessLevel === "Developing") {
    return `${org} shows an emerging AI readiness foundation with ${strengthPhrase}. The most important gaps are in ${gapPhrase}, where policy maturity, risk tiering, and accountable execution need stronger definition to support responsible scaling.`;
  }
  if (readinessLevel === "Operational") {
    return `${org} demonstrates solid AI readiness with ${strengthPhrase}. The organization appears ready to move from targeted AI activity toward a more governed operating model, while closing remaining gaps in ${gapPhrase}.`;
  }
  return `${org} demonstrates advanced AI readiness with ${strengthPhrase}. Focus next on continuous improvement, innovation, and converting strong governance into measurable business outcomes while refining ${gapPhrase}.`;
}

function buildKeyActions(categoryScores: CategoryScore[]): KeyAction[] {
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);

  return sorted.slice(0, 3).map((cat, index) => {
    const recs = categoryRecommendations[cat.category] ?? [];
    return {
      order: index + 1,
      focus: focusLabels[cat.category],
      summary: recs[0] ?? `Strengthen ${cat.label.toLowerCase()} practices to improve overall readiness.`,
    };
  });
}

function buildDomainInsights(categoryScores: CategoryScore[]): DomainInsight[] {
  return categoryScores.map((cat) => {
    const recs = categoryRecommendations[cat.category] ?? [];
    return {
      category: cat.category,
      label: cat.label,
      score: cat.score,
      analysis: analyzeDomain(cat.score),
      recommendedActions: recs.slice(0, 2),
    };
  });
}

function buildRoadmap(categoryScores: CategoryScore[]): RoadmapPhase[] {
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);
  const primary = sorted[0]?.category ?? "governance";
  const secondary = sorted[1]?.category ?? "processes";
  const tertiary = sorted[2]?.category ?? "technology";

  const phaseFor = (category: AssessmentCategory, step: "first" | "next" | "then") => {
    const label = categoryMeta[category].label;
    const recs = categoryRecommendations[category] ?? [];
    const titles: Record<"first" | "next" | "then", string> = {
      first: `${label} foundation`,
      next: `${label} and operating controls`,
      then: `${label} and accountable scale`,
    };
    return {
      step,
      title: titles[step],
      items: recs.slice(0, 2),
    };
  };

  return [phaseFor(primary, "first"), phaseFor(secondary, "next"), phaseFor(tertiary, "then")];
}

export function enrichResultsReport(
  results: Omit<
    AssessmentResults,
    "headline" | "executiveNarrative" | "keyActions" | "domainInsights" | "roadmap"
  >,
  organization = "",
): AssessmentResults {
  return {
    ...results,
    headline: levelHeadlines[results.readinessLevel],
    executiveNarrative: buildExecutiveNarrative(
      organization,
      results.readinessLevel,
      results.overallScore,
      results.categoryScores,
    ),
    keyActions: buildKeyActions(results.categoryScores),
    domainInsights: buildDomainInsights(results.categoryScores),
    roadmap: buildRoadmap(results.categoryScores),
  };
}
