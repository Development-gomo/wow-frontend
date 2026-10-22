import { NextResponse } from "next/server";

import {
  corporateEnquirySchema,
  firstMessage,
  isAcceptablePdf,
  type CorporateEnquiryMessage,
} from "@/lib/corporate-enquiry-schema";

/**
 * Corporate (relocation) enquiry. Stores the enquiry in Supabase, with an
 * optional requirements PDF in the private "corporate-requirements" bucket.
 *
 * Replies with a reference on success or a message key on failure; the
 * visible wording lives in the page's Corporate enquiry form section in
 * WordPress.
 */
const fail = (message: CorporateEnquiryMessage, status: number) => NextResponse.json({ message }, { status });

const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail("error", 400);
  }

  const parsed = corporateEnquirySchema.safeParse({
    ...Object.fromEntries([...data.entries()].filter(([, value]) => typeof value === "string")),
    consent: data.get("consent") === "on",
  });
  if (!parsed.success) return fail(firstMessage(parsed.error), 400);
  const fields = parsed.data;

  const attachment = data.get("pdf");
  const file = attachment instanceof File && attachment.size > 0 ? attachment : undefined;
  let bytes: ArrayBuffer | undefined;
  if (file) {
    if (!isAcceptablePdf(file)) return fail("pdf", 400);
    bytes = await file.arrayBuffer();
    // The declared type is the browser's guess; check the file really is a PDF.
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-") return fail("pdf", 400);
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = fields.email.toLowerCase();
    const since = new Date(Date.now() - WINDOW_MS).toISOString();

    // At most 3 enquiries per address and 100 overall per 15 minutes.
    const [perEmail, overall] = await Promise.all([
      supabaseAdmin.from("corporate_enquiries").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since),
      supabaseAdmin.from("corporate_enquiries").select("id", { count: "exact", head: true }).gte("created_at", since),
    ]);
    if (perEmail.error || overall.error) return fail("error", 500);
    if ((perEmail.count ?? 0) >= 3 || (overall.count ?? 0) >= 100) return fail("rateLimited", 429);

    const id = crypto.randomUUID();
    const pdfPath = file && bytes ? `${id}/requirements.pdf` : null;

    if (pdfPath && bytes) {
      const { error } = await supabaseAdmin.storage
        .from("corporate-requirements")
        .upload(pdfPath, bytes, { contentType: "application/pdf", upsert: false });
      if (error) return fail("error", 500);
    }

    const { error } = await supabaseAdmin.from("corporate_enquiries").insert({
      id,
      company: fields.company,
      contact_name: fields.contactName,
      email,
      phone: fields.phone || null,
      employees: fields.employees,
      move_in: fields.moveIn,
      length_of_stay: fields.lengthOfStay,
      requirements: fields.accommodation ? `Accommodation: ${fields.accommodation}\n${fields.requirements}` : fields.requirements,
      pdf_path: pdfPath,
    });

    if (error) {
      if (pdfPath) await supabaseAdmin.storage.from("corporate-requirements").remove([pdfPath]);
      return fail("error", 500);
    }

    return NextResponse.json({ reference: id });
  } catch {
    return fail("error", 500);
  }
}
