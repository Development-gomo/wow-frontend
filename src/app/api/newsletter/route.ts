import { NextResponse } from "next/server";

import { newsletterInput } from "@/lib/newsletter.functions";

/** Handler body carried over unchanged from the original newsletter server function. */
export async function POST(request: Request) {
  let data: { email: string };
  try {
    data = newsletterInput.parse(await request.json());
  } catch {
    return NextResponse.json({ success: false, message: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email.toLowerCase().trim() });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ success: true, message: "You are already subscribed." });
      }
      return NextResponse.json(
        { success: false, message: "Could not subscribe. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: "You are subscribed." });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not subscribe. Please try again." },
      { status: 500 },
    );
  }
}
