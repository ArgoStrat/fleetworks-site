import { createFileRoute } from "@tanstack/react-router";
import { Mark } from "@/components/landing/mark";
import { Footer } from "@/components/landing/sections";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FleetWorks" },
      {
        name: "description",
        content:
          "FleetWorks LLC privacy policy, including SMS and text messaging terms for (407) 326-2400.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
        <h1 className="mt-3 text-4xl text-fg sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted">
          FleetWorks LLC · Orlando, Florida · Effective October 31, 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-muted">
          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Overview</h2>
            <p>
              FleetWorks LLC (&quot;FleetWorks,&quot; &quot;we,&quot; &quot;us,&quot;
              or &quot;our&quot;) provides fractional fleet management services
              to local service companies. This Privacy Policy explains what
              information we collect, how we use it, and your choices. By using
              our website or services, you agree to this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Information we collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Contact details you provide (name, business name, email, phone
                number, and address)
              </li>
              <li>
                Information needed to deliver fleet services (vehicle details,
                inspection and maintenance records, and related operational
                notes)
              </li>
              <li>
                Communications you send us, including form submissions and
                support requests
              </li>
              <li>
                Basic website usage data such as pages viewed, device or browser
                type, and approximate location derived from IP address
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">How we use information</h2>
            <p>We use information to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide, schedule, and improve our fleet management services</li>
              <li>Respond to inquiries and manage customer relationships</li>
              <li>
                Send service-related communications, including SMS where you have
                consented
              </li>
              <li>Meet legal, security, and operational requirements</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Sharing and selling</h2>
            <p>
              We do not sell your personal information. We may share information
              with service providers who help us operate (for example hosting,
              messaging, or analytics) under agreements that limit their use of
              your data to performing work for us, or when required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">SMS / Text Messaging</h2>
            <p>
              FleetWorks may send text messages to the mobile number associated
              with your account or inquiry from{" "}
              <span className="text-fg">(407) 326-2400</span>.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Message types include service updates, appointment confirmations,
                and vehicle inspection alerts.
              </li>
              <li>
                Consent is collected via the signed service agreement or
                onboarding form.
              </li>
              <li>Message frequency varies.</li>
              <li>Message and data rates may apply.</li>
              <li>
                Reply <span className="font-mono text-fg">STOP</span> to opt out
                and <span className="font-mono text-fg">HELP</span> for help.
              </li>
              <li>
                No mobile information will be shared with third parties or
                affiliates for marketing/promotional purposes. Text messaging
                originator opt-in data and consent will not be shared with any
                third parties.
              </li>
              <li>
                Carriers are not liable for delayed or undelivered messages.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Data retention and security</h2>
            <p>
              We keep information only as long as needed for the purposes above,
              including legal and accounting requirements. We use reasonable
              administrative and technical safeguards; no method of transmission
              or storage is fully secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Your choices</h2>
            <p>
              You may request access to, correction of, or deletion of personal
              information we hold about you, subject to applicable law. For SMS,
              use the STOP keyword described above or contact us directly.
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
                href="mailto:info@fleetworkspro.net"
              >
                info@fleetworkspro.net
              </a>
              <br />
              Phone:{" "}
              <a
                className="text-accent underline-offset-2 hover:underline"
                href="tel:+14073262400"
              >
                (407) 326-2400
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl text-fg">Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. The effective
              date at the top of this page will change when we do. Continued use
              of our website or services after an update means you accept the
              revised policy.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
