import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { getAllPressReleases } from "@/lib/press";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "Press",
  description: `Press releases and announcements from ${site.name}.`,
};

export default function PressIndexPage() {
  const releases = getAllPressReleases();

  return (
    <>
      <Hero
        eyebrow="Press"
        title="News and announcements"
        subtitle={`Official releases from ${site.name}, including product launches and company news.`}
        ctaSlot={<></>}
      />

      <Section variant="light" aria-label="Press releases">
        <div className="mb-10 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
            {formatSectionHeadingTitle("Press releases")}
          </h2>
          <p className="text-muted">For media inquiries, contact {site.email}.</p>
        </div>
        <ul className="space-y-6">
          {releases.map((release) => (
            <li key={release.slug} className="border-b border-border pb-6 last:border-b-0">
              <p className="text-sm text-muted">
                <time dateTime={release.date}>
                  {new Date(release.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
                <span aria-hidden> · </span>
                <span>{release.location}</span>
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                <Link
                  href={`/press/${release.slug}`}
                  className="underline-offset-2 hover:text-accent hover:underline"
                >
                  {release.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-3xl text-muted leading-relaxed">{release.description}</p>
              <Link
                href={`/press/${release.slug}`}
                className="mt-3 inline-flex text-sm font-medium text-accent underline-offset-2 hover:underline"
              >
                Read release →
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
