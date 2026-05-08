import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export type CardItem = {
  title: string;
  description: string;
  href?: string;
  meta?: string;
  icon?: ReactNode;
};

type CardGridProps = {
  eyebrow?: string;
  /** Omit when the page already supplies a section heading above the grid. */
  title?: string;
  description?: string;
  items: CardItem[];
  columns?: 2 | 3 | 4;
};

export function CardGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
}: CardGridProps) {
  const col =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <div className="flex flex-col gap-12">
      {hasHeader ? (
        <Reveal className="max-w-5xl space-y-4">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          ) : null}
          {title ? (
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          ) : null}
          {description ? <p className="text-lg text-muted">{description}</p> : null}
        </Reveal>
      ) : null}
      <ul className={`grid gap-5 ${col}`}>
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delayMs={i * 60}>
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
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 shadow-sm transition hover:border-accent/35 hover:bg-surface-elevated/80">
      {item.icon ? (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-dim text-accent">
          {item.icon}
        </div>
      ) : null}
      {item.meta ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">{item.meta}</p>
      ) : null}
      <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
      {item.href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
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
        className="block h-full rounded-2xl outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
