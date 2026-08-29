import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/layout/Section";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { site } from "@/lib/site";

const EFFECTIVE_DATE = "2026-08-29";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: `How ${site.name} collects, uses, and shares personal information across our website, Foundry360-branded apps, and client application work.`,
};

export default function PrivacyPage() {
  const addressLine = `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;

  return (
    <>
      <Hero
        eyebrow="Legal"
        title="Privacy Statement"
        subtitle={`This Privacy Statement explains how ${site.name} handles personal information when you use our website, Foundry360-branded applications, and when we build or support applications for customers.`}
        ctaSlot={<></>}
      />

      <Section variant="light" aria-label="Privacy statement">
        <LegalArticle
          effectiveDate={EFFECTIVE_DATE}
          intro={
            <>
              <p>
                “{site.name},” “we,” “us,” and “our” refer to Foundry360 ({addressLine}). Privacy requests:{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>. This statement is a practical policy description; it
                is not legal advice.
              </p>
              <p>
                Related: <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
                <Link href="/do-not-sell">Do Not Sell/Share My Information</Link>.
              </p>
            </>
          }
          sections={[
            {
              id: "scope",
              title: "Scope",
              children: (
                <p>
                  This statement covers personal information we collect through our marketing websites, contact and
                  assessment forms, Foundry360 Products we market under our brand, and—where we act as a service
                  provider or processor—data handled in Client Engagements when we build or operate applications for
                  customers.
                </p>
              ),
            },
            {
              id: "what-we-collect",
              title: "What we collect",
              children: (
                <>
                  <p>Depending on how you interact with us, we may collect:</p>
                  <ul>
                    <li>
                      <strong className="font-medium text-foreground">Contact and lead information</strong> — such as
                      name, email, phone, company, role, and message content from contact forms or sales inquiries;
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">AI Readiness and similar tools</strong> — assessment
                      answers, scores, organization details, and related lead fields needed to run the tool and follow
                      up;
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">Product account and usage data</strong> — account
                      identifiers, authentication data, settings, and product telemetry or logs needed to operate and
                      secure Foundry360 Products;
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">Technical and analytics data</strong> — IP address,
                      device/browser type, pages viewed, referring URLs, and similar data via cookies or analytics
                      (including Google Analytics when configured); and
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">Client project data</strong> — information you or
                      your organization provide so we can design, build, host, or support custom applications, which may
                      include end-user or operational data under the client’s control.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              id: "how-we-use",
              title: "How we use information",
              children: (
                <>
                  <p>We use personal information to:</p>
                  <ul>
                    <li>Respond to inquiries and provide requested information or demos;</li>
                    <li>Deliver, maintain, secure, and improve Foundry360 Products and our website;</li>
                    <li>Run assessments and share results or follow-up recommendations;</li>
                    <li>Perform Client Engagements under contract with the customer;</li>
                    <li>Send service-related notices and, where permitted, marketing communications; and</li>
                    <li>Comply with law, enforce our Terms, and protect our rights, users, and systems.</li>
                  </ul>
                </>
              ),
            },
            {
              id: "client-project-data",
              title: "Client project data",
              children: (
                <p>
                  When we process personal information for a customer in a Client Engagement (for example, data inside
                  an application we build or operate for them), we do so as a service provider / processor under that
                  customer’s instructions and contract. We do not use client end-user data from those engagements as our
                  own marketing list. The customer’s own privacy notices and agreements with their users typically
                  govern that data; ask the customer for details about their practices.
                </p>
              ),
            },
            {
              id: "sharing",
              title: "How we share information",
              children: (
                <>
                  <p>We may share personal information with:</p>
                  <ul>
                    <li>
                      <strong className="font-medium text-foreground">Service providers</strong> who help us operate
                      (hosting, CRM / marketing automation, email, analytics, AI model providers when used to power a
                      feature, payment processors if applicable, and similar vendors), under obligations to use the data
                      only to provide services to us;
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">Professional advisors</strong> (legal, accounting)
                      where needed;
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">Authorities or parties</strong> when required by
                      law, legal process, or to protect rights and safety; and
                    </li>
                    <li>
                      <strong className="font-medium text-foreground">Successors</strong> in connection with a merger,
                      acquisition, or asset sale, subject to appropriate protections.
                    </li>
                  </ul>
                  <p>
                    We do not sell personal information for monetary consideration. For California “sale” / “share”
                    rights related to cross-context behavioral advertising, see our{" "}
                    <Link href="/do-not-sell">Do Not Sell/Share My Information</Link> page.
                  </p>
                </>
              ),
            },
            {
              id: "cookies",
              title: "Cookies and analytics",
              children: (
                <p>
                  We and our providers may use cookies, pixels, or similar technologies for essential site functions,
                  preferences, and analytics. You can control cookies through your browser settings; disabling some
                  cookies may limit site functionality. If we use advertising or analytics technologies that may be
                  treated as a “sale” or “share” under certain laws, you can submit a request as described on the{" "}
                  <Link href="/do-not-sell">Do Not Sell/Share</Link> page.
                </p>
              ),
            },
            {
              id: "retention",
              title: "Retention",
              children: (
                <p>
                  We retain personal information as long as needed for the purposes described above, including to
                  maintain accounts, complete engagements, meet legal or accounting requirements, and resolve disputes.
                  Retention for Client Engagement data follows the contract and the customer’s instructions where we act
                  as their processor.
                </p>
              ),
            },
            {
              id: "security",
              title: "Security",
              children: (
                <p>
                  We use reasonable administrative, technical, and organizational measures designed to protect personal
                  information. No method of transmission or storage is completely secure; we cannot guarantee absolute
                  security.
                </p>
              ),
            },
            {
              id: "your-rights",
              title: "Your rights and choices",
              children: (
                <>
                  <p>
                    Depending on where you live, you may have rights to access, correct, delete, or obtain a copy of
                    certain personal information, or to opt out of certain processing (including sale/share or targeted
                    advertising where applicable). To exercise rights, email{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a> with enough detail for us to verify and respond to
                    your request. You may also use the{" "}
                    <Link href="/do-not-sell">Do Not Sell/Share</Link> channel for those specific requests.
                  </p>
                  <p>
                    You can unsubscribe from marketing emails using the link in those messages. For Client Engagement
                    data held for a customer, we may direct you to that customer to process your request.
                  </p>
                </>
              ),
            },
            {
              id: "children",
              title: "Children",
              children: (
                <p>
                  Our website, products, and services are directed to businesses and professionals, not to children under
                  16. We do not knowingly collect personal information from children under 16. If you believe we have,
                  contact us and we will take appropriate steps to delete it.
                </p>
              ),
            },
            {
              id: "international",
              title: "International users",
              children: (
                <p>
                  We are based in the United States. If you access our site or products from outside the U.S., your
                  information may be processed in the United States or other countries where we or our providers
                  operate, which may have different data-protection rules than your country.
                </p>
              ),
            },
            {
              id: "changes-contact",
              title: "Changes and contact",
              children: (
                <p>
                  We may update this Privacy Statement from time to time by posting a revised version with a new
                  effective date. Questions or privacy requests:{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>, {site.phone}, or {addressLine}.
                </p>
              ),
            },
          ]}
        />
      </Section>
    </>
  );
}
