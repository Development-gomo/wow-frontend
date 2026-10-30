/*
 * Link helpers shared by server and client components (no React, no hooks).
 */

/** Destinations the client router must not handle: in-page anchors (#id) and other schemes (mailto:, tel:, https:). */
export function isPlainAnchor(href: string): boolean {
  return href.startsWith("#") || /^[a-z]+:/i.test(href);
}

/** Is `target` the current route? Prefix match ("/rooms" covers "/rooms/x"), exact for "/". */
export function isActivePath(pathname: string | null, target: string): boolean {
  if (!pathname) return false;
  const path = target.split(/[?#]/)[0];
  if (path === "/") return pathname === path;
  return pathname === path || pathname.startsWith(`${path}/`);
}
