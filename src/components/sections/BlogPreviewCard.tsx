import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export type BlogPreview = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

export function BlogPreviewCard({ post, index = 0 }: { post: BlogPreview; index?: number }) {
  return (
    <Reveal delayMs={index * 70}>
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 transition hover:border-accent/35 hover:bg-surface-elevated/70">
        <time className="text-sm font-medium uppercase tracking-wide text-muted" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground normal-case">
          <Link
            href={`/insights/${post.slug}`}
            className="rounded outline-none ring-offset-2 ring-offset-background hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            {formatSectionHeadingTitle(post.title)}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted sm:text-base">{post.description}</p>
        <div className="mt-auto flex flex-col gap-3 pt-4">
          <p className="text-sm text-muted">By {post.author}</p>
          <Link
            href={`/insights/${post.slug}`}
            className="inline-flex text-base font-medium text-accent hover:underline"
          >
            Read perspective →
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
