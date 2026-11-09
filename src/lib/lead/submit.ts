import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadInput = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.email().max(254),
  phone: z.string().trim().min(7).max(40),
  company: z.string().trim().min(2).max(200),
  trade: z.string().trim().min(2).max(100),
  vehicles: z.string().trim().min(1).max(20),
  note: z.string().max(4000).default(""),
  source: z.string().max(100).default(""),
  packageId: z.string().max(100).default(""),
  smsConsent: z.boolean(),
  pageUrl: z.string().max(500).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadInput)
  .handler(async ({ data }) => {
    const { deliverLead } = await import("./submit.server");
    const result = await deliverLead(data);
    if (!result.ok) throw new Error("Lead delivery failed");
    return result;
  });
