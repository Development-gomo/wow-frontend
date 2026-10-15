"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * Images from WordPress, served through the Next.js image optimizer so each
 * device downloads a variant sized for how the image is actually displayed
 * (srcset + sizes), in AVIF/WebP, instead of the full-size upload.
 *
 * Every call keeps the original <img> classes, so layout and cropping are
 * unchanged: `width`/`height` here only describe the source's proportions,
 * the CSS still decides the rendered box. An empty source renders nothing,
 * as next/image would otherwise throw.
 *
 * If the optimizer cannot produce a variant (it allows the CMS 7 seconds to
 * deliver the original, a fixed limit), the image falls back to the original
 * file rather than showing as broken.
 */
export function CmsImage({ onError, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (!props.src) return null;

  return (
    <Image
      {...props}
      unoptimized={failed || props.unoptimized}
      onError={(event) => {
        if (!failed) setFailed(true);
        onError?.(event);
      }}
    />
  );
}

