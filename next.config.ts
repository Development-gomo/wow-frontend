import type { NextConfig } from "next";
import path from "node:path";

const ASSET_ALIASES = {
  // Routing adapter: the copied components import `Link` from TanStack Router.
  // Resolving that specifier to a local shim keeps every component file unchanged.
  "@tanstack/react-router": path.resolve(
    process.cwd(),
    "src/compat/tanstack-react-router.tsx",
  ),
};

// Images come from the WordPress media library; the optimizer may only fetch
// from its uploads folder. Derived from WP_API_URL so another CMS host or path
// needs no code change.
const CMS = new URL(process.env.WP_API_URL ?? "https://gomowebb.com/wow-backend");

const nextConfig: NextConfig = {
  images: {
    // The copied Lovable components import images from `@/assets/**` and pass the
    // result straight to `<img src>`. Next's static-image handling would hand them
    // a StaticImageData object instead of a URL string, so it is disabled and the
    // webpack rule below restores Vite's behaviour of emitting a plain URL.
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: CMS.protocol.replace(":", "") as "http" | "https",
        hostname: CMS.hostname,
        pathname: `${CMS.pathname.replace(/\/$/, "")}/wp-content/uploads/**`,
      },
    ],
    // AVIF first (smallest), WebP for browsers without AVIF; the original
    // format is the fallback. Chosen per request from the Accept header.
    formats: ["image/avif", "image/webp"],
    // One quality level, required to be explicit from Next.js 16.
    qualities: [75],
    // WordPress sends no Cache-Control for uploads, which would leave optimized
    // variants cached for only 60s and re-fetched from SiteGround constantly.
    // Replacing an image in WordPress gives it a new URL, so a long TTL is safe.
    minimumCacheTTL: 2678400, // 31 days
  },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, ...ASSET_ALIASES };

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
      type: "asset/resource",
      generator: { filename: "static/media/[name].[hash:8][ext]" },
    });

    return config;
  },
};

export default nextConfig;
