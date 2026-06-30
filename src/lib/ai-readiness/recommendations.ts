import type { CategoryScore } from "./types";

const categoryRecommendations: Record<string, string[]> = {
  strategy: [
    "Develop a formal AI strategy document with executive sponsorship and defined business objectives.",
    "Establish an AI steering committee with leaders from business, IT, and operations.",
    "Create a phased investment plan that aligns AI initiatives with measurable organizational goals.",
  ],
  people: [
    "Launch organization-wide AI literacy training tailored to role-specific use cases.",
    "Publish clear AI usage policies covering acceptable tools, data handling, and external communication.",
    "Identify AI champions in each department to drive adoption and share best practices.",
  ],
  processes: [
    "Prioritize one high-impact workflow for an AI pilot program with clear success metrics.",
    "Map current workflows to identify automation opportunities with the highest ROI.",
    "Standardize knowledge assets—templates, playbooks, and reference materials—to enable AI-assisted work.",
  ],
  governance: [
    "Establish an AI governance framework covering privacy, human review, and vendor approval.",
    "Implement audit trails for AI-assisted outputs to support compliance and stakeholder trust.",
    "Define human-in-the-loop requirements for all customer- or decision-facing AI-generated content.",
  ],
  technology: [
    "Assess core business systems and data platforms for AI integration readiness.",
    "Consolidate approved AI tools under a vendor management process with security review.",
    "Invest in data infrastructure and API connectivity to enable seamless AI workflow integration.",
  ],
};

export { categoryRecommendations };

type RecommendationSet = {
  recommendations: string[];
};

export function generateRecommendations(categoryScores: CategoryScore[]): RecommendationSet {
  const sorted = [...categoryScores].sort((a, b) => a.score - b.score);
  const lowestCategories = sorted.slice(0, 2);
  const recommendations: string[] = [];

  for (const cat of lowestCategories) {
    const recs = categoryRecommendations[cat.category] ?? [];
    recommendations.push(...recs.slice(0, 2));
  }

  if (recommendations.length < 3) {
    recommendations.push(
      "Schedule a complimentary strategy consultation to develop a prioritized AI roadmap tailored to your organization.",
    );
  }

  return { recommendations: recommendations.slice(0, 5) };
}
