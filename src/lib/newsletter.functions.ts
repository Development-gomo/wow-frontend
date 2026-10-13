import { z } from "zod";

/**
 * Newsletter sign-up client.
 *
 * The route returns a status code rather than a sentence; the footer turns it
 * into the wording set in WordPress › Site settings › Newsletter, so every
 * message a visitor sees is editable there.
 */
export const newsletterInput = z.object({ email: z.string().email() });

export type NewsletterStatus = "subscribed" | "already" | "invalid" | "error";

export async function subscribeNewsletter({ data }: { data: { email: string } }): Promise<NewsletterStatus> {
  const parsed = newsletterInput.safeParse(data);
  if (!parsed.success) return "invalid";

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const body = (await res.json()) as { status?: NewsletterStatus };
    return body.status ?? "error";
  } catch {
    return "error";
  }
}
