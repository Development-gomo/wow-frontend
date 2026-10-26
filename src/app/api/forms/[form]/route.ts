import { NextResponse } from "next/server";

import { cmsBaseUrl, getGlobals } from "@/lib/cms/client";
import { corporateEnquirySchema, isAcceptablePdf } from "@/lib/corporate-enquiry-schema";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n";
import { isLeadForm, type LeadForm, type LeadResult } from "@/lib/leads";

/**
 * Lead forms → Contact Form 7.
 *
 *   POST /api/forms/<contact|apartmentEnquiry|giftCardEnquiry|corporateEnquiry>?lang=sv
 *
 * Relays the submission to the form's Contact Form 7 record in the page
 * language (IDs from WordPress › /globals › forms). Contact Form 7 validates
 * it and CFDB7 stores the lead; email notifications are off in WordPress.
 * Only the fields each form defines are forwarded, plus the language, the
 * page it was sent from and a reference the visitor can quote.
 *
 * Server-side so the CMS address stays private and the browser never talks to
 * WordPress directly.
 */

export const dynamic = "force-dynamic";

/** Fields each form sends, as named in its Contact Form 7 record. */
const FIELDS: Record<LeadForm, readonly string[]> = {
  contact: ["purpose", "name", "email", "checkin", "checkout", "message"],
  apartmentEnquiry: ["apartment", "firstName", "surname", "phone", "email", "people", "apartmentSize", "checkin", "checkout", "services", "notes"],
  giftCardEnquiry: ["firstName", "surname", "phone", "email", "giftFor", "extras", "notes"],
  corporateEnquiry: ["company", "contactName", "email", "phone", "employees", "moveIn", "lengthOfStay", "accommodation", "requirements", "consent"],
};

/** File fields each form accepts. */
const FILES: Partial<Record<LeadForm, string>> = { corporateEnquiry: "pdf" };

/** Contact Form 7 locale per site language. */
const LOCALES: Record<string, string> = { sv: "sv_SE", en: "en_US" };

/** Vercel accepts at most 4.5 MB per request; a larger body never arrives intact. */
const MAX_BODY_BYTES = 4.5 * 1024 * 1024;

const reply = (result: LeadResult, status = 200) => NextResponse.json(result, { status });
const failed = (status = 502) => reply({ status: "error" }, status);

/** A short reference the visitor can quote, e.g. WOW-261026-K4P9. */
function reference(): string {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const code = Array.from(crypto.getRandomValues(new Uint8Array(4)), (byte) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[byte % 32]).join("");
  return `WOW-${date}-${code}`;
}

/** The site path the form was sent from (never a full URL). */
function pagePath(request: Request): string {
  try {
    return new URL(request.headers.get("referer") ?? "").pathname.slice(0, 300);
  } catch {
    return "";
  }
}

/** Checks Contact Form 7 cannot make (relations between fields). */
function crossFieldError(form: LeadForm, data: FormData): string | null {
  const checkin = String(data.get("checkin") ?? "");
  const checkout = String(data.get("checkout") ?? "");
  if ((form === "contact" || form === "apartmentEnquiry") && checkin && checkout && checkout <= checkin) return "checkout";

  if (form === "corporateEnquiry") {
    const parsed = corporateEnquirySchema.safeParse({
      ...Object.fromEntries([...data.entries()].filter(([, value]) => typeof value === "string")),
      consent: data.get("consent") === "on" || data.get("consent") === "1",
    });
    if (!parsed.success) return String(parsed.error.issues[0]?.path[0] ?? "error");
  }

  return null;
}

export async function POST(request: Request, { params }: { params: Promise<{ form: string }> }) {
  const { form } = await params;
  if (!isLeadForm(form)) return failed(404);

  const url = new URL(request.url);
  const langParam = url.searchParams.get("lang");
  const lang: Lang = isLang(langParam) ? langParam : DEFAULT_LANG;

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return failed(413);

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return failed(400);
  }

  // Spam trap: a hidden field people never fill in. Look successful, store nothing.
  if (String(data.get("website") ?? "") !== "") return reply({ status: "sent", reference: reference() });

  const field = crossFieldError(form, data);
  if (field) return reply({ status: "invalid", message: "", fields: { [field]: "" } }, 422);

  const fileField = FILES[form];
  const file = fileField ? data.get(fileField) : null;
  const upload = file instanceof File && file.size > 0 ? file : null;
  if (upload) {
    // The declared type is the browser's guess; check the file really is a PDF.
    const head = new TextDecoder().decode(await upload.slice(0, 5).arrayBuffer());
    if (!isAcceptablePdf(upload) || head !== "%PDF-") return reply({ status: "invalid", message: "", fields: { [fileField!]: "" } }, 422);
  }

  let formId: number | undefined;
  try {
    formId = (await getGlobals(lang)).forms[form];
  } catch {
    return failed(503);
  }
  if (!formId) return failed(503);

  const ref = reference();
  const body = new FormData();
  body.set("_wpcf7", String(formId));
  body.set("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
  body.set("_wpcf7_locale", LOCALES[lang] ?? "en_US");
  body.set("_wpcf7_container_post", "0");
  for (const name of FIELDS[form]) {
    const value = data.get(name);
    if (typeof value === "string") body.set(name, name === "consent" ? (value ? "1" : "") : value.trim().slice(0, 5000));
  }
  if (upload && fileField) body.set(fileField, upload, upload.name);
  body.set("language", lang);
  body.set("page", pagePath(request));
  body.set("reference", ref);

  let cf7: { status?: string; message?: string; invalid_fields?: Array<{ field?: string; message?: string }> };
  try {
    const response = await fetch(`${cmsBaseUrl()}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
      method: "POST",
      body,
      headers: { accept: "application/json", "user-agent": request.headers.get("user-agent") ?? "wow-frontend" },
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
    if (!(response.headers.get("content-type") ?? "").includes("application/json")) {
      // e.g. the host's bot check answering with HTML instead of WordPress.
      console.error(`[forms] ${form}: CMS answered ${response.status} without JSON`);
      return failed();
    }
    cf7 = await response.json();
  } catch (error) {
    console.error(`[forms] ${form}: CMS unreachable`, error);
    return failed();
  }

  switch (cf7.status) {
    case "mail_sent":
      return reply({ status: "sent", reference: ref });
    case "validation_failed":
    case "acceptance_missing": {
      const fields: Record<string, string> = {};
      for (const item of cf7.invalid_fields ?? []) if (item.field) fields[item.field] = item.message ?? "";
      if (cf7.status === "acceptance_missing") fields.consent ??= cf7.message ?? "";
      return reply({ status: "invalid", message: cf7.message ?? "", fields }, 422);
    }
    default:
      // spam, aborted, mail_failed: the lead was not stored.
      console.error(`[forms] ${form}: Contact Form 7 answered "${cf7.status}"`);
      return failed();
  }
}
