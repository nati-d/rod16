"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "className"> {
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function OptimizedImage({
  className,
  objectFit = "cover",
  sizes,
  quality = 85,
  loading,
  priority = false,
  onLoad,
  fill,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const src = typeof props.src === "string" ? props.src : "";

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  // Object-fit class
  const objectFitClass =
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "contain"
      ? "object-contain"
      : objectFit === "fill"
      ? "object-fill"
      : objectFit === "none"
      ? "object-none"
      : objectFit === "scale-down"
      ? "object-scale-down"
      : "object-cover";

  const mergedClassName = cn(objectFitClass, className);

  // Default sizes
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

  // Loading strategy
  const loadingStrategy = loading || (priority ? "eager" : "lazy");

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  // When using fill prop, skeleton should be in the same positioned container (parent must be relative)
  if (fill) {
    return (
      <>
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-background/20 animate-pulse z-0" />
        )}
        <Image
          {...props}
          fill={fill}
          src={src}
          className={cn(mergedClassName, isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300")}
          sizes={defaultSizes}
          quality={quality}
          loading={loadingStrategy}
          priority={priority}
          onLoad={handleLoad}
          // Uses Next.js optimization (no unoptimized)
        />
      </>
    );
  }

  // When not using fill, wrap in a container
  return (
    <div className="relative w-full h-full">
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/20 animate-pulse rounded-lg" />
      )}
      <Image
        {...props}
        src={src}
        className={cn(mergedClassName, isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300", "relative z-10")}
        sizes={defaultSizes}
        quality={quality}
        loading={loadingStrategy}
        priority={priority}
        onLoad={handleLoad}
        // Uses Next.js optimization (no unoptimized)
      />
    </div>
  );
}