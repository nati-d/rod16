import Image, {type ImageProps} from "next/image";
import {isCloudinaryUrl} from "@/lib/image-utils";
import {cn} from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "className"> {
	className?: string;
	objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * OptimizedImage - A wrapper around Next.js Image component with sensible defaults
 * 
 * Features:
 * - Automatically uses object-cover by default (can be overridden via className or objectFit prop)
 * - Cloudinary images use unoptimized mode (already optimized by Cloudinary CDN)
 * - Non-Cloudinary images are optimized and cached by Next.js
 * - Browser and CDN caching handle image persistence
 * - Provides sensible defaults for sizes, quality, and loading
 * - Accepts all standard Next.js Image props
 * 
 * @example
 * <OptimizedImage
 *   src="/image.jpg"
 *   alt="Description"
 *   fill
 *   className="rounded-lg"
 * />
 */
export default function OptimizedImage({
	className,
	objectFit = "cover",
	sizes,
	quality = 85,
	loading,
	priority = false,
	unoptimized,
	...props
}: OptimizedImageProps) {
	const src = typeof props.src === "string" ? props.src : "";
	const isCloudinary = isCloudinaryUrl(src);
	
	// Determine object-fit class
	const objectFitClass = objectFit === "cover" ? "object-cover" : 
	                      objectFit === "contain" ? "object-contain" :
	                      objectFit === "fill" ? "object-fill" :
	                      objectFit === "none" ? "object-none" :
	                      objectFit === "scale-down" ? "object-scale-down" : "object-cover";
	
	// Merge className with object-fit
	const mergedClassName = cn(
		objectFitClass,
		className
	);
	
	// Default sizes if not provided
	const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
	
	// Determine loading strategy
	const loadingStrategy = loading || (priority ? undefined : "lazy");
	
	// Cloudinary images are already optimized, so we skip Next.js optimization to avoid timeouts
	// Cloudinary CDN handles optimization, caching, and delivery efficiently
	// For non-Cloudinary images, Next.js will optimize and cache them
	const shouldOptimize = unoptimized !== undefined ? !unoptimized : !isCloudinary;
	
	return (
		<Image
			{...props}
			className={mergedClassName}
			sizes={defaultSizes}
			quality={quality}
			loading={loadingStrategy}
			priority={priority}
			unoptimized={!shouldOptimize}
		/>
	);
}

