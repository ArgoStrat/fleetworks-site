import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Hero } from "@/components/landing/hero";
import { LeadDialog } from "@/components/landing/lead-dialog";
import { Nav } from "@/components/landing/nav";
import {
  Cta,
  Faq,
  Fit,
  Footer,
  How,
  Packages,
  Problem,
  StickyCta,
  Work,
} from "@/components/landing/sections";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="bg-bg pb-20 text-fg md:pb-0">
      <Nav />
      <Hero />
      <Problem />
      <How />
      <Work />
      <Packages />
      <Fit />
      <Faq />
      <Cta />
      <Footer />
      <LeadDialog />
      <StickyCta />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          className: "bg-surface text-fg border-line font-sans",
        }}
      />
    </main>
  );
}
