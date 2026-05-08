import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Page not found</h1>
      <p className="mt-3 text-muted">
        That URL does not exist on this site. If you followed a link from an older page, the structure may have changed during
        our move to this experience.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact#contact-form" variant="secondary">
          Get in touch
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-muted">
        Looking for our latest articles?{" "}
        <Link href="/insights" className="font-medium text-accent underline-offset-2 hover:underline">
          Insights
        </Link>{" "}
        · Still need the legacy site?{" "}
        <a href={site.url} className="font-medium text-accent underline-offset-2 hover:underline" rel="noopener noreferrer">
          {site.url.replace(/^https:\/\//, "")}
        </a>
      </p>
    </div>
  );
}
