import type { AssessmentQuestion, CategoryMeta, QuestionOption } from "./types";

export const STORAGE_KEY = "f360-ai-readiness-assessment-v2";

export const CATEGORY_ORDER = [
  "strategy",
  "people",
  "processes",
  "governance",
  "technology",
] as const;

export const categoryMeta: Record<(typeof CATEGORY_ORDER)[number], CategoryMeta> = {
  strategy: {
    id: "strategy",
    label: "Strategy",
    description: "Leadership direction, objectives, and investment planning for AI adoption.",
  },
  people: {
    id: "people",
    label: "People",
    description: "Workforce adoption, training, and AI usage policies across the organization.",
  },
  processes: {
    id: "processes",
    label: "Business Processes",
    description: "Workflow readiness across customer-facing, operational, and knowledge-intensive work.",
  },
  governance: {
    id: "governance",
    label: "Governance & Risk",
    description: "Privacy, compliance oversight, vendor controls, and auditability.",
  },
  technology: {
    id: "technology",
    label: "Technology",
    description: "Systems, integrations, automation tools, and AI solutions in use.",
  },
};

const scale = (
  labels: [string, string, string, string, string],
): QuestionOption[] => [
  { label: labels[0], score: 0 },
  { label: labels[1], score: 25 },
  { label: labels[2], score: 50 },
  { label: labels[3], score: 75 },
  { label: labels[4], score: 100 },
];

const strategyDocumentOptions = scale([
  "None",
  "Informal",
  "Draft",
  "Approved",
  "Active",
]);

const leadershipSponsorshipOptions = scale([
  "None",
  "Passive",
  "Selective",
  "Active",
  "Executive-led",
]);

const businessObjectivesOptions = scale([
  "None",
  "In discussion",
  "Defined",
  "Pilot KPIs",
  "Org-wide KPIs",
]);

const investmentPlanOptions = scale([
  "None",
  "Ad hoc",
  "Pilot budget",
  "Priority budget",
  "Multi-year plan",
]);

const adoptionOptions = scale([
  "None",
  "Few users",
  "Some teams",
  "Most teams",
  "Org-wide",
]);

const trainingProgramOptions = scale([
  "None",
  "Self-serve",
  "On request",
  "Role-based",
  "Org-wide",
]);

const policyOptions = scale([
  "None",
  "Informal",
  "Draft",
  "Published",
  "Enforced",
]);

const processReadinessOptions = scale([
  "Not evaluated",
  "Manual",
  "Some automation",
  "AI-assisted",
  "AI-optimized",
]);

const knowledgeMaturityOptions = scale([
  "Siloed",
  "Ad hoc",
  "Partial",
  "Structured",
  "AI-ready",
]);

const governanceComprehensivenessOptions = scale([
  "None",
  "Minimal",
  "Basic",
  "Broad",
  "Mature",
]);

const safeguardIntegrationOptions = scale([
  "None",
  "Planned",
  "Partial",
  "Strong",
  "Full",
]);

const humanReviewOptions = scale([
  "None",
  "In progress",
  "Some cases",
  "Critical outputs",
  "Fully defined",
]);

const complianceOversightOptions = scale([
  "None",
  "Informal",
  "Select initiatives",
  "Established",
  "Embedded",
]);

const vendorApprovalOptions = scale([
  "None",
  "Informal",
  "Basic",
  "Formal",
  "Full sign-off",
]);

const auditabilityOptions = scale([
  "Not yet",
  "Limited",
  "Partial",
  "Broad",
  "Full audit trail",
]);

const systemModernityOptions = scale([
  "Legacy",
  "Mostly legacy",
  "Mixed",
  "Mostly modern",
  "Cloud-native",
]);

const infrastructureMaturityOptions = scale([
  "Outdated",
  "Basic",
  "Fragmented",
  "Mature",
  "AI-ready",
]);

const automationLevelOptions = scale([
  "None",
  "Point solutions",
  "Some workflows",
  "Multi-dept",
  "Enterprise-wide",
]);

const aiSolutionsDeploymentOptions = scale([
  "None",
  "Pilots only",
  "Select areas",
  "Broad use",
  "Core operations",
]);

const integrationCapabilityOptions = scale([
  "Siloed",
  "Limited",
  "Partial APIs",
  "Mostly integrated",
  "Fully integrated",
]);

const dataReadinessOptions = scale([
  "Siloed",
  "Basic",
  "Partial",
  "Governed",
  "AI-optimized",
]);

export const assessmentQuestions: AssessmentQuestion[] = [
  // Strategy (4)
  {
    id: "strategy-ai-plan",
    category: "strategy",
    prompt: "Does your organization have a documented AI strategy?",
    helpText: "A written plan outlining goals, priorities, and a roadmap for responsible AI adoption.",
    options: strategyDocumentOptions,
  },
  {
    id: "strategy-leadership",
    category: "strategy",
    prompt: "How actively does senior leadership sponsor AI initiatives?",
    helpText: "Visible executive support, budget allocation, and accountability for AI outcomes.",
    options: leadershipSponsorshipOptions,
  },
  {
    id: "strategy-objectives",
    category: "strategy",
    prompt: "Have you defined measurable business objectives for AI?",
    helpText: "Clear KPIs tied to efficiency, customer experience, revenue, or risk reduction.",
    options: businessObjectivesOptions,
  },
  {
    id: "strategy-investment",
    category: "strategy",
    prompt: "Do you have an AI investment plan or dedicated budget?",
    options: investmentPlanOptions,
  },

  // People (4)
  {
    id: "people-leader-adoption",
    category: "people",
    prompt: "What is the level of adoption among leaders and domain experts?",
    helpText: "Executives, managers, and subject-matter experts using AI in their daily work.",
    options: adoptionOptions,
  },
  {
    id: "people-workforce-adoption",
    category: "people",
    prompt: "What is the level of adoption across the broader workforce?",
    options: adoptionOptions,
  },
  {
    id: "people-training",
    category: "people",
    prompt: "Do you provide formal AI training for employees?",
    options: trainingProgramOptions,
  },
  {
    id: "people-policies",
    category: "people",
    prompt: "Do you have written AI usage policies for employees?",
    options: policyOptions,
  },

  // Processes (6)
  {
    id: "process-intake",
    category: "processes",
    prompt: "How ready is customer intake and onboarding for AI enhancement?",
    options: processReadinessOptions,
  },
  {
    id: "process-content",
    category: "processes",
    prompt: "How ready are document and content creation workflows for AI assistance?",
    options: processReadinessOptions,
  },
  {
    id: "process-research",
    category: "processes",
    prompt: "How ready is research and analysis work for AI augmentation?",
    options: processReadinessOptions,
  },
  {
    id: "process-work-management",
    category: "processes",
    prompt: "How ready is work and project management for intelligent automation?",
    options: processReadinessOptions,
  },
  {
    id: "process-knowledge",
    category: "processes",
    prompt: "How mature is your knowledge management for AI leverage?",
    helpText: "Structured templates, playbooks, and institutional knowledge accessible to AI systems.",
    options: knowledgeMaturityOptions,
  },
  {
    id: "process-admin",
    category: "processes",
    prompt: "How ready are back-office and administrative operations for AI automation?",
    options: processReadinessOptions,
  },

  // Governance & Risk (6)
  {
    id: "governance-policies",
    category: "governance",
    prompt: "How comprehensive are your AI governance policies?",
    options: governanceComprehensivenessOptions,
  },
  {
    id: "governance-privacy",
    category: "governance",
    prompt: "How well are data privacy and confidentiality safeguards integrated with AI use?",
    options: safeguardIntegrationOptions,
  },
  {
    id: "governance-human-review",
    category: "governance",
    prompt: "Are human review requirements defined for AI-generated outputs?",
    options: humanReviewOptions,
  },
  {
    id: "governance-compliance",
    category: "governance",
    prompt: "How established is compliance oversight for AI initiatives?",
    options: complianceOversightOptions,
  },
  {
    id: "governance-vendor",
    category: "governance",
    prompt: "Do you have a vendor approval process for AI tools and platforms?",
    options: vendorApprovalOptions,
  },
  {
    id: "governance-auditability",
    category: "governance",
    prompt: "Can AI-assisted decisions and outputs be audited and traced?",
    options: auditabilityOptions,
  },

  // Technology (6)
  {
    id: "tech-core-systems",
    category: "technology",
    prompt: "How modern are your core business systems?",
    helpText: "CRM, ERP, operations platforms—cloud-native, API-enabled, and AI-integration ready.",
    options: systemModernityOptions,
  },
  {
    id: "tech-document-management",
    category: "technology",
    prompt: "How mature is your document and content management infrastructure?",
    options: infrastructureMaturityOptions,
  },
  {
    id: "tech-automation",
    category: "technology",
    prompt: "What is your current level of workflow automation?",
    options: automationLevelOptions,
  },
  {
    id: "tech-ai-solutions",
    category: "technology",
    prompt: "How extensively is your organization using AI solutions?",
    helpText: "Productivity tools, copilots, automation, and custom AI applications—across teams and workflows.",
    options: aiSolutionsDeploymentOptions,
  },
  {
    id: "tech-integration",
    category: "technology",
    prompt: "How mature is your system integration capability?",
    helpText: "Ability to connect core systems, data platforms, and AI tools.",
    options: integrationCapabilityOptions,
  },
  {
    id: "tech-data-readiness",
    category: "technology",
    prompt: "How ready is your data infrastructure for AI workloads?",
    options: dataReadinessOptions,
  },
];

export const ORGANIZATION_SIZE_OPTIONS = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,000+ employees",
] as const;

/** @deprecated Use ORGANIZATION_SIZE_OPTIONS */
export const FIRM_SIZE_OPTIONS = ORGANIZATION_SIZE_OPTIONS;

export function getQuestionIndex(questionId: string): number {
  return assessmentQuestions.findIndex((q) => q.id === questionId);
}

export function getCategoryForStep(step: number) {
  return assessmentQuestions[step]?.category ?? "strategy";
}
