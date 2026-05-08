import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we work",
  description: `The ELEV8 framework, Insights360-style delivery, and guiding principles behind ${site.name} engagements—aligned with ${site.url.replace(/^https:\/\//, "")}/how-we-work/.`,
};

/** Process page — mirrors foundry360.us /how-we-work/ themes (ELEV8, workshops, holistic design). */
export default function HowWeWorkPage() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        title={<>Your path to enterprise AI deployment</>}
        subtitle="AI-powered applications only matter when they ship securely. We combine structured frameworks, hands-on workshops, and integrated teams so understanding turns into vision—and vision turns into execution."
        primaryCta={{ href: "/contact#contact-form", label: "Get in touch" }}
        secondaryCta={{ href: "/what-you-can-expect", label: "What you can expect" }}
      />

      <Section aria-label="Frameworks">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/60 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Framework</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">The ELEV8 framework</h2>
            <p className="mt-4 text-muted leading-relaxed">
              ELEV8 is our structured path from deep understanding to clear vision and effective execution. It is designed for
              complex stakeholder environments where “more AI” is not a strategy—clarity, sequencing, and measurable outcomes
              are.
            </p>
            <p className="mt-4 text-sm text-muted">
              We use it to align sponsors, surface risks early, and keep delivery tied to business impact—not vendor milestones
              alone.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/60 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Platform lens</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Insights360-style delivery</h2>
            <p className="mt-4 text-muted leading-relaxed">
              At the core is a commitment to blending advanced AI capabilities with human expertise—so recommendations stay
              data-driven while remaining contextually practical for your operators, legal partners, and customers.
            </p>
            <p className="mt-4 text-sm text-muted">
              The goal is not novelty; it is decisions your organization can defend and systems your teams can run.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="muted" aria-label="Guiding principles">
        <CardGrid
          eyebrow="Guiding principles"
          title="How we run engagements day to day"
          columns={2}
          items={[
            {
              title: "Unified strategy team",
              description:
                "Client and Foundry360 resources operate as one integrated team—shared ownership, shared outcomes, fewer handoffs that lose context.",
            },
            {
              title: "Workshop-driven alignment",
              description:
                "Frequent working sessions with business stakeholders so direction is co-created, not slideware delivered in a vacuum.",
            },
            {
              title: "Agile, visual, creative methods",
              description:
                "Show, do not tell—prototypes, architecture sketches, and concrete artifacts that make trade-offs tangible for non-technical leaders.",
            },
            {
              title: "Holistic experience and solution design",
              description:
                "Customer experience, business strategy, and technology architecture treated as one system—not three competing projects.",
            },
            {
              title: "Practical, actionable vision",
              description:
                "Ambition anchored in what your organization can operationalize next quarter—not a five-year fairy tale.",
            },
            {
              title: "Strategic roadmap with quick wins",
              description:
                "A credible long-term direction paired with immediate, high-impact slices that build trust and fund the next step.",
            },
          ]}
        />
      </Section>

      <Section aria-label="Call to action">
        <CTABanner
          title="See how this would look for your program"
          body="Walk us through your current initiative—we will map where ELEV8-style structure would reduce risk and accelerate clarity."
          cta={{ href: "/contact#contact-form", label: "Talk to an expert" }}
        />
      </Section>
    </>
  );
}
