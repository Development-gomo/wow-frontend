import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../styles.css";
import { getGlobals } from "@/lib/cms/client";
import { Providers } from "./providers";

/** Site-wide defaults, from WordPress › Site settings › Brand. Pages override them. */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getGlobals();

  return {
    // Next resolves relative og:image/twitter:image paths against this base.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: seo.title || undefined,
    description: seo.description || undefined,
    openGraph: {
      title: seo.title || undefined,
      description: seo.description || undefined,
      type: "website",
    },
    twitter: { card: "summary" },
  };
}

export const viewport = { width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: ReactNode }) {
  const globals = await getGlobals();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Barlow+Condensed:wght@300;400;500&display=swap"
        />
      </head>
      <body>
        <Providers globals={globals}>{children}</Providers>
      </body>
    </html>
  );
}
