import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "What you can expect",
  description: `Transparency on deliverables, cadence, and outcomes when you work with ${site.name}—enterprise AI consulting and delivery.`,
};

/** Sets expectations for working together (complements the WordPress “what you can expect” page). */
export default function WhatYouCanExpectPage() {
  return (
    <>
      <Hero
        eyebrow="What you can expect"
        title={<>Clarity, cadence, and accountability</>}
        subtitle="You should always know what “good” looks like, what happens next, and who owns each risk. This page summarizes how we collaborate from kickoff through delivery—so there are fewer surprises and more forward motion."
        primaryCta={{ href: "/contact#contact-form", label: "Start a conversation" }}
        secondaryCta={{ href: "/how-we-work", label: "How we work" }}
      />

      <Section aria-label="Engagement expectations">
        <CardGrid
          eyebrow="Delivery"
          title="What you receive in a typical engagement"
          columns={2}
          items={[
            {
              title: "Explicit outcomes and success tests",
              description:
                "We document measurable definitions of success up front—so scope debates get resolved against outcomes, not opinions.",
            },
            {
              title: "Working artifacts, not only decks",
              description:
                "Architecture notes, control matrices, backlog slices, and runnable increments you can show sponsors and auditors.",
            },
            {
              title: "Transparent sequencing",
              description:
                "A roadmap with dependencies called out—especially where data, security, or vendor lead times constrain AI delivery.",
            },
            {
              title: "Governance by design",
              description:
                "Evidence and controls integrated into workflows—not a last-minute checklist that forces rework.",
            },
          ]}
        />
      </Section>

      <Section variant="muted" aria-label="Cadence">
        <div className="mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Cadence and communication</h2>
          <ul className="list-inside list-disc space-y-3 text-muted marker:text-accent">
            <li>Weekly or biweekly working sessions with decision makers, depending on phase and urgency.</li>
            <li>Written summaries after major workshops so alignment survives calendar churn.</li>
            <li>Clear escalation paths when trade-offs touch policy, budget, or customer commitments.</li>
            <li>Direct access to practitioners—no opaque “black box” team behind a single account manager.</li>
          </ul>
        </div>
      </Section>

      <Section aria-label="Call to action">
        <CTABanner
          title="Prefer to validate fit before a full proposal?"
          body="We can start with a short working session on your highest-risk unknown—then decide together whether a broader engagement makes sense."
          cta={{ href: "/contact#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
