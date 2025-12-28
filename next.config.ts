import type { NextConfig } from "next";

const isDevMode = process.env.npm_lifecycle_event === "dev";

const nextConfig: NextConfig = {
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    // Remove unoptimized: false — let it default to optimized
    // Remove minimumCacheTTL — not needed with custom loader
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Keep your excellent webpack optimizations
  ...(!isDevMode && {
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        config.optimization = {
          ...config.optimization,
          usedExports: true,
          sideEffects: false,
          moduleIds: "deterministic",
          chunkIds: "deterministic",
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              vendor: {
                name: "vendor",
                chunks: "all",
                test: /[\\/]node_modules[\\/]/,
                priority: 20,
              },
              common: {
                name: "common",
                minChunks: 2,
                priority: 10,
                enforce: true,
              },
              react: {
                name: "react",
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                priority: 30,
              },
            },
          },
        };
      }
      return config;
    },
  }),

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-slot",
    ],
  },

  // Keep headers — good for local images
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;