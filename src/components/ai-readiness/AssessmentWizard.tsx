"use client";

import { AssessmentStatusPanel } from "@/components/ai-readiness/AssessmentStatusPanel";
import { AssessmentChat } from "@/components/ai-readiness/AssessmentChat";
import { assessmentQuestions, getCategoryForStep } from "@/lib/ai-readiness/questions";
import type { AssessmentAnswers } from "@/lib/ai-readiness/types";

type AssessmentWizardProps = {
  answers: AssessmentAnswers;
  currentStep: number;
  onAnswer: (questionId: string, score: number) => void;
  onStepChange: (step: number) => void;
  onComplete: (answers: AssessmentAnswers) => void;
};

export function AssessmentWizard({
  answers,
  currentStep,
  onAnswer,
  onStepChange,
  onComplete,
}: AssessmentWizardProps) {
  const category = getCategoryForStep(currentStep);

  if (!assessmentQuestions[currentStep]) return null;

  return (
    <div className="grid h-full min-h-0 gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-stretch lg:gap-12 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-16">
      <AssessmentStatusPanel
        currentStep={currentStep}
        answers={answers}
        currentCategory={category}
      />

      <div className="flex h-full min-h-0 min-w-0 flex-col">
        <AssessmentChat
          answers={answers}
          currentStep={currentStep}
          onAnswer={onAnswer}
          onStepChange={onStepChange}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
