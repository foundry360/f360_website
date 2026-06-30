"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { assessmentQuestions, categoryMeta, getCategoryForStep } from "@/lib/ai-readiness/questions";
import { assessmentPanelHeightClass } from "@/lib/ai-readiness/layout";
import type { AssessmentAnswers, AssessmentQuestion } from "@/lib/ai-readiness/types";

type AssessmentChatProps = {
  answers: AssessmentAnswers;
  currentStep: number;
  onAnswer: (questionId: string, score: number) => void;
  onStepChange: (step: number) => void;
  onComplete: (answers: AssessmentAnswers) => void;
};

function getOptionLabel(question: AssessmentQuestion, score: number) {
  return question.options.find((o) => o.score === score)?.label ?? "";
}

function AssistantAvatar() {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[0.65rem] font-bold text-accent"
      aria-hidden
    >
      F360
    </div>
  );
}

function AssistantBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar />
      <div className="min-w-0 max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-surface/70 px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm sm:max-w-[85%] sm:text-base">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[88%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-sm font-medium leading-relaxed text-accent-foreground shadow-sm sm:max-w-[75%] sm:text-base">
        {children}
      </div>
    </div>
  );
}

export function AssessmentChat({
  answers,
  currentStep,
  onAnswer,
  onStepChange,
  onComplete,
}: AssessmentChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const question = assessmentQuestions[currentStep];
  const total = assessmentQuestions.length;
  const category = getCategoryForStep(currentStep);
  const selectedScore = question ? answers[question.id] : undefined;
  const canProceed = selectedScore !== undefined;

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentStep, selectedScore, scrollToBottom]);

  const goNext = useCallback(() => {
    if (!canProceed) return;
    if (currentStep < total - 1) {
      onStepChange(currentStep + 1);
    } else {
      onComplete(answers);
    }
  }, [canProceed, currentStep, total, onStepChange, onComplete, answers]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  }, [currentStep, onStepChange]);

  const handleSelect = useCallback(
    (score: number) => {
      if (!question) return;
      onAnswer(question.id, score);
    },
    [question, onAnswer],
  );

  if (!question) return null;

  const prevCategory = currentStep > 0 ? getCategoryForStep(currentStep - 1) : null;
  const showCategoryIntro = prevCategory !== null && prevCategory !== category;

  return (
    <div
      className={`flex h-full min-h-0 max-h-[min(72vh,680px)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm lg:max-h-none ${assessmentPanelHeightClass}`}
    >
      <div className="shrink-0 border-b border-border bg-surface/40 px-4 py-3.5 sm:px-5">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
          {categoryMeta[category].label}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          Question {currentStep + 1} of {total}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-light flex min-h-0 flex-1 flex-col gap-4 overflow-y-scroll overscroll-contain px-4 py-5 [color-scheme:light] sm:gap-5 sm:px-6 sm:py-6"
        aria-live="polite"
        aria-relevant="additions"
      >
        {currentStep === 0 ? (
          <AssistantBubble>
            <p>
              Welcome to the {site.name} AI Readiness Assessment. I&apos;ll guide you through a short series of
              questions across five areas. Choose the response that best reflects your organization today.
            </p>
          </AssistantBubble>
        ) : null}

        {assessmentQuestions.slice(0, currentStep).map((pastQuestion, index) => {
          const score = answers[pastQuestion.id];
          const pastCategory = getCategoryForStep(index);
          const prevPastCategory = index > 0 ? getCategoryForStep(index - 1) : null;
          const showPastCategoryIntro = prevPastCategory !== null && prevPastCategory !== pastCategory;

          return (
            <div key={pastQuestion.id} className="space-y-4">
              {showPastCategoryIntro ? (
                <AssistantBubble>
                  <p className="text-muted">
                    Next, let&apos;s look at{" "}
                    <span className="font-medium text-foreground">{categoryMeta[pastCategory].label}</span>.
                  </p>
                </AssistantBubble>
              ) : null}
              <AssistantBubble>
                <p>{pastQuestion.prompt}</p>
                {pastQuestion.helpText ? (
                  <p className="mt-2 text-sm text-muted">{pastQuestion.helpText}</p>
                ) : null}
              </AssistantBubble>
              {score !== undefined ? (
                <UserBubble>{getOptionLabel(pastQuestion, score)}</UserBubble>
              ) : null}
            </div>
          );
        })}

        {showCategoryIntro ? (
          <AssistantBubble>
            <p className="text-muted">
              Next, let&apos;s look at{" "}
              <span className="font-medium text-foreground">{categoryMeta[category].label}</span>.
            </p>
          </AssistantBubble>
        ) : null}

        <AssistantBubble>
          <p>{question.prompt}</p>
          {question.helpText ? <p className="mt-2 text-sm text-muted">{question.helpText}</p> : null}
        </AssistantBubble>

        {selectedScore !== undefined ? (
          <UserBubble>{getOptionLabel(question, selectedScore)}</UserBubble>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-border bg-surface/30 px-4 py-4 sm:px-6">
        {selectedScore === undefined ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Select a response</p>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {question.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleSelect(option.score)}
                  className="flex min-h-[3rem] items-center justify-center rounded-xl border border-border bg-white px-1.5 py-2 text-center text-xs font-medium leading-tight text-foreground transition hover:border-accent/40 hover:bg-accent-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-[3.25rem] sm:text-sm"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="default" onClick={goPrev} disabled={currentStep === 0} className="px-4">
              ← Previous
            </Button>
            <Button size="default" onClick={goNext}>
              {currentStep < total - 1 ? "Next question →" : "View results →"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
