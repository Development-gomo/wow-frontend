import type { Globals } from "./globals";

/*
 * The parts of the site settings module that client components use, without
 * zod: importing globals.ts in the browser would ship zod and the whole
 * settings schema to every page. globals.ts re-exports these.
 */

/** An all-empty value (what globalsSchema.parse({}) returns), used when there are no settings. */
export const EMPTY_GLOBALS: Globals = {
  brand: { name: "", tagline: "" },
  seo: { title: "", description: "" },
  booking: { roomLabel: "", roomTo: "", apartmentLabel: "", apartmentTo: "" },
  contact: { companyName: "", address: [], phoneDisplay: "", phoneLink: "", email: "", reservationContact: "" },
  footer: { contactHeading: "", officeLabel: "", reservationLabel: "", socialHeading: "", social: [], copyright: "" },
  newsletter: {},
  ui: {},
  contactForm: {},
  enquiryForm: {},
  guestContact: {},
  notFound: {},
  languages: [],
  forms: {},
  menus: { header: [], menu: [], footer: [] },
};

/** Read a key from one of the free-form text groups, empty when unset. */
export function text(group: Record<string, unknown> | undefined, key: string): string {
  const value = group?.[key];
  return typeof value === "string" ? value : "";
}

/** Read a list from a free-form group (e.g. contact form purpose options). */
export function list(group: Record<string, unknown> | undefined, key: string): string[] {
  const value = group?.[key];
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}
