"use client";

import {useState} from "react";
import type {SectionProps} from "@/types";
import {weddingShowcaseHeader, weddingShowcaseImages} from "@/data/wedding-showcase";
import OptimizedImage from "@/components/ui/optimized-image";

export default function WeddingShowcase({className}: SectionProps) {
	const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
	const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

	const handleImageError = (index: number, src: string) => {
		console.error(`Wedding showcase image ${index} failed to load:`, src);
		setImageErrors((prev) => ({...prev, [index]: true}));
	};

	const handleImageLoad = (src: string) => {
		setLoadedImages((prev) => new Set(prev).add(src));
	};

	return (
		<section
			id='showcase'
			className={`bg-background px-4 py-24 sm:px-6 lg:px-8 ${className || ""}`}
		>
			<div className='mx-auto container'>
				{/* Header Content */}
				<div className='text-center mb-16'>
					<h2 className='mb-8 text-4xl font-light tracking-wide text-foreground sm:text-5xl lg:text-6xl'>
						{weddingShowcaseHeader.title}
						<br />
						<span className='italic'>{weddingShowcaseHeader.subtitle}</span>
					</h2>

					<div className='mx-auto max-w-3xl  '>
						{weddingShowcaseHeader.paragraphs.map((p, i) => (
							<p
								className='text-xs font-light leading-relaxed text-foreground/60'
								key={i}
							>
								{p}
							</p>
						))}
					</div>
				</div>

				{/* Image Gallery Grid - Pinterest Style 3 Columns */}
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 max-w-6xl mx-auto'>
					{/* Left Column - Equal sized images, centered vertically */}
					<div className='flex flex-col justify-center gap-4 lg:gap-6'>
						{weddingShowcaseImages
							.filter((img) => img.col === "left")
							.map((img, i) => {
								const imageIndex = weddingShowcaseImages.findIndex((item) => item.src === img.src);
								const hasError = imageErrors[imageIndex];
								return (
									<div
										key={i}
										className='overflow-hidden h-64 lg:h-72 rounded-lg relative bg-background/10 group cursor-pointer'
									>
										{!hasError ? (
											<>
												<OptimizedImage
													src={img.src}
													alt={img.alt}
													fill
													className={`object-cover transition-all duration-500 group-hover:scale-110 ${
														loadedImages.has(img.src) ? 'opacity-100' : 'opacity-0'
													}`}
													sizes='(max-width: 1024px) 100vw, 33vw'
													loading={i === 0 ? 'eager' : 'lazy'}
													onError={() => handleImageError(imageIndex, img.src)}
													onLoad={() => handleImageLoad(img.src)}
												/>
												{!loadedImages.has(img.src) && (
													<div className='absolute inset-0 bg-background/20 animate-pulse' />
												)}
											</>
										) : (
											<div className='w-full h-full flex items-center justify-center bg-background/20 text-foreground/40 text-sm'>
												{img.alt}
											</div>
										)}
									</div>
								);
							})}
					</div>

					{/* Center Column - Longer/taller images */}
					<div className='flex flex-col gap-4 lg:gap-6'>
						{weddingShowcaseImages
							.filter((img) => img.col === "center")
							.map((img, i) => {
								const imageIndex = weddingShowcaseImages.findIndex((item) => item.src === img.src);
								const hasError = imageErrors[imageIndex];
								// Alternate between taller and very tall for Pinterest look
								const heightClass = i % 2 === 0 ? 'h-80 lg:h-96' : 'h-72 lg:h-[28rem]';
								return (
									<div
										key={i}
										className={`overflow-hidden ${heightClass} rounded-lg relative bg-background/10 group cursor-pointer`}
									>
										{!hasError ? (
											<>
												<OptimizedImage
													src={img.src}
													alt={img.alt}
													fill
													className={`object-cover transition-all duration-500 group-hover:scale-110 ${
														loadedImages.has(img.src) ? 'opacity-100' : 'opacity-0'
													}`}
													sizes='(max-width: 1024px) 100vw, 33vw'
													loading={i === 0 ? 'eager' : 'lazy'}
													onError={() => handleImageError(imageIndex, img.src)}
													onLoad={() => handleImageLoad(img.src)}
												/>
												{!loadedImages.has(img.src) && (
													<div className='absolute inset-0 bg-background/20 animate-pulse' />
												)}
											</>
										) : (
											<div className='w-full h-full flex items-center justify-center bg-background/20 text-foreground/40 text-sm'>
												{img.alt}
											</div>
										)}
									</div>
								);
							})}
					</div>

					{/* Right Column - Equal sized images, centered vertically */}
					<div className='flex flex-col justify-center gap-4 lg:gap-6'>
						{weddingShowcaseImages
							.filter((img) => img.col === "right")
							.map((img, i) => {
								const imageIndex = weddingShowcaseImages.findIndex((item) => item.src === img.src);
								const hasError = imageErrors[imageIndex];
								return (
									<div
										key={i}
										className='overflow-hidden h-64 lg:h-72 rounded-lg relative bg-background/10 group cursor-pointer'
									>
										{!hasError ? (
											<>
												<OptimizedImage
													src={img.src}
													alt={img.alt}
													fill
													className={`object-cover transition-all duration-500 group-hover:scale-110 ${
														loadedImages.has(img.src) ? 'opacity-100' : 'opacity-0'
													}`}
													sizes='(max-width: 1024px) 100vw, 33vw'
													loading={i === 0 ? 'eager' : 'lazy'}
													onError={() => handleImageError(imageIndex, img.src)}
													onLoad={() => handleImageLoad(img.src)}
												/>
												{!loadedImages.has(img.src) && (
													<div className='absolute inset-0 bg-background/20 animate-pulse' />
												)}
											</>
										) : (
											<div className='w-full h-full flex items-center justify-center bg-background/20 text-foreground/40 text-sm'>
												{img.alt}
											</div>
										)}
									</div>
								);
							})}
					</div>
				</div>

				{/* Call to Action */}
				<div className='mt-16 text-center'>
					<div className='inline-flex items-center space-x-4'>
						<div className='h-px w-12 bg-stone-300'></div>
						<a
							href='/portfolio'
							className='text-sm font-medium tracking-wider text-stone-600 transition-colors duration-200 hover:text-stone-900 uppercase cursor-pointer'
						>
							View Portfolio
						</a>
						<div className='h-px w-12 bg-stone-300'></div>
					</div>
				</div>
			</div>
		</section>
	);
}
