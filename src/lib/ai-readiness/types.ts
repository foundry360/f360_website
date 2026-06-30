export type AssessmentCategory =
  | "strategy"
  | "people"
  | "processes"
  | "governance"
  | "technology";

export type ReadinessLevel = "Emerging" | "Developing" | "Operational" | "Transforming";

export type QuestionOption = {
  label: string;
  score: number;
};

export type AssessmentQuestion = {
  id: string;
  category: AssessmentCategory;
  prompt: string;
  helpText?: string;
  options: QuestionOption[];
};

export type CategoryMeta = {
  id: AssessmentCategory;
  label: string;
  description: string;
};

export type AssessmentAnswers = Record<string, number>;

export type LeadInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  title: string;
  organizationSize: string;
  consultationRequested: boolean;
  ghlContactId?: string;
};

export type CategoryScore = {
  category: AssessmentCategory;
  label: string;
  score: number;
};

export type DomainInsight = {
  category: AssessmentCategory;
  label: string;
  score: number;
  analysis: string;
  recommendedActions: string[];
};

export type KeyAction = {
  order: number;
  focus: string;
  summary: string;
};

export type RoadmapPhase = {
  step: "first" | "next" | "then";
  title: string;
  items: string[];
};

export type AssessmentResults = {
  overallScore: number;
  readinessLevel: ReadinessLevel;
  categoryScores: CategoryScore[];
  strengths: string[];
  opportunities: string[];
  recommendations: string[];
  summary: string;
  headline: string;
  executiveNarrative: string;
  keyActions: KeyAction[];
  domainInsights: DomainInsight[];
  roadmap: RoadmapPhase[];
};

export type AssessmentState = {
  answers: AssessmentAnswers;
  currentStep: number;
  phase: "assessment" | "results";
  results?: AssessmentResults;
  submittedAt?: string;
  resultId?: string;
};
