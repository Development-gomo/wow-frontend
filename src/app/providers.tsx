"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

/**
 * Mirrors the RootComponent of the original `src/routes/__root.tsx`:
 * a QueryClientProvider wrapping SiteNavbar -> page -> SiteFooter.
 *
 * It is a client component so the copied navbar/footer (and the whole page tree
 * beneath them) keep their original hooks and event handlers without needing a
 * "use client" directive added to any migrated component file.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNavbar />
      {children}
      <SiteFooter />
    </QueryClientProvider>
  );
}
