import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/insights/MarkdownBody";
import { Section } from "@/components/layout/Section";
import { CTABanner } from "@/components/sections/CTABanner";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageGuttersClass } from "@/lib/layout";
import { getPressBySlug, getPressSlugs } from "@/lib/press";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPressSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getPressBySlug(slug);
  if (!release) return { title: "Press release" };
  return {
    title: release.title,
    description: release.description,
    openGraph: {
      title: release.title,
      description: release.description,
      type: "article",
      publishedTime: release.date,
    },
    twitter: {
      title: release.title,
      description: release.description,
    },
  };
}

export default async function PressReleasePage({ params }: Props) {
  const { slug } = await params;
  const release = getPressBySlug(slug);
  if (!release) notFound();

  const datelineDate = new Date(release.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description: release.description,
    datePublished: release.date,
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
            className={`relative z-10 ${pageGuttersClass} flex min-h-[min(52vh,460px)] flex-col items-start justify-center gap-6 py-20 text-left sm:gap-8 sm:py-24 lg:py-28`}
          >
            <div className="flex w-full flex-col items-start gap-3 sm:gap-4">
              <div className="mb-3 h-1 w-24 bg-accent sm:mb-4" aria-hidden />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">
                Press release
              </p>
              <h1 className="w-full max-w-5xl text-4xl font-bold leading-[1.1] tracking-[0.015em] text-foreground normal-case sm:text-5xl lg:text-6xl">
                {release.title}
              </h1>
            </div>
            <p className="max-w-5xl text-base font-medium leading-relaxed text-foreground/95 sm:text-lg">
              {release.description}
            </p>
            <p className="text-sm text-muted">
              <span className="font-medium text-foreground/80">{release.location}</span>
              <span aria-hidden> · </span>
              <time dateTime={release.date}>{datelineDate}</time>
            </p>
          </div>
        </header>

        <Section variant="light" aria-label="Press release body" className="py-16 sm:py-20">
          <Link
            href="/press"
            className="mb-8 inline-flex items-center text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            ← All press
          </Link>
          <MarkdownBody content={release.content} />
          <nav className="mt-12 flex flex-wrap gap-4 border-t border-border pt-10 text-sm" aria-label="Press navigation">
            <Link href="/press" className="font-medium text-accent hover:underline">
              ← All press
            </Link>
            <a
              href="https://getenigmaai.com"
              className="text-muted underline-offset-2 hover:text-foreground hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              getenigmaai.com
            </a>
            <Link href="#contact-form" className="text-muted underline-offset-2 hover:text-foreground hover:underline">
              Media contact
            </Link>
          </nav>
        </Section>

        <Section variant="accentSoft" aria-label="Next step" className="py-16 sm:py-20">
          <CTABanner
            title="Learn more about Enigma"
            body="Enigma governs AI actions from policy to proof. Visit getenigmaai.com or contact Foundry360 to discuss AI Action Governance for your organization."
            cta={{ href: "https://getenigmaai.com", label: "Visit getenigmaai.com" }}
            ctaSlot={
              <ButtonLink
                href="https://getenigmaai.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
                size="sm"
              >
                Visit getenigmaai.com
              </ButtonLink>
            }
          />
        </Section>
      </article>
    </>
  );
}
