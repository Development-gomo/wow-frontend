"use client";

import { useEffect, useId, useRef, useState } from "react";

import { useA11y, useLang, useLanguageHref, useSite } from "@/components/cms/site-context";
import { hreflang, isLang, LANGS } from "@/lib/i18n";

/*
 * Language menu: the current language's code with a chevron; opening it lists
 * the site's languages by their own names (WPML › Languages), default language
 * first, the current one ticked. A language added in WPML appears here once the site serves it (see
 * src/lib/i18n.ts). Choosing one is a full page load, since each language has
 * its own root layout.
 */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 8" width="10" height="7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M1 1.5 6 6.5 11 1.5" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="8" r="8" className="fill-taupe" />
      <path d="M4.8 8.2 7 10.3 11.2 5.9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ivory" />
    </svg>
  );
}

export function LanguageSwitcher({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const lang = useLang();
  const a11y = useA11y();
  const hrefFor = useLanguageHref();
  const { languages } = useSite();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // WPML's languages that the site serves, in the site's order (default first, as in
  // NEXT_PUBLIC_SITE_LANGUAGES); without WPML, the site's own list.
  const fromCms = languages
    .filter((language) => isLang(language.code))
    .sort((a, b) => LANGS.indexOf(a.code) - LANGS.indexOf(b.code));
  const items = fromCms.length > 0 ? fromCms : LANGS.map((code) => ({ code, name: code.toUpperCase() }));

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (items.length < 2) return null;

  const current = items.find((item) => item.code === lang);

  return (
    <div ref={rootRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${a11y.language}: ${current?.name ?? lang}`}
        onClick={() => setOpen((value) => !value)}
        className={`flex h-9 cursor-pointer items-center gap-2 px-1 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 sm:h-11 xl:text-[11px] xl:tracking-[0.18em] ${dark ? "text-linen hover:text-linen/80" : "text-taupe hover:text-umber"}`}
      >
        <span>{lang}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul
          id={listId}
          className={`absolute top-full z-50 mt-2 min-w-[176px] list-none rounded-[10px] border border-pearl/60 bg-ivory p-1.5 right-0 shadow-[0_12px_32px_rgba(60,45,35,0.14)]`}
        >
          {items.map((item) => {
            const active = item.code === lang;
            return (
              <li key={item.code}>
                <a
                  href={active ? undefined : hrefFor(item.code)}
                  hrefLang={hreflang(item.code)}
                  lang={item.code}
                  aria-current={active ? "true" : undefined}
                  onClick={active ? () => setOpen(false) : undefined}
                  className={`flex items-center justify-between gap-4 rounded-[7px] px-3 py-2.5 text-[14px] font-normal leading-none transition-colors duration-150 ${active ? "cursor-default bg-sand/70 text-umber" : "cursor-pointer text-taupe hover:bg-sand/40 hover:text-umber"}`}
                >
                  <span>{item.name}</span>
                  {active && <Check />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
