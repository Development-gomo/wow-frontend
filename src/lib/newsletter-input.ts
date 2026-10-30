import { z } from "zod";

/** Server-side validation of a newsletter sign-up (the API route is the authority). */
export const newsletterInput = z.object({ email: z.string().email() });
