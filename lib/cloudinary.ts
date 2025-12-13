/**
 * Cloudinary URL helper utilities
 * 
 * This file provides helper functions for working with Cloudinary image URLs
 * and applying transformations.
 */

/**
 * Apply Cloudinary transformations to an image URL
 * @param url - The Cloudinary image URL
 * @param options - Transformation options
 * @returns The transformed Cloudinary URL
 */
export function getCloudinaryImage(
	url: string,
	options: {
		width?: number;
		height?: number;
		quality?: number;
		format?: "auto" | "webp" | "avif" | "jpg" | "png";
		crop?: "fill" | "fit" | "scale" | "thumb" | "crop";
		gravity?: "auto" | "face" | "center";
	} = {}
): string {
	// If not a Cloudinary URL, return as is
	if (!url.includes("res.cloudinary.com")) {
		return url;
	}

	const {
		width,
		height,
		quality = 85,
		format = "auto",
		crop = "fill",
		gravity = "auto",
	} = options;

	// Extract the path from the Cloudinary URL
	// Format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{path}
	const urlParts = url.split("/upload/");
	if (urlParts.length !== 2) {
		return url;
	}

	const [baseUrl, path] = urlParts;

	// Build transformation string
	const transformations: string[] = [];

	if (width) transformations.push(`w_${width}`);
	if (height) transformations.push(`h_${height}`);
	if (crop) transformations.push(`c_${crop}`);
	if (gravity) transformations.push(`g_${gravity}`);
	if (quality) transformations.push(`q_${quality}`);
	if (format && format !== "auto") transformations.push(`f_${format}`);

	const transformationString = transformations.length > 0 ? transformations.join(",") + "/" : "";

	// Reconstruct URL with transformations
	return `${baseUrl}/upload/${transformationString}${path}`;
}

/**
 * Get a responsive Cloudinary image URL with automatic format
 * @param url - The Cloudinary image URL
 * @param width - Desired width
 * @param height - Desired height (optional)
 * @returns The optimized Cloudinary URL
 */
export function getResponsiveImage(url: string, width: number, height?: number): string {
	return getCloudinaryImage(url, {
		width,
		height,
		format: "auto",
		quality: 85,
		crop: height ? "fill" : "scale",
		gravity: "auto",
	});
}

/**
 * Get a thumbnail image from Cloudinary
 * @param url - The Cloudinary image URL
 * @param size - Thumbnail size (square)
 * @returns The thumbnail Cloudinary URL
 */
export function getThumbnail(url: string, size: number = 200): string {
	return getCloudinaryImage(url, {
		width: size,
		height: size,
		crop: "fill",
		gravity: "auto",
		quality: 80,
		format: "auto",
	});
}

/**
 * Check if a URL is a Cloudinary image
 * @param url - The URL to check
 * @returns True if it's a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
	return url.includes("res.cloudinary.com");
}

