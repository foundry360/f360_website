import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "What we do",
  description: `How ${site.name} delivers AI governance, fractional leadership, custom development, and strategic advisory—aligned with ${site.url.replace(/^https:\/\//, "")}/what-we-do/.`,
};

/** Primary “offer” page — mirrors foundry360.us /what-we-do/ structure (rewritten, not scraped HTML). */
export default function WhatWeDoPage() {
  return (
    <>
      <Hero
        eyebrow="What we do"
        title={<>Shaping the future of business</>}
        subtitle="We deliver technology strategies that create measurable value—turning AI concepts into governed, production-ready systems with orchestration, compliance automation, and integration your teams can run."
        primaryCta={{ href: "/contact#contact-form", label: "Let’s connect" }}
        secondaryCta={{ href: "/how-we-work", label: "How we work" }}
      />

      <Section aria-label="Core offerings">
        <CardGrid
          eyebrow="Capabilities"
          title="Four ways we engage"
          description="Mix governance, leadership, engineering, and advisory—so you can scale support as adoption matures."
          columns={2}
          items={[
            {
              title: "AI governance as a service",
              description:
                "Enterprise AI orchestration and governance infrastructure without building a full in-house control tower from scratch—automated compliance checks, evidence-friendly audit trails, and multi-provider integration with clear data boundaries.",
            },
            {
              title: "Fractional AI leadership",
              description:
                "Seasoned architects and compliance-aware leaders on a part-time or project basis—strategy, oversight, and hands-on steering without a permanent C-level seat for every specialty.",
            },
            {
              title: "Custom application development",
              description:
                "Secure AI applications end to end: compliant architectures, governance hooks in the codebase, and cloud-native deployment patterns that survive real traffic and audits.",
            },
            {
              title: "Strategic AI advisory",
              description:
                "Ongoing counsel as operations mature—regulatory shifts, infrastructure tuning, and roadmap decisions so programs stay aligned with both risk posture and business outcomes.",
            },
          ]}
        />
      </Section>

      <Section variant="muted" aria-label="Flexible consulting">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Flexible options</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Consulting models for every stage of growth
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            Whether you need architecture guidance, dedicated build capacity, continuous compliance support, or full platform
            integration, we assemble the right mix of governance-as-a-service, fractional leadership, project delivery, and
            advisory—so expertise shows up when you need it and scales as AI adoption deepens.
          </p>
        </div>
      </Section>

      <Section aria-label="Who we work with">
        <CardGrid
          eyebrow="Who we work with"
          title="From first production system to enterprise-wide scale"
          description="We partner with organizations at different maturity levels—always with the same bar for security, evidence, and operational clarity."
          columns={3}
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
          ]}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { k: "$10M–$100M", d: "Revenue bands where we most often blend strategy, build, and governance in one program." },
            { k: "Industry-led", d: "Depth across technology, manufacturing, life sciences, finance, and adjacent regulated sectors." },
            { k: "10–1000+", d: "Team sizes from small product groups to large enterprises—playbooks adapt; standards do not." },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-border bg-surface/50 p-6 text-center">
              <p className="text-lg font-semibold text-accent">{x.k}</p>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="grid" aria-label="Industries">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Industry-led</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Transforming business across industries</h2>
          <p className="text-lg text-muted">
            Healthcare, finance, technology services, manufacturing, media and entertainment—each with tailored compliance,
            data, and deployment patterns.
          </p>
        </div>
        <CardGrid
          title=""
          eyebrow=""
          columns={2}
          items={[
            {
              title: "Healthcare and medtech",
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
              title: "Manufacturing",
              description:
                "Operations-focused AI: reliability, edge-to-cloud integration, and measurable efficiency—not slide-only innovation.",
              href: "/industries",
            },
            {
              title: "Media and entertainment",
              description:
                "Personalization, rights-aware data pipelines, and scalable delivery—without sacrificing brand trust or compliance.",
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

      <Section variant="muted" aria-label="Call to action">
        <CTABanner
          title="Talk to one of our experts"
          body="Curious how Foundry360 can help your business? We would love to discuss how AI-powered consulting and delivery can impact your bottom line—with a plan you can actually execute."
          cta={{ href: "/contact#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
