"use client";

import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

const faqs = [
	{
		question: "What types of photography services do you offer?",
		answer: "I offer a wide range of photography services including weddings, portraits, lifestyle, fashion, commercial, and editorial photography. I also specialize in travel and cultural photography, capturing authentic moments that tell unique stories for clients around the world.",
	},
	{
		question: "What's included in your wedding packages?",
		answer: "My wedding packages include 6-10 hours of coverage, professionally edited high-resolution images, online gallery & download access, and optional add-ons like a second photographer. Engagement sessions are available as an add-on starting at $350.",
	},
	{
		question: "Do you offer destination wedding photography?",
		answer: "Yes! I love traveling for destination weddings. I've photographed weddings across the country and internationally. Travel fees are typically included in my packages, and I'm happy to discuss specific destinations with custom packages available upon request.",
	},
	{
		question: "What's your approach to wedding photography?",
		answer: "My favorite type of photography to shoot is weddings—because they're full of emotion, culture, and once-in-a-lifetime moments. I love capturing the joy, love, and connection between couples and families with a candid, storytelling approach that ensures every emotion is captured naturally.",
	},
	{
		question: "How much do portrait sessions cost?",
		answer: "Portrait sessions start at $350 and include 1-2 hour sessions, up to 2 locations, 15+ fully edited images, and private gallery delivery. Professional headshots are available starting at $250 for a 30-minute session with 2-3 final retouched images.",
	},
	{
		question: "Do you offer fashion and commercial photography?",
		answer: "Yes! I offer half-day & full-day rates starting at $700 for fashion lookbooks, editorial shoots, product photography, and personal branding. This includes planning consultation and basic usage rights.",
	},
	{
		question: "What's your payment and booking process?",
		answer: "To secure your session, a 25% deposit is required upon booking. Flexible payment plans are available for select packages. I'm happy to work with you to create a payment schedule that fits your budget.",
	},
	{
		question: "Do you collaborate with other professionals?",
		answer: "Yes, I collaborate with professional videographers to ensure seamless coverage and storytelling. Working together allows us to capture every moment from multiple angles and deliver a more cohesive, cinematic experience for our clients.",
	},
];

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10'>
			<div className='mx-auto container'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<div className='inline-flex items-center gap-4 mb-6'>
						<div className='h-px w-12 bg-primary/20'></div>
						<span className='text-xs font-medium tracking-[0.3em] text-foreground/60 uppercase'>Common Questions</span>
						<div className='h-px w-12 bg-primary/20'></div>
					</div>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-light italic tracking-wide text-foreground mb-6'>Frequently Asked Questions</h2>
					<p className='text-lg text-foreground/70 max-w-2xl mx-auto'>
						Have a question that's not answered here? I'm always happy to chat and answer any questions you might have about my services.
					</p>
				</div>

				{/* FAQ Grid */}
				<div className='max-w-4xl mx-auto'>
					<div className='space-y-4'>
						{faqs.map((faq, index) => (
							<div
								key={index}
								className='bg-background border border-secondary/20 rounded-lg overflow-hidden'
							>
								<button
									onClick={() => toggleFAQ(index)}
									className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/5 transition-colors duration-200 cursor-pointer'
								>
									<h3 className='text-lg font-light text-foreground pr-4'>{faq.question}</h3>
									<div className='flex-shrink-0'>
										{openIndex === index ? (
											<ChevronUp className='h-5 w-5 text-primary' />
										) : (
											<ChevronDown className='h-5 w-5 text-primary' />
										)}
									</div>
								</button>

								{openIndex === index && (
									<div className='px-6 pb-4'>
										<div className='h-px w-full bg-secondary/20 mb-4'></div>
										<p className='text-foreground/70 leading-relaxed'>{faq.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className='text-center mt-16'>
					<div className='bg-background/80 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto border border-secondary/20'>
						<h3 className='text-xl font-light text-foreground mb-4'>Ready to Get Started?</h3>
						<p className='text-foreground/70 mb-6'>
							I'm here to help! Whether you want to discuss your vision, ask about packages, or just say hello, I'd love to hear from you.
						</p>
						<a
							href='/contact'
							className='inline-flex items-center justify-center bg-primary text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors duration-200 cursor-pointer'
						>
							Get In Touch
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
