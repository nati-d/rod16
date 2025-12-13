import Image from "next/image";
import {weeding} from "@/constants";
import {isCloudinaryUrl} from "@/lib/image-utils";

// Selected permanent image for services hero
const servicesHeroImage = weeding[10];

export default function ServicesHero() {
	return (
		<section className='relative h-[70vh] md:h-[80vh] lg:h-[90vh] w-full overflow-hidden'>
			{/* Background Image */}
			<div className='absolute inset-0'>
				<Image
					src={servicesHeroImage}
					alt='Wedding photography services'
					fill
					className='object-cover'
					priority
					unoptimized={isCloudinaryUrl(servicesHeroImage)}
				/>
				{/* Overlay */}
				<div className='absolute inset-0 bg-black/40' />
			</div>

			{/* Content */}
			<div className='relative z-10 h-full flex items-center justify-center'>
				<div className='text-center text-white px-4 sm:px-6 max-w-4xl mx-auto'>
					{/* Header */}
					<div className='inline-flex items-center gap-4 mb-6'>
						<div className='h-px w-12 bg-white/30'></div>
						<span className='text-xs font-medium tracking-[0.3em] uppercase'>My Services</span>
						<div className='h-px w-12 bg-white/30'></div>
					</div>

					{/* Main Title */}
					<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic tracking-wide mb-6'>Capturing Your Perfect Day</h1>

					{/* CTA Button */}
					<div className='mt-12'>
						<a
							href='#pricing'
							className='inline-flex items-center gap-2 bg-transparent border-primary border-2 text-background px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-colors duration-200'
						>
							View Packages
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
