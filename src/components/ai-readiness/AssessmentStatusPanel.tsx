import {
  assessmentQuestions,
  categoryMeta,
  CATEGORY_ORDER,
} from "@/lib/ai-readiness/questions";
import { assessmentPanelHeightClass } from "@/lib/ai-readiness/layout";
import type { AssessmentAnswers, AssessmentCategory } from "@/lib/ai-readiness/types";

type AssessmentStatusPanelProps = {
  currentStep: number;
  answers: AssessmentAnswers;
  currentCategory: AssessmentCategory;
};

function getCategoryAnsweredCount(category: AssessmentCategory, answers: AssessmentAnswers) {
  const questions = assessmentQuestions.filter((q) => q.category === category);
  return questions.filter((q) => answers[q.id] !== undefined).length;
}

function getCategoryQuestionCount(category: AssessmentCategory) {
  return assessmentQuestions.filter((q) => q.category === category).length;
}

type SectionStatusBarProps = {
  label: string;
  answered: number;
  total: number;
  isCurrent: boolean;
};

function SectionStatusBar({ label, answered, total, isCurrent }: SectionStatusBarProps) {
  const percent = total > 0 ? Math.round((answered / total) * 100) : 0;
  const isComplete = answered === total && total > 0;

  return (
    <li aria-current={isCurrent ? "step" : undefined}>
      <p
        className={[
          "mb-2 text-sm font-medium leading-snug",
          isCurrent ? "text-foreground" : isComplete ? "text-foreground/80" : "text-muted",
        ].join(" ")}
      >
        {label}
      </p>
      <div
        className={[
          "relative h-8 overflow-hidden rounded-full border bg-surface-elevated/60",
          isCurrent ? "border-accent/40 ring-1 ring-accent/20" : "border-border",
        ].join(" ")}
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${label}: ${answered} of ${total} complete`}
      >
        <div
          className={[
            "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out",
            isComplete ? "bg-accent" : isCurrent ? "bg-accent/70" : "bg-accent/40",
          ].join(" ")}
          style={{ width: `${percent}%` }}
        />
        <span className="relative z-10 flex h-full items-center justify-end px-3 text-xs font-semibold tabular-nums text-foreground">
          {answered}/{total}
        </span>
      </div>
    </li>
  );
}

export function AssessmentStatusPanel({
  currentStep,
  answers,
  currentCategory,
}: AssessmentStatusPanelProps) {
  const total = assessmentQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

  return (
    <aside
      className={`flex flex-col ${assessmentPanelHeightClass}`}
      aria-label="Assessment progress"
    >
      <div className="flex h-full min-h-0 flex-1 flex-col rounded-2xl border border-border bg-surface/80 p-6 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Progress</p>

        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-3xl font-bold tabular-nums text-foreground">{percent}%</span>
            <span className="text-sm tabular-nums text-muted">
              {answeredCount} of {total} answered
            </span>
          </div>
          <div
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Assessment progress: ${percent}%`}
          >
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted">
          Question <span className="font-semibold text-foreground">{currentStep + 1}</span> of{" "}
          <span className="font-semibold text-foreground">{total}</span>
        </p>

        <div className="mt-8 flex min-h-0 flex-1 flex-col border-t border-border/70 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Sections</p>
          <ol className="scrollbar-light mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto">
            {CATEGORY_ORDER.map((categoryId) => {
              const answered = getCategoryAnsweredCount(categoryId, answers);
              const categoryTotal = getCategoryQuestionCount(categoryId);
              const isCurrent = categoryId === currentCategory;

              return (
                <SectionStatusBar
                  key={categoryId}
                  label={categoryMeta[categoryId].label}
                  answered={answered}
                  total={categoryTotal}
                  isCurrent={isCurrent}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </aside>
  );
}
