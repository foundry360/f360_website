import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "How we work",
  description: `The ELEV8 framework, Insights360-style delivery, and guiding principles behind ${site.name} engagements, aligned with ${site.url.replace(/^https:\/\//, "")}/how-we-work/.`,
};

/** Process page — mirrors foundry360.us /how-we-work/ themes (ELEV8, workshops, holistic design). */
export default function HowWeWorkPage() {
  return (
    <>
      <Hero
        eyebrow="How we work"
        title="Your path to enterprise AI deployment"
        subtitle="AI-powered applications only matter when they ship securely. We combine structured frameworks, hands-on workshops, and integrated teams so understanding turns into vision, and vision turns into execution."
      />

      <Section variant="light" aria-label="Frameworks">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.15fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,2.35fr)]">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">The framework</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">ELEV8</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">
              ELEV8 is our structured path from deep understanding to clear vision and effective execution. It is designed for
              complex stakeholder environments where “more AI” is not a strategy: clarity, sequencing, and measurable outcomes
              are.
            </p>
          </div>
          <div className="flex min-w-0 items-center justify-center">
            <Image
              src="/images/elev8.png"
              alt="ELEV8 framework diagram: structured path from understanding through vision to execution"
              width={2234}
              height={1095}
              className="h-auto w-full min-w-0 object-contain"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 68vw, 70vw"
            />
          </div>
        </div>
      </Section>

      <Section variant="dark" aria-label="Guiding principles">
        <CardGrid
          eyebrow="Guiding principles"
          title={
            <>
              {formatSectionHeadingTitle("How we run engagements")}{" "}
              <span className="normal-case">Day-to-Day</span>
            </>
          }
          columns={2}
          items={[
            {
              title: "Unified strategy team",
              description:
                "Client and Foundry360 resources operate as one integrated team: shared ownership, shared outcomes, fewer handoffs that lose context.",
            },
            {
              title: "Workshop-driven alignment",
              description:
                "Frequent working sessions with business stakeholders so direction is co-created, not slideware delivered in a vacuum.",
            },
            {
              title: "Agile, visual, creative methods",
              description:
                "Show, do not tell: prototypes, architecture sketches, and concrete artifacts that make trade-offs tangible for non-technical leaders.",
            },
            {
              title: "Holistic experience and solution design",
              description:
                "Customer experience, business strategy, and technology architecture treated as one system, not three competing projects.",
            },
            {
              title: "Practical, actionable vision",
              description:
                "Ambition anchored in what your organization can operationalize next quarter, not a five-year fairy tale.",
            },
            {
              title: "Strategic roadmap with quick wins",
              description:
                "A credible long-term direction paired with immediate, high-impact slices that build trust and fund the next step.",
            },
          ]}
        />
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="See how this would look for your program"
          body="Walk us through your current initiative. We will map where ELEV8-style structure would reduce risk and accelerate clarity."
          cta={{ href: "/contact#contact-form", label: "Talk to an expert" }}
        />
      </Section>
    </>
  );
}
