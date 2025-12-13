import {Instagram, Facebook} from "lucide-react";
import type {SectionProps} from "@/types";
import {footerImages, footerNavItems} from "@/data/footer";
import Image from "next/image";
import {isCloudinaryUrl} from "@/lib/image-utils";

export default function Footer({className}: SectionProps) {
	return (
		<footer className={`bg-primary z-20 relative ${className || ""}`}>
			{/* Image Gallery Section */}
			<div className='px-4 pt-16 pb-12 sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-7xl'>
					<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6'>
						{footerImages.map((image) => (
							<div
								key={image.id}
								className='aspect-square overflow-hidden relative bg-background/10'
							>
								<Image
									src={image.src || "/placeholder.svg"}
									alt={image.alt}
									fill
									className='object-cover transition-transform duration-300 hover:scale-105'
									sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw'
									loading='lazy'
									quality={85}
									unoptimized={isCloudinaryUrl(image.src || "")}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Logo Section */}
			<div className='px-4 pb-8 sm:px-6 lg:px-8'>
				<div className='mx-auto container text-center'>
					<div className='mb-8'>
						{/* Logo Icon and Brand Name (from Navbar) */}
						<div className='mb-3 flex flex-col items-center justify-center'>
							<span
								className='text-[2.5rem] font-bold text-background leading-none tracking-tight'
								style={{fontFamily: "Playfair Display, serif"}}
							>
								RP
							</span>
							<span
								className='text-background/80 text-lg tracking-[0.3em] font-light mt-1'
								style={{fontFamily: "Playfair Display, serif"}}
							>
								ROD16 PHOTOGRAPHY
							</span>
						</div>
					</div>
					{/* Separator Line */}
					<div className='mx-auto mb-8 h-px w-full max-w-4xl bg-white/30'></div>
				</div>
			</div>

			{/* Navigation Section */}
			<div className='px-4 pb-8 sm:px-6 lg:px-8'>
				<div className='mx-auto container'>
					<nav className='flex flex-wrap justify-center gap-8 sm:gap-12'>
						{footerNavItems.map((item, index) => (
							<div
								key={item.name}
								className='flex items-center'
							>
								<a
									href={item.href}
									className='text-sm font-medium tracking-wider text-white/90 transition-colors duration-200 hover:text-white'
								>
									{item.name}
								</a>
								{index < footerNavItems.length - 1 && <div className='ml-8 hidden h-4 w-px bg-white/30 sm:ml-12 sm:block'></div>}
							</div>
						))}
					</nav>
				</div>
			</div>

			{/* Contact Information */}
			<div className='px-4 pb-8 sm:px-6 lg:px-8'>
				<div className='mx-auto container'>
					<div className='flex flex-wrap items-center justify-center gap-4 text-sm text-white/80 sm:gap-8'>
						<span>Serving Virginia, Maryland & Worldwide</span>
						<div className='hidden h-4 w-px bg-background sm:block'></div>
						<a
							href='mailto:rod16zedo@gmail.com'
							className='transition-colors duration-200 hover:text-white'
						>
							rod16zedo@gmail.com
						</a>
						<div className='hidden h-4 w-px bg-background sm:block'></div>
						<a
							href='tel:+15714732196'
							className='transition-colors duration-200 hover:text-white'
						>
							+1 (571) 473-2196
						</a>
						<div className='hidden h-4 w-px bg-background sm:block'></div>
						<a
							href='tel:+17038988943'
							className='transition-colors duration-200 hover:text-white'
						>
							(703) 898-8943
						</a>
						{/* Social Media Icons */}
						<div className='flex items-center gap-4 ml-4'>
							<div className='h-4 w-px bg-background'></div>
							<a
								href='https://www.instagram.com/rod16photograpy?igsh=MXU4N2JmdTlqaGVoZg%3D%3D&utm_source=qr'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white/80 transition-colors duration-200 hover:text-white'
								aria-label='Follow on Instagram'
							>
								<Instagram className='h-4 w-4' />
							</a>
							<a
								href='https://www.facebook.com/ethiorodphotography/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white/80 transition-colors duration-200 hover:text-white'
								aria-label='Follow on Facebook'
							>
								<Facebook className='h-4 w-4' />
							</a>
							<a
								href='https://www.tiktok.com/@ethio16zedo?_t=ZM-8x9dHQdAdNu&_r=1'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white/80 transition-colors duration-200 hover:text-white'
								aria-label='Follow on TikTok'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									className='h-4 w-4'
								>
									<path
										d='M16.5 3v10.38a4.13 4.13 0 1 1-4.13-4.13c.23 0 .46.02.68.07V7.13a6.13 6.13 0 1 0 6.13 6.13V3h-2.68Z'
										fill='currentColor'
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className='border-t border-white/20 px-4 py-6 sm:px-6 lg:px-8'>
				<div className='mx-auto container text-center'>
					<p className='text-xs text-background/60 tracking-wider'>© 2024 ROD16 PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
				</div>
			</div>
		</footer>
	);
}
