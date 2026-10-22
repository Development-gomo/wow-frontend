import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Gift card enquiry (lead capture only: no payment, no redemption). Stores the
 * enquiry in Supabase so the team can follow up. Replies with a status code;
 * the visible wording lives in WordPress › Site settings › Enquiry form.
 */
const input = z.object({
  firstName: z.string().trim().min(1).max(150),
  surname: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(255),
  giftFor: z.string().trim().max(200).optional().default(""),
  extras: z.array(z.string().trim().max(200)).max(20).optional().default([]),
  notes: z.string().trim().max(5000).optional().default(""),
  // Spam trap: a hidden field people never fill in.
  website: z.string().max(0).optional().default(""),
});

const reply = (status: "sent" | "invalid" | "rate_limited" | "error", code: number) => NextResponse.json({ status }, { status: code });

const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  let data: z.infer<typeof input>;
  try {
    data = input.parse(await request.json());
  } catch {
    return reply("invalid", 400);
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.toLowerCase();
    const since = new Date(Date.now() - WINDOW_MS).toISOString();

    // At most 3 enquiries per address and 100 overall per 15 minutes.
    const [perEmail, overall] = await Promise.all([
      supabaseAdmin.from("gift_card_enquiries").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since),
      supabaseAdmin.from("gift_card_enquiries").select("id", { count: "exact", head: true }).gte("created_at", since),
    ]);
    if (perEmail.error || overall.error) return reply("error", 500);
    if ((perEmail.count ?? 0) >= 3 || (overall.count ?? 0) >= 100) return reply("rate_limited", 429);

    const { error } = await supabaseAdmin.from("gift_card_enquiries").insert({
      first_name: data.firstName,
      surname: data.surname,
      phone: data.phone,
      email,
      gift_for: data.giftFor || null,
      extras: data.extras,
      notes: data.notes || null,
    });

    return error ? reply("error", 500) : reply("sent", 200);
  } catch {
    return reply("error", 500);
  }
}
