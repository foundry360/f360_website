import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} for enterprise AI strategy, development, governance, and integration. ${site.email} · ${site.phone}.`,
};

export default function ContactPage() {
  const addressLine = `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;

  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Talk to one of our experts"
        subtitle="Curious how Foundry360 can help your business move faster without compromising governance? Share your sector, systems, and what you are trying to prove this year. We respond with a direct point of view, not a generic pitch."
      />

      <Section variant="light" aria-label="Contact options and form" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground normal-case sm:text-3xl">
                {formatSectionHeadingTitle("Direct lines")}
              </h2>
              <address className="mt-4 not-italic space-y-3 text-sm leading-relaxed text-muted">
                <p className="font-medium text-foreground">{site.name}</p>
                <p>{addressLine}</p>
                <p>
                  <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
                    {site.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${site.phoneTel}`} className="underline-offset-2 hover:text-foreground hover:underline">
                    {site.phone}
                  </a>
                </p>
              </address>
            </div>
            <div className="rounded-2xl border border-border bg-black/25 p-5 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-foreground">What to include</h3>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted marker:text-accent">
                <li>Industry and regulatory context that shapes how you can ship.</li>
                <li>Current systems (cloud, data platforms, CRM, service tools, whatever matters).</li>
                <li>Whether you need strategy, build, governance, integration, or all of the above.</li>
                <li>Timeline and the decision you are trying to make in the next 30 to 60 days.</li>
              </ul>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              The form below is UI-only until you wire a server action, API route, or form provider. Email and phone reach the
              team today.
            </p>
          </div>
          <div className="scroll-mt-28 lg:col-span-3" id="contact-form">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
