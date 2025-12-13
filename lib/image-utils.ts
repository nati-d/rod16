/**
 * Image utility functions
 * Helper functions for working with images, especially Cloudinary URLs
 */

/**
 * Check if a URL is from Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
	return url.includes("res.cloudinary.com");
}

/**
 * Get image props with unoptimized flag for Cloudinary images
 * Cloudinary already optimizes images, so we don't need Next.js to optimize them
 */
export function getImageProps(src: string, props: any = {}) {
	const isCloudinary = isCloudinaryUrl(src);
	
	return {
		...props,
		src,
		unoptimized: isCloudinary, // Disable Next.js optimization for Cloudinary images
	};
}

