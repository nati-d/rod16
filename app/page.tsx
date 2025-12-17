"use client";
import HeroSection from "@/components/hero";
import {useScroll} from "@/hooks/use-scroll";
import WeddingShowcase from "@/components/weeding-showcase";
import Footer from "@/components/footer";
import Testimonials from "@/components/testimonials";
import AboutSection from "@/components/about";

export default function Home() {
	const {heroOpacity, heroScale, contentTranslateY} = useScroll();
	return (
		<div>
			<HeroSection
				opacity={heroOpacity}
				scale={heroScale}
			/>
			<div className='h-screen' />

			{/* Scrolling Content */}
			<div
				className='relative z-20 bg-background transition-transform duration-300 ease-out'
				style={{
					transform: contentTranslateY > 0 ? `translateY(${contentTranslateY}px)` : 'translateY(0)',
					willChange: contentTranslateY > 0 ? 'transform' : 'auto',
				}}
			>
				<WeddingShowcase />
				<AboutSection />
				<Testimonials />
			</div>
		</div>
	);
}
