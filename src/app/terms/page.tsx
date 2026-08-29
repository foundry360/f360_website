import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { site } from "@/lib/site";

const EFFECTIVE_DATE = "2026-08-29";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms governing use of the ${site.name} website, Foundry360-branded applications, and custom application development services.`,
};

export default function TermsPage() {
  const addressLine = `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;

  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle={`These Terms govern your use of the ${site.name} website, Foundry360-branded applications and products, and our custom application development services for clients.`}
        ctaSlot={<></>}
      />

      <Section variant="light" aria-label="Terms and conditions">
        <LegalArticle
          effectiveDate={EFFECTIVE_DATE}
          intro={
            <>
              <p>
                By accessing or using our website, products, or services, you agree to these Terms &amp; Conditions
                (“Terms”). If you do not agree, do not use the site or our services. These Terms are practical website
                and service policies; they are not a substitute for advice from your own counsel.
              </p>
              <p>
                “{site.name},” “we,” “us,” and “our” refer to Foundry360, located at {addressLine}. Contact:{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </>
          }
          sections={[
            {
              id: "services-covered",
              title: "Services covered",
              children: (
                <>
                  <p>These Terms apply to:</p>
                  <ul>
                    <li>
                      Our marketing and informational websites (including {site.url.replace(/^https:\/\//, "")} and
                      related properties);
                    </li>
                    <li>
                      Applications, products, tools, and digital experiences we market under the Foundry360 brand
                      (“Foundry360 Products”); and
                    </li>
                    <li>
                      Custom software and AI-enabled applications we design, build, or support for customers under a
                      proposal, statement of work, master services agreement, or similar agreement (“Client
                      Engagements”).
                    </li>
                  </ul>
                  <p>
                    Product-specific terms, click-through licenses, and Client Engagement contracts control if they
                    conflict with these Terms for that product or engagement.
                  </p>
                </>
              ),
            },
            {
              id: "website-use",
              title: "Website use",
              children: (
                <>
                  <p>
                    You may use the website for lawful business and informational purposes. You agree not to misuse the
                    site, including by attempting unauthorized access, disrupting service, scraping in a way that harms
                    performance or violates robots rules, or using the site to distribute malware or unlawful content.
                  </p>
                  <p>
                    Site content—including text, branding, graphics, and layout—is owned by {site.name} or its
                    licensors and is protected by intellectual property laws. You may not copy, modify, or redistribute
                    site materials for commercial purposes without our prior written consent, except for fair use or
                    other rights that cannot be waived under applicable law.
                  </p>
                </>
              ),
            },
            {
              id: "foundry360-products",
              title: "Foundry360 products",
              children: (
                <>
                  <p>
                    Subject to these Terms and any product-specific terms, we grant you a limited, non-exclusive,
                    non-transferable right to access and use Foundry360 Products for which you have a valid account or
                    license, solely for their intended purpose.
                  </p>
                  <p>You agree not to:</p>
                  <ul>
                    <li>Reverse engineer, decompile, or attempt to extract source code except where permitted by law;</li>
                    <li>Resell, sublicense, or provide unauthorized access to the product;</li>
                    <li>Circumvent security, usage limits, or authentication controls; or</li>
                    <li>Use the product in violation of law or in a way that infringes others’ rights.</li>
                  </ul>
                  <p>
                    Foundry360 Products may integrate third-party services (hosting, analytics, identity, AI providers,
                    and similar). Your use of those services may also be subject to the third party’s terms. We are not
                    responsible for third-party services we do not control.
                  </p>
                  <p>
                    You are responsible for maintaining the confidentiality of account credentials and for activity
                    under your accounts.
                  </p>
                </>
              ),
            },
            {
              id: "client-engagements",
              title: "Client engagements",
              children: (
                <>
                  <p>
                    For custom application development and related professional services, the applicable proposal,
                    statement of work, order form, and/or master agreement (together, the “SOW”) governs deliverables,
                    fees, payment, timelines, acceptance, intellectual property ownership, confidentiality, warranties,
                    and liability for that engagement.
                  </p>
                  <p>
                    These Terms apply to Client Engagements only where the SOW is silent. If there is a conflict, the
                    SOW controls for that engagement. Nothing on this website creates a binding services commitment
                    until both parties execute an SOW or other written agreement.
                  </p>
                </>
              ),
            },
            {
              id: "ai-tools",
              title: "AI and assessment tools",
              children: (
                <p>
                  Tools such as the AI Readiness Assessment and similar scoring, recommendations, or generated content
                  are informational. They do not constitute legal, regulatory, medical, financial, or compliance advice,
                  and they are not a guarantee of readiness, outcomes, or regulatory status. You remain responsible for
                  decisions you make based on any outputs.
                </p>
              ),
            },
            {
              id: "disclaimers",
              title: "Disclaimers",
              children: (
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE WEBSITE, FOUNDRY360 PRODUCTS, AND RELATED MATERIALS ARE
                  PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR
                  STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do
                  not warrant that the site or products will be uninterrupted, error-free, or free of harmful
                  components. Client Engagement warranties, if any, are solely as stated in the applicable SOW.
                </p>
              ),
            },
            {
              id: "liability",
              title: "Limitation of liability",
              children: (
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, {site.name.toUpperCase()} AND ITS AFFILIATES, OFFICERS,
                  EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY,
                  OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY, ARISING FROM OR
                  RELATED TO THESE TERMS OR YOUR USE OF THE WEBSITE OR FOUNDRY360 PRODUCTS, WHETHER BASED IN CONTRACT,
                  TORT, OR OTHERWISE—EVEN IF ADVISED OF THE POSSIBILITY. OUR AGGREGATE LIABILITY FOR CLAIMS ARISING OUT
                  OF THE WEBSITE OR FOUNDRY360 PRODUCTS UNDER THESE TERMS WILL NOT EXCEED THE GREATER OF ONE HUNDRED
                  U.S. DOLLARS (US $100) OR THE AMOUNTS YOU PAID US FOR THE PRODUCT GIVING RISE TO THE CLAIM IN THE
                  TWELVE (12) MONTHS BEFORE THE CLAIM. Liability for Client Engagements is governed by the applicable
                  SOW.
                </p>
              ),
            },
            {
              id: "indemnification",
              title: "Indemnification",
              children: (
                <p>
                  You agree to defend, indemnify, and hold harmless {site.name} and its officers, employees, and agents
                  from claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising from your
                  misuse of the website or Foundry360 Products, your violation of these Terms, or your violation of
                  applicable law or third-party rights—except to the extent caused by our willful misconduct.
                </p>
              ),
            },
            {
              id: "termination",
              title: "Termination",
              children: (
                <p>
                  We may suspend or terminate access to the website or Foundry360 Products if you violate these Terms
                  or if we discontinue a product or feature. Provisions that by their nature should survive
                  (including intellectual property, disclaimers, limitation of liability, indemnification, and governing
                  law) will survive termination. Client Engagement termination is governed by the SOW.
                </p>
              ),
            },
            {
              id: "governing-law",
              title: "Governing law",
              children: (
                <p>
                  These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law
                  rules. Exclusive venue for disputes arising under these Terms (other than those governed by an SOW
                  with different terms) lies in the state or federal courts located in Clay County or Duval County,
                  Florida, and you consent to personal jurisdiction there.
                </p>
              ),
            },
            {
              id: "changes",
              title: "Changes to these terms",
              children: (
                <p>
                  We may update these Terms from time to time. The effective date above will change when we post
                  updates. Continued use of the website or Foundry360 Products after changes become effective
                  constitutes acceptance of the revised Terms. Material changes to Client Engagements require the
                  process set out in the applicable SOW.
                </p>
              ),
            },
            {
              id: "contact",
              title: "Contact",
              children: (
                <p>
                  Questions about these Terms:{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>, {site.phone}, or mail to {addressLine}. See also
                  our{" "}
                  <Link href="/privacy">Privacy Statement</Link> and{" "}
                  <Link href="/do-not-sell">Do Not Sell/Share My Information</Link> notice.
                </p>
              ),
            },
          ]}
        />
      </Section>
    </>
  );
}
