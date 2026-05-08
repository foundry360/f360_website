import Image from "next/image";
import Link from "next/link";
import { pageGuttersClass } from "@/lib/layout";
import { getFooterNavLinks, site } from "@/lib/site";
import logo from "../../../public/images/logo.png";

export function Footer() {
  const year = new Date().getFullYear();
  const cityStateZip = `${site.address.city}, ${site.address.region} ${site.address.postal}`;
  const footerLinks = getFooterNavLinks();

  const legalLinks = [
    { href: "/privacy", label: "Privacy statement" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/do-not-sell", label: "Do Not Sell/Share My Information" },
  ] as const;

  const linkClass =
    "text-xs text-muted transition hover:text-foreground sm:text-sm";

  return (
    <footer className="relative z-[45] mt-auto border-t border-border bg-surface">
      <div className={`${pageGuttersClass} py-14`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10">
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block rounded outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={logo}
                alt={site.name}
                className="block h-10 w-auto max-w-[min(300px,70vw)] object-contain object-left sm:h-11 md:h-12"
                sizes="(max-width: 640px) 70vw, 300px"
              />
            </Link>
            <p className="text-xs leading-relaxed text-muted sm:text-sm">{site.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 lg:col-span-5 lg:gap-x-3">
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">Explore</p>
              <ul className="mt-4 flex flex-col gap-2">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">Legal</p>
              <ul className="mt-4 flex flex-col gap-2">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-3">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">Contact</p>
            <address className="not-italic text-xs leading-relaxed text-muted sm:text-sm">
              {site.address.line1}
              <br />
              {cityStateZip}
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
                className="text-xs font-medium text-accent underline-offset-2 hover:underline sm:text-sm"
              >
                Get in touch →
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-12 text-center text-[0.625rem] text-muted sm:text-xs">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
