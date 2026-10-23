/**
 * Image optimisation settings, shared by next.config.ts and the components
 * that build optimised URLs by hand (video poster, CSS backgrounds).
 *
 * Every width a browser can ask for must be listed here: the optimiser
 * refuses any other, which also stops anyone generating unlimited variants.
 */

/** Widths for responsive images (srcset "w" candidates). */
export const DEVICE_SIZES = [384, 640, 750, 828, 1080, 1200, 1600, 1920, 2560];

/** Widths for small fixed-size images such as thumbnails. */
export const IMAGE_SIZES = [96, 128, 192, 256];

export const IMAGE_QUALITY = 75;

/** Uploads are immutable once published (WordPress renames replacements). */
export const IMAGE_CACHE_SECONDS = 60 * 60 * 24 * 30;

/** Path of the CMS uploads folder below the CMS base URL. */
export const UPLOADS_PATH = "/wp-content/uploads/";
