"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../public/images/logo.png";
import { navEntries, site } from "@/lib/site";
import { isNavActive } from "@/lib/nav";
import { ButtonLink } from "@/components/ui/ButtonLink";

const navUnderline =
  "pointer-events-none absolute bottom-0 left-0 right-0 h-px rounded-full bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none";

function desktopNavLinkClass(active: boolean) {
  return [
    "group relative inline-flex h-full items-center px-3 text-sm font-medium outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-accent",
    "transition-colors duration-200 motion-reduce:transition-none",
    active ? "text-foreground" : "text-muted hover:text-foreground",
  ].join(" ");
}

function desktopUnderlineClass(active: boolean) {
  return [
    navUnderline,
    "origin-center",
    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-accent/45",
  ].join(" ");
}

function mobileNavLinkClass(active: boolean) {
  return [
    "group relative block py-3 pl-1 pr-3 text-sm font-medium",
    "transition-colors duration-200 motion-reduce:transition-none",
    active ? "text-foreground" : "text-foreground hover:text-muted",
  ].join(" ");
}

function mobileUnderlineClass(active: boolean) {
  return [
    navUnderline,
    "origin-left",
    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-accent/45",
  ].join(" ");
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center rounded outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src={logo}
            alt={site.name}
            priority
            className="block h-10 w-auto max-w-[min(300px,58vw)] object-contain object-left sm:h-11 md:h-12"
            sizes="(max-width: 640px) 58vw, (max-width: 768px) 300px, 320px"
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-4 md:gap-6">
          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex h-20 items-stretch gap-1 lg:gap-2">
              {navEntries.map((entry) => {
                const active = isNavActive(pathname, entry.href);
                return (
                  <li key={entry.href} className="flex">
                    <Link
                      href={entry.href}
                      className={desktopNavLinkClass(active)}
                      aria-current={active ? "page" : undefined}
                    >
                      {entry.label}
                      <span className={desktopUnderlineClass(active)} aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink href="/contact#contact-form" className="hidden md:inline-flex">
              Get in touch
            </ButtonLink>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-border p-2 text-foreground md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="w-full border-t border-border bg-background px-4 py-4 sm:px-6 lg:px-8 md:hidden"
        >
          <nav className="flex flex-col gap-1 text-right" aria-label="Mobile primary">
            <ul className="flex flex-col">
              {navEntries.map((entry) => {
                const active = isNavActive(pathname, entry.href);
                return (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className={mobileNavLinkClass(active)}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      {entry.label}
                      <span className={mobileUnderlineClass(active)} aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href="/contact#contact-form" className="mt-3 w-full justify-center" onClick={() => setMobileOpen(false)}>
              Get in touch
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
