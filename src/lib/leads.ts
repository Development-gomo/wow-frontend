/**
 * Lead forms: the browser side.
 *
 * Every enquiry and contact form posts to /api/forms/<form>, which relays it
 * to Contact Form 7 in WordPress (stored there by CFDB7). The reply says
 * whether the lead was saved, which fields were rejected (with Contact Form
 * 7's message in the page language), or that something went wrong.
 *
 * Kept free of `server-only` so client components can use it.
 */

import type { Lang } from "@/lib/i18n";

/** The site's lead forms, as named in WordPress › /globals › forms. */
export const LEAD_FORMS = ["contact", "apartmentEnquiry", "giftCardEnquiry", "corporateEnquiry"] as const;
export type LeadForm = (typeof LEAD_FORMS)[number];

export function isLeadForm(value: unknown): value is LeadForm {
  return typeof value === "string" && (LEAD_FORMS as readonly string[]).includes(value);
}

export type LeadResult =
  | { status: "sent"; reference: string }
  /** fields: field name → message (Contact Form 7's, in the page language). */
  | { status: "invalid"; message: string; fields: Record<string, string> }
  | { status: "error" };

/** Send a lead; never throws. */
export async function submitLead(form: LeadForm, lang: Lang, data: FormData): Promise<LeadResult> {
  try {
    const response = await fetch(`/api/forms/${form}?lang=${encodeURIComponent(lang)}`, { method: "POST", body: data });
    const result = (await response.json().catch(() => null)) as LeadResult | null;
    if (!result || typeof result !== "object" || !("status" in result)) return { status: "error" };
    return result;
  } catch {
    return { status: "error" };
  }
}

/** The first rejected field and its message, for forms that show one message line. */
export function firstInvalid(result: LeadResult): { field: string; message: string } | null {
  if (result.status !== "invalid") return null;
  const [field, message] = Object.entries(result.fields)[0] ?? ["", result.message];
  return { field, message: message || result.message };
}
