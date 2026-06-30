import Anthropic from "@anthropic-ai/sdk";
import { CATEGORY_ORDER, assessmentQuestions, categoryMeta } from "./questions";
import { getReadinessLevel } from "./scoring";
import type {
  AssessmentAnswers,
  AssessmentCategory,
  CategoryScore,
  ReadinessLevel,
} from "./types";

export type ClaudeScoreResult = {
  overallScore: number;
  readinessLevel: ReadinessLevel;
  categoryScores: CategoryScore[];
};

const READINESS_LEVELS: ReadinessLevel[] = ["Emerging", "Developing", "Operational", "Transforming"];

const scoreToolSchema = {
  type: "object" as const,
  properties: {
    overallScore: {
      type: "integer",
      description: "Overall AI readiness score from 0 to 100.",
    },
    readinessLevel: {
      type: "string",
      enum: READINESS_LEVELS,
      description:
        "Emerging (0-39), Developing (40-59), Operational (60-79), or Transforming (80-100). Must align with overallScore.",
    },
    categoryScores: {
      type: "array",
      description: "Exactly one score for each of the five categories.",
      items: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: [...CATEGORY_ORDER],
          },
          score: {
            type: "integer",
            description: "Category score from 0 to 100.",
          },
        },
        required: ["category", "score"],
      },
    },
  },
  required: ["overallScore", "readinessLevel", "categoryScores"],
};

function buildAnswerSummary(answers: AssessmentAnswers, organization?: string): string {
  const lines = assessmentQuestions.map((question) => {
    const score = answers[question.id];
    const option = question.options.find((entry) => entry.score === score);
    const label = categoryMeta[question.category].label;

    return `- [${label}] ${question.prompt}
  Response: ${option?.label ?? "Not answered"} (reference maturity index: ${score ?? "n/a"}/100)`;
  });

  return [
    organization ? `Organization: ${organization}` : null,
    "",
    "Assessment responses:",
    ...lines,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeReadinessLevel(level: string, overallScore: number): ReadinessLevel {
  if (READINESS_LEVELS.includes(level as ReadinessLevel)) {
    return level as ReadinessLevel;
  }
  return getReadinessLevel(overallScore);
}

function parseClaudeScorePayload(payload: unknown): ClaudeScoreResult {
  if (!payload || typeof payload !== "object") {
    throw new Error("Claude returned an invalid score payload.");
  }

  const data = payload as {
    overallScore?: number;
    readinessLevel?: string;
    categoryScores?: { category?: string; score?: number }[];
  };

  if (typeof data.overallScore !== "number" || !Array.isArray(data.categoryScores)) {
    throw new Error("Claude score payload is missing required fields.");
  }

  const overallScore = clampScore(data.overallScore);
  const readinessLevel = normalizeReadinessLevel(data.readinessLevel ?? "", overallScore);

  const scoreByCategory = new Map<AssessmentCategory, number>();
  for (const entry of data.categoryScores) {
    if (!entry?.category || typeof entry.score !== "number") continue;
    if (!CATEGORY_ORDER.includes(entry.category as AssessmentCategory)) continue;
    scoreByCategory.set(entry.category as AssessmentCategory, clampScore(entry.score));
  }

  if (scoreByCategory.size !== CATEGORY_ORDER.length) {
    throw new Error("Claude did not return all five category scores.");
  }

  const categoryScores: CategoryScore[] = CATEGORY_ORDER.map((category) => ({
    category,
    label: categoryMeta[category].label,
    score: scoreByCategory.get(category) ?? 0,
  }));

  return {
    overallScore,
    readinessLevel,
    categoryScores,
  };
}

export async function scoreAssessmentWithClaude(
  answers: AssessmentAnswers,
  organization?: string,
): Promise<ClaudeScoreResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model,
    max_tokens: 1200,
    system: `You are an enterprise AI readiness analyst for Foundry360.

Score organizational AI readiness from assessment responses across five categories:
strategy, people, processes, governance, and technology.

Scoring rules:
- Each category score must be an integer from 0 to 100.
- Consider the full pattern of responses within each category, not a simple average.
- Weight governance and risk gaps heavily when responses suggest uncontrolled AI use.
- Weight technology and process scores based on operational readiness to deploy AI safely.
- overallScore should reflect holistic readiness, not necessarily a straight average of category scores.
- readinessLevel must match overallScore bands: Emerging 0-39, Developing 40-59, Operational 60-79, Transforming 80-100.

Return scores only via the submit_readiness_scores tool.`,
    messages: [
      {
        role: "user",
        content: buildAnswerSummary(answers, organization),
      },
    ],
    tools: [
      {
        name: "submit_readiness_scores",
        description: "Submit the final AI readiness scores.",
        input_schema: scoreToolSchema,
      },
    ],
    tool_choice: { type: "tool", name: "submit_readiness_scores" },
  });

  const toolBlock = message.content.find((block) => block.type === "tool_use");
  if (!toolBlock || toolBlock.type !== "tool_use") {
    throw new Error("Claude did not return readiness scores.");
  }

  return parseClaudeScorePayload(toolBlock.input);
}
