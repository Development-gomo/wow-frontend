"use client";

import { getImageProps } from "next/image";
import { useCallback, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import { preload } from "react-dom";

import { IMAGE_QUALITY } from "@/lib/image-config";
import { isOptimizable } from "@/lib/image-url";

export { isOptimizable, optimizedSrc } from "@/lib/image-url";

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
