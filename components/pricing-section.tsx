import {Check, Star} from "lucide-react";
import {Button} from "@/components/ui/button";

const packages = [
	{
		name: "Basic Package",
		price: "$1,800",
		description: "Ideal for clients who want quality coverage on a budget",
		features: [
			"Limited time coverage (2:30 hours)",
			"Professionally edited images",
			"Online gallery with standard delivery",
			"High-resolution images",
			"Download access",
		],
		popular: false,
	},
	{
		name: "Premium Package",
		price: "$3,800",
		description: "Most popular option with extended coverage",
		features: [
			"6-8 hours of shooting",
			"Multiple locations and outfit changes",
			"High-resolution edited images",
			"Online gallery + USB drive (optional)",
			"Priority delivery",
			"Engagement session included",
		],
		popular: true,
	},
	{
		name: "Deluxe Package",
		price: "$5,200",
		description: "Full-day experience with VIP treatment",
		features: [
			"10+ hours of coverage",
			"Two photographers (optional)",
			"Luxury photo album",
			"Same-day sneak peeks",
			"Travel included for local destinations",
			"Custom add-ons available",
		],
		popular: false,
	},
];

const additionalServices = [
	{
		name: "Engagement Session",
		price: "$350",
		description: "Perfect for save-the-dates and getting comfortable in front of the camera",
	},
	{
		name: "Professional Headshots",
		price: "$250",
		description: "30-minute session with 2-3 final retouched images",
	},
	{
		name: "Fashion & Commercial",
		price: "$700+",
		description: "Half-day & full-day rates for fashion, editorial, and commercial work",
	},
];

export default function PricingSection() {
	return (
		<section
			id='pricing'
			className='py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10'
		>
			<div className='mx-auto container'>
				{/* Section Header */}
				<div className='text-center mb-20'>
					<div className='inline-flex items-center gap-4 mb-6'>
						<div className='h-px w-12 bg-primary/20'></div>
						<span className='text-xs font-medium tracking-[0.3em] text-foreground/60 uppercase'>Investment</span>
						<div className='h-px w-12 bg-primary/20'></div>
					</div>
					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-light italic tracking-wide text-foreground mb-6'>Wedding Packages</h2>
					<p className='text-lg text-foreground/70 max-w-2xl mx-auto'>
						Transparent pricing with packages designed to fit your needs and budget. Every package includes my signature style and attention to
						detail.
					</p>
				</div>

				{/* Pricing Grid */}
				<div className='grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto mb-20'>
					{packages.map((pkg, index) => (
						<div
							key={index}
							className={`relative bg-background rounded-lg p-8 shadow-sm border transition-all duration-300 hover:shadow-lg ${
								pkg.popular ? "border-primary/30 shadow-lg scale-105" : "border-secondary/20 hover:border-primary/20"
							}`}
						>
							{/* Popular Badge */}
							{pkg.popular && (
								<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
									<div className='bg-primary text-background px-4 py-2 rounded-full text-sm font-medium tracking-wider uppercase flex items-center gap-2'>
										<Star className='h-4 w-4' />
										Most Popular
									</div>
								</div>
							)}

							{/* Package Header */}
							<div className='text-center mb-8'>
								<h3 className='text-2xl font-light text-foreground mb-2'>{pkg.name}</h3>
								<div className='text-4xl font-light text-primary mb-2'>{pkg.price}</div>
								<p className='text-foreground/60 text-sm'>{pkg.description}</p>
							</div>

							{/* Features List */}
							<ul className='space-y-4 mb-8'>
								{pkg.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className='flex items-center gap-3'
									>
										<div className='flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center'>
											<Check className='h-3 w-3 text-primary' />
										</div>
										<span className='text-foreground/70 text-sm'>{feature}</span>
									</li>
								))}
							</ul>

							{/* CTA Button */}
							<div className='text-center'>
								<Button
									className={`w-full transition-all duration-200 ${
										pkg.popular
											? "bg-primary text-background hover:bg-primary/90"
											: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-background"
									}`}
								>
									{pkg.popular ? "Choose Premium" : `Choose ${pkg.name}`}
								</Button>
							</div>
						</div>
					))}
				</div>

				{/* Additional Services */}
				<div className='mb-20'>
					<div className='text-center mb-12'>
						<h3 className='text-2xl font-light text-foreground mb-4'>Additional Services</h3>
						<div className='h-px w-16 bg-primary/20 mx-auto'></div>
					</div>
					<div className='grid gap-8 md:grid-cols-3 max-w-4xl mx-auto'>
						{additionalServices.map((service, index) => (
							<div
								key={index}
								className='bg-background rounded-lg p-8 border border-secondary/20 text-center hover:border-primary/20 transition-all duration-300 hover:shadow-lg'
							>
								<h4 className='text-xl font-light text-foreground mb-3'>{service.name}</h4>
								<div className='text-3xl font-light text-primary mb-4'>{service.price}</div>
								<p className='text-foreground/70 text-sm leading-relaxed'>{service.description}</p>
							</div>
						))}
					</div>
				</div>

				{/* Booking Info */}
				{/* <div className='text-center'>
					<div className='bg-background/80 backdrop-blur-sm rounded-lg p-12 max-w-3xl mx-auto border border-secondary/20'>
						<div className='inline-flex items-center gap-4 mb-6'>
							<div className='h-px w-8 bg-primary/20'></div>
							<span className='text-xs font-medium tracking-[0.3em] text-foreground/60 uppercase'>Booking Information</span>
							<div className='h-px w-8 bg-primary/20'></div>
						</div>
						<h3 className='text-2xl font-light text-foreground mb-6'>Booking & Payment</h3>
						<p className='text-foreground/70 mb-8 leading-relaxed max-w-2xl mx-auto'>
							To secure your session, a 25% deposit is required upon booking. Flexible payment plans are available for select packages.
						</p>
						<div className='grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto'>
							<div className='text-left'>
								<p className='text-sm text-foreground/60'>
									<strong className='text-foreground'>Destination Weddings:</strong> Custom packages available upon request
								</p>
							</div>
							<div className='text-left'>
								<p className='text-sm text-foreground/60'>
									<strong className='text-foreground'>Custom Projects:</strong> Contact me directly for a personalized quote
								</p>
							</div>
						</div>
						<Button
							variant='outline'
							className='border-primary text-primary hover:bg-primary hover:text-background transition-all duration-200'
						>
							Request Custom Quote
						</Button>
					</div>
				</div> */}
			</div>
		</section>
	);
}
