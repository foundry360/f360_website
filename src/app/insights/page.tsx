import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { BlogPreviewCard } from "@/components/sections/BlogPreviewCard";
import { CTABanner } from "@/components/sections/CTABanner";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description: `Perspectives from ${site.name} on enterprise AI, GTM systems, healthcare innovation, and operations—aligned with topics we publish on ${site.url.replace(/^https:\/\//, "")}.`,
};

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        eyebrow="Insights"
        title={<>Explore our latest thinking</>}
        subtitle="Practical notes for leaders who need AI to show up in revenue, risk, and operations—not just in demos. Topics mirror what we discuss with clients in healthcare, SaaS, and complex B2B motions."
        primaryCta={{ href: "/contact#contact-form", label: "Get in touch" }}
        secondaryCta={{ href: "/what-we-do", label: "What we do" }}
      />

      <Section aria-label="Editorial note">
        <div className="max-w-3xl space-y-4 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
          <p className="text-sm font-medium text-foreground">How this library is maintained</p>
          <p className="text-sm leading-relaxed text-muted">
            Articles below are stored as markdown in this repository so the site stays fast and version-controlled. When you
            connect a CMS, keep the same frontmatter fields (title, description, date, author, featured) and swap the reader
            in <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs text-accent">getAllPosts</code> —
            components do not need to change.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            For the canonical archive during migration, you can still reference{" "}
            <a href={site.url} className="font-medium text-accent underline-offset-2 hover:underline">
              {site.url.replace(/^https:\/\//, "")}
            </a>
            .
          </p>
        </div>
      </Section>

      <Section variant="muted" aria-label="All articles">
        <div className="mb-10 max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Latest articles</h2>
          <p className="text-muted">
            Healthcare AI, GTM as a system, intent-driven SaaS growth, and operational productivity—written for executives
            and senior practitioners.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <Section aria-label="Contact call to action">
        <CTABanner
          title="Want to pressure-test an idea from these articles?"
          body="Send a short note with your context—we will tell you if we have seen the movie before, and what we would validate first."
          cta={{ href: "/contact#contact-form", label: "Consult with an expert" }}
        />
      </Section>
    </>
  );
}
