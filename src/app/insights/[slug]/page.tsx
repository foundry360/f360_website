import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/insights/MarkdownBody";
import { Section } from "@/components/layout/Section";
import { CTABanner } from "@/components/sections/CTABanner";
import { pageGuttersClass } from "@/lib/layout";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { site } from "@/lib/site";

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
        <header className="border-b border-border bg-grid-fade">
          <div className={`${pageGuttersClass} py-12 text-center`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Insight</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>
        <Section aria-label="Article body" className="py-16 sm:py-20">
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
        <Section variant="muted" aria-label="Next step" className="py-16 sm:py-20">
          <CTABanner
            title="Want to apply this to your roadmap?"
            body="Tell us what you are trying to change in the next quarter—we will be direct about feasibility, sequencing, and where outside help moves the needle."
            cta={{ href: "/contact#contact-form", label: "Consult with an expert" }}
          />
        </Section>
      </article>
    </>
  );
}
