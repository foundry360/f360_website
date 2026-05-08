import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export type CardItem = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
  icon?: ReactNode;
  /** Skip `formatSectionHeadingTitle` for literals like "$10M to $100M" or "Healthcare & Life Sciences". */
  titleNormalCase?: boolean;
};

type CardGridProps = {
  eyebrow?: string;
  /** Omit when the page already supplies a section heading above the grid. */
  title?: ReactNode;
  description?: string;
  items: CardItem[];
  columns?: 2 | 3 | 4;
  /** Align eyebrow, title, and description above the grid. */
  headerAlign?: "start" | "center";
  /** With `headerAlign="center"`, use a wider cap so long one-line titles fit. */
  centeredHeaderWide?: boolean;
  /** Keep `title` on one line (fluid size + full-width header when left-aligned; scroll only if still too long). */
  titleSingleLine?: boolean;
  /** Keep `description` on one line; horizontal scroll when it exceeds the viewport. */
  descriptionSingleLine?: boolean;
};

export function CardGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  headerAlign = "start",
  centeredHeaderWide = false,
  titleSingleLine = false,
  descriptionSingleLine = false,
}: CardGridProps) {
  const titleContent = typeof title === "string" ? formatSectionHeadingTitle(title) : title;

  const col =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const hasHeader = Boolean(eyebrow || title || description);

  const headerClass =
    headerAlign === "center"
      ? [
          "mx-auto min-w-0 w-full space-y-4 text-center",
          centeredHeaderWide ? "max-w-7xl" : "max-w-5xl",
        ].join(" ")
      : titleSingleLine
        ? "w-full min-w-0 max-w-none space-y-4"
        : "max-w-5xl space-y-4";

  return (
    <div className="flex flex-col gap-12">
      {hasHeader ? (
        <Reveal className={headerClass}>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent sm:text-base">{eyebrow}</p>
          ) : null}
          {title ? (
            titleSingleLine ? (
              <div className="-mx-1 min-w-0 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0">
                <h2
                  className={[
                    "w-max whitespace-nowrap px-1 font-semibold leading-tight tracking-tight text-foreground normal-case text-[clamp(1rem,calc(0.5rem+2.6vw+0.45vmin),3rem)] sm:px-0",
                    headerAlign === "center" ? "mx-auto" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {titleContent}
                </h2>
              </div>
            ) : (
              <h2 className="text-4xl font-semibold tracking-tight text-foreground normal-case sm:text-5xl">
                {titleContent}
              </h2>
            )
          ) : null}
          {description ? (
            descriptionSingleLine ? (
              <div
                className={[
                  "-mx-1 flex min-w-0 justify-center overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0",
                ].join(" ")}
              >
                <p className="w-max whitespace-nowrap px-1 text-center text-lg text-muted sm:px-0 sm:text-xl">
                  {description}
                </p>
              </div>
            ) : (
              <p
                className={[
                  "text-lg text-muted sm:text-xl",
                  headerAlign === "center" ? "mx-auto max-w-3xl" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {description}
              </p>
            )
          ) : null}
        </Reveal>
      ) : null}
      <ul className={`grid items-stretch gap-5 ${col}`}>
        {items.map((item, i) => (
          <li key={item.title} className="h-full min-h-0">
            <Reveal delayMs={i * 60} className="flex h-full min-h-0 flex-col">
              <Card item={item} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ item }: { item: CardItem }) {
  const inner = (
    <article className="group flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-surface/60 p-6 shadow-sm transition hover:border-accent/35 hover:bg-surface-elevated/80">
      {item.icon ? (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-dim text-accent">
          {item.icon}
        </div>
      ) : null}
      {item.meta ? (
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted">{item.meta}</p>
      ) : null}
      <h3 className="text-2xl font-semibold tracking-tight text-foreground normal-case group-hover:text-accent">
        {item.titleNormalCase ? item.title : formatSectionHeadingTitle(item.title)}
      </h3>
      <p className="mt-3 min-h-[calc(4*1.625*0.875rem)] flex-1 text-sm leading-relaxed text-muted sm:min-h-[calc(4*1.625*1rem)] sm:text-base">
        {item.description}
      </p>
      {item.href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-base font-medium text-accent">
          Learn more
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      ) : null}
    </article>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="flex h-full min-h-0 flex-col rounded-2xl outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
      >
        {inner}
      </Link>
    );
  }

  return <div className="flex h-full min-h-0 flex-col">{inner}</div>;
}
