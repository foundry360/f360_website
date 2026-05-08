import Link from "next/link";
import { pageGuttersClass } from "@/lib/layout";
import { getFooterNavLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const addressLine = `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
  const footerLinks = getFooterNavLinks();

  return (
    <footer className="mt-auto border-t border-border bg-surface/50">
      <div className={`${pageGuttersClass} py-14`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-lg font-semibold tracking-tight text-foreground">{site.name}</p>
            <p className="text-sm leading-relaxed text-muted">{site.description}</p>
            <address className="not-italic text-sm leading-relaxed text-muted">
              {addressLine}
              <br />
              <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
                {site.email}
              </a>
              <br />
              <a href={`tel:${site.phoneTel}`} className="underline-offset-2 hover:text-foreground hover:underline">
                {site.phone}
              </a>
            </address>
            <p>
              <Link
                href="/contact#contact-form"
                className="text-sm font-medium text-accent underline-offset-2 hover:underline"
              >
                Get in touch →
              </Link>
            </p>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Explore</p>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Legacy site</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Policy pages and older content may still live on the WordPress host during migration.
            </p>
            <a
              href={site.url}
              className="mt-3 inline-block text-sm font-medium text-accent underline-offset-2 hover:underline"
              rel="noopener noreferrer"
            >
              {site.url.replace(/^https:\/\//, "")} →
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
