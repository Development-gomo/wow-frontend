import { NextResponse } from "next/server";

import { newsletterInput } from "@/lib/newsletter-input";
import type { NewsletterStatus } from "@/lib/newsletter.functions";

/**
 * Newsletter sign-up. Returns a status code; the visible wording lives in
 * WordPress › Site settings › Newsletter and is applied by the footer.
 */
const reply = (status: NewsletterStatus, code = 200) => NextResponse.json({ status }, { status: code });

export async function POST(request: Request) {
  let data: { email: string };
  try {
    data = newsletterInput.parse(await request.json());
  } catch {
    return reply("invalid", 400);
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email.toLowerCase().trim() });

    if (error) {
      // 23505: unique violation, the address is already on the list.
      return error.code === "23505" ? reply("already") : reply("error", 500);
    }

    return reply("subscribed");
  } catch {
    return reply("error", 500);
  }
}
