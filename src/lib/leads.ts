export type Lead = {
  id: string;
  createdAt: string;
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
};

const KEY = "fleetworks.leads.v2";

export function readLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const next: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = [next, ...readLeads()];
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return next;
}
