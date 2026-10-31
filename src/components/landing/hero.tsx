import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  businessPhoneDisplay,
  businessPhoneTel,
  ctaPrimary,
} from "@/lib/content";
import { useApp } from "@/lib/store";

export function Hero() {
  const openLead = useApp((s) => s.openLead);

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12">
      <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="stagger-in">
          <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
            Orlando · Fractional fleet management
          </p>
          <h1 className="mt-4 max-w-xl text-5xl leading-[1.02] text-fg sm:text-6xl lg:text-7xl">
            Your trucks stay ready. You stay on the job.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            FleetWorks watches maintenance, inspections, and repairs for local
            service companies. You don't hire a full-time fleet manager, and you
            don't babysit another app.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openLead("hero")}>
              {ctaPrimary}
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#packages">See the three packages</a>
            </Button>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-subtle">
            15 minutes. If the fleet is already under control, we'll tell you.
            Prefer to talk now?{" "}
            <a
              href={businessPhoneTel}
              className="font-medium text-muted transition-colors duration-150 hover:text-fg"
            >
              {businessPhoneDisplay}
            </a>
          </p>
        </div>
        <figure className="relative">
          <img
            src="/images/yard-morning.jpg"
            alt="A row of work vans in a morning service yard"
            className="aspect-[16/10] w-full rounded-xl object-cover shadow-[var(--shadow-border)]"
          />
          <figcaption className="absolute right-3 bottom-3 left-3 rounded-md bg-surface/95 p-4 shadow-[var(--shadow-border)] sm:right-auto sm:max-w-xs">
            <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">
              The job
            </p>
            <p className="mt-1 text-sm leading-snug text-fg">
              A truck down on a Monday is a missed appointment. We keep the list
              so you don't.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
