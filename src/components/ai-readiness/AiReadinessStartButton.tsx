"use client";

import { StartAssessmentLink } from "@/components/ai-readiness/StartAssessmentLink";
import { AI_READINESS_PATH } from "@/lib/ai-readiness/routes";

const GET_STARTED_HASH = `${AI_READINESS_PATH}#get-started`;

type AiReadinessStartButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "dark";
};

export function AiReadinessStartButton({ variant = "primary" }: AiReadinessStartButtonProps) {
  return (
    <StartAssessmentLink href={GET_STARTED_HASH} variant={variant} size="sm">
      Start Assessment
    </StartAssessmentLink>
  );
}
