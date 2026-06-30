import { STORAGE_KEY } from "./questions";
import { enrichResultsReport } from "./results-report";
import { calculateResults } from "./scoring";
import {
  clearAiReadinessSession,
  readSessionItem,
  removeSessionItem,
  writeSessionItem,
} from "./session-storage";
import type { AssessmentState } from "./types";

export const defaultAssessmentState: AssessmentState = {
  answers: {},
  currentStep: 0,
  phase: "assessment",
};

export function loadAssessmentState(): AssessmentState {
  if (typeof window === "undefined") return defaultAssessmentState;

  try {
    const raw = readSessionItem(STORAGE_KEY);
    if (!raw) return defaultAssessmentState;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const savedPhase = typeof parsed.phase === "string" ? parsed.phase : "assessment";
    const phase: AssessmentState["phase"] =
      savedPhase === "results" || savedPhase === "lead" ? "results" : "assessment";
    const answers = (parsed.answers as AssessmentState["answers"] | undefined) ?? {};
    const storedResults = parsed.results as AssessmentState["results"] | undefined;
    const computed =
      storedResults ?? (phase === "results" && Object.keys(answers).length > 0 ? calculateResults(answers) : undefined);
    const results = computed
      ? computed.headline
        ? computed
        : enrichResultsReport(computed)
      : undefined;
    if (results && phase === "results") {
      return {
        ...defaultAssessmentState,
        answers,
        currentStep: typeof parsed.currentStep === "number" ? parsed.currentStep : 0,
        phase: "results",
        results,
        submittedAt: typeof parsed.submittedAt === "string" ? parsed.submittedAt : undefined,
        resultId: typeof parsed.resultId === "string" ? parsed.resultId : undefined,
      };
    }
    return {
      ...defaultAssessmentState,
      answers,
      currentStep: typeof parsed.currentStep === "number" ? parsed.currentStep : 0,
      phase: "assessment",
    };
  } catch {
    return defaultAssessmentState;
  }
}

export function saveAssessmentState(state: AssessmentState): void {
  if (typeof window === "undefined") return;

  try {
    writeSessionItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function clearAssessmentState(): void {
  removeSessionItem(STORAGE_KEY);
}

export { clearAiReadinessSession };
