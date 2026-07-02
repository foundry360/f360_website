import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { BlogPreviewCard } from "@/components/sections/BlogPreviewCard";
import { CTABanner } from "@/components/sections/CTABanner";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "Insights",
  description: `Perspectives from ${site.name} on enterprise AI, GTM systems, healthcare innovation, and operations, aligned with topics we publish on ${site.url.replace(/^https:\/\//, "")}.`,
};

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        eyebrow="Insights"
        title="Explore our latest thinking"
        subtitle="Practical notes for leaders who need AI to show up in revenue, risk, and operations, not just in demos. Topics mirror what we discuss with clients in healthcare, SaaS, and complex B2B motions."
      />

      <Section variant="light" aria-label="All articles">
        <div className="mb-10 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("Latest articles")}
          </h2>
          <p className="text-muted">
            Healthcare AI, GTM as a system, intent-driven SaaS growth, and operational productivity, written for executives
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

      <Section variant="accentSoft" aria-label="Contact call to action">
        <CTABanner
          title="Want to pressure-test an idea from these articles?"
          body="Send a short note with your context. We will tell you if we have seen the movie before, and what we would validate first."
          cta={{ href: "#contact-form", label: "Consult with an expert" }}
        />
      </Section>
    </>
  );
}
