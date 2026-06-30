import type { Metadata } from "next";
import { Suspense } from "react";
import { AiReadinessResults } from "@/components/ai-readiness/AiReadinessResults";

import { ResultsCalculatingPanel } from "@/components/ai-readiness/ResultsCalculatingPanel";

export const metadata: Metadata = {
  title: "Your AI Readiness Results",
  description:
    "Review your personalized AI readiness score, category breakdown, recommended actions, and prioritized roadmap from Foundry360.",
};

export default function AiReadinessResultsPage() {
  const calendarUrl = process.env.GHL_CALENDAR_URL ?? process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? "";

  return (
    <Suspense fallback={<ResultsCalculatingPanel />}>
      <AiReadinessResults calendarUrl={calendarUrl} />
    </Suspense>
  );
}
