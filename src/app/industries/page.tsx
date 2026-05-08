import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "Industries",
  description: `${site.name} serves regulated and high-stakes industries with enterprise AI development, governance, and platform integration. Learn more at ${site.url.replace(/^https:\/\//, "")}.`,
};

const industriesHeroTitle = formatSectionHeadingTitle("Enterprise AI where trust is non-negotiable");
const industriesHeroTitleBreak = industriesHeroTitle.lastIndexOf(" ");

function industriesHeroLineWithAccentAi(line: string, lineKey: string) {
  return line.split(/(\bAI\b)/).map((part, i) =>
    part === "AI" ? (
      <span key={`${lineKey}-ai`} className="text-accent italic">
        AI
      </span>
    ) : (
      <span key={`${lineKey}-${i}`}>{part}</span>
    ),
  );
}

export default function IndustriesPage() {
  return (
    <>
      <Hero
        align="left"
        eyebrow="Industries"
        title={
          <>
            {industriesHeroLineWithAccentAi(
              industriesHeroTitle.slice(0, industriesHeroTitleBreak),
              "l1",
            )}
            <br />
            {industriesHeroLineWithAccentAi(
              industriesHeroTitle.slice(industriesHeroTitleBreak + 1),
              "l2",
            )}
          </>
        }
        subtitle="Regulated sectors do not get a pass on speed, but they also cannot afford fragile automation. We design intelligent applications, controls, and integrations that hold up under audit, outage pressure, and real customer volume."
      />

      <Section
        id="ai-readiness"
        variant="light"
        aria-label="Why AI readiness matters"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-3xl space-y-6 sm:max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("Why AI readiness matters in regulated enterprises")}
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              AI in regulated industries is not constrained by ambition—it is constrained by risk, accountability, and
              auditability. The organizations that succeed are not simply the ones moving fastest, but the ones that can prove
              how decisions are made, how data is used, and how systems behave under pressure.
            </p>
            <p>
              Without AI readiness, even well-designed initiatives stall in production. Governance gaps slow approvals.
              Fragmented data creates compliance risk. And agentic or automated workflows break down when they meet real
              operational and regulatory scrutiny.
            </p>
            <p>
              AI readiness ensures that innovation does not outrun control. It aligns strategy, architecture, and governance
              so that AI systems can be deployed safely, scaled confidently, and sustained under regulatory oversight.
            </p>
            <p className="font-medium text-foreground">
              This is not a technology challenge alone—it is an operating model shift.
            </p>
          </div>
          <ul className="list-none space-y-3 border-l-2 border-accent pl-5 text-base font-medium leading-snug text-foreground sm:text-lg">
            <li>Can you explain and audit every AI-driven decision?</li>
            <li>Can your data lineage withstand regulatory review?</li>
            <li>Can your workflows operate safely under failure conditions?</li>
            <li>Can you scale automation without introducing unmanaged risk?</li>
          </ul>
          <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
            In regulated environments, AI readiness is the difference between experimentation and execution.
          </p>
        </div>
      </Section>

      <Section variant="light" aria-label="Sectors we support">
        <CardGrid
          titleSingleLine
          eyebrow="Where we focus"
          title="Industry depth without one-size-fits-all templates"
          description="We tailor patterns to your operating model while reusing proven building blocks for governance, observability, and delivery, so you move faster without inventing everything from scratch."
          columns={2}
          items={[
            {
              title: "Financial services",
              description:
                "Banking, wealth, insurance, and payments, where model risk, privileged access, and evidence trails are part of the definition of “done.”",
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

      <Section variant="dark" aria-label="Regulated AI delivery">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
              {formatSectionHeadingTitle("How we approach regulated programs")}
            </h2>
            <p className="text-muted leading-relaxed">
              We document decisions in forms legal and security teams can reuse, surface trade-offs early, and build
              controls into the architecture, not as a late gate that surprises engineering.
            </p>
            <p className="text-muted leading-relaxed">
              That is how teams keep momentum after the first release: the system stays explainable when auditors, customers,
              or executives ask hard questions.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
              {formatSectionHeadingTitle("Common threads across sectors")}
            </h2>
            <ul className="list-inside list-disc space-y-3 text-muted marker:text-accent">
              <li>Identity, consent, and data lineage treated as product requirements, not afterthoughts.</li>
              <li>Human-in-the-loop paths where commitments, safety, or policy require judgment.</li>
              <li>Observability and performance budgets so AI workloads meet enterprise reliability expectations.</li>
              <li>Release discipline that makes rollback and evidence capture part of the default workflow.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="Tell us what “safe enough to ship” means in your environment"
          body="We will map constraints, propose a pragmatic sequence, and be direct about what we would prove first, before asking for a long-term commitment."
          cta={{ href: "/contact#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
