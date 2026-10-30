import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mark } from "@/components/landing/mark";
import {
  boundaries,
  ctaPrimary,
  faqs,
  handles,
  loop,
  packages,
  trades,
} from "@/lib/content";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
            The quiet job
          </p>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
            Fleet work lands on whoever already has a job.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            For most shops with a few trucks, oil changes, tags, and “call me
            if it sounds bad” sit with the owner or the ops manager. Things get
            forgotten. Then a van is down in the middle of a route.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["Time", "Hours a week chasing drivers, shops, and paper."],
            ["Surprises", "A missed service becomes a canceled call."],
            ["No system", "Records live in texts, memory, and a spreadsheet."],
            ["The hire", "A fleet manager is a six-figure seat you don't need yet."],
          ].map(([title, body]) => (
            <li
              key={title}
              className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-display text-xl">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function How() {
  return (
    <section id="loop" className="bg-ink text-ink-fg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
          Monitor. Analyze. Recommend. You decide. We track.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-fg/75">
          FleetWorks is the management loop, not a login. Whip Around is the
          system underneath. Your people shouldn't have to administer it.
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {loop.map((item) => (
            <li key={item.step} className="border-t border-ink-fg/15 pt-4">
              <p className="font-mono text-xs text-accent">{item.step}</p>
              <p className="mt-2 font-display text-2xl">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-fg/70">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
      <img
        src="/images/shop-bay.jpg"
        alt="Open hood of a work van in a clean service bay"
        className="aspect-[3/2] w-full rounded-xl object-cover shadow-[var(--shadow-border)]"
      />
      <div>
        <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
          What we take off the plate
        </p>
        <h2 className="mt-3 text-4xl leading-tight">
          A person follows up. The software does not.
        </h2>
        <ul className="mt-6 space-y-3">
          {handles.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed">
              <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Packages() {
  const openLead = useApp((s) => s.openLead);

  return (
    <section id="packages" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
            Packages
          </p>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
            Three levels of decision support.
          </h2>
          <p className="mt-3 text-lg text-muted">
            Same core controls. What changes is how often you hear from us, and
            how deep the decisions go. We'll match one on the check-in.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={cn(
                "flex flex-col rounded-xl bg-bg p-6 shadow-[var(--shadow-border)]",
                pkg.recommended && "bg-elevated shadow-[0_0_0_1px_var(--color-accent)]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
                  {pkg.tier}
                </p>
                {pkg.recommended ? (
                  <span className="rounded-sm bg-accent px-2 py-1 font-mono text-xs tracking-wide text-accent-fg uppercase">
                    Start here
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-3xl tracking-wide uppercase">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.line}</p>
              <p className="mt-4 text-sm leading-relaxed text-fg">{pkg.cadence}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={pkg.recommended ? "primary" : "outline"}
                onClick={() => openLead(`package-${pkg.id}`, pkg.id)}
              >
                Check in on {pkg.name}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Fit() {
  return (
    <section id="fit" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
            Who it's for
          </p>
          <h2 className="mt-3 text-4xl leading-tight">
            Local companies whose promise depends on a truck starting.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            One-hour arrival. A named tech on a route. A move that can't slip
            to Monday. If the vehicle is the appointment, the maintenance can't
            live in someone's head.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {trades.map((trade) => (
              <li
                key={trade}
                className="rounded-sm bg-elevated px-3 py-2 text-sm text-fg"
              >
                {trade}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]">
          <h3 className="text-2xl">What we will not pretend to do</h3>
          <ul className="mt-4 space-y-3">
            {boundaries.map((item) => (
              <li key={item} className="border-t border-line pt-3 text-sm leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-fg">
            What we will stand behind: the onboarding controls and the reports
            we schedule. If we miss those for a reason we control, we make it
            right at no extra management fee.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="text-4xl">Questions worth asking first</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-muted">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function Cta() {
  const openLead = useApp((s) => s.openLead);
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl bg-ink px-6 py-12 text-ink-fg sm:px-12">
        <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
          Next step
        </p>
        <h2 className="mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">
          Fifteen minutes. A straight answer on whether this fits.
        </h2>
        <p className="mt-4 max-w-lg text-lg text-ink-fg/75">
          Tell us how many trucks you run and who tracks oil changes today.
          We'll say if FleetWorks helps, and which package matches the way you
          want to run it.
        </p>
        <Button className="mt-8" size="lg" onClick={() => openLead("footer")}>
          {ctaPrimary}
        </Button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Mark className="h-24 sm:h-28" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            FleetWorks LLC. Fractional fleet management for local service
            companies in Orlando. Jason Trubenbach.
          </p>
        </div>
        <p className="text-sm text-subtle">
          Whip Around is the platform we run for you. It is not the product.
        </p>
      </div>
    </footer>
  );
}

export function StickyCta() {
  const openLead = useApp((s) => s.openLead);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 p-3 backdrop-blur md:hidden">
      <Button className="w-full" onClick={() => openLead("sticky")}>
        {ctaPrimary}
      </Button>
    </div>
  );
}
