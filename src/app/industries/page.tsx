import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description: `${site.name} serves regulated and high-stakes industries with enterprise AI development, governance, and platform integration—learn more at ${site.url.replace(/^https:\/\//, "")}.`,
};

export default function IndustriesPage() {
  return (
    <>
      <Hero
        eyebrow="Industries"
        title={<>Enterprise AI where trust is non-negotiable</>}
        subtitle="Regulated sectors do not get a pass on speed—but they also cannot afford fragile automation. We design intelligent applications, controls, and integrations that hold up under audit, outage pressure, and real customer volume."
        primaryCta={{ href: "/contact#contact-form", label: "Discuss your sector" }}
        secondaryCta={{ href: "/what-we-do", label: "What we do" }}
      />

      <Section aria-label="Sectors we support">
        <CardGrid
          eyebrow="Where we focus"
          title="Industry depth without one-size-fits-all templates"
          description="We tailor patterns to your operating model while reusing proven building blocks for governance, observability, and delivery—so you move faster without inventing everything from scratch."
          columns={2}
          items={[
            {
              title: "Financial services",
              description:
                "Banking, wealth, insurance, and payments—where model risk, privileged access, and evidence trails are part of the definition of “done.”",
            },
            {
              title: "Healthcare and life sciences",
              description:
                "Clinical, commercial, and member journeys with privacy-by-design workflows and integrations that respect how care actually gets delivered.",
            },
            {
              title: "Technology and software",
              description:
                "High-velocity product companies that still need adult supervision for security, procurement, and enterprise-grade AI rollouts.",
            },
            {
              title: "Industrials and manufacturing",
              description:
                "Complex channels, partner ecosystems, and service operations where reliability and traceability matter as much as margin.",
            },
          ]}
        />
      </Section>

      <Section variant="muted" aria-label="Regulated AI delivery">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">How we approach regulated programs</h2>
            <p className="text-muted leading-relaxed">
              We document decisions in forms legal and security teams can reuse, surface trade-offs early, and build
              controls into the architecture—not as a late gate that surprises engineering.
            </p>
            <p className="text-muted leading-relaxed">
              That is how teams keep momentum after the first release: the system stays explainable when auditors, customers,
              or executives ask hard questions.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Common threads across sectors</h2>
            <ul className="list-inside list-disc space-y-3 text-muted marker:text-accent">
              <li>Identity, consent, and data lineage treated as product requirements—not afterthoughts.</li>
              <li>Human-in-the-loop paths where commitments, safety, or policy require judgment.</li>
              <li>Observability and performance budgets so AI workloads meet enterprise reliability expectations.</li>
              <li>Release discipline that makes rollback and evidence capture part of the default workflow.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section aria-label="Call to action">
        <CTABanner
          title="Tell us what “safe enough to ship” means in your environment"
          body="We will map constraints, propose a pragmatic sequence, and be direct about what we would prove first—before asking for a long-term commitment."
          cta={{ href: "/contact#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
