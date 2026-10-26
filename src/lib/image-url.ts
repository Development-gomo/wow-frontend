import { DEVICE_SIZES, IMAGE_QUALITY, IMAGE_SIZES, UPLOADS_PATH } from "@/lib/image-config";

/*
 * Optimised image URLs, usable on the server and in the browser (the poster
 * of the home video is built on the server; thumbnails in the browser).
 */

/** A CMS upload the optimiser can process (not SVG or animated GIF). */
export function isOptimizable(src: string | undefined): src is string {
  return Boolean(src) && src!.includes(UPLOADS_PATH) && !/\.(svg|gif)(\?|$)/i.test(src!);
}

/**
 * One optimised URL at a fixed width, for places that cannot take a srcset
 * (a video poster, a CSS background). Snaps up to the nearest allowed width.
 */
export function optimizedSrc(src: string, width: number): string {
  if (!isOptimizable(src)) return src;
  const allowed = [...IMAGE_SIZES, ...DEVICE_SIZES].sort((a, b) => a - b);
  const w = allowed.find((size) => size >= width) ?? allowed[allowed.length - 1];
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${IMAGE_QUALITY}`;
}
