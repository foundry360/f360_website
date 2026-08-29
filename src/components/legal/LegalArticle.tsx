import type { ReactNode } from "react";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

type LegalSection = {
  id?: string;
  title: string;
  children: ReactNode;
};

type LegalArticleProps = {
  effectiveDate: string;
  intro?: ReactNode;
  sections: readonly LegalSection[];
};

/** Shared prose layout for Terms, Privacy, and related legal pages. */
export function LegalArticle({ effectiveDate, intro, sections }: LegalArticleProps) {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <p className="text-sm text-muted">
        Effective date: <time dateTime={effectiveDate}>{formatDisplayDate(effectiveDate)}</time>
      </p>
      {intro ? <div className="space-y-4 text-muted leading-relaxed">{intro}</div> : null}
      {sections.map((section) => (
        <section key={section.id ?? section.title} id={section.id} className="space-y-4" aria-labelledby={section.id ? `${section.id}-heading` : undefined}>
          <h2
            id={section.id ? `${section.id}-heading` : undefined}
            className="text-2xl font-semibold tracking-tight text-foreground normal-case sm:text-3xl"
          >
            {formatSectionHeadingTitle(section.title)}
          </h2>
          <div className="space-y-4 text-muted leading-relaxed [&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5">
            {section.children}
          </div>
        </section>
      ))}
    </article>
  );
}

function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
