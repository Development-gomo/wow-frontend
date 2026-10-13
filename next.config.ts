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

const nextConfig: NextConfig = {
  images: {
    // The copied Lovable components import images from `@/assets/**` and pass the
    // result straight to `<img src>`. Next's static-image handling would hand them
    // a StaticImageData object instead of a URL string, so it is disabled and the
    // webpack rule below restores Vite's behaviour of emitting a plain URL.
    disableStaticImages: true,
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
