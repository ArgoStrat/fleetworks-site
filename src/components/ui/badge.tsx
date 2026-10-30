import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-elevated px-2.5 py-1 text-xs font-medium tracking-wide text-muted shadow-[var(--shadow-border)]",
        className,
      )}
      {...props}
    />
  );
}
