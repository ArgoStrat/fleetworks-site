export const navLinks = [
  { href: "#loop", label: "How it works" },
  { href: "#packages", label: "Packages" },
  { href: "#fit", label: "Who it's for" },
  { href: "#faq", label: "FAQ" },
] as const;

export const ctaPrimary = "Book a 15-minute check-in";

export const businessPhoneDisplay = "(407) 326-2400";
export const businessPhoneTel = "tel:+14073262400";
export const businessEmail = "info@fleetworkspro.net";
export const businessEmailMailto = "mailto:info@fleetworkspro.net";

export const trades = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Restoration",
  "Pest control",
  "Moving",
  "Roofing",
  "Landscaping",
  "Other service work",
] as const;

export const loop = [
  {
    step: "01",
    title: "Monitor",
    body: "We watch inspections, defects, and maintenance on business days. You don't refresh a dashboard.",
  },
  {
    step: "02",
    title: "Analyze",
    body: "Overdue work, repeat issues, and shop estimates get a plain read: urgent, reasonable, or wait.",
  },
  {
    step: "03",
    title: "Recommend",
    body: "You get a next action, an owner, and a date. Not a pile of alerts.",
  },
  {
    step: "04",
    title: "You decide",
    body: "Repairs, vendors, and spending stay yours. We don't drive, dispatch, or approve the invoice.",
  },
  {
    step: "05",
    title: "We track",
    body: "Open items stay open until they're done. Forgotten oil changes are the whole point of the job.",
  },
] as const;

export const handles = [
  "Preventive maintenance so oil changes and inspections don't slip",
  "Daily vehicle checks your techs do on a phone, through Whip Around",
  "Defects and repairs followed from the first note until they're closed",
  "Shop estimates reviewed for urgency and whether the scope makes sense",
  "Registrations, tags, and compliance dates kept on a list someone owns",
  "A monthly or weekly report that says what needs a decision",
] as const;

export const boundaries = [
  "We don't repair trucks, buy parts, or pay the shop.",
  "Telematics hardware and GPS subscriptions are separate, if you want them.",
  "We don't guarantee uptime, fewer breakdowns, compliance, or a dollar of savings.",
  "After-hours emergency coordination is an add-on, not a silent inclusion.",
] as const;

export type Package = {
  id: "readiness" | "performance" | "command";
  name: string;
  tier: string;
  cadence: string;
  line: string;
  includes: string[];
  recommended?: boolean;
};

export const packages: Package[] = [
  {
    id: "readiness",
    name: "Fleet Readiness",
    tier: "Control",
    cadence: "Monthly report. Next-business-day routing on exceptions.",
    line: "Know what is overdue, what is risky, and what needs a decision.",
    includes: [
      "Whip Around set up and run for you",
      "Baseline audit, PM schedule, and inspection workflow",
      "Open-issue register with an owner and a due date",
      "Shop-estimate review",
      "Monthly management review",
    ],
  },
  {
    id: "performance",
    name: "Fleet Performance",
    tier: "Recommended",
    cadence: "Weekly digest. Same-business-day alerts.",
    line: "A weekly operating rhythm, with cost and downtime you can see.",
    includes: [
      "Everything in Readiness, on a weekly cadence",
      "Cost and downtime patterns, not just a status list",
      "More shop-estimate reviews",
      "Vendor scorecard and a 90-day maintenance outlook",
      "Longer review with priorities and owners",
    ],
    recommended: true,
  },
  {
    id: "command",
    name: "Fleet Command",
    tier: "Decision support",
    cadence: "Weekly executive digest. Same-day escalation to you.",
    line: "Priorities, vendor performance, and a replacement roadmap.",
    includes: [
      "Direct same-day escalation on material issues",
      "Cost, downtime, and utilization tied to decisions",
      "The most shop-estimate reviews",
      "Custom scorecard and vendor benchmarking",
      "Quarterly replacement review",
    ],
  },
];

export const faqs = [
  {
    q: "Is this just software?",
    a: "No. Whip Around is included and we administer it. You are buying the monitoring, the follow-up, and a person who tells you what to decide. Your team should not have to run another app.",
  },
  {
    q: "Who is this for?",
    a: "Local service companies — plumbing, electrical, HVAC, restoration, pest, moving, roofing, landscaping — running a handful of company vehicles. The check-in is how we match a package to the way you actually run the fleet.",
  },
  {
    q: "Why not just hire a fleet manager?",
    a: "A full-time hire is a salary, benefits, and a system on top of a job you may not need yet. FleetWorks is the function without the headcount. If you later outgrow us and hire someone, we hand the process over. That's a good outcome.",
  },
  {
    q: "How long am I locked in?",
    a: "90 days to start, then month to month. We need the first stretch to install the records, inspections, and maintenance triggers.",
  },
  {
    q: "Do you fix the trucks?",
    a: "No. We coordinate and advise. You approve the spend, choose the vendor, and pay the invoice. We don't drive, dispatch, or possess the vehicles.",
  },
  {
    q: "Do you guarantee the trucks stay up?",
    a: "We don't. Nobody honest can. We do guarantee the work we control: once we have your vehicle data, contacts, access, and timely decisions, the onboarding controls are in place within 30 days — or we keep working at no extra management fee until they are. If we miss a scheduled report or review for a reason on our side, we deliver it and repeat the next cycle at no extra fee.",
  },
  {
    q: "Where do you work?",
    a: "FleetWorks LLC is local in Orlando. The first conversations are with Central Florida service companies. The check-in is 15 minutes. If the fleet is already dialed in, we'll say so.",
  },
] as const;
