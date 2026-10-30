/*
 * The zod-free part of the corporate enquiry rules, for the form while it is
 * being filled in. The zod schema (corporate-enquiry-schema.ts) is loaded only
 * when the form is submitted, so zod is not part of any page's JavaScript.
 */

/** Vercel caps a request to a server function at 4.5 MB, so the PDF stays under 4 MB. */
export const MAX_PDF_BYTES = 4 * 1024 * 1024;

export type CorporateEnquiryMessage =
  | "company"
  | "contactName"
  | "email"
  | "employees"
  | "moveIn"
  | "lengthOfStay"
  | "requirements"
  | "consent"
  | "pdf"
  | "rateLimited"
  | "error";

/** Is a file an acceptable requirements PDF (type, extension and size)? */
export function isAcceptablePdf(file: { size: number; type: string; name: string }): boolean {
  return file.size > 0 && file.size <= MAX_PDF_BYTES && file.type === "application/pdf" && file.name.toLowerCase().endsWith(".pdf");
}
