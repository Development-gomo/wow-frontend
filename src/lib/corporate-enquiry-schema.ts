import { z } from "zod";

import type { CorporateEnquiryMessage } from "./corporate-enquiry-rules";

export { MAX_PDF_BYTES, isAcceptablePdf, type CorporateEnquiryMessage } from "./corporate-enquiry-rules";

/**
 * Corporate (relocation) enquiry, validated in the browser and again on the
 * server. Messages are keys, not copy: the form shows the matching text from
 * its WordPress section (Corporate enquiry form › Messages).
 */

const today = () => new Date().toISOString().slice(0, 10);

export const corporateEnquirySchema = z.object({
  company: z.string().trim().min(1, "company").max(200, "company"),
  contactName: z.string().trim().min(1, "contactName").max(150, "contactName"),
  email: z.string().trim().email("email").max(255, "email"),
  phone: z.string().trim().max(50, "error").optional().default(""),
  employees: z.coerce.number({ message: "employees" }).int("employees").min(1, "employees").max(1000, "employees"),
  moveIn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "moveIn")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= today();
    }, "moveIn"),
  lengthOfStay: z.string().trim().min(1, "lengthOfStay").max(200, "lengthOfStay"),
  accommodation: z.string().trim().max(200, "error").optional().default(""),
  requirements: z.string().trim().min(1, "requirements").max(5000, "requirements"),
  consent: z.literal(true, { message: "consent" }),
  // Spam trap: a hidden field people never fill in.
  website: z.string().max(0, "error").optional().default(""),
});

export type CorporateEnquiryInput = z.infer<typeof corporateEnquirySchema>;

/** The first failing field's message key. */
export function firstMessage(error: z.ZodError): CorporateEnquiryMessage {
  return (error.issues[0]?.message as CorporateEnquiryMessage | undefined) ?? "error";
}
