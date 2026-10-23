/**
 * Languages of the site.
 *
 * Swedish is the default and lives at the root (/rooms); English lives under
 * /en (/en/rooms). Page content comes from WordPress in the requested
 * language; this file only knows the URL scheme and a handful of
 * accessibility labels that never come from the CMS.
 *
 * Kept free of `server-only` so client components can use it.
 */

export const LANGS = ["sv", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "sv";

/** hreflang / og:locale values per language. */
export const HREFLANG: Record<Lang, string> = { sv: "sv-SE", en: "en" };
export const OG_LOCALE: Record<Lang, string> = { sv: "sv_SE", en: "en_GB" };

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** URL prefix of a language: "" for Swedish, "/en" for English. */
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
    languageNames: "Svenska|English",
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
    languageNames: "Svenska|English",
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
} as const satisfies Record<Lang, Record<string, string>>;

export type A11yLabels = (typeof A11Y)[Lang];

/** Fill a label template: fill("Image {n} of {total}", { n: 1, total: 6 }). */
export function fill(template: string, values: Record<string, string | number | undefined>): string {
  return template.replace(/{(w+)}/g, (match, key: string) => (key in values ? String(values[key] ?? "") : match));
}

export function a11yLabels(lang: Lang): A11yLabels {
  return A11Y[lang];
}
