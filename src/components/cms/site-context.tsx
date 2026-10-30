"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import type { Globals } from "@/lib/cms/globals";
import { EMPTY_GLOBALS } from "@/lib/cms/globals-text";
import { a11yLabels, DEFAULT_LANG, localizeHref, switchPath, type A11yLabels, type Lang } from "@/lib/i18n";

/**
 * Site settings and menus, fetched once on the server by the root layout and
 * made available to every component without prop drilling.
 */
const SiteContext = createContext<Globals>(EMPTY_GLOBALS);

/** Paths of the current page in each language, from WordPress. */
export type Alternates = Partial<Record<Lang, string>>;

type LocaleValue = {
  lang: Lang;
  alternates: Alternates | null;
  setAlternates: (value: Alternates | null) => void;
};

const LocaleContext = createContext<LocaleValue>({ lang: DEFAULT_LANG, alternates: null, setAlternates: () => {} });

export function SiteProvider({ value, lang, children }: { value: Globals; lang: Lang; children: ReactNode }) {
  const [alternates, setAlternates] = useState<Alternates | null>(null);

  return (
    <SiteContext.Provider value={value}>
      <LocaleContext.Provider value={{ lang, alternates, setAlternates }}>{children}</LocaleContext.Provider>
    </SiteContext.Provider>
  );
}

export function useSite(): Globals {
  return useContext(SiteContext);
}

/** Shared interface labels from Site settings › Interface text. */
export function useUi(): Record<string, string> {
  return useContext(SiteContext).ui;
}

/** The language of the page being rendered. */
export function useLang(): Lang {
  return useContext(LocaleContext).lang;
}

/** Accessibility labels in the page language. */
export function useA11y(): A11yLabels {
  return a11yLabels(useContext(LocaleContext).lang);
}

/** Turns a CMS link ("/rooms") into a link in the page language ("/en/rooms"). */
export function useLocalizeHref(): (href: string) => string {
  const { lang } = useContext(LocaleContext);
  return useCallback((href: string) => localizeHref(href, lang), [lang]);
}

/**
 * Where the language switcher points: the page's translation from WordPress
 * when known, otherwise the same path in the other language.
 */
export function useLanguageHref(): (to: Lang) => string {
  const { alternates } = useContext(LocaleContext);
  const pathname = usePathname() ?? "/";
  return useCallback((to: Lang) => alternates?.[to] ?? switchPath(pathname, to), [alternates, pathname]);
}

/** Rendered by a page to tell the switcher where its translations live. */
export function PageAlternates({ value }: { value: Alternates }) {
  const { setAlternates } = useContext(LocaleContext);
  const key = JSON.stringify(value);

  useEffect(() => {
    setAlternates(JSON.parse(key) as Alternates);
    return () => setAlternates(null);
  }, [key, setAlternates]);

  return null;
}
