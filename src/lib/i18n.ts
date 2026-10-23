/**
 * Languages of the site.
 *
 * The first language is the default and lives at the root (/rooms); every
 * other language lives under its code (/en/rooms, /de/rooms). Page content,
 * and the names shown in the language switcher, come from WordPress (WPML ›
 * Languages); this file only knows the URL scheme and a handful of
 * accessibility labels that never come from the CMS.
 *
 * Adding a language: add it in WPML and translate the content, then add its
 * two-letter code to NEXT_PUBLIC_SITE_LANGUAGES (e.g. "sv,en,de") and
 * redeploy. The switcher lists every WPML language the site serves.
 *
 * Kept free of `server-only` so client components can use it.
 */

const FALLBACK_LANGS = ["sv", "en"];

const configured = (process.env.NEXT_PUBLIC_SITE_LANGUAGES ?? "")
  .split(",")
  .map((code) => code.trim().toLowerCase())
  .filter((code) => /^[a-z]{2}$/.test(code));

/** Languages the frontend serves, default first. */
export const LANGS: readonly string[] = configured.length > 0 ? configured : FALLBACK_LANGS;

/** A two-letter language code from LANGS. */
export type Lang = string;

export const DEFAULT_LANG: Lang = LANGS[0];

/** hreflang value: a region where one is meant (Swedish for Sweden), else the plain code. */
const HREFLANG: Record<string, string> = { sv: "sv-SE" };
const OG_LOCALE: Record<string, string> = { sv: "sv_SE", en: "en_GB" };

export function hreflang(lang: Lang): string {
  return HREFLANG[lang] ?? lang;
}

export function ogLocale(lang: Lang): string {
  return OG_LOCALE[lang] ?? `${lang}_${lang.toUpperCase()}`;
}

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && LANGS.includes(value);
}

/** URL prefix of a language: "" for the default, "/en" for English. */
export function langPrefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

/** Site path of a CMS page slug ("" is the home page) in a language. */
export function pagePath(slug: string, lang: Lang): string {
  const prefix = langPrefix(lang);
  const clean = slug.replace(/^\/+|\/+$/g, "");

  if (clean === "") return prefix || "/";

  return `${prefix}/${clean}`;
}

/**
 * An internal link in the given language. CMS links are stored without a
 * language ("/rooms", "/#faq"); external, mailto:, tel: and in-page "#" links
 * are returned unchanged, as is a link that already carries a language.
 */
export function localizeHref(href: string, lang: Lang): string {
  const prefix = langPrefix(lang);

  if (prefix === "" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === prefix || href.startsWith(`${prefix}/`) || href.startsWith(`${prefix}#`) || href.startsWith(`${prefix}?`)) {
    return href;
  }

  // "/" and "/#faq" become "/en" and "/en#faq", never "/en/".
  if (href === "/" || href.startsWith("/#") || href.startsWith("/?")) return `${prefix}${href.slice(1)}`;

  return `${prefix}${href}`;
}

/** The language of a browser path and the path without its language prefix. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  for (const lang of LANGS) {
    const prefix = langPrefix(lang);
    if (prefix !== "" && (pathname === prefix || pathname.startsWith(`${prefix}/`))) {
      return { lang, path: pathname.slice(prefix.length) || "/" };
    }
  }

  return { lang: DEFAULT_LANG, path: pathname || "/" };
}

/** The same page in another language, by swapping the prefix. */
export function switchPath(pathname: string, to: Lang): string {
  const { path } = splitPath(pathname);
  return localizeHref(path, to);
}

/**
 * Accessibility labels for controls and landmarks. They describe the
 * interface itself, never content, so they live with the code.
 */
const A11Y = {
  en: {
    language: "Language",
    home: "home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    fullMenu: "Full menu",
    menu: "Menu",
    primaryNavigation: "Primary navigation",
    roomBooking: "Room booking",
    close: "Close",
    previous: "Previous",
    next: "Next",
    previousCards: "Previous cards",
    nextCards: "Next cards",
    previousTestimonials: "Previous testimonials",
    nextTestimonials: "Next testimonials",
    previousImage: "Previous image",
    nextImage: "Next image",
    thumbnails: "Thumbnails",
    breadcrumb: "Breadcrumb",
    imageOf: "Image {n} of {total}",
    showImageOf: "Show image {n} of {total}",
    ratingOutOf: "{rating} out of {outOf}",
    photoOf: "{title} photo {n} of {total}",
    showPhoto: "Show {title} photo {n}",
    previousPhoto: "Previous {title} photo",
    nextPhoto: "Next {title} photo",
  },
  sv: {
    language: "Språk",
    home: "startsida",
    openMenu: "Öppna menyn",
    closeMenu: "Stäng menyn",
    fullMenu: "Hela menyn",
    menu: "Meny",
    primaryNavigation: "Huvudnavigering",
    roomBooking: "Rumsbokning",
    close: "Stäng",
    previous: "Föregående",
    next: "Nästa",
    previousCards: "Föregående kort",
    nextCards: "Nästa kort",
    previousTestimonials: "Föregående omdömen",
    nextTestimonials: "Nästa omdömen",
    previousImage: "Föregående bild",
    nextImage: "Nästa bild",
    thumbnails: "Miniatyrer",
    breadcrumb: "Brödsmulor",
    imageOf: "Bild {n} av {total}",
    showImageOf: "Visa bild {n} av {total}",
    ratingOutOf: "{rating} av {outOf}",
    photoOf: "{title}, foto {n} av {total}",
    showPhoto: "Visa {title}, foto {n}",
    previousPhoto: "Föregående foto av {title}",
    nextPhoto: "Nästa foto av {title}",
  },
} satisfies Record<string, Record<string, string>>;

export type A11yLabels = (typeof A11Y)["en"];

/** Fill a label template: fill("Image {n} of {total}", { n: 1, total: 6 }). */
export function fill(template: string, values: Record<string, string | number | undefined>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key] ?? "") : match));
}

/** Labels in a language, English for a language without its own set. */
export function a11yLabels(lang: Lang): A11yLabels {
  return (A11Y as Record<string, A11yLabels>)[lang] ?? A11Y.en;
}
