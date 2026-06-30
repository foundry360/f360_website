import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { accentAiInFormattedHeading } from "@/components/sections/accentAiTitle";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";
import { categoryMeta, CATEGORY_ORDER } from "@/lib/ai-readiness/questions";
import { AiReadinessLeadGateway } from "@/components/ai-readiness/AiReadinessLeadGateway";
import { AiReadinessStartButton } from "@/components/ai-readiness/AiReadinessStartButton";

const GET_STARTED_HASH = "#get-started";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "Evaluate your organization's AI readiness in minutes. Receive a personalized score, category breakdown, and practical recommendations from Foundry360.",
};

export default function AiReadinessLandingPage() {
  return (
    <>
      <Hero
        eyebrow="AI Readiness Assessment"
        title={accentAiInFormattedHeading("Is Your Organization Ready for AI?", "landing-hero")}
        subtitle="Evaluate your organization's AI readiness in just a few minutes. Receive a personalized readiness score, identify opportunities for improvement, and discover practical next steps for responsible AI adoption."
        cta={{ href: GET_STARTED_HASH, label: "Start Assessment" }}
        ctaSlot={<AiReadinessStartButton />}
      />

      <Section variant="light" aria-label="About this assessment" className="border-b border-border">
        <CardGrid
          eyebrow="Methodology"
          title="A consulting-grade assessment, not a marketing quiz"
          headerAlign="center"
          columns={3}
          items={[
            {
              title: "Five weighted dimensions",
              description:
                "Strategy, People, Business Processes, Governance & Risk, and Technology—each category contributes to your overall score with targeted recommendations.",
            },
            {
              title: "0–100 readiness score",
              description:
                "Each response is weighted to produce category scores and an overall AI Readiness Score. Results inform practical next steps, not software sales.",
            },
            {
              title: "3–5 minutes, resume anytime",
              description:
                "The assessment takes approximately 3–5 minutes to complete. Your progress is saved automatically so you can return and finish when ready.",
            },
          ]}
        />
      </Section>

      <Section
        id="get-started"
        variant="light"
        aria-label="Start the assessment"
        className="scroll-mt-24 border-b border-border"
      >
        <AiReadinessLeadGateway />
      </Section>

      <Section variant="dark" aria-label="Assessment categories">
        <CardGrid
          eyebrow="What we evaluate"
          title="Five dimensions of AI readiness"
          description="Each category contributes to your overall score and generates targeted recommendations for your organization."
          columns={3}
          items={CATEGORY_ORDER.map((id) => ({
            title: categoryMeta[id].label,
            description: categoryMeta[id].description,
          }))}
        />
      </Section>

      <Section variant="light" aria-label="What you receive">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Your results</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("Personalized insights, not generic advice")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted lg:mx-0">
            Upon completion, you will receive an overall readiness score, category breakdowns, identified strengths,
            improvement opportunities, and actionable recommendations tailored to your organization.
          </p>
        </div>

        <ol className="mx-auto mt-14 grid max-w-4xl auto-rows-fr gap-8 sm:grid-cols-3 lg:max-w-none">
          {[
            {
              title: "Readiness score",
              body: "A 0–100 score with a readiness level: Emerging, Developing, Operational, or Transforming.",
            },
            {
              title: "Category analysis",
              body: "Individual scores across Strategy, People, Processes, Governance, and Technology.",
            },
            {
              title: "Next steps",
              body: "Prioritized recommendations and the option to schedule a complimentary strategy consultation.",
            },
          ].map((item, i) => (
            <li key={item.title} className="flex h-full flex-col rounded-2xl border border-border bg-white p-6">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-dim text-xs font-bold tabular-nums text-accent"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted sm:text-base">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="Ready to evaluate your organization's AI readiness?"
          body="Take the assessment in just a few minutes. Your progress is saved automatically, and you can return anytime to complete it."
          cta={{ href: GET_STARTED_HASH, label: "Start Assessment" }}
          ctaSlot={<AiReadinessStartButton variant="dark" />}
        />
      </Section>
    </>
  );
}
