"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTestimonials} from "@/hooks/use-testimonials";
import {testimonials} from "@/data/testimonials";
import type {SectionProps} from "@/types";
import OptimizedImage from "@/components/ui/optimized-image";

export default function Testimonials({className}: SectionProps) {
	const {currentTestimonial, nextTestimonial, prevTestimonial, pauseCarousel, playCarousel} = useTestimonials({
		testimonials,
	});

	const currentData = testimonials[currentTestimonial];

	return (
		<section
			id='testimonials'
			className={`bg-secondary px-4 py-24 sm:px-6 lg:px-8 ${className || ""}`}
			onMouseEnter={pauseCarousel}
			onMouseLeave={playCarousel}
		>
			<div className='mx-auto container'>
				<div className='lg:flex lg:gap-24 items-stretch'>
					{/* Left Column - Image */}
					<div className='relative flex-1 flex flex-col items-center'>
						<div className='overflow-hidden rounded-sm h-80 w-full relative'>
							<OptimizedImage
								key={`testimonial-${currentTestimonial}`}
								src={currentData.image || "/placeholder.svg"}
								alt={`Wedding photo of ${currentData.clientNames}`}
								fill
								className='transition-opacity duration-500'
								sizes='(max-width: 1024px) 100vw, 50vw'
								priority={currentTestimonial === 0}
							/>
						</div>
						{/* Navigation Arrows */}
						<div className='mt-8 flex justify-center gap-4'>
							<Button
								variant='outline'
								size='sm'
								onClick={prevTestimonial}
								className='border-primary bg-primary text-background hover:bg-primary/80 hover:border-primary/80 px-6'
								aria-label='Previous testimonial'
							>
								<ChevronLeft className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								size='sm'
								onClick={nextTestimonial}
								className='border-primary bg-primary text-background hover:bg-primary/80 hover:border-primary/80 px-6'
								aria-label='Next testimonial'
							>
								<ChevronRight className='h-4 w-4' />
							</Button>
						</div>
					</div>

					{/* Right Column - Testimonial */}
					<div className='flex-1 lg:pl-8 flex flex-col justify-center min-h-[20rem]'>
						{/* Quote Mark */}
						<div className='mb-8'>
							<svg
								className='h-12 w-12 text-foreground/60'
								fill='currentColor'
								viewBox='0 0 32 32'
								aria-hidden='true'
							>
								<path d='M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z' />
							</svg>
						</div>

						{/* Client Names */}
						<h3
							key={`names-${currentTestimonial}`}
							className='mb-2 text-2xl font-light tracking-wider text-foreground animate-fade-in'
						>
							{currentData.clientNames}
						</h3>

						{/* Location */}
						<p className='mb-6 text-sm font-medium tracking-wider text-foreground/60 uppercase'>
							{currentData.location}
						</p>

						{/* Separator Line */}
						<div className='mb-8 h-px w-16 bg-foreground/60'></div>

						{/* Testimonial Text */}
						<blockquote
							key={`quote-${currentTestimonial}`}
							className='text-base leading-relaxed text-stone-600 animate-fade-in-delay'
						>
							{currentData.testimonial}
						</blockquote>
					</div>
				</div>

				{/* Dots Indicator */}
				<div className='mt-16 flex justify-center gap-2'>
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => {}}
							className={`h-2 w-2 rounded-full transition-all duration-300 ${
								index === currentTestimonial ? "bg-foreground/60 w-8" : "bg-foreground/30"
							}`}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
