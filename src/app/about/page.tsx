import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "About",
  description: `Who we are, how we work, and why ${site.name} focuses on governed enterprise AI from strategy through deployment. ${site.url.replace(/^https:\/\//, "")}.`,
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Foundry360"
        title="Accelerating your path to value"
        subtitle="We combine consulting judgment with delivery discipline: secure AI application development, compliance-aware architecture, and integration so intelligent systems actually land in production, not in a pilot graveyard."
      />

      <Section variant="light" aria-label="Who we are">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
              {formatSectionHeadingTitle("Who we are")}
            </h2>
            <p className="text-muted leading-relaxed">
              {site.name} is an enterprise AI consultancy. We help leadership teams translate ambition into programs that
              respect regulatory reality, security expectations, and the operational cost of being wrong.
            </p>
            <p className="text-muted leading-relaxed">
              Our work spans strategy, custom engineering, governance, and orchestration, so the same team can speak credibly
              to the boardroom and to the engineers shipping releases.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
              {formatSectionHeadingTitle("What makes us different")}
            </h2>
            <p className="text-muted leading-relaxed">
              Speed without depth creates rework. Depth without delivery misses the window. We aim for a blend of{" "}
              <strong className="font-medium text-foreground">velocity</strong>,{" "}
              <strong className="font-medium text-foreground">technical rigor</strong>, and{" "}
              <strong className="font-medium text-foreground">practical creativity</strong>, so services feel transformative,
              not theoretical.
            </p>
            <p className="text-muted leading-relaxed">
              That posture matches how we show up on our public site at{" "}
              <a href={site.url} className="font-medium text-accent underline-offset-2 hover:underline">
                {site.url.replace(/^https:\/\//, "")}
              </a>
              This Next.js experience is the evolution of that same story.
            </p>
          </div>
        </div>
      </Section>

      <Section variant="dark" aria-label="Capabilities at a glance">
        <CardGrid
          eyebrow="How we help"
          title="From assessment to operating discipline"
          description="These are the same pillars we publish on Services, here in compact form so you can see the full picture on one page."
          columns={2}
          items={[
            {
              title: "Strategy that funds the right bets",
              description:
                "Readiness work, use-case triage, and roadmaps that connect business outcomes to infrastructure and policy constraints.",
              href: "/what-we-do",
            },
            {
              title: "Engineering that survives production",
              description:
                "Custom AI-enabled applications with security-first patterns, testing discipline, and documentation your teams can inherit.",
              href: "/what-we-do",
            },
            {
              title: "Governance people can audit",
              description:
                "Controls, evidence, and operating procedures so models and automation strengthen your posture, not weaken it.",
              href: "/what-we-do",
            },
            {
              title: "Integration that reduces fragility",
              description:
                "Orchestration across providers and enterprise systems with clear ownership, telemetry, and rollback paths.",
              href: "/what-we-do",
            },
          ]}
        />
      </Section>

      <Section variant="light" aria-label="How we engage">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("How we engage")}
          </h2>
          <ol className="list-decimal space-y-4 pl-5 text-muted marker:font-semibold marker:text-accent">
            <li>
              <strong className="text-foreground">Align on outcomes and constraints</strong>: we start with what “good”
              means for revenue, risk, and operations, not tool preferences.
            </li>
            <li>
              <strong className="text-foreground">Prove value in thin slices</strong>: early increments are designed to be
              observable, reversible, and instructive for the broader program.
            </li>
            <li>
              <strong className="text-foreground">Scale with governance embedded</strong>: we avoid “compliance later”
              shortcuts that become expensive retrofit projects.
            </li>
          </ol>
        </div>
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="Want a candid read on your roadmap?"
          body="Bring your stakeholders and constraints. We will share where we agree, where we would sequence differently, and what a first delivery slice could look like."
          cta={{ href: "#contact-form", label: "Consult with an expert" }}
        />
      </Section>
    </>
  );
}
