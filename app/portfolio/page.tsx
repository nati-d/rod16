import {Suspense} from "react";
import OptimizedImage from "@/components/ui/optimized-image";
import PortfolioClient from "./portfolio-client";
import {weeding} from "@/constants";

// Hero image from portfolio
const portfolioHeroImage = weeding[0];

export default function PortfolioPage() {
	return (
		<main className='min-h-screen bg-background'>
			{/* Hero Section (static, prerendered) */}
			<section className='relative h-[85vh] flex items-center justify-center'>
				<OptimizedImage
					src={portfolioHeroImage}
					alt='Portfolio Hero'
					fill
					priority
					sizes='100vw'
					quality={90}
				/>
				<div className='absolute inset-0 bg-black/50' />
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

				<div className='container mx-auto px-4'>
					<div className='relative z-10 max-w-4xl mx-auto text-center'>
						<div className='inline-flex items-center gap-4 mb-6'>
							<div className='h-px w-12 bg-background/20'></div>
							<span className='text-xs font-medium tracking-[0.3em] text-background/60 uppercase'>My Work</span>
							<div className='h-px w-12 bg-background/20'></div>
						</div>
						<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic tracking-wide mb-6 text-white'>Portfolio</h1>
						<p className='text-background/80 text-sm md:text-base font-light max-w-xl mx-auto'>
							A collection of moments, emotions, and stories captured through my lens
						</p>
					</div>
				</div>
			</section>

			{/* Dynamic part wrapped in Suspense */}
			<Suspense fallback={<div className='py-20 text-center text-foreground/60'>Loading portfolio...</div>}>
				<PortfolioClient />
			</Suspense>
		</main>
	);
}
