import type { NextConfig } from "next";

import { DEVICE_SIZES, IMAGE_CACHE_SECONDS, IMAGE_QUALITY, IMAGE_SIZES, UPLOADS_PATH } from "./src/lib/image-config";

/** The CMS uploads folder, the only remote source the image optimiser accepts. */
const cms = new URL(process.env.WP_API_URL ?? "https://gomowebb.com/wow-backend");
const CMS_UPLOADS = {
  protocol: cms.protocol.replace(":", "") as "http" | "https",
  hostname: cms.hostname,
  port: cms.port,
  pathname: `${cms.pathname.replace(/\/$/, "")}${UPLOADS_PATH}**`,
};

const nextConfig: NextConfig = {
  images: {
    // The copied Lovable components import images from `@/assets/**` and pass the
    // result straight to `<img src>`. Next's static-image handling would hand them
    // a StaticImageData object instead of a URL string, so it is disabled and the
    // webpack rule below restores Vite's behaviour of emitting a plain URL.
    disableStaticImages: true,
    // CMS photos are resized and re-encoded on demand (AVIF, then WebP) and
    // cached; the browser picks a width from the srcset.
    remotePatterns: [CMS_UPLOADS],
    formats: ["image/avif", "image/webp"],
    deviceSizes: DEVICE_SIZES,
    imageSizes: IMAGE_SIZES,
    qualities: [IMAGE_QUALITY],
    minimumCacheTTL: IMAGE_CACHE_SECONDS,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
      type: "asset/resource",
      generator: { filename: "static/media/[name].[hash:8][ext]" },
    });

    return config;
  },
};

export default nextConfig;
