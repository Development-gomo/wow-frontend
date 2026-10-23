import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "../../styles.css";
import { getGlobals } from "@/lib/cms/client";
import { isLang, LANGS, OG_LOCALE, type Lang } from "@/lib/i18n";
import { Providers } from "./providers";

/**
 * Root layout, one per language. Swedish is served at the root and English
 * under /en; the middleware maps the root URLs onto the "sv" segment.
 */

type Params = { lang: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return LANGS.map((lang) => ({ lang }));
}

/** Site-wide defaults, from WordPress › Site settings › Brand. Pages override them. */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const { seo } = await getGlobals(lang);

  return {
    // Next resolves relative og:image/twitter:image paths against this base.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: seo.title || undefined,
    description: seo.description || undefined,
    openGraph: {
      title: seo.title || undefined,
      description: seo.description || undefined,
      type: "website",
      locale: OG_LOCALE[lang],
    },
    twitter: { card: "summary" },
  };
}

export const viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<Params> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const globals = await getGlobals(lang as Lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Barlow+Condensed:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        <Providers globals={globals} lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
