import { z } from "zod";

/**
 * Site-wide content from WordPress: Site settings + Appearance → Menus.
 *
 * Every field defaults to empty rather than to placeholder copy. A value an
 * editor clears in WordPress disappears from the site; nothing in this file
 * can quietly put the old wording back.
 *
 * Kept free of `server-only` so client components can import the types.
 */

const str = z.string().optional().default("");

type MenuNode = { id?: number; label: string; href: string; children?: MenuNode[] };

const menuItem: z.ZodType<MenuNode> = z.lazy(() =>
  z.object({
    id: z.number().optional(),
    label: z.string(),
    href: z.string(),
    children: z.array(menuItem).optional(),
  }),
);

export const globalsSchema = z.object({
  brand: z.object({ name: str, tagline: str }).default({ name: "", tagline: "" }),
  seo: z.object({ title: str, description: str }).default({ title: "", description: "" }),
  booking: z
    .object({ roomLabel: str, roomTo: str, apartmentLabel: str, apartmentTo: str })
    .default({ roomLabel: "", roomTo: "", apartmentLabel: "", apartmentTo: "" }),
  contact: z
    .object({
      companyName: str,
      address: z.array(z.string()).optional().default([]),
      phoneDisplay: str,
      phoneLink: str,
      email: str,
      reservationContact: str,
    })
    .default({ companyName: "", address: [], phoneDisplay: "", phoneLink: "", email: "", reservationContact: "" }),
  footer: z
    .object({
      contactHeading: str,
      officeLabel: str,
      reservationLabel: str,
      socialHeading: str,
      social: z
        .array(z.object({ network: z.string(), label: str, url: z.string().nullable().optional() }))
        .optional()
        .default([]),
      copyright: str,
    })
    .default({ contactHeading: "", officeLabel: "", reservationLabel: "", socialHeading: "", social: [], copyright: "" }),
  newsletter: z.record(z.string(), z.string()).optional().default({}),
  ui: z.record(z.string(), z.string()).optional().default({}),
  contactForm: z
    .record(z.string(), z.union([z.string(), z.array(z.string())]))
    .optional()
    .default({}),
  enquiryForm: z.record(z.string(), z.string()).optional().default({}),
  /** Site settings › Guest contact: the shared "Meet Anna" section. */
  guestContact: z.record(z.string(), z.string().nullable()).optional().default({}),
  notFound: z.record(z.string(), z.string()).optional().default({}),
  /** WPML › Languages: code and the language's own name, in WPML's order. */
  languages: z.array(z.object({ code: z.string(), name: z.string() })).optional().default([]),
  menus: z
    .object({
      header: z.array(menuItem).optional().default([]),
      menu: z.array(menuItem).optional().default([]),
      footer: z.array(menuItem).optional().default([]),
    })
    .default({ header: [], menu: [], footer: [] }),
});

export type Globals = z.infer<typeof globalsSchema>;
export type MenuItem = MenuNode;

/** An all-empty value, used when WordPress is unreachable. */
export const EMPTY_GLOBALS: Globals = globalsSchema.parse({});

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
