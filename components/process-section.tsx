"use client";

import {MessageCircle, Calendar, Camera, Heart, Download, FileCheck, Phone} from "lucide-react";

const processSteps = [
	{
		icon: MessageCircle,
		title: "Inquiry",
		description: "Client reaches out via website, email, or phone to start the conversation about their photography needs.",
	},
	{
		icon: Phone,
		title: "Consultation",
		description: "We discuss your vision, availability, and service details in depth to ensure we're a perfect match.",
	},
	{
		icon: FileCheck,
		title: "Proposal & Quote",
		description: "I send a custom package and pricing information tailored to your specific needs and preferences.",
	},
	{
		icon: Calendar,
		title: "Contract & Deposit",
		description: "Client signs the agreement and pays a retainer to secure their date in my calendar.",
	},
	{
		icon: Heart,
		title: "Final Planning",
		description: "We confirm all the important details including schedule, locations, and specific expectations.",
	},
	{
		icon: Camera,
		title: "Shoot Day",
		description: "I arrive fully prepared and ready to capture your special moments with professional equipment and expertise.",
	},
	{
		icon: Download,
		title: "Delivery",
		description: "Your beautifully edited photos are delivered within the agreed timeline through a professional online gallery.",
	},
];

export default function ProcessSection() {
	return (
		<section className='py-20 px-4 sm:px-6 lg:px-8'>
			<div className='mx-auto container'>
				{/* Section Header */}
				<div className='text-center mb-16'>
					<div className='inline-flex items-center gap-4 mb-6'>
						<div className='h-px w-12 bg-primary/20'></div>
						<span className='text-xs font-medium tracking-[0.3em] text-foreground/60 uppercase'>How It Works</span>
						<div className='h-px w-12 bg-primary/20'></div>
					</div>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-light italic tracking-wide text-foreground mb-6'>My Process</h2>
					<p className='text-lg text-foreground/70 max-w-2xl mx-auto'>
						From our first conversation to your final gallery, I'm here to make your photography experience seamless and enjoyable.
					</p>
				</div>

				{/* Process Steps */}
				<div className='max-w-7xl mx-auto'>
					<div className='grid gap-y-16 gap-x-8 md:grid-cols-2 lg:grid-cols-4 justify-items-center'>
						<div className='md:col-span-2 lg:col-span-4 flex flex-col md:flex-row justify-center gap-8 lg:gap-x-16'>
							{processSteps.slice(0, 4).map((step, index) => {
								const IconComponent = step.icon;
								return (
									<div
										key={index}
										className='relative w-full max-w-[280px]'
									>
										{/* Step Number */}
										<div className='text-6xl md:text-7xl font-light text-primary/10 absolute -top-4 -left-4'>
											{String(index + 1).padStart(2, "0")}
										</div>

										{/* Content */}
										<div className='relative z-10'>
											{/* Icon */}
											<div className='flex justify-center mb-6'>
												<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center'>
													<IconComponent className='h-8 w-8 text-primary' />
												</div>
											</div>

											{/* Title */}
											<h3 className='text-xl font-light text-foreground mb-4 text-center'>{step.title}</h3>

											{/* Description */}
											<p className='text-foreground/70 text-sm leading-relaxed text-center'>{step.description}</p>
										</div>

										{/* Connector Line */}
										{index < 3 && <div className='hidden lg:block absolute top-32 -right-8 w-16 h-px bg-primary/20'></div>}
									</div>
								);
							})}
						</div>
						<div className='md:col-span-2 lg:col-span-4 flex flex-col md:flex-row justify-center gap-8 lg:gap-x-16'>
							{processSteps.slice(4).map((step, index) => {
								const IconComponent = step.icon;
								const actualIndex = index + 4;
								return (
									<div
										key={actualIndex}
										className='relative w-full max-w-[280px]'
									>
										{/* Step Number */}
										<div className='text-6xl md:text-7xl font-light text-primary/10 absolute -top-4 -left-4'>
											{String(actualIndex + 1).padStart(2, "0")}
										</div>

										{/* Content */}
										<div className='relative z-10'>
											{/* Icon */}
											<div className='flex justify-center mb-6'>
												<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center'>
													<IconComponent className='h-8 w-8 text-primary' />
												</div>
											</div>

											{/* Title */}
											<h3 className='text-xl font-light text-foreground mb-4 text-center'>{step.title}</h3>

											{/* Description */}
											<p className='text-foreground/70 text-sm leading-relaxed text-center'>{step.description}</p>
										</div>

										{/* Connector Line */}
										{index < 2 && <div className='hidden lg:block absolute top-32 -right-8 w-16 h-px bg-primary/20'></div>}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
