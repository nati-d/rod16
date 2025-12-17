import type { NextConfig } from "next";

const isDevMode = process.env.npm_lifecycle_event === "dev";

const nextConfig: NextConfig = {
  // Compression settings
  compress: true,

  // Image optimization settings
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
    // Cache optimized images for 1 year
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false, // Enable Next.js optimization for all images including Cloudinary
    // Image formats and sizes
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack optimizations (only in production, not in dev mode to avoid Turbopack warning)
  ...(!isDevMode && {
    webpack: (config, { dev, isServer }) => {
      // Production-only optimizations
      if (!dev && !isServer) {
        // Enable tree-shaking and better chunking
        config.optimization = {
          ...config.optimization,
          usedExports: true,
          sideEffects: false,
          moduleIds: "deterministic",
          chunkIds: "deterministic",
          // Split chunks optimization
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              default: false,
              vendors: false,
              // Vendor chunk for node_modules
              vendor: {
                name: "vendor",
                chunks: "all",
                test: /[\\/]node_modules[\\/]/,
                priority: 20,
                reuseExistingChunk: true,
              },
              // Common chunk for shared code
              common: {
                name: "common",
                minChunks: 2,
                chunks: "all",
                priority: 10,
                reuseExistingChunk: true,
                enforce: true,
              },
              // React and React-DOM chunk
              react: {
                name: "react",
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                chunks: "all",
                priority: 30,
                reuseExistingChunk: true,
              },
            },
          },
        };
      }
      
      return config;
    },
  }),

  // Experimental features for better optimization
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-slot",
    ],
  },

  // Custom caching headers for images
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;