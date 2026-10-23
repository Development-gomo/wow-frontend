"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { SiteProvider } from "@/components/cms/site-context";
import { SiteNavbar } from "@/components/site-navbar";
import type { Globals } from "@/lib/cms/globals";
import type { Lang } from "@/lib/i18n";
import { SiteFooter } from "@/components/site-footer";

/**
 * Mirrors the RootComponent of the original `src/routes/__root.tsx`:
 * a QueryClientProvider wrapping SiteNavbar -> page -> SiteFooter.
 *
 * It is a client component so the copied navbar/footer (and the whole page tree
 * beneath them) keep their original hooks and event handlers without needing a
 * "use client" directive added to any migrated component file.
 */
export function Providers({ children, globals, lang }: { children: ReactNode; globals: Globals; lang: Lang }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SiteProvider value={globals} lang={lang}>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </SiteProvider>
    </QueryClientProvider>
  );
}
