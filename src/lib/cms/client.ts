import "server-only";

import { globalsSchema, type Globals } from "./globals";
import { pageIndexSchema, pageSchema, parseSection, type Section } from "./schema";

/**
 * Read layer for the WordPress CMS.
 *
 * Every response is validated before it reaches a component, and every fetch is
 * tagged so a single webhook call from WordPress can revalidate exactly what
 * changed instead of rebuilding the site.
 *
 * Server-only: the CMS base URL and any future credentials must never reach the
 * browser bundle.
 */

const BASE = (process.env.WP_API_URL ?? "https://gomowebb.com/wow-backend").replace(/\/$/, "");
const NAMESPACE = "wow/v1";

/** Cache tags, also used by the revalidation webhook. */
export const CACHE_TAGS = {
  all: "cms",
  pages: "cms:pages",
  globals: "cms:globals",
  page: (slug: string) => `cms:page:${slug || "home"}`,
} as const;

/** How long a page may be served stale before Next revalidates it in the background. */
const REVALIDATE_SECONDS = 300;

export type CmsPage = {
  id: number;
  slug: string;
  title: string;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    noindex?: boolean;
  };
  sections: Section[];
};

type FetchOptions = {
  tags?: string[];
  /** Bypass the cache entirely, for draft previews. */
  noStore?: boolean;
};

/**
 * Fetch one CMS endpoint and return its parsed JSON.
 *
 * Anything other than a 200 JSON answer is an error, never data. A host bot
 * check (SiteGround's sgcaptcha replies 202 with an HTML redirect page), a
 * maintenance page or a proxy error must not be rendered as an empty site
 * and cached: throwing makes the build fail, and during background
 * revalidation Next keeps serving the last good page instead.
 */
async function cmsFetch(path: string, { tags = [], noStore = false }: FetchOptions = {}) {
  const url = `${BASE}/wp-json/${NAMESPACE}${path}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    ...(noStore
      ? { cache: "no-store" as const }
      : { next: { revalidate: REVALIDATE_SECONDS, tags: [CACHE_TAGS.all, ...tags] } }),
  });

  // 404 is a legitimate answer for "no such page", not an outage.
  if (response.status === 404) return null;

  const type = response.headers.get("content-type") ?? "";

  if (response.status !== 200 || !type.includes("application/json")) {
    const body = await response.text().catch(() => "");
    const challenged = body.includes("sgcaptcha") ? " (host bot challenge)" : "";
    throw new Error(`CMS ${response.status} ${type || "no content-type"} for ${path}${challenged}`);
  }

  return response.json();
}

/**
 * Every published page, for generateStaticParams().
 *
 * A page published in WordPress is picked up on the next revalidation without
 * any code change, which is the point of the whole exercise.
 */
export async function getPageIndex(): Promise<Array<{ slug: string; title: string }>> {
  try {
    const raw = await cmsFetch("/pages", { tags: [CACHE_TAGS.pages] });

    if (!raw) return [];

    const parsed = pageIndexSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("[cms] /pages failed validation:", parsed.error.issues.slice(0, 3));
      return [];
    }

    return parsed.data.items.map((item) => ({ slug: item.slug, title: item.title }));
  } catch (error) {
    // A build must not fail because the CMS is briefly unreachable; the
    // statically known routes still render.
    console.error("[cms] could not load the page index:", error);
    return [];
  }
}

/**
 * One page with its ordered, validated sections.
 *
 * Returns null when the page does not exist, so the caller can call notFound().
 */
export async function getPage(slug: string, { preview = false } = {}): Promise<CmsPage | null> {
  const path = `/page/${slug || "home"}${preview ? "?preview=true" : ""}`;

  const raw = await cmsFetch(path, {
    tags: [CACHE_TAGS.page(slug)],
    noStore: preview,
  });

  if (!raw) return null;

  const parsed = pageSchema.safeParse(raw);

  if (!parsed.success) {
    // Not "page not found": a malformed answer must not be cached as a 404.
    console.error(`[cms] page "${slug}" failed validation:`, parsed.error.issues.slice(0, 5));
    throw new Error(`CMS page "${slug}" failed validation`);
  }

  const sections = parsed.data.sections.map(parseSection);

  for (const section of sections) {
    if (!section.valid) {
      console.error(`[cms] page "${slug}" section ${section.id}: ${section.reason}`);
    }
  }

  return {
    id: parsed.data.id,
    slug: parsed.data.slug,
    title: parsed.data.title,
    seo: parsed.data.seo,
    sections,
  };
}

/**
 * Site settings and menus.
 *
 * Fetched once per render tree by the root layout and handed to the client
 * through SiteProvider.
 *
 * An unreachable or invalid CMS throws rather than returning empty values:
 * a site without its navigation and footer must never be rendered and cached.
 * During revalidation Next then keeps serving the last good version.
 */
export async function getGlobals(): Promise<Globals> {
  const raw = await cmsFetch("/globals", { tags: [CACHE_TAGS.globals] });

  // The endpoint always exists; a 404 means the plugin is missing.
  if (!raw) throw new Error("CMS /globals not found");

  const parsed = globalsSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("[cms] /globals failed validation:", parsed.error.issues.slice(0, 5));
    throw new Error("CMS /globals failed validation");
  }

  return parsed.data;
}
