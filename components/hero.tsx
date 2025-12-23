"use client";

import {imageSlides} from "@/data/carousel-slides";
import {useCarousel} from "@/hooks/use-carousel";
import OptimizedImage from "@/components/ui/optimized-image";

interface HeroSectionProps {
	opacity: number;
	scale: number;
}

export default function HeroSection({opacity, scale}: HeroSectionProps) {
	const {currentSlide, nextSlide, prevSlide, goToSlide, pauseCarousel, playCarousel, totalSlides} = useCarousel({slides: imageSlides});

	const currentSlideData = imageSlides[currentSlide];

	return (
		<div className='fixed inset-0 z-10'>
			<div
				className='relative h-full w-full bg-black/80 flex items-center justify-center'
				style={{
					opacity,
					transform: `scale(${scale})`,
					transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
					willChange: "transform, opacity",
				}}
				onMouseEnter={pauseCarousel}
				onMouseLeave={playCarousel}
			>
				<OptimizedImage
					src={currentSlideData.url}
					alt={currentSlideData.alt}
					fill
					priority
					
				/>
				{/* Overlay */}
				<div className='absolute inset-0 bg-black/40' />
				{/* Prev Arrow */}
				<button
					className='absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-200 focus:outline-none'
					onClick={prevSlide}
					aria-label='Previous slide'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-10 w-10'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
				</button>
				{/* Next Arrow */}
				<button
					className='absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-200 focus:outline-none'
					onClick={nextSlide}
					aria-label='Next slide'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-10 w-10'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5l7 7-7 7'
						/>
					</svg>
				</button>
				{/* Carousel Controls */}
				<div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20'>
					{imageSlides.map((_, idx) => (
						<button
							key={idx}
							className={`h-2 w-6 rounded-full transition-all duration-300 ${
								idx === currentSlide ? "bg-primary/90 scale-110" : "bg-primary/40 hover:bg-primary/70"
							}`}
							onClick={() => goToSlide(idx)}
							aria-label={`Go to slide ${idx + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
