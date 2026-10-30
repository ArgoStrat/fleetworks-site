import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/landing/mark";
import { ctaPrimary, navLinks } from "@/lib/content";
import { useApp } from "@/lib/store";

export function Nav() {
  const [open, setOpen] = useState(false);
  const openLead = useApp((s) => s.openLead);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="shrink-0" aria-label="FleetWorks home">
          <Mark />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors duration-150 hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={() => openLead("nav")}>{ctaPrimary}</Button>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-md text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2 w-full"
              onClick={() => {
                setOpen(false);
                openLead("nav-mobile");
              }}
            >
              {ctaPrimary}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
