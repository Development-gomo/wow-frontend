"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { useLocalizeHref } from "@/components/cms/site-context";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  /** Prefix internal paths with the page language (/en/…), as the router links do. */
  localize?: boolean;
};

/**
 * A plain link whose "#id" form scrolls smoothly to that section on the page
 * (and updates the address). The only interactive part of several otherwise
 * static sections, so those sections can render on the server.
 */
export function SectionLink({ href, localize = false, ...rest }: Props) {
  const localizeHref = useLocalizeHref();
  const sectionId = href.startsWith("#") ? href.slice(1) : null;

  const scroll = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = sectionId ? document.getElementById(sectionId) : null;
    if (!el) return;
    event.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${sectionId}`);
  };

  return <a {...rest} href={localize ? localizeHref(href) : href} onClick={sectionId ? scroll : undefined} />;
}
