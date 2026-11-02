import { createFileRoute } from "@tanstack/react-router";
import { Mark } from "@/components/landing/mark";
import { Footer } from "@/components/landing/sections";
import {
  businessEmail,
  businessEmailMailto,
  businessPhoneDisplay,
  businessPhoneTel,
} from "@/lib/content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — FleetWorks" },
      {
        name: "description",
        content:
          "FleetWorks LLC website Terms of Use and SMS Terms for FleetWorks Service Alerts.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="/" className="shrink-0" aria-label="FleetWorks home">
            <Mark />
          </a>
          <a
            href="/"
            className="text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
          >
            Back to home
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">
          Legal
        </p>
        <h1 className="mt-3 text-4xl text-fg sm:text-5xl">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted">
          FleetWorks LLC · Orlando, Florida · Effective November 2, 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-muted">
          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Agreement</h2>
            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access to and
              use of the FleetWorks LLC (&quot;FleetWorks,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) website at fleetworkspro.net
              and related pages. By using the site, you agree to these Terms. If
              you do not agree, do not use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Who we are</h2>
            <p>
              FleetWorks LLC provides fractional fleet management services to
              local service companies. The website describes our offerings and
              lets you request a check-in. Using the website does not create a
              paid service relationship; a separate agreement covers any
              engagement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Misuse forms, scrape content without permission, or disrupt the site</li>
              <li>Submit false or misleading contact information</li>
              <li>Attempt unauthorized access to systems or data</li>
              <li>Use the site for unlawful, harmful, or abusive purposes</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Intellectual property</h2>
            <p>
              Site content, branding, and materials are owned by FleetWorks or
              its licensors. You may view and share links for personal or
              internal business evaluation. You may not copy, modify, or
              redistribute content for commercial use without our written
              permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">No warranties</h2>
            <p>
              The website is provided &quot;as is.&quot; We do not warrant that
              it will be uninterrupted, error-free, or that content is complete
              or current. Fleet services, if any, are governed by a separate
              written agreement, not these website Terms alone.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, FleetWorks is not liable
              for indirect, incidental, special, consequential, or punitive
              damages arising from your use of the website. Our total liability
              for website-related claims is limited to one hundred U.S. dollars
              ($100).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">SMS Terms</h2>
            <p>
              <span className="text-fg">Program name:</span> FleetWorks Service
              Alerts
            </p>
            <p>
              FleetWorks may send Customer Care text messages about service
              updates, appointments, and inspection alerts to the mobile number
              you provide, from{" "}
              <span className="text-fg">{businessPhoneDisplay}</span>.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Opt-in is via the optional, unchecked-by-default checkbox on our
                website lead form, or via a signed service agreement / onboarding
                form. Consent is not a condition of purchase.
              </li>
              <li>Message frequency varies.</li>
              <li>Message and data rates may apply.</li>
              <li>
                Reply <span className="font-mono text-fg">STOP</span> to opt out.
                Reply <span className="font-mono text-fg">HELP</span> for help.
              </li>
              <li>
                Carriers are not liable for delayed or undelivered messages.
              </li>
              <li>
                Mobile opt-in data and consent are not shared with third parties
                for marketing or promotional purposes. See our{" "}
                <a
                  className="text-accent underline-offset-2 hover:underline"
                  href="/privacy"
                >
                  Privacy Policy
                </a>{" "}
                for details.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Privacy</h2>
            <p>
              How we collect and use information is described in our{" "}
              <a
                className="text-accent underline-offset-2 hover:underline"
                href="/privacy"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Changes</h2>
            <p>
              We may update these Terms from time to time. The effective date at
              the top of this page will change when we do. Continued use of the
              site after an update means you accept the revised Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Contact</h2>
            <p>
              FleetWorks LLC
              <br />
              Orlando, Florida
              <br />
              Email:{" "}
              <a
                className="text-accent underline-offset-2 hover:underline"
                href={businessEmailMailto}
              >
                {businessEmail}
              </a>
              <br />
              Phone:{" "}
              <a
                className="text-accent underline-offset-2 hover:underline"
                href={businessPhoneTel}
              >
                {businessPhoneDisplay}
              </a>
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
