"use client";

import type { ReactNode } from "react";

import { SiteProvider } from "@/components/cms/site-context";
import { SiteNavbar } from "@/components/site-navbar";
import type { Globals } from "@/lib/cms/globals";
import type { Lang } from "@/lib/i18n";

/**
 * Site settings and language for the interactive (client) components, and the
 * navbar. Page content and the footer are server-rendered and pass through as
 * children; they do not become client code by sitting inside this provider.
 */
export function Providers({ children, globals, lang }: { children: ReactNode; globals: Globals; lang: Lang }) {
  return (
    <SiteProvider value={globals} lang={lang}>
      <SiteNavbar />
      {children}
    </SiteProvider>
  );
}
