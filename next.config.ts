import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	images: {
		// Use remotePatterns instead of domains (deprecated)
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
		// Image optimization settings optimized for Cloudinary
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		// Extended cache for Cloudinary images (they're already optimized)
		minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for Cloudinary
		// Enable image optimization
		dangerouslyAllowSVG: false,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		// Optimize local images
		unoptimized: false,
	},
	// Add caching headers for static assets
	async headers() {
		return [
			{
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/image",
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
