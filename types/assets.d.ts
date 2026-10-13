/**
 * `next.config.ts` sets `images.disableStaticImages`, so image imports from
 * `@/assets/**` resolve to a plain URL string exactly as they did under Vite.
 * These declarations restore the matching types (Next's own bundled image
 * declarations are suppressed by that flag).
 */
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.avif" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
