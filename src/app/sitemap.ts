import type { MetadataRoute } from "next";

import { getPage, getPageIndex } from "@/lib/cms/client";
import { HREFLANG, LANGS, pagePath, type Lang } from "@/lib/i18n";

/**
 * Every published page in every language, each listing its translations, so
 * search engines see the same reciprocal hreflang pairs as the page heads.
 */

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGS) {
    for (const item of await getPageIndex(lang)) {
      const page = await getPage(item.slug, { lang }).catch(() => null);
      if (!page) continue;

      const languages: Record<string, string> = {};
      for (const code of LANGS) {
        const slug = page.translations[code as Lang];
        if (slug !== undefined) languages[HREFLANG[code]] = `${base}${pagePath(slug, code)}`;
      }

      entries.push({
        url: `${base}${pagePath(page.slug, lang)}`,
        lastModified: item.modified ?? undefined,
        alternates: { languages },
      });
    }
  }

  return entries;
}
