import type { AssessmentResults } from "./types";

/** Sample report for `/ai-readiness/results?sample=true` preview. */
export const sampleAssessmentResults: AssessmentResults = {
  overallScore: 62,
  readinessLevel: "Developing",
  headline: "Moderate Progress, High Potential",
  summary:
    "Your organization has begun exploring AI but lacks consistent execution across departments. Some areas show promise while others remain manual or ad hoc.",
  executiveNarrative:
    "Example Organization shows an emerging AI readiness foundation with meaningful progress in strategy and technology oversight. The most important gaps are in governance and people practices, where policy maturity, training, and accountable execution need stronger definition to support responsible scaling.",
  categoryScores: [
    { category: "strategy", label: "Strategy", score: 74 },
    { category: "people", label: "People", score: 48 },
    { category: "processes", label: "Business Processes", score: 58 },
    { category: "governance", label: "Governance & Risk", score: 52 },
    { category: "technology", label: "Technology", score: 67 },
  ],
  strengths: [
    "Strategy: A relative strength compared to other areas",
    "Technology: A relative strength compared to other areas",
  ],
  opportunities: [
    "People: Significant opportunity for foundational improvement",
    "Governance & Risk: Needs structured investment and leadership focus",
  ],
  recommendations: [
    "Launch organization-wide AI literacy training tailored to role-specific use cases.",
    "Publish clear AI usage policies covering acceptable tools, data handling, and external communication.",
    "Establish an AI governance framework covering privacy, human review, and vendor approval.",
    "Implement audit trails for AI-assisted outputs to support compliance and stakeholder trust.",
  ],
  keyActions: [
    {
      order: 1,
      focus: "People Focus",
      summary:
        "Launch organization-wide AI literacy training tailored to role-specific use cases.",
    },
    {
      order: 2,
      focus: "Governance Focus",
      summary:
        "Establish an AI governance framework covering privacy, human review, and vendor approval.",
    },
    {
      order: 3,
      focus: "Process Focus",
      summary:
        "Prioritize one high-impact workflow for an AI pilot program with clear success metrics.",
    },
  ],
  domainInsights: [
    {
      category: "strategy",
      label: "Strategy",
      score: 74,
      analysis:
        "Leadership alignment is forming, but executive ownership and roadmap accountability need to become more explicit.",
      recommendedActions: [
        "Develop a formal AI strategy document with executive sponsorship and defined business objectives.",
        "Establish an AI steering committee with leaders from business, IT, and operations.",
      ],
    },
    {
      category: "people",
      label: "People",
      score: 48,
      analysis:
        "Workforce readiness appears early and may not yet give employees clear direction on acceptable use, training, and AI-assisted work.",
      recommendedActions: [
        "Launch organization-wide AI literacy training tailored to role-specific use cases.",
        "Publish clear AI usage policies covering acceptable tools, data handling, and external communication.",
      ],
    },
    {
      category: "processes",
      label: "Business Processes",
      score: 58,
      analysis:
        "Process opportunities are emerging, but workflows need consistent prioritization, success metrics, and knowledge standards.",
      recommendedActions: [
        "Prioritize one high-impact workflow for an AI pilot program with clear success metrics.",
        "Map current workflows to identify automation opportunities with the highest ROI.",
      ],
    },
    {
      category: "governance",
      label: "Governance & Risk",
      score: 52,
      analysis:
        "Governance practices are emerging, but AI use cases need consistent oversight, documentation, and escalation thresholds.",
      recommendedActions: [
        "Establish an AI governance framework covering privacy, human review, and vendor approval.",
        "Implement audit trails for AI-assisted outputs to support compliance and stakeholder trust.",
      ],
    },
    {
      category: "technology",
      label: "Technology",
      score: 67,
      analysis:
        "Technology foundations are improving, though integration readiness and approved tool governance should be made more consistent.",
      recommendedActions: [
        "Assess core business systems and data platforms for AI integration readiness.",
        "Consolidate approved AI tools under a vendor management process with security review.",
      ],
    },
  ],
  roadmap: [
    {
      step: "first",
      title: "People foundation",
      items: [
        "Launch organization-wide AI literacy training tailored to role-specific use cases.",
        "Publish clear AI usage policies covering acceptable tools, data handling, and external communication.",
      ],
    },
    {
      step: "next",
      title: "Governance & Risk and operating controls",
      items: [
        "Establish an AI governance framework covering privacy, human review, and vendor approval.",
        "Implement audit trails for AI-assisted outputs to support compliance and stakeholder trust.",
      ],
    },
    {
      step: "then",
      title: "Business Processes and accountable scale",
      items: [
        "Prioritize one high-impact workflow for an AI pilot program with clear success metrics.",
        "Map current workflows to identify automation opportunities with the highest ROI.",
      ],
    },
  ],
};
