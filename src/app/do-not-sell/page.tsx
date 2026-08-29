import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { site } from "@/lib/site";

const EFFECTIVE_DATE = "2026-08-29";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Information",
  description: `How to opt out of the sale or sharing of personal information under applicable privacy laws at ${site.name}.`,
};

export default function DoNotSellPage() {
  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Do Not Sell/Share My Information"
        subtitle={`California and similar privacy laws give residents the right to opt out of certain “sales” or “sharing” of personal information. This page explains ${site.name}’s practices and how to submit a request.`}
        ctaSlot={<></>}
      />

      <Section variant="light" aria-label="Do not sell or share my information">
        <LegalArticle
          effectiveDate={EFFECTIVE_DATE}
          intro={
            <p>
              This notice supplements our <Link href="/privacy">Privacy Statement</Link>. For general privacy questions,
              email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          }
          sections={[
            {
              id: "our-practice",
              title: "Our practice",
              children: (
                <>
                  <p>
                    {site.name} does not sell personal information for monetary consideration. We do not exchange your
                    contact details with third parties for payment.
                  </p>
                  <p>
                    Under the California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA), “sale” and
                    “share” can also include certain disclosures of personal information for cross-context behavioral
                    advertising. Depending on how analytics or advertising technologies are configured on our sites or
                    products, some disclosures could be treated as a “sale” or “share” under those definitions.
                  </p>
                </>
              ),
            },
            {
              id: "opt-out",
              title: "How to opt out",
              children: (
                <>
                  <p>
                    To request that we not sell or share your personal information (as those terms are defined under
                    applicable law), or to opt out of cross-context behavioral advertising to the extent we engage in
                    it, email us at:
                  </p>
                  <p>
                    <a href={`mailto:${site.email}?subject=${encodeURIComponent("Do Not Sell or Share My Information")}`}>
                      {site.email}
                    </a>
                  </p>
                  <p>Please include:</p>
                  <ul>
                    <li>Your full name and the email address you use with us;</li>
                    <li>A clear statement that you want to opt out of sale/share of personal information; and</li>
                    <li>Any other context that helps us locate your information (for example, company name or product).</li>
                  </ul>
                  <p>
                    We will verify and respond as required by applicable law. You may also use browser signals such as
                    Global Privacy Control (GPC) where we recognize them; treat a recognized GPC signal as an opt-out
                    request for that browser/device.
                  </p>
                </>
              ),
            },
            {
              id: "what-opt-out-covers",
              title: "What an opt-out covers",
              children: (
                <>
                  <p>
                    An opt-out request applies to sale/share as defined by applicable law. It does not stop processing
                    we need to operate our website or Foundry360 Products, respond to you, meet legal obligations, or
                    perform services for a business customer under a Client Engagement when we act as their service
                    provider.
                  </p>
                  <p>
                    For data we process solely on behalf of a customer in a custom application engagement, we may refer
                    you to that customer so they can honor your request.
                  </p>
                </>
              ),
            },
            {
              id: "non-discrimination",
              title: "Non-discrimination",
              children: (
                <p>
                  We will not discriminate against you for exercising privacy rights available under applicable law,
                  subject to permitted differences in service when an opt-out affects features that rely on the opted-out
                  processing.
                </p>
              ),
            },
            {
              id: "more-info",
              title: "More information",
              children: (
                <p>
                  Full details on categories of information and how we use them are in our{" "}
                  <Link href="/privacy">Privacy Statement</Link>. Website and product use is also subject to our{" "}
                  <Link href="/terms">Terms &amp; Conditions</Link>.
                </p>
              ),
            },
          ]}
        />
      </Section>
    </>
  );
}
