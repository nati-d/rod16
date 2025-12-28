"use client";

import {type ReactNode} from "react";
import {cn} from "@/lib/utils";

interface MasonryGridProps {
	children: ReactNode[];
	className?: string;
	gap?: "sm" | "md" | "lg";
	itemClassName?: string;
}

/**
 * Lightweight Masonry Grid Component (Pinterest-style)
 * 
 * Uses CSS columns for a pure CSS masonry layout that preserves natural image heights
 * - 4 columns on desktop (lg and up)
 * - 2 columns on mobile (sm and up)
 * - 1 column on very small screens
 * 
 * Images maintain their natural aspect ratios and heights (no normalization).
 * Items flow naturally in columns, distributing evenly based on their actual height.
 * 
 * This is the lightest possible implementation with no JavaScript overhead.
 * 
 * @example
 * <MasonryGrid gap="md">
 *   {images.map((image, index) => (
 *     <div key={index} className="w-full">
 *       <OptimizedImage
 *         src={image.src}
 *         alt={image.alt}
 *         width={image.width}
 *         height={image.height}
 *         className="w-full h-auto rounded-lg"
 *       />
 *     </div>
 *   ))}
 * </MasonryGrid>
 */
export default function MasonryGrid({
	children,
	className,
	gap = "md",
	itemClassName,
}: MasonryGridProps) {
	const gapValues = {
		sm: {column: "0.5rem", row: "0.5rem"}, // gap-2
		md: {column: "1rem", row: "1rem"}, // gap-4
		lg: {column: "1.5rem", row: "1.5rem"}, // gap-6
	};

	const selectedGap = gapValues[gap];

	return (
		<div
			className={cn("columns-2 md:columns-3 lg:columns-4", className)}
			style={{
				columnGap: selectedGap.column,
			}}
		>
			{children.map((child, index) => (
				<div
					key={index}
					className={cn("break-inside-avoid w-full", itemClassName)}
					style={{
						marginBottom: selectedGap.row,
					}}
				>
					{child}
				</div>
			))}
		</div>
	);
}

