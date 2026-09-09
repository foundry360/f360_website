import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { BlogPreviewCard } from "@/components/sections/BlogPreviewCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { accentAiInFormattedHeading } from "@/components/sections/accentAiTitle";
import { getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

const metaDescription =
  "Enigma is Foundry360's governance intelligence platform for regulated organizations navigating autonomous AI, agents, enterprise systems, data, workflows, and accountability.";

export const metadata: Metadata = {
  title: "Enigma | AI Governance for the Autonomous Enterprise",
  description: metaDescription,
  openGraph: {
    title: "Enigma | AI Governance for the Autonomous Enterprise | Foundry360",
    description: metaDescription,
    url: `${site.url}/enigma`,
  },
  twitter: {
    title: "Enigma | AI Governance for the Autonomous Enterprise | Foundry360",
    description: metaDescription,
  },
};

const governanceQuestions = [
  "What AI exists?",
  "What can it access?",
  "What can it do?",
  "What systems can it influence?",
  "What decisions can it make?",
  "What controls govern it?",
  "Where are the gaps?",
  "What evidence exists?",
  "Who is accountable?",
] as const;

const platformComparison = [
  {
    title: "Traditional GRC",
    description: "Focuses on compliance and controls.",
    emphasized: false,
  },
  {
    title: "Security platforms",
    description: "Focus on threats, vulnerabilities, and access.",
    emphasized: false,
  },
  {
    title: "AI management platforms",
    description: "Focus on models and AI assets.",
    emphasized: false,
  },
  {
    title: "Enigma",
    description: "Focuses on the meaning and governance of the entire AI operating environment.",
    emphasized: true,
  },
] as const;

const sixSignals = [
  {
    title: "Addressable work",
    description: "Where AI and automation can meaningfully affect enterprise work.",
  },
  {
    title: "Operating path",
    description: "How work actually moves through systems, processes, automations, and people.",
  },
  {
    title: "Grounded answers",
    description: "What organizational knowledge and evidence exists to support AI decisions.",
  },
  {
    title: "Automation collision",
    description: "Where existing automation, AI, and business rules intersect or conflict.",
  },
  {
    title: "Access surface",
    description: "What systems, data, objects, and permissions AI can reach.",
  },
  {
    title: "Write-back control",
    description: "What AI or automation can actually change, create, or execute.",
  },
] as const;

const governanceLifecycle = [
  { title: "Discover", description: "Understand the environment." },
  { title: "Interpret", description: "Turn technical facts into business signals." },
  { title: "Assess", description: "Identify governance posture, risk, gaps, and opportunities." },
  { title: "Decide", description: "Determine what should be deployed, controlled, changed, or stopped." },
  { title: "Evidence", description: "Create the evidence required for governance, compliance, and accountability." },
  {
    title: "Continuous intelligence",
    description: "Keep the governance picture current as the environment changes.",
  },
] as const;

const differentiationRows = [
  { category: "GRC asks", question: "Are we compliant?" },
  { category: "Security asks", question: "Is the environment secure?" },
  { category: "Observability asks", question: "What is happening?" },
  { category: "AI management asks", question: "What models are deployed?" },
  { category: "Control planes ask", question: "How do we manage execution?" },
] as const;

const regulatedIndustries = [
  {
    title: "Healthcare & life sciences",
    description:
      "Govern AI touching clinical workflows, regulated data, operational systems, and high-consequence processes.",
    titleNormalCase: true,
  },
  {
    title: "Financial services",
    description:
      "Govern AI influencing customers, financial processes, transactions, risk, and regulated decisions.",
  },
  {
    title: "Regulated enterprises",
    description:
      "Extend governance across complex environments where accountability, auditability, and control matter.",
  },
] as const;

const thoughtLeadershipSlugs = [
  "ai-operating-system-is-here",
  "ai-orchestration-layer",
  "ai-automation-vs-transformation",
] as const;

function FlowChain({ items }: { items: readonly string[] }) {
  return (
    <p className="text-sm leading-relaxed text-muted sm:text-base">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 ? <span className="text-accent/70"> → </span> : null}
          <span className="text-foreground/90">{item}</span>
        </span>
      ))}
    </p>
  );
}

export default function EnigmaPage() {
  const insightPosts = thoughtLeadershipSlugs.map((slug) => getPostBySlug(slug)).filter(Boolean);

  return (
    <>
      <Hero
        eyebrow="Enigma"
        title={accentAiInFormattedHeading(
          formatSectionHeadingTitle("AI governance for the autonomous enterprise"),
          "enigma-hero",
        )}
        subtitle="AI is moving beyond applications and copilots toward autonomous systems that can access data, invoke tools, make decisions, and execute work. Enigma gives regulated organizations the intelligence to understand, assess, govern, and continuously control those systems."
        ctaSlot={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#what-enigma" size="sm">
              Explore Enigma
            </ButtonLink>
            <ButtonLink href="#contact-form" variant="secondary" size="sm">
              Talk to Foundry360
            </ButtonLink>
          </div>
        }
      />

      <Section variant="light" aria-label="The shift in AI governance" className="border-b border-border">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">The shift</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {accentAiInFormattedHeading(
              formatSectionHeadingTitle("AI changed the operating model. Governance hasn't."),
              "shift-h2",
            )}
          </h2>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-20">
          <div className="min-w-0 space-y-6 text-left">
            <p className="text-lg leading-relaxed text-muted sm:text-xl">
              Traditional governance was designed around a relatively simple relationship:
            </p>
            <div className="rounded-2xl border border-border bg-surface/50 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Traditional model</p>
              <div className="mt-3">
                <FlowChain items={["Applications", "Users", "Data", "Controls"]} />
              </div>
            </div>
            <p className="text-base leading-relaxed text-muted sm:text-lg">The autonomous enterprise is different.</p>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {accentAiInFormattedHeading(
                "AI increasingly operates across models, agents, tools, data, applications, workflows, decisions, and actions.",
                "shift-body",
              )}{" "}
              That creates a fundamentally different governance challenge.
            </p>
          </div>

          <div className="min-w-0">
            <div className="rounded-2xl border border-border bg-surface-elevated/90 p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Autonomous model</p>
              <div className="mt-3">
                <FlowChain
                  items={[
                    "Models",
                    "Agents",
                    "Tools",
                    "Data",
                    "Applications",
                    "Workflows",
                    "Decisions",
                    "Actions",
                  ]}
                />
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/80">
                Organizations need to know
              </p>
              <ul className="mt-4 space-y-3 border-t border-border/70 pt-6">
                {governanceQuestions.map((question) => (
                  <li key={question} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-border/70 pt-6 text-base font-medium leading-relaxed text-foreground sm:text-lg">
                Enigma was built to answer those questions.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="what-enigma" variant="dark" aria-label="What Enigma is" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Platform</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("A governance intelligence platform")}
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:mx-0">
            Enigma creates an intelligence layer that helps organizations understand the relationship between AI,
            enterprise systems, data, workflows, controls, and business operations.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platformComparison.map((item, i) => (
            <li key={item.title} className="h-full">
              <Reveal delayMs={i * 60} className="h-full">
                <article
                  className={[
                    "flex h-full flex-col rounded-2xl border p-6 transition",
                    item.emphasized
                      ? "border-accent/45 bg-accent-dim/20 shadow-sm ring-1 ring-accent/25"
                      : "border-border bg-surface/60 hover:border-accent/25 hover:bg-surface-elevated/70",
                  ].join(" ")}
                >
                  <h3
                    className={[
                      "text-2xl font-semibold tracking-tight normal-case",
                      item.emphasized ? "text-accent" : "text-foreground",
                    ].join(" ")}
                  >
                    {item.emphasized ? item.title : formatSectionHeadingTitle(item.title)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{item.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="light" aria-label="The six signals">
        <CardGrid
          eyebrow="Signals"
          title="Six signals. One governed view."
          description="Enigma turns technical and organizational facts into business-level governance signals."
          columns={3}
          items={[...sixSignals]}
        />
      </Section>

      <Section variant="dark" aria-label="Governance lifecycle">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Lifecycle</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("From discovery to governance")}
          </h2>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {governanceLifecycle.map((step, i) => (
            <li key={step.title}>
              <Reveal delayMs={i * 50} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-5 sm:p-6">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-dim text-xs font-bold tabular-nums text-accent"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                    {formatSectionHeadingTitle(step.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{step.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section variant="light" aria-label="Differentiation">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Differentiation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("Governance requires more than visibility")}
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:mx-0">
            Visibility tells you what exists. Governance requires understanding what it means.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
          <ul className="space-y-0">
            {differentiationRows.map((row) => (
              <li
                key={row.category}
                className="grid gap-1 border-t border-border py-5 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-6 sm:py-6"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-muted">{row.category}</p>
                <p className="text-base leading-relaxed text-foreground sm:text-lg">{row.question}</p>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="rounded-2xl border border-accent/45 bg-accent-dim/15 p-6 shadow-sm ring-1 ring-accent/20 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Enigma asks</p>
              <p className="mt-4 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                What does the entire environment mean from a governance perspective?
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section variant="dark" aria-label="Regulated industries">
        <CardGrid
          eyebrow="Industries"
          title="Built for environments where AI has consequences"
          columns={3}
          items={[...regulatedIndustries]}
        />
      </Section>

      <Section variant="light" aria-label="Foundry360 and Enigma">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Partnership</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("Technology backed by expertise")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <article className="h-full rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Foundry360</p>
              <ul className="mt-6 space-y-4">
                {["Strategy", "Governance", "Architecture", "Industry expertise", "Operating models"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-muted sm:text-lg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delayMs={80}>
            <article className="h-full rounded-2xl border border-accent/40 bg-accent-dim/15 p-6 ring-1 ring-accent/20 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Enigma</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Governance intelligence",
                  "Assessment",
                  "Continuous understanding",
                  "Evidence",
                  "Operational control",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-muted sm:text-lg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <p className="mx-auto mt-10 max-w-4xl text-center text-lg leading-relaxed text-muted sm:text-xl lg:mt-12">
          Foundry360 brings the expertise. Enigma operationalizes it. Together, they help organizations move from AI
          experimentation to governed execution.
        </p>
      </Section>

      <Section variant="dark" aria-label="Thought leadership">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Perspective</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("The Foundry360 perspective")}
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:mx-0">
            The future of enterprise AI will not be defined only by increasingly capable models. It will be defined by
            how organizations govern systems that can reason, act, and operate across the enterprise.
          </p>
        </div>

        {insightPosts.length > 0 ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insightPosts.map((post, i) => (
              <li key={post!.slug} className="h-full">
                <BlogPreviewCard
                  post={{
                    slug: post!.slug,
                    title: post!.title,
                    description: post!.description,
                    date: post!.date,
                    author: post!.author,
                  }}
                  index={i}
                />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex justify-center lg:justify-start">
          <ButtonLink href="/insights" variant="secondary" size="sm">
            View all insights
          </ButtonLink>
        </div>
      </Section>

      <Section variant="accentSoft" aria-label="Request an assessment">
        <CTABanner
          title="Know what your AI can do before you let it."
          body="Enigma helps regulated organizations understand their AI environment before deploying the next generation of autonomous systems."
          cta={{ href: "#contact-form", label: "Request an Enigma Assessment" }}
          ctaSlot={
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="#contact-form" variant="dark" size="sm">
                Request an Enigma Assessment
              </ButtonLink>
              <ButtonLink href="#contact-form" variant="secondary" size="sm">
                Talk to Foundry360
              </ButtonLink>
            </div>
          }
        />
      </Section>
    </>
  );
}
