import { z } from "zod";

/**
 * Adapter for the original TanStack `createServerFn` newsletter subscription.
 *
 * TanStack Start's server functions have no Next.js equivalent, so the handler
 * body moved verbatim into the Route Handler at src/app/api/newsletter/route.ts
 * and this module keeps the exact call signature the footer already uses:
 *   await subscribeNewsletter({ data: { email } })  ->  { success, message }
 */
export const newsletterInput = z.object({ email: z.string().email() });

export async function subscribeNewsletter({ data }: { data: { email: string } }) {
  const parsed = newsletterInput.parse(data);

  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  const body = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !body.success) {
    throw new Error(body.message ?? "Could not subscribe. Please try again.");
  }

  return { success: true as const, message: body.message ?? "You are subscribed." };
}
