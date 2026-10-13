import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../styles.css";
import { Providers } from "./providers";

/** Ported from the `head()` of the original src/routes/__root.tsx. */
export const metadata: Metadata = {
  // Next resolves relative og:image/twitter:image paths against this base.
  // The Lovable original emitted them relative; set NEXT_PUBLIC_SITE_URL per environment.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "WOW Apartments & Rooms",
  description: "Thoughtfully furnished rooms and apartments in Gothenburg.",
  openGraph: {
    title: "WOW Apartments & Rooms",
    description: "Thoughtfully furnished rooms and apartments in Gothenburg.",
    type: "website",
  },
  twitter: { card: "summary" },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
