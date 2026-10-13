"use client";

import { createContext, useContext, type ReactNode } from "react";

import { EMPTY_GLOBALS, type Globals } from "@/lib/cms/globals";

/**
 * Site settings and menus, fetched once on the server by the root layout and
 * made available to every component without prop drilling.
 */
const SiteContext = createContext<Globals>(EMPTY_GLOBALS);

export function SiteProvider({ value, children }: { value: Globals; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): Globals {
  return useContext(SiteContext);
}

/** Shared interface labels from Site settings › Interface text. */
export function useUi(): Record<string, string> {
  return useContext(SiteContext).ui;
}
