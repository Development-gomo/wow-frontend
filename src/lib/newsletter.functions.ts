/**
 * Newsletter sign-up client.
 *
 * The route returns a status code rather than a sentence; the footer turns it
 * into the wording set in WordPress › Site settings › Newsletter, so every
 * message a visitor sees is editable there.
 *
 * No zod here: this module runs in the footer on every page. The quick check
 * below only stops obvious typos before posting; it accepts everything the
 * API route's zod check accepts, and the route (newsletter-input.ts) has the
 * final say, answering "invalid" for anything else.
 */
const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type NewsletterStatus = "subscribed" | "already" | "invalid" | "error";

export async function subscribeNewsletter({ data }: { data: { email: string } }): Promise<NewsletterStatus> {
  const email = data.email.trim();
  if (!LOOKS_LIKE_EMAIL.test(email)) return "invalid";

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const body = (await res.json()) as { status?: NewsletterStatus };
    return body.status ?? "error";
  } catch {
    return "error";
  }
}
