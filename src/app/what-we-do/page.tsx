import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "What we do",
  description: `How ${site.name} delivers AI governance, fractional leadership, custom development, and strategic advisory, aligned with ${site.url.replace(/^https:\/\//, "")}/what-we-do/.`,
};

/** Primary “offer” page — mirrors foundry360.us /what-we-do/ structure (rewritten, not scraped HTML). */
export default function WhatWeDoPage() {
  return (
    <>
      <Hero
        eyebrow="What we do"
        title="Shaping the future of business"
        subtitle="We deliver technology strategies that create measurable value by turning AI concepts into governed, production-ready systems with orchestration, compliance automation, and integration your teams can run."
      />

      <Section variant="light" aria-label="Core offerings">
        <CardGrid
          eyebrow="Capabilities"
          title="Four ways we engage"
          description="Mix governance, leadership, engineering, and advisory so you can scale support as adoption matures."
          columns={2}
          items={[
            {
              title: "AI governance as a service",
              description:
                "Enterprise AI orchestration and governance infrastructure without building a full in-house control tower from scratch: automated compliance checks, evidence-friendly audit trails, and multi-provider integration with clear data boundaries.",
            },
            {
              title: "Fractional AI leadership",
              description:
                "Seasoned architects and compliance-aware leaders on a part-time or project basis: strategy, oversight, and hands-on steering without a permanent C-level seat for every specialty.",
            },
            {
              title: "Custom application development",
              description:
                "Secure AI applications end to end: compliant architectures, governance hooks in the codebase, and cloud-native deployment patterns that survive real traffic and audits.",
            },
            {
              title: "Strategic AI advisory",
              description:
                "Ongoing counsel as operations mature: regulatory shifts, infrastructure tuning, and roadmap decisions so programs stay aligned with both risk posture and business outcomes.",
            },
          ]}
        />
      </Section>

      <Section variant="dark" aria-label="Flexible consulting">
        <div className="mx-auto min-w-0 w-full max-w-7xl space-y-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Flexible options</p>
          <div className="max-sm:-mx-1 max-sm:overflow-x-auto max-sm:pb-1 max-sm:[-ms-overflow-style:none] max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:overflow-visible">
            <h2 className="mx-auto w-max max-w-none whitespace-nowrap px-1 text-4xl font-semibold tracking-tight text-foreground normal-case sm:px-0 sm:text-5xl">
              {formatSectionHeadingTitle("Consulting models for every stage of growth")}
            </h2>
          </div>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted">
            Whether you need architecture guidance, dedicated build capacity, continuous compliance support, or full platform
            integration, we assemble the right mix of governance-as-a-service, fractional leadership, project delivery, and
            advisory, so expertise shows up when you need it and scales as AI adoption deepens.
          </p>
        </div>
      </Section>

      <Section variant="light" aria-label="Who we work with">
        <CardGrid
          eyebrow="Who we work with"
          title="From first production system to enterprise-wide scale"
          description="We partner with organizations at different maturity levels, always with the same bar for security, evidence, and operational clarity."
          columns={3}
          headerAlign="center"
          centeredHeaderWide
          titleSingleLine
          items={[
            {
              title: "Early stage",
              description:
                "Foundational infrastructure to turn concepts into production: architecture, compliance guardrails, and first applications that establish a secure baseline.",
            },
            {
              title: "Growth",
              description:
                "Accelerate adoption across teams with repeatable pipelines, governance automation, and integration patterns that keep velocity from turning into fragility.",
            },
            {
              title: "Established",
              description:
                "Evolve governance frameworks, integrate new intelligent systems, and maintain continuous compliance as models, vendors, and regulations change.",
            },
            {
              title: "$10M to $100M",
              titleNormalCase: true,
              description:
                "Revenue bands where we most often blend strategy, build, and governance in one program.",
            },
            {
              title: "Industry-led",
              description:
                "Depth across technology, manufacturing, life sciences, finance, and adjacent regulated sectors.",
            },
            {
              title: "10 to 1000+",
              titleNormalCase: true,
              description:
                "Team sizes from small product groups to large enterprises. Playbooks adapt; standards do not.",
            },
          ]}
        />
      </Section>

      <Section variant="dark" aria-label="Industries">
        <div className="mb-10 min-w-0 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Industry-led</p>
          <div className="-mx-1 min-w-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0">
            <h2 className="w-max whitespace-nowrap px-1 text-4xl font-semibold tracking-tight text-foreground normal-case sm:px-0 sm:text-5xl">
              {formatSectionHeadingTitle("Transforming business across industries")}
            </h2>
          </div>
          <div className="-mx-1 min-w-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0">
            <p className="w-max whitespace-nowrap px-1 text-base text-muted sm:px-0 sm:text-lg">
              Healthcare, finance, and technology services, each with tailored compliance, data, and deployment patterns.
            </p>
          </div>
        </div>
        <CardGrid
          title=""
          eyebrow=""
          columns={2}
          items={[
            {
              title: "Healthcare & Life Sciences",
              titleNormalCase: true,
              description:
                "HIPAA-aware architectures, PHI handling discipline, audit evidence, and secure orchestration for clinical and commercial AI workloads.",
              href: "/industries",
            },
            {
              title: "Finance",
              description:
                "High-trust transaction and analytics patterns with governance automation and defensible controls for model-driven decisions.",
              href: "/industries",
            },
            {
              title: "Technology services",
              description:
                "End-to-end application engineering, multi-provider orchestration, and adoption programs that match enterprise procurement reality.",
              href: "/industries",
            },
            {
              title: "Public Sector & Government",
              titleNormalCase: true,
              description:
                "Procurement-aware delivery, security baselines, and audit-ready AI where citizen trust, appropriations cycles, and oversight are non-negotiable.",
              href: "/industries",
            },
          ]}
        />
        <p className="mt-8 text-center text-sm text-muted">
          See the full industries view on{" "}
          <Link href="/industries" className="font-medium text-accent underline-offset-2 hover:underline">
            Industries
          </Link>
          .
        </p>
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="Talk to one of our experts"
          body="Curious how Foundry360 can help your business? We would love to discuss how AI-powered consulting and delivery can impact your bottom line, with a plan you can actually execute."
          cta={{ href: "#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
