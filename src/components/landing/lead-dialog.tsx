import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { packages, trades } from "@/lib/content";
import { saveLead } from "@/lib/leads";
import { useApp } from "@/lib/store";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter an email"),
  phone: z.string().min(7, "Phone is required"),
  company: z.string().min(2, "Company is required"),
  trade: z.string().min(2, "Pick the kind of work"),
  vehicles: z.string().min(1, "How many vehicles?"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function LeadDialog() {
  const open = useApp((s) => s.leadOpen);
  const source = useApp((s) => s.leadSource);
  const packageId = useApp((s) => s.packageId);
  const closeLead = useApp((s) => s.closeLead);
  const [done, setDone] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      trade: "",
      vehicles: "",
      note: "",
    },
  });

  useEffect(() => {
    if (open) {
      setDone(false);
      form.reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        trade: "",
        vehicles: "",
        note: "",
      });
    }
  }, [open, form]);

  function onSubmit(values: FormValues) {
    saveLead({
      ...values,
      note: values.note ?? "",
      source,
      packageId,
    });
    setDone(true);
    toast.success("Request saved. We'll use it to set the 15-minute check-in.");
  }

  const picked = packages.find((p) => p.id === packageId);

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? closeLead() : null)}>
      <DialogContent>
        <DialogTitle className="font-display text-2xl">
          {done ? "You're on the list." : "Book the 15-minute check-in"}
        </DialogTitle>
        <DialogDescription className="text-sm leading-relaxed text-muted">
          {done
            ? "This stays on this browser for now. Jason will follow up by phone. No software demo — just how the trucks are managed today."
            : picked
              ? `Starting from ${picked.name}. Tell us the real vehicle count and we'll say if a different package fits.`
              : "Who tracks oil changes, tags, and breakdowns today? That's the whole conversation."}
        </DialogDescription>
        {done ? (
          <Button className="mt-4" onClick={closeLead}>
            Close
          </Button>
        ) : (
          <form className="mt-4 grid gap-3" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name" error={form.formState.errors.name?.message}>
                <Input id="lead-name" autoComplete="name" {...form.register("name")} />
              </Field>
              <Field label="Company" error={form.formState.errors.company?.message}>
                <Input id="lead-company" autoComplete="organization" {...form.register("company")} />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input id="lead-email" type="email" autoComplete="email" {...form.register("email")} />
              </Field>
              <Field label="Phone" error={form.formState.errors.phone?.message}>
                <Input id="lead-phone" type="tel" autoComplete="tel" {...form.register("phone")} />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Kind of work" error={form.formState.errors.trade?.message}>
                <select
                  id="lead-trade"
                  className="h-11 w-full rounded-md bg-elevated px-3 text-fg shadow-[var(--shadow-border)]"
                  {...form.register("trade")}
                >
                  <option value="">Select</option>
                  {trades.map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Company vehicles" error={form.formState.errors.vehicles?.message}>
                <Input id="lead-vehicles" inputMode="numeric" placeholder="5" {...form.register("vehicles")} />
              </Field>
            </div>
            <Field label="What's falling through the cracks?" error={form.formState.errors.note?.message}>
              <Textarea id="lead-note" rows={3} {...form.register("note")} />
            </Field>
            <Button type="submit" className="mt-1">
              Request the check-in
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactElement<{ id?: string }>;
}) {
  const id = children.props.id;
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
