import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LANG, langPrefix, LANGS } from "@/lib/i18n";

/**
 * Language routing.
 *
 * Swedish (the default) is served at the root: /rooms is rendered by the
 * app/[lang] tree as /sv/rooms through an internal rewrite, so the address bar
 * never shows /sv. English is served under /en as it is. A typed /sv/... URL
 * redirects to the root version so each page has one address per language.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const defaultSegment = `/${DEFAULT_LANG}`;

  if (pathname === defaultSegment || pathname.startsWith(`${defaultSegment}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultSegment.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const prefixed = LANGS.some((lang) => {
    const prefix = langPrefix(lang);
    return prefix !== "" && (pathname === prefix || pathname.startsWith(`${prefix}/`));
  });

  if (prefixed) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `${defaultSegment}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except API routes, Next internals and root metadata files.
  matcher: ["/((?!api/|_next/|_vercel/|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)"],
};
