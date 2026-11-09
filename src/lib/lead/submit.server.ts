/**
 * Server-only lead delivery: emails info@ and upserts a HubSpot contact.
 * Every integration is opt-in by env var, so a missing secret never breaks
 * the form for visitors — the lead is logged server-side instead.
 *
 * Env vars (Vercel → Project → Settings → Environment Variables):
 *   HUBSPOT_PRIVATE_APP_TOKEN  HubSpot private app token (scopes: crm.objects.contacts.read/write)
 *   HUBSPOT_PORTAL_ID          default 149574469 (only used with HUBSPOT_FORM_GUID)
 *   HUBSPOT_FORM_GUID          optional alternative to the token: HubSpot Forms API (no secret)
 *   RESEND_API_KEY             Resend API key (domain fleetworkspro.net verified in Resend)
 *   LEAD_EMAIL_FROM            e.g. "FleetWorks Website <leads@fleetworkspro.net>"
 *   LEAD_EMAIL_TO              default info@fleetworkspro.net
 */
import { env } from "@/lib/env.server";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  trade: string;
  vehicles: string;
  note: string;
  source: string;
  packageId: string;
  smsConsent: boolean;
  pageUrl?: string;
};

export type Outcome = "sent" | "skipped" | "failed";
export type LeadResult = { ok: boolean; email: Outcome; hubspot: Outcome; receivedAt: string };

const SMS_CONSENT_TEXT =
  "I agree to receive text messages from FleetWorks about service updates, appointments, and inspection alerts at the number provided. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See our Terms and Privacy Policy.";

function splitName(full: string): { firstname: string; lastname: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0] ?? "", lastname: "" };
  return { firstname: parts.slice(0, -1).join(" "), lastname: parts[parts.length - 1] ?? "" };
}

function summaryLines(lead: LeadPayload, receivedAt: string): string[] {
  return [
    `Name: ${lead.name}`,
    `Company: ${lead.company}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Kind of work: ${lead.trade}`,
    `Company vehicles: ${lead.vehicles}`,
    `What's falling through the cracks: ${lead.note || "—"}`,
    `Source (button): ${lead.source || "—"}`,
    `Package: ${lead.packageId || "—"}`,
    `SMS consent: ${lead.smsConsent ? `YES at ${receivedAt}` : "no"}`,
    ...(lead.smsConsent ? [`Consent language shown: "${SMS_CONSENT_TEXT}"`] : []),
    `Page: ${lead.pageUrl || "—"}`,
    `Received: ${receivedAt}`,
  ];
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

async function sendEmail(lead: LeadPayload, receivedAt: string): Promise<Outcome> {
  const key = env("RESEND_API_KEY");
  const from = env("LEAD_EMAIL_FROM");
  if (!key || !from) return "skipped";
  const to = env("LEAD_EMAIL_TO") ?? "info@fleetworkspro.net";
  const lines = summaryLines(lead, receivedAt);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New check-in request: ${lead.name} — ${lead.company} (${lead.vehicles} vehicles)`,
        text: lines.join("\n"),
        html: `<h2>New 15-minute check-in request</h2><p>${lines.map(escapeHtml).join("<br>")}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("[lead] email failed", res.status, (await res.text()).slice(0, 500));
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[lead] email error", err);
    return "failed";
  }
}

async function hubspotFetch(token: string, path: string, body: unknown): Promise<Response> {
  return fetch(`https://api.hubapi.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function upsertHubspotWithToken(
  token: string,
  lead: LeadPayload,
  receivedAt: string,
): Promise<Outcome> {
  const { firstname, lastname } = splitName(lead.name);
  const res = await hubspotFetch(token, "/crm/v3/objects/contacts/batch/upsert", {
    inputs: [
      {
        idProperty: "email",
        id: lead.email.toLowerCase(),
        properties: {
          email: lead.email.toLowerCase(),
          firstname,
          lastname,
          phone: lead.phone,
          company: lead.company,
          lifecyclestage: "lead",
        },
      },
    ],
  });
  if (!res.ok) {
    console.error("[lead] hubspot upsert failed", res.status, (await res.text()).slice(0, 500));
    // lifecyclestage can't move backwards on an existing customer; retry without it.
    if (res.status === 400) {
      const retry = await hubspotFetch(token, "/crm/v3/objects/contacts/batch/upsert", {
        inputs: [
          {
            idProperty: "email",
            id: lead.email.toLowerCase(),
            properties: { email: lead.email.toLowerCase(), firstname, lastname, phone: lead.phone, company: lead.company },
          },
        ],
      });
      if (!retry.ok) return "failed";
      return attachNote(token, (await retry.json()) as UpsertResponse, lead, receivedAt);
    }
    return "failed";
  }
  return attachNote(token, (await res.json()) as UpsertResponse, lead, receivedAt);
}

type UpsertResponse = { results?: Array<{ id: string }> };

async function attachNote(
  token: string,
  upsert: UpsertResponse,
  lead: LeadPayload,
  receivedAt: string,
): Promise<Outcome> {
  const contactId = upsert.results?.[0]?.id;
  if (!contactId) return "failed";
  const body = `<p><strong>Website check-in request</strong></p><p>${summaryLines(lead, receivedAt)
    .map(escapeHtml)
    .join("<br>")}</p>`;
  const res = await hubspotFetch(token, "/crm/v3/objects/notes", {
    properties: { hs_timestamp: receivedAt, hs_note_body: body },
    // 202 = note → contact (HUBSPOT_DEFINED)
    associations: [
      { to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] },
    ],
  });
  if (!res.ok) {
    // Contact exists; the note is extra detail. Still count it as delivered.
    console.error("[lead] hubspot note failed", res.status, (await res.text()).slice(0, 500));
  }
  return "sent";
}

async function submitHubspotForm(
  portalId: string,
  formGuid: string,
  lead: LeadPayload,
  receivedAt: string,
): Promise<Outcome> {
  const { firstname, lastname } = splitName(lead.name);
  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: Date.parse(receivedAt),
        fields: [
          { name: "email", value: lead.email },
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "phone", value: lead.phone },
          { name: "company", value: lead.company },
          { name: "message", value: summaryLines(lead, receivedAt).join("\n") },
        ],
        context: { pageUri: lead.pageUrl, pageName: "FleetWorks — Book the 15-minute check-in" },
      }),
    },
  );
  if (!res.ok) {
    console.error("[lead] hubspot form failed", res.status, (await res.text()).slice(0, 500));
    return "failed";
  }
  return "sent";
}

async function sendHubspot(lead: LeadPayload, receivedAt: string): Promise<Outcome> {
  try {
    const token = env("HUBSPOT_PRIVATE_APP_TOKEN");
    if (token) return await upsertHubspotWithToken(token, lead, receivedAt);
    const formGuid = env("HUBSPOT_FORM_GUID");
    if (formGuid) {
      return await submitHubspotForm(env("HUBSPOT_PORTAL_ID") ?? "149574469", formGuid, lead, receivedAt);
    }
    return "skipped";
  } catch (err) {
    console.error("[lead] hubspot error", err);
    return "failed";
  }
}

export async function deliverLead(lead: LeadPayload): Promise<LeadResult> {
  const receivedAt = new Date().toISOString();
  const [email, hubspot] = await Promise.all([sendEmail(lead, receivedAt), sendHubspot(lead, receivedAt)]);
  const delivered = email === "sent" || hubspot === "sent";
  const nothingConfigured = email === "skipped" && hubspot === "skipped";
  if (!delivered) {
    // Last-resort record in Vercel function logs so no request is lost.
    console.warn(
      `[lead] not delivered (email=${email}, hubspot=${hubspot})`,
      JSON.stringify({ ...lead, receivedAt }),
    );
  }
  // ok=false only when something was configured and everything configured failed.
  return { ok: delivered || nothingConfigured, email, hubspot, receivedAt };
}
