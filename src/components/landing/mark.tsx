import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="FleetWorks. Keeping your fleet working. Growing your business."
      className={cn("h-14 w-auto sm:h-16", className)}
    />
  );
}
