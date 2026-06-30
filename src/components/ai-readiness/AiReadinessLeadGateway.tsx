"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LeadCaptureForm } from "@/components/ai-readiness/LeadCaptureForm";
import { loadLeadInfo, saveLeadInfo } from "@/lib/ai-readiness/lead-storage";
import { AI_READINESS_ASSESSMENT_PATH } from "@/lib/ai-readiness/routes";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";
import type { LeadInfo } from "@/lib/ai-readiness/types";

const nextSteps = [
  {
    title: "Complete the assessment",
    body: "Answer questions across strategy, people, processes, governance, and technology. Takes about 3–5 minutes.",
  },
  {
    title: "Review your results",
    body: "Receive an overall readiness score, category breakdown, strengths, opportunities, and tailored recommendations.",
  },
  {
    title: "Plan your next move",
    body: "Use your results to prioritize next steps—or schedule a complimentary strategy consultation with our team.",
  },
];

export function AiReadinessLeadGateway() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [initialLead, setInitialLead] = useState<LeadInfo | undefined>();

  useEffect(() => {
    setInitialLead(loadLeadInfo() ?? undefined);
    setReady(true);
  }, []);

  function handleSubmit(lead: LeadInfo) {
    setIsSubmitting(true);
    setError(undefined);

    void (async () => {
      try {
        saveLeadInfo(lead);

        const res = await fetch("/api/ai-readiness/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead,
            ghlContactId: lead.ghlContactId,
          }),
        });

        if (res.ok) {
          const data = (await res.json()) as {
            contactId?: string | null;
            ghl?: { skipped?: boolean; reason?: string; action?: string };
          };
          if (data.contactId) {
            saveLeadInfo({ ...lead, ghlContactId: data.contactId });
          } else if (data.ghl && "skipped" in data.ghl) {
            console.warn("[ai-readiness] GHL lead sync skipped:", data.ghl.reason);
          }
        } else {
          console.warn("[ai-readiness] GHL lead sync failed:", await res.text());
        }

        router.push(AI_READINESS_ASSESSMENT_PATH);
      } catch {
        setError("Unable to save your information. Please try again.");
        setIsSubmitting(false);
      }
    })();
  }

  if (!ready) {
    return <div className="h-80 w-full" aria-hidden />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
      <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Get started</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
          {formatSectionHeadingTitle("Start your AI readiness assessment")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Enter your details to begin. Your progress is saved automatically, and you&apos;ll receive personalized
          results when you complete the assessment.
        </p>

        <div className="mt-10 flex-1">
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">What happens next</h3>
          <ol className="mt-6 space-y-6">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-dim text-xs font-bold tabular-nums text-accent"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 sm:p-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl">Your information</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            Tell us a bit about yourself so we can personalize your results. All fields are required.
          </p>
        </div>
        <LeadCaptureForm
          initialValues={initialLead}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  );
}
