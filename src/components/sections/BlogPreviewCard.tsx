import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

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
        <time className="text-xs font-medium uppercase tracking-wide text-muted" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
          <Link
            href={`/insights/${post.slug}`}
            className="rounded outline-none ring-offset-2 ring-offset-background hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
        <p className="mt-4 text-xs text-muted">By {post.author}</p>
        <Link
          href={`/insights/${post.slug}`}
          className="mt-3 inline-flex text-sm font-medium text-accent hover:underline"
        >
          Read perspective →
        </Link>
      </article>
    </Reveal>
  );
}
