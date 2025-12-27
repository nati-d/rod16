"use client";
import {Heart, Camera, Award, Lightbulb, Star, Quote} from "lucide-react";
import type {SectionProps} from "@/types";
import OptimizedImage from "@/components/ui/optimized-image";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {weeding, portrait, maternity, landscape, events} from "@/constants";

const storyHighlights = [
	{
		number: "01",
		title: "THE BEGINNING",
		content:
			"I discovered my passion for photography by capturing special moments in my community. What started as a creative gift quickly became a meaningful calling, turning artistic vision into a professional journey of preserving life's most precious moments.",
		image: "/the-beginning.jpg", // The Beginning image
	},
	{
		number: "02",
		title: "THE REWARD",
		content:
			"The most fulfilling part of my photography career is witnessing the pure joy on my clients' faces when they see their photos for the first time—knowing I've helped preserve moments they'll treasure for a lifetime.",
		image: "/the-reward.jpg", // The Reward image
	},
	{
		number: "03",
		title: "MY STYLE",
		content:
			"My photography style is clean, emotional, and storytelling-focused. Over the years, it has evolved to become more refined and intentional, blending natural light with artistic composition to capture timeless, authentic moments.",
		image: "/my-style-img.jpg", // My Style image
	},
	{
		number: "04",
		title: "THE EXPERIENCE",
		content:
			"With over 10 years of hands-on experience, I bring a strong eye for detail and expert skills in lighting, editing, and composition. My ability to connect with clients and capture genuine emotions sets my work apart.",
		image: "/the-experience.jpg", // The Experience image
	},
	{
		number: "05",
		title: "MY VALUES",
		content:
			"Storytelling and connection are at the heart of everything I do. I'm passionate about capturing real emotions and meaningful moments that reflect each couple's unique story. Trust, creativity, and respect guide every session.",
		image: events[2], // Event image
	},
];

const philosophyPoints = [
	"Every couple has a unique love story that deserves to be told beautifully",
	"Authentic moments happen when people feel comfortable and natural",
	"The best photographs blend artistic vision with genuine emotion",
	"Wedding photography is about preserving legacy, not just taking pictures",
];

interface PhilosophySlide {
	id: number;
	backgroundImage: string;
	header: string;
	title: string;
	buttonText: string;
}

const philosophySlides: PhilosophySlide[] = [
	{
		id: 1,
		backgroundImage: "/cta-1.jpg", // CTA image
		header: "A FEW THINGS I BELIEVE:",
		title: "Faith and love are sacred bonds that deserve to be captured with reverence and beauty.",
		buttonText: "View Next",
	},
	{
		id: 2,
		backgroundImage: "/cta-2.jpg", // CTA image
		header: "A FEW THINGS I BELIEVE:",
		title: "Authentic moments happen when people feel comfortable and natural.",
		buttonText: "View Next",
	},
	{
		id: 3,
		backgroundImage: "/cta-3.jpg", // CTA image
		header: "A FEW THINGS I BELIEVE:",
		title: "The best photographs blend artistic vision with genuine emotion.",
		buttonText: "View Next",
	},
];

export default function AboutQA({className}: SectionProps) {
	return (
		<section className={`bg-background px-4 py-20 sm:px-6 lg:px-8 ${className || ""}`}>
			<div className='mx-auto '>
				{/* Section Header */}
				<div className='text-center mb-20 container'>
					<div className='inline-flex items-center gap-4 mb-6'>
						<div className='h-px w-12 bg-primary/20'></div>
						<span className='text-xs font-medium tracking-[0.3em] text-foreground/60 uppercase'>My Story</span>
						<div className='h-px w-12 bg-primary/20'></div>
					</div>
					<h2 className='text-4xl sm:text-5xl lg:text-6xl font-light italic tracking-wide text-foreground mb-4'>Capturing Love, Light, & Legacy</h2>
					<p className='text-sm text-foreground/60 max-w-2xl mx-auto italic'>
						Every frame carefully composed. Every moment deeply felt. Every story beautifully preserved.
					</p>
				</div>

				{/* Story Highlights */}
				<div className='mb-20 max-w-4xl mx-auto'>
					<div className='space-y-16'>
						{storyHighlights.map((item, index) => {
							const isEven = index % 2 === 0;

							return (
								<div
									key={index}
									className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
								>
									{/* Image Section */}
									<div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
										<div className='aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg relative'>
											<OptimizedImage
												src={item.image}
												alt={`Photography representing ${item.title.toLowerCase()}`}
												fill
												sizes='(max-width: 1024px) 100vw, 50vw'
												loading={index < 2 ? 'eager' : 'lazy'}
												onError={(e) => {
													console.error('Image failed to load:', item.image);
												}}
											/>
										</div>
									</div>

									{/* Content Section */}
									<div className={`space-y-6 ${isEven ? "lg:order-2 text-left" : "lg:order-1 text-right"}`}>
										{/* Number */}
										<div className='text-4xl italic md:text-5xl font-light text-primary leading-none'>{item.number}</div>

										{/* Heading */}
										<h3 className='text-2xl md:text-3xl font-light text-foreground tracking-wide'>{item.title}</h3>

										{/* Description */}
										<p className='text-foreground/70 leading-relaxed text-lg max-w-md'>{item.content}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Philosophy Carousel Section */}
				<div className='mb-20 w-full'>
					<PhilosophyCarousel />
				</div>

				{/* Philosophy Section */}
				{/* <div className='bg-secondary/20 rounded-lg p-12 lg:p-16 mb-20'>
					<div className='text-center mb-12'>
						<Quote className='h-8 w-8 text-primary mb-4 mx-auto' />
						<h3 className='text-3xl font-light tracking-wide text-foreground mb-6'>My Photography Philosophy</h3>
						<div className='h-px w-24 bg-primary/20 mx-auto'></div>
					</div>

					<div className='grid lg:grid-cols-2 gap-16 items-start'>
						<div className='space-y-8'>
							<div>
								<h4 className='text-2xl font-light text-foreground mb-6 tracking-wide'>What I Believe</h4>
								<div className='h-px w-12 bg-primary/30 mb-6'></div>
							</div>
							<ul className='space-y-6'>
								{philosophyPoints.map((point, index) => (
									<li
										key={index}
										className='flex items-start gap-4'
									>
										<div className='w-2 h-2 rounded-full bg-primary/40 mt-3 flex-shrink-0'></div>
										<p className='text-foreground/70 leading-relaxed text-base'>{point}</p>
									</li>
								))}
							</ul>
						</div>

						<div className='bg-background/80 backdrop-blur-sm rounded-lg p-8 border border-secondary/20'>
							<blockquote className='text-lg font-light italic text-foreground/70 leading-relaxed mb-6'>
								"Photography is not just about capturing images—it's about preserving emotions, moments, and stories that will be cherished for
								generations to come."
							</blockquote>
							<cite className='text-sm font-medium tracking-wider text-foreground/60 uppercase'>— Villa Li</cite>

							<div className='mt-8 pt-8 border-t border-secondary/20'>
								<div className='grid grid-cols-2 gap-6 text-center'>
									<div>
										<div className='text-2xl font-light text-foreground mb-1'>500+</div>
										<div className='text-sm text-foreground/60'>Love Stories</div>
									</div>
									<div>
										<div className='text-2xl font-light text-foreground mb-1'>10+</div>
										<div className='text-sm text-foreground/60'>Years Experience</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}

				{/* Call to Action */}
				<div className='text-center'>
					<div className='inline-block bg-transparent backdrop-blur-sm rounded-lg p-8  '>
						<p className='text-lg font-light text-foreground/70 mb-6 leading-relaxed'>
							Ready to tell your love story? Let's create something beautiful together.
						</p>
						<div className='inline-flex items-center gap-4'>
							<div className='h-px w-12 bg-primary/20'></div>
							<a
								href='/contact'
								className='text-sm font-medium tracking-wider text-foreground/60 transition-colors duration-200 hover:text-foreground uppercase'
							>
								Start Your Journey
							</a>
							<div className='h-px w-12 bg-primary/20'></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function PhilosophyCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % philosophySlides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + philosophySlides.length) % philosophySlides.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	return (
		<section className='relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden'>
			{/* Background Image */}
			<div className='absolute inset-0'>
				<OptimizedImage
					key={currentSlide}
					src={philosophySlides[currentSlide].backgroundImage || "/placeholder.svg"}
					alt='Wedding photography background'
					fill
					className='transition-opacity duration-500'
					priority={currentSlide === 0}
					sizes='100vw'
					quality={90}
					onError={(e) => {
						console.error('Carousel image failed to load:', philosophySlides[currentSlide].backgroundImage);
					}}
				/>
			</div>

			{/* Content Card - Responsive positioning */}
			<div className='relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:justify-end md:pr-8 lg:pr-16 xl:pr-24'>
				<div className='bg-background p-6 sm:p-8 md:p-12 lg:p-16 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl shadow-lg'>
					{/* Header */}
					<p className='text-xs sm:text-sm text-foreground/60 tracking-[0.2em] uppercase mb-4 sm:mb-6 md:mb-8 font-light'>
						{philosophySlides[currentSlide].header}
					</p>

					{/* Main Title */}
					<h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed mb-6 sm:mb-8 md:mb-12'>
						{philosophySlides[currentSlide].title}
					</h2>

					{/* Action Button */}
					<div className='flex justify-end'>
						<Button
							variant='outline'
							className='border-primary text-foreground hover:opacity-80 px-4 sm:px-6 py-2 text-xs sm:text-sm font-light tracking-wide'
							onClick={nextSlide}
						>
							{philosophySlides[currentSlide].buttonText}
						</Button>
					</div>
				</div>
			</div>

			{/* Navigation Controls - Responsive positioning */}
			<div className='absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20'>
				<Button
					variant='ghost'
					size='icon'
					onClick={prevSlide}
					className='bg-background/90 hover:bg-background text-foreground rounded-full shadow-lg w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
				>
					<ChevronLeft className='h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5' />
				</Button>
			</div>

			<div className='absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20'>
				<Button
					variant='ghost'
					size='icon'
					onClick={nextSlide}
					className='bg-background/90 hover:bg-background text-foreground rounded-full shadow-lg w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
				>
					<ChevronRight className='h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5' />
				</Button>
			</div>

			{/* Slide Indicators - Responsive positioning */}
			<div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
				<div className='flex space-x-2 sm:space-x-3'>
					{philosophySlides.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
								index === currentSlide ? "bg-background" : "bg-background/50 hover:bg-background/75"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Slide Counter - Responsive positioning */}
			<div className='absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-20'>
				<div className='bg-background/90 px-2 sm:px-3 py-1 text-xs text-foreground font-light tracking-wide'>
					{String(currentSlide + 1).padStart(2, "0")} / {String(philosophySlides.length).padStart(2, "0")}
				</div>
			</div>
		</section>
	);
}
