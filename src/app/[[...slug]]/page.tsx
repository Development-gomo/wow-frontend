import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { SectionRenderer } from "@/components/cms/section-renderer";
import { getPage, getPageIndex } from "@/lib/cms/client";

/**
 * CMS-driven pages.
 *
 * An optional catch-all, so a page created in WordPress appears here without a
 * code change. Statically defined routes (about-us, contact, gallery,
 * gift-card) take precedence over this file, which is how the pages whose
 * bodies are still bespoke JSX keep rendering from their own components.
 */

export const dynamicParams = true;
export const revalidate = 300;

type Params = { slug?: string[] };

function toSlug(params: Params): string {
  return (params.slug ?? []).join("/");
}

/**
 * Pre-render every page the CMS knows about at build time.
 */
export async function generateStaticParams(): Promise<Params[]> {
  const pages = await getPageIndex();

  return pages.map((page) => ({
    slug: page.slug === "" ? [] : page.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const slug = toSlug(await params);
  const page = await getPage(slug);

  if (!page) return {};

  const seo = page.seo ?? {};
  const title = seo.title || page.title;

  return {
    title,
    description: seo.description,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: seo.description,
      type: "website",
      images: seo.image ? [seo.image] : undefined,
    },
    twitter: { card: seo.image ? "summary_large_image" : "summary" },
  };
}

export default async function CmsPage({ params }: { params: Promise<Params> }) {
  const slug = toSlug(await params);
  const { isEnabled: preview } = await draftMode();

  const page = await getPage(slug, { preview });

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-clay/30">
      <SectionRenderer sections={page.sections} />
    </div>
  );
}
