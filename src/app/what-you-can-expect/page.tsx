import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "What you can expect",
  description: `Transparency on deliverables, cadence, and outcomes when you work with ${site.name}: enterprise AI consulting and delivery.`,
};

/** Sets expectations for working together (complements the WordPress “what you can expect” page). */
export default function WhatYouCanExpectPage() {
  return (
    <>
      <Hero
        eyebrow="What you can expect"
        title="Clarity, cadence, and accountability"
        subtitle="You should always know what “good” looks like, what happens next, and who owns each risk. This page summarizes how we collaborate from kickoff through delivery, so there are fewer surprises and more forward motion."
      />

      <Section variant="light" aria-label="Engagement expectations">
        <CardGrid
          eyebrow="Delivery"
          title="What you receive in a typical engagement"
          description="Concrete deliverables and decision-ready views of the work, so sponsors, security partners, and delivery teams share one picture of progress and risk."
          columns={2}
          items={[
            {
              title: "Explicit outcomes and success tests",
              description:
                "We document measurable definitions of success up front, so scope debates get resolved against outcomes, not opinions.",
            },
            {
              title: "Working artifacts, not only decks",
              description:
                "Architecture notes, control matrices, backlog slices, and runnable increments you can show sponsors and auditors.",
            },
            {
              title: "Transparent sequencing",
              description:
                "A roadmap with dependencies called out, especially where data, security, or vendor lead times constrain AI delivery.",
            },
            {
              title: "Governance by design",
              description:
                "Evidence and controls integrated into workflows, not a last-minute checklist that forces rework.",
            },
          ]}
        />
      </Section>

      <Section variant="dark" aria-label="Cadence">
        <div className="flex flex-col gap-12">
          <Reveal className="max-w-5xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Collaboration</p>
            <h2 className="text-4xl font-semibold tracking-tight text-foreground normal-case sm:text-5xl">
              {formatSectionHeadingTitle("Cadence and communication")}
            </h2>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">
              Predictable touchpoints reduce thrash. We match meeting depth and async updates to phase and urgency so
              executives stay informed without living in your calendar, and operators always know what changed and why.
            </p>
          </Reveal>
          <CardGrid
            columns={2}
            items={[
              {
                title: "Working sessions with decision makers",
                description:
                  "Weekly or biweekly cadence by default, tightened during launches or incidents and eased when you are in a steady execution lane. Agendas tie to decisions, not status theater.",
              },
              {
                title: "Written continuity after workshops",
                description:
                  "Major working sessions ship short summaries: decisions made, open questions, owners, and dates. Alignment survives turnover and rescheduling instead of living in one person’s notes.",
              },
              {
                title: "Escalation when trade-offs get hard",
                description:
                  "When choices touch policy, budget, brand, or customer commitments, we surface options with implications and a recommended path, plus a clear ask for who needs to decide by when.",
              },
              {
                title: "Practitioners in the room",
                description:
                  "You work with the people doing the work: architects, delivery leads, and specialists. No opaque “black box” bench behind a single account manager who cannot answer technical questions.",
              },
            ]}
          />
        </div>
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="Prefer to validate fit before a full proposal?"
          body="We can start with a short working session on your highest-risk unknown, then decide together whether a broader engagement makes sense."
          cta={{ href: "/contact#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
