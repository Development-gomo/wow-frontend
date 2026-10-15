import { getImageProps } from "next/image";

/**
 * Image helpers shared by server and client components. Kept out of the
 * "use client" CmsImage module so plain values import as values everywhere.
 */

/**
 * An optimized URL for places that cannot take a srcset (CSS backgrounds,
 * <video poster>). `displayWidth` is the largest CSS width the image is shown
 * at; the URL is for twice that, to stay sharp on high-density screens.
 */
export function optimizedSrc(src: string | undefined, displayWidth: number): string | undefined {
  if (!src) return src;
  // getImageProps builds 1x/2x candidates from `width`; its `src` is the 2x one.
  return getImageProps({ src, alt: "", width: displayWidth, height: displayWidth }).props.src;
}

/**
 * `sizes` for the layouts that repeat across components. Each describes the
 * rendered width at every breakpoint so the browser picks the smallest
 * sufficient candidate. Content is capped at 1200px (max-w-[1200px]).
 */
export const SIZES = {
  /** Full-bleed banners and backgrounds. */
  fullWidth: "100vw",
  /** One card in a 1 / 2 / 3-column grid (gap 32px). */
  card: "(min-width: 1280px) 380px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
  /** One image in a 1 / 2-column split layout. */
  half: "(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw",
} as const;
