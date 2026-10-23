"use client";

import { getImageProps } from "next/image";
import { useCallback, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import { preload } from "react-dom";

import { DEVICE_SIZES, IMAGE_QUALITY, IMAGE_SIZES, UPLOADS_PATH } from "@/lib/image-config";

/**
 * Optimised CMS images.
 *
 * Renders the same <img> element the components always had (same classes,
 * same width/height attributes or none), so no layout changes, but with
 * srcset/sizes pointing at Next's image optimiser: the browser downloads an
 * AVIF/WebP at the width it actually displays instead of the multi-megabyte
 * upload. Built on next/image's getImageProps, the documented way to use the
 * optimiser with your own markup.
 *
 * Anything that is not a CMS upload (SVGs, GIFs, bundled assets) renders as
 * is. If the optimiser ever fails (for example the CMS host refuses its
 * request), the image falls back to the original file rather than breaking.
 */

/** Intrinsic size used only to build the srcset when the markup has none. */
const DEFAULT_WIDTH = 1600;
const DEFAULT_HEIGHT = 1067;

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

type CmsImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height"> & {
  src: string;
  alt: string;
  /** Rendered width per breakpoint, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  /** Above-the-fold image (the page's LCP): preloaded and fetched first. */
  priority?: boolean;
  width?: number;
  height?: number;
};

export function CmsImage({ src, alt, sizes, priority = false, width, height, loading, onError, ...rest }: CmsImageProps) {
  const [failed, setFailed] = useState(false);

  // An error before hydration fires no React event; catch it on mount.
  const detectEarlyError = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0 && img.currentSrc.includes("/_next/image")) setFailed(true);
  }, []);

  if (!isOptimizable(src) || failed) {
    return <img {...rest} src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : loading} fetchPriority={priority ? "high" : rest.fetchPriority} />;
  }

  const { props } = getImageProps({
    src,
    alt,
    width: width ?? DEFAULT_WIDTH,
    height: height ?? DEFAULT_HEIGHT,
    sizes,
    quality: IMAGE_QUALITY,
    priority,
    loading: priority ? undefined : loading,
  });

  if (priority) {
    preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setFailed(true);
    onError?.(event);
  };

  return (
    <img
      {...rest}
      ref={detectEarlyError}
      src={props.src}
      srcSet={props.srcSet}
      sizes={props.sizes}
      alt={alt}
      width={width}
      height={height}
      loading={props.loading}
      decoding={props.decoding}
      fetchPriority={props.fetchPriority ?? rest.fetchPriority}
      onError={handleError}
    />
  );
}
