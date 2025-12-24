import {Suspense} from "react";
import type {Metadata} from "next";
import OptimizedImage from "@/components/ui/optimized-image";
import PortfolioClient from "./portfolio-client";
import {weeding} from "@/constants";

// Hero image from portfolio
const portfolioHeroImage = weeding[0];

// SEO Metadata
export const metadata: Metadata = {
	title: "Portfolio | Rod16 Photography - Wedding, Portrait & Event Photography",
	description: "Explore our stunning portfolio of wedding photography, portrait sessions, maternity shoots, baby showers, events, and landscape photography. Capturing beautiful moments and emotions through professional photography in Northern VA and worldwide.",
	keywords: [
		"wedding photography portfolio",
		"portrait photography",
		"maternity photography",
		"baby shower photography",
		"event photography",
		"landscape photography",
		"Northern VA photographer",
		"DMV photographer",
		"professional photography",
		"Rod16 Photography",
	],
	openGraph: {
		title: "Portfolio | Rod16 Photography",
		description: "A collection of moments, emotions, and stories captured through my lens. Explore wedding, portrait, maternity, and event photography.",
		type: "website",
		url: "https://rod16.vercel.app/portfolio",
		images: [
			{
				url: portfolioHeroImage,
				width: 1200,
				height: 630,
				alt: "Rod16 Photography Portfolio",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Portfolio | Rod16 Photography",
		description: "A collection of moments, emotions, and stories captured through my lens.",
		images: [portfolioHeroImage],
	},
	alternates: {
		canonical: "https://rod16.vercel.app/portfolio",
	},
};

// Structured Data (JSON-LD) for SEO
const portfolioStructuredData = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Portfolio - Rod16 Photography",
	description: "A collection of professional photography work including weddings, portraits, maternity, baby showers, events, and landscapes",
	url: "https://rod16.vercel.app/portfolio",
	image: portfolioHeroImage,
	mainEntity: {
		"@type": "ItemList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Wedding Photography",
				url: "https://rod16.vercel.app/portfolio?category=wedding",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Baby Shower Photography",
				url: "https://rod16.vercel.app/portfolio?category=baby-shower",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: "Portrait Photography",
				url: "https://rod16.vercel.app/portfolio?category=portrait",
			},
			{
				"@type": "ListItem",
				position: 4,
				name: "Maternity Photography",
				url: "https://rod16.vercel.app/portfolio?category=maternity",
			},
			{
				"@type": "ListItem",
				position: 5,
				name: "Event Photography",
				url: "https://rod16.vercel.app/portfolio?category=event",
			},
			{
				"@type": "ListItem",
				position: 6,
				name: "Landscape Photography",
				url: "https://rod16.vercel.app/portfolio?category=landscape",
			},
		],
	},
};

export default function PortfolioPage() {
	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(portfolioStructuredData)}}
			/>

			<main className='min-h-screen bg-background'>
				{/* Hero Section (static, prerendered) */}
				<section className='relative h-[85vh] flex items-center justify-center' aria-label='Portfolio hero section'>
					<OptimizedImage
						src={portfolioHeroImage}
						alt='Rod16 Photography Portfolio - Professional wedding, portrait, and event photography showcasing beautiful moments and emotions'
						fill
						priority
						sizes='100vw'
						quality={90}
					/>
				<div className='absolute inset-0 bg-black/50' />
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

					<div className='container mx-auto px-4'>
						<div className='relative z-10 max-w-4xl mx-auto text-center'>
							<div className='inline-flex items-center gap-4 mb-6' aria-hidden='true'>
								<div className='h-px w-12 bg-background/20'></div>
								<span className='text-xs font-medium tracking-[0.3em] text-background/60 uppercase'>My Work</span>
								<div className='h-px w-12 bg-background/20'></div>
							</div>
							<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic tracking-wide mb-6 text-white'>
								Portfolio
							</h1>
							<p className='text-background/80 text-sm md:text-base font-light max-w-xl mx-auto'>
								A collection of moments, emotions, and stories captured through my lens
							</p>
						</div>
					</div>
				</section>

				{/* Dynamic part wrapped in Suspense */}
				<Suspense fallback={<div className='py-20 text-center text-foreground/60' aria-label='Loading portfolio'>Loading portfolio...</div>}>
					<PortfolioClient />
				</Suspense>
			</main>
		</>
	);
}
