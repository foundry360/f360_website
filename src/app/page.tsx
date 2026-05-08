import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { Section } from "@/components/layout/Section";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { BlogPreviewCard } from "@/components/sections/BlogPreviewCard";
import { StatBand } from "@/components/sections/StatBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BottomScrollFrost } from "@/components/layout/BottomScrollFrost";
import { getFeaturedPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

const homeStatTitleFormatted = formatSectionHeadingTitle(
  "Accelerating AI Application Delivery Through Strategy and Enablement",
);

export const metadata: Metadata = {
  title: "Home",
  description: site.description,
};

function IconBrief() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" />
    </svg>
  );
}
function IconCode() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconNodes() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M7.5 17.5l3-2M16.5 17.5l-3-2" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const posts = getFeaturedPosts(3);

  return (
    <>
      <HomeHero />

      <StatBand
        overline="Scaling AI for Enterprise Execution"
        title={
          <>
            {homeStatTitleFormatted.split(/(\bAI\b)/).map((part, i) =>
              part === "AI" ? (
                <span key={i} className="text-accent italic">
                  AI
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </>
        }
        stats={[
          {
            value: "~70%",
            label: "Faster path to market",
            hint: "Typical program goal when delivery, compliance, and integration move together, not in sequence.",
          },
          {
            value: "5×",
            label: "Engineering leverage",
            hint: "What teams target when platforms, reuse, and automation replace one-off heroics.",
          },
          {
            value: "99.9%",
            label: "Reliability posture",
            hint: "Design-time SLOs, observability, and runbooks so AI workloads meet enterprise expectations.",
          },
        ]}
        belowMetrics={
          <p>
            Enterprise AI development requires more than just models, it requires infrastructure that scales securely.
            By combining AI orchestration, compliance automation, and production-grade deployment frameworks, your
            organization can transform ideas into intelligent applications in weeks, not years. With 73% of regulated
            industries citing governance as their primary AI adoption barrier, having the right infrastructure isn&apos;t
            optional, it&apos;s the foundation for success. We don&apos;t just build applications, we engineer intelligent
            systems that comply, scale, and deliver measurable business outcomes.
          </p>
        }
      />

      {/* Four service lanes (structural mirror of foundry360.us “Services That Create Results”). */}
      <Section id="services" variant="dark" aria-label="Services that create results">
        <CardGrid
          headerAlign="center"
          centeredHeaderWide
          titleSingleLine
          eyebrow="Services that create results"
          title="From strategy to secure systems in production"
          description="Each line of business maps to a full lifecycle: assess, architect, build, integrate, and operate with governance embedded, not bolted on after the fact."
          columns={2}
          items={[
            {
              title: "AI strategy and consulting",
              description:
                "Readiness assessments, use-case prioritization, and roadmaps that connect business outcomes to technical prerequisites and risk appetite.",
              href: "/what-we-do",
              meta: "Strategy",
              icon: <IconBrief />,
            },
            {
              title: "Custom application development",
              description:
                "End-to-end delivery of AI-enabled applications with security-first patterns, repeatable pipelines, and documentation your teams can inherit.",
              href: "/what-we-do",
              meta: "Build",
              icon: <IconCode />,
            },
            {
              title: "AI governance and compliance",
              description:
                "Automated controls, evidence-friendly audit trails, and policy-aligned implementations so regulated teams can move with confidence.",
              href: "/what-we-do",
              meta: "Trust",
              icon: <IconShield />,
            },
            {
              title: "Platform integration and orchestration",
              description:
                "Multi-provider orchestration, enterprise system integration, and unified data movement so every layer (models, apps, security, monitoring) works as one fabric.",
              href: "/what-we-do",
              meta: "Integrate",
              icon: <IconNodes />,
            },
          ]}
        />
      </Section>

      {/* “Foundry360 Difference”: same themes as live site, tightened for the new UI. */}
      <Section id="difference" variant="light" aria-label="The Foundry360 difference">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">The Foundry360 difference</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground normal-case sm:text-5xl">
            {formatSectionHeadingTitle("Accelerating your path to value")}
          </h2>
          <p className="mt-6 text-base text-muted sm:text-lg">
            Speed without depth creates rework. Depth without delivery misses the window. Foundry360 combines{" "}
            <strong className="font-medium text-foreground">velocity</strong>,{" "}
            <strong className="font-medium text-foreground">technical rigor</strong>, and{" "}
            <strong className="font-medium text-foreground">consulting judgment</strong> so programs stay transformative, not
            fragile.
          </p>
        </div>
        <div className="mt-14">
          <CardGrid
            columns={2}
            items={[
            {
              title: "Enterprise AI Strategy and Deployment",
              titleNormalCase: true,
              description:
                "Governed pipelines, secure orchestration, and architectures that meet regulatory expectations while still shipping.",
            },
            {
              title: "Secure architecture and compliance design",
              description:
                "Controls, evidence, and threat-aware patterns integrated early so “compliant later” never becomes the plan.",
            },
            {
              title: "AI readiness and architecture assessment",
              description:
                "A grounded view of data, platforms, and operating constraints before you fund the wrong sequence of work.",
            },
            {
              title: "Integration, orchestration, and performance",
              description:
                "Connect providers and enterprise systems, streamline deployment workflows, and instrument performance end to end.",
            },
          ]}
          />
        </div>
      </Section>

      <Section id="industries" variant="dark" aria-label="Industries we serve">
        <CardGrid
          eyebrow="Where we focus"
          title="Built for teams under regulatory pressure"
          description="Financial services, healthcare, technology, and industrials: sectors where trust, latency, and auditability all show up in the same backlog."
          columns={3}
          items={[
            {
              title: "Financial services",
              description:
                "Controls-first delivery for banking, wealth, insurance, and payments, where model risk and customer trust travel together.",
              href: "/industries",
            },
            {
              title: "Healthcare and life sciences",
              description:
                "Privacy-aware workflows and evidence-friendly systems that respect clinical and commercial realities.",
              href: "/industries",
            },
            {
              title: "Technology and complex B2B",
              description:
                "Product-led and enterprise motions unified with clearer signals, automation, and AI assistance where it earns its place.",
              href: "/industries",
            },
          ]}
        />
      </Section>

      <Section id="insights" variant="light" aria-label="Latest thinking">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 w-full flex-1 space-y-4 lg:max-w-none lg:pr-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Explore our latest thinking</p>
            <div className="-mx-1 min-w-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0">
              <h2 className="w-max whitespace-nowrap px-1 text-3xl font-semibold leading-tight tracking-tight text-foreground normal-case sm:px-0 sm:text-4xl lg:text-5xl">
                {formatSectionHeadingTitle("Insights on AI, GTM, and operating models")}
              </h2>
            </div>
          </div>
          <ButtonLink href="/insights" variant="secondary">
            View all insights
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <BlogPreviewCard
                post={{
                  slug: p.slug,
                  title: p.title,
                  description: p.description,
                  date: p.date,
                  author: p.author,
                }}
                index={i}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cta" variant="accentSoft" aria-label="Contact call to action">
        <CTABanner
          title="How can we move your program forward?"
          titleSingleLine
          body="Tell us what you are trying to prove this quarter. We will share a direct view on sequencing, skills, and the technical path that fits your constraints."
          cta={{ href: "#contact-form", label: "Get in touch" }}
        />
      </Section>

      {/* Bottom gradient: only after services + StatBand; thin strip hugging viewport bottom. */}
      <BottomScrollFrost activateAfterId="difference" />
    </>
  );
}
