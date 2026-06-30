import type { Metadata } from "next";
import { AiReadinessAssessment } from "@/components/ai-readiness/AiReadinessAssessment";

export const metadata: Metadata = {
  title: "Take the Assessment",
  description:
    "Complete the Foundry360 AI Readiness Assessment. Answer questions across strategy, people, processes, governance, and technology.",
};

export default function AiReadinessAssessmentPage() {
  return <AiReadinessAssessment />;
}
