import "server-only";

import { EMPTY_GLOBALS, globalsSchema, type Globals } from "./globals";
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

async function cmsFetch(path: string, { tags = [], noStore = false }: FetchOptions = {}) {
  const url = `${BASE}/wp-json/${NAMESPACE}${path}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    ...(noStore
      ? { cache: "no-store" as const }
      : { next: { revalidate: REVALIDATE_SECONDS, tags: [CACHE_TAGS.all, ...tags] } }),
  });

  if (!response.ok) {
    // 404 is a legitimate answer for "no such page", not an outage.
    if (response.status === 404) return null;

    throw new Error(`CMS ${response.status} for ${path}`);
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
    console.error(`[cms] page "${slug}" failed validation:`, parsed.error.issues.slice(0, 5));
    return null;
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
 * through SiteProvider. Falls back to an all-empty value if WordPress is
 * unreachable, so the site degrades to missing copy instead of crashing.
 */
export async function getGlobals(): Promise<Globals> {
  try {
    const raw = await cmsFetch("/globals", { tags: [CACHE_TAGS.globals] });

    if (!raw) return EMPTY_GLOBALS;

    const parsed = globalsSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("[cms] /globals failed validation:", parsed.error.issues.slice(0, 5));
      return EMPTY_GLOBALS;
    }

    return parsed.data;
  } catch (error) {
    console.error("[cms] could not load globals:", error);
    return EMPTY_GLOBALS;
  }
}
