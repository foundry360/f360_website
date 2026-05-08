import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/insights/MarkdownBody";
import { Section } from "@/components/layout/Section";
import { CTABanner } from "@/components/sections/CTABanner";
import { pageGuttersClass } from "@/lib/layout";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

/** Insight article: markdown body + closing CTA consistent with the rest of the site. */
export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="relative isolate min-h-[min(52vh,460px)] w-full overflow-x-hidden border-b border-border bg-grid-fade">
          <div
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
            aria-hidden
          />
          <div
            className={`relative z-10 ${pageGuttersClass} flex min-h-[min(52vh,460px)] flex-col items-center justify-center gap-6 py-20 text-center sm:gap-8 sm:py-24 lg:py-28`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">Insight</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground normal-case sm:text-5xl">
              {formatSectionHeadingTitle(post.title)}
            </h1>
            <p className="text-base text-muted sm:text-lg">{post.description}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>
        <Section variant="light" aria-label="Article body" className="py-16 sm:py-20">
          <MarkdownBody content={post.content} />
          <nav className="mt-12 flex flex-wrap gap-4 border-t border-border pt-10 text-sm" aria-label="Article navigation">
            <Link href="/insights" className="font-medium text-accent hover:underline">
              ← All insights
            </Link>
            <Link href="/what-we-do" className="text-muted underline-offset-2 hover:text-foreground hover:underline">
              What we do
            </Link>
            <Link href="/contact#contact-form" className="text-muted underline-offset-2 hover:text-foreground hover:underline">
              Discuss with our team
            </Link>
          </nav>
        </Section>
        <Section variant="accentSoft" aria-label="Next step" className="py-16 sm:py-20">
          <CTABanner
            title="Want to apply this to your roadmap?"
            body="Tell us what you are trying to change in the next quarter. We will be direct about feasibility, sequencing, and where outside help moves the needle."
            cta={{ href: "/contact#contact-form", label: "Consult with an expert" }}
          />
        </Section>
      </article>
    </>
  );
}
