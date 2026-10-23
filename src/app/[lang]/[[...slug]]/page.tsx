import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { PageAlternates, type Alternates } from "@/components/cms/site-context";
import { SectionRenderer } from "@/components/cms/section-renderer";
import { getPage, getPageIndex, type CmsPage } from "@/lib/cms/client";
import { DEFAULT_LANG, HREFLANG, isLang, LANGS, OG_LOCALE, pagePath, type Lang } from "@/lib/i18n";

/**
 * CMS-driven pages.
 *
 * An optional catch-all, so a page created in WordPress appears here without a
 * code change. The [lang] segment is "sv" for root URLs (rewritten by the
 * middleware) and "en" for /en/... URLs.
 */

export const dynamicParams = true;
export const revalidate = 300;

type Params = { lang: string; slug?: string[] };

function toSlug(params: Params): string {
  return (params.slug ?? []).join("/");
}

function toLang(params: Params): Lang {
  return isLang(params.lang) ? params.lang : DEFAULT_LANG;
}

/** Paths of the page in every language WordPress has it in. */
function alternates(page: CmsPage): Alternates {
  const paths: Alternates = {};

  for (const lang of LANGS) {
    const slug = page.translations[lang];
    if (slug !== undefined) paths[lang] = pagePath(slug, lang);
  }

  // A page always exists in its own language.
  paths[page.lang] ??= pagePath(page.slug, page.lang);

  return paths;
}

/**
 * Pre-render every page the CMS knows about, in every language, at build time.
 */
export async function generateStaticParams(): Promise<Params[]> {
  const perLang = await Promise.all(
    LANGS.map(async (lang) =>
      (await getPageIndex(lang)).map((page) => ({
        lang,
        slug: page.slug === "" ? [] : page.slug.split("/"),
      })),
    ),
  );

  return perLang.flat();
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await params;
  const lang = toLang(resolved);
  const page = await getPage(toSlug(resolved), { lang });

  if (!page) return {};

  const seo = page.seo ?? {};
  const title = seo.title || page.title;
  const paths = alternates(page);

  // Canonical plus reciprocal hreflang: every language version lists all of
  // them, and x-default points to the Swedish (default) page.
  const languages: Record<string, string> = {};
  for (const code of LANGS) {
    const path = paths[code];
    if (path) languages[HREFLANG[code]] = path;
  }
  const fallback = paths[DEFAULT_LANG];
  if (fallback) languages["x-default"] = fallback;

  return {
    title,
    description: seo.description,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: paths[lang] ?? pagePath(page.slug, lang),
      languages,
    },
    openGraph: {
      title,
      description: seo.description,
      type: "website",
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((code) => code !== lang && paths[code]).map((code) => OG_LOCALE[code]),
      images: seo.image ? [seo.image] : undefined,
    },
    twitter: { card: seo.image ? "summary_large_image" : "summary" },
  };
}

export default async function CmsPage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const lang = toLang(resolved);
  const { isEnabled: preview } = await draftMode();

  const page = await getPage(toSlug(resolved), { lang, preview });

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay/30">
      <PageAlternates value={alternates(page)} />
      <SectionRenderer sections={page.sections} />
    </div>
  );
}
