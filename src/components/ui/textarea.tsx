import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-md bg-elevated px-3.5 py-2.5 text-[0.9375rem] text-fg shadow-[var(--shadow-border)] placeholder:text-subtle transition-[box-shadow] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}
