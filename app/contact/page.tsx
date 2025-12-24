"use client";

import type {Metadata} from "next";
import ContactForm from "@/components/contact-form";
import OptimizedImage from "@/components/ui/optimized-image";
import { home } from "@/constants/index.home";
import { motion } from "framer-motion";

// Note: Metadata for client components should be in a layout.tsx file
// Creating a layout for contact page

export default function ContactPage() {
	const contactImages = [home[5], home[23]]; // Your chosen images (e.g., home-6 and home-24)

	return (
		<div className="min-h-screen bg-background/50">
			<div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="space-y-12"
				>
					

					{/* Grid Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-[2fr_4fr] gap-8 lg:gap-12 items-stretch">
						{/* Left Column: Decorative Images — Hidden on mobile/tablet */}
						<div className="hidden lg:grid h-full grid-rows-2 gap-8">
							<div className="relative w-full h-full aspect-square overflow-hidden rounded-2xl bg-background/20">
								<OptimizedImage
									src={contactImages[0]}
									alt="Portrait sample"
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-black/40" />
							</div>
							<div className="relative w-full h-full aspect-square overflow-hidden rounded-2xl bg-background/20">
								<OptimizedImage
									src={contactImages[1]}
									alt="Wedding moment"
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-black/40" />
							</div>
						</div>

						{/* Right Column: Contact Form — Full width on mobile */}
						<div className="h-full flex items-center justify-center">
							<div className="w-full max-w-xl">
								<ContactForm />
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}