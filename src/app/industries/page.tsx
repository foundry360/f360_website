import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { site } from "@/lib/site";
import { ReadinessAccordion } from "@/components/sections/ReadinessAccordion";
import { accentAiInFormattedHeading } from "@/components/sections/accentAiTitle";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "Industries",
  description: `${site.name} serves regulated and high-stakes industries with enterprise AI development, governance, and platform integration. Learn more at ${site.url.replace(/^https:\/\//, "")}.`,
};

const industriesHeroTitle = formatSectionHeadingTitle("Enterprise AI where trust is non-negotiable");
const industriesHeroTitleBreak = industriesHeroTitle.lastIndexOf(" ");

const regulatedApproachSteps = [
  {
    title: "Frame decisions legal and security can reuse",
    body: "We capture commitments, data use, and risk posture in artifacts those teams can adopt, not informal notes that get rewritten under pressure.",
  },
  {
    title: "Surface trade-offs before architecture hardens",
    body: "We force explicit choices on access, retention, model boundaries, and evidence while options are still cheap to change, not as a late gate that surprises engineering.",
  },
  {
    title: "Embed controls into the build, not around it",
    body: "Policy becomes interfaces, approvals, logging, and rollback paths that ship with the product so “compliant” is how the system runs, not a separate checklist.",
  },
  {
    title: "Sustain explainability after the first release",
    body: "We align owners, narratives, and telemetry so when auditors, customers, or executives ask hard questions, answers are already in the system, and teams keep momentum without hiding behind tickets.",
  },
] as const;

export default function IndustriesPage() {
  return (
    <>
      <Hero
        eyebrow="Industries"
        title={
          <>
            {accentAiInFormattedHeading(industriesHeroTitle.slice(0, industriesHeroTitleBreak), "l1")}
            <br />
            {accentAiInFormattedHeading(industriesHeroTitle.slice(industriesHeroTitleBreak + 1), "l2")}
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
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Readiness</p>
            <div className="-mx-1 mt-3 flex min-w-0 justify-center overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0">
              <h2 className="w-max whitespace-nowrap px-1 text-[clamp(1.125rem,calc(0.45rem+2.7vw+0.35vmin),2.5rem)] font-semibold leading-tight tracking-tight text-foreground normal-case sm:px-0">
                {accentAiInFormattedHeading(
                  formatSectionHeadingTitle("Why AI readiness matters in regulated enterprises"),
                  "readiness-h2",
                )}
              </h2>
            </div>
            <p className="mx-auto mt-5 max-w-3xl text-pretty text-center text-base font-medium leading-relaxed text-muted sm:mt-6 sm:text-lg">
              AI readiness is the difference between experimentation and execution.
            </p>
          </div>

          <div className="mt-10 grid gap-12 text-justify lg:mt-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-20 lg:gap-y-0">
            <div className="min-w-0 space-y-6 text-left">
              <p className="text-xl font-semibold text-foreground sm:text-2xl">Controlled Innovation</p>
              <div className="space-y-5 text-left text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  AI in regulated industries is not constrained by ambition. It is constrained by risk, accountability, and
                  auditability. The organizations that succeed are not simply the ones moving fastest, but the ones that can
                  prove how decisions are made, how data is used, and how systems behave under pressure.
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
              </div>
            </div>

            <div className="min-w-0">
              <div className="rounded-2xl border border-border bg-surface-elevated/90 p-6 shadow-sm sm:p-8">
                <p className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-accent">Ask honestly</p>
                <ReadinessAccordion />
                <div className="mt-8 flex gap-4 border-t border-border/60 pt-8">
                  <svg
                    className="h-10 w-10 shrink-0 text-accent/45"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.23-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.23-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="text-pretty text-base font-medium leading-relaxed text-foreground sm:text-lg">
                    This is not a technology challenge alone. It is an operating model shift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="dark" aria-label="Sectors we support">
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
              title: "Healthcare & life sciences",
              description:
                "Clinical, commercial, and member journeys with privacy-by-design workflows and integrations that respect how care actually gets delivered.",
            },
            {
              title: "Technology & software",
              description:
                "High-velocity product companies that still need adult supervision for security, procurement, and enterprise-grade AI rollouts.",
            },
            {
              title: "Public sector & government",
              description:
                "Agency and program delivery where procurement, records, accessibility, and public trust set the bar for how systems are designed, governed, and sustained.",
            },
          ]}
        />
      </Section>

      <Section variant="light" aria-label="Regulated AI delivery">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Approach</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("How we approach regulated programs")}
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:mx-0 lg:max-w-5xl">
            Regulated work breaks when governance is a slide deck at the end. We run programs as a sequence: make intent legible,
            design controls in, ship with proof, then keep the system credible under real scrutiny.
          </p>
        </div>

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">How we sequence the work</p>
            <ol className="mt-6 space-y-0">
              {regulatedApproachSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t border-border py-6 first:border-t-0 first:pt-0 sm:gap-x-5 sm:py-7"
                >
                  <span
                    className="row-span-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-xs font-bold tabular-nums text-accent sm:h-11 sm:w-11"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
                    {formatSectionHeadingTitle(step.title)}
                  </h3>
                  <p className="col-start-2 text-sm leading-relaxed text-muted sm:text-base">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0 lg:pt-1">
            <div className="rounded-2xl border border-border bg-surface/50 p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight text-foreground normal-case sm:text-2xl">
                {formatSectionHeadingTitle("Common threads across sectors")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Labels change by industry; these are the through-lines we treat as product requirements on every engagement.
              </p>
              <ul className="mt-8 space-y-5 border-t border-border/70 pt-8">
                <li className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground">Identity, consent, and lineage</span>: owned as design
                    inputs, not compliance footnotes bolted on after launch.
                  </span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground">Human judgment where it matters</span>: explicit
                    human-in-the-loop paths when commitments, safety, or policy require a person, not only a model.
                  </span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground">Reliability under load</span>: observability and
                    performance budgets so AI-backed workloads meet enterprise expectations, not demo-day latency.
                  </span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span>
                    <span className="font-medium text-foreground">Release discipline</span>: rollback, evidence capture,
                    and change control as defaults so velocity stays defensible when volume and scrutiny rise together.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="accentSoft" aria-label="Call to action">
        <CTABanner
          title="Tell us what “safe enough to ship” means in your environment"
          body="We will map constraints, propose a pragmatic sequence, and be direct about what we would prove first, before asking for a long-term commitment."
          cta={{ href: "#contact-form", label: "Get in touch" }}
        />
      </Section>
    </>
  );
}
