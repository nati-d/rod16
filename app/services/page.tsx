import type {Metadata} from "next";
import ServicesHero from "@/components/services-hero";
import ServicesGrid from "@/components/services-grid";
import PricingSection from "@/components/pricing-section";
import ProcessSection from "@/components/process-section";
import FAQSection from "@/components/faq-section";

export const metadata: Metadata = {
	title: "Services - Wedding, Portrait & Event Photography Packages",
	description: "Professional photography services including wedding photography, portrait sessions, maternity shoots, baby showers, events, and destination weddings. Starting at $450 for portrait sessions and $2,500 for weddings. Serving Northern VA, DMV, and worldwide.",
	keywords: [
		"wedding photography services",
		"portrait photography packages",
		"event photography",
		"maternity photography",
		"baby shower photography",
		"photography pricing",
		"wedding photographer rates",
		"Northern VA photography services",
		"destination wedding photography",
	],
	openGraph: {
		title: "Services - Wedding, Portrait & Event Photography Packages | Rod16 Photography",
		description: "Professional photography services including wedding photography, portrait sessions, maternity shoots, and events. Starting at $450 for portraits and $2,500 for weddings.",
		url: "https://rod16photo.com/services",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Services - Wedding, Portrait & Event Photography Packages",
		description: "Professional photography services including wedding photography, portrait sessions, and events.",
	},
	alternates: {
		canonical: "https://rod16photo.com/services",
	},
};

// Structured Data for Services Page
const servicesStructuredData = {
	"@context": "https://schema.org",
	"@type": "Service",
	name: "Professional Photography Services",
	description: "Wedding, portrait, event, maternity, and baby shower photography services",
	provider: {
		"@type": "ProfessionalService",
		name: "Rod16 Photography",
		url: "https://rod16photo.com",
	},
	areaServed: {
		"@type": "GeoCircle",
		geoMidpoint: {
			"@type": "GeoCoordinates",
			latitude: "38.9072",
			longitude: "-77.0369",
		},
	},
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Photography Services",
		itemListElement: [
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "Wedding Photography",
					description: "Full-day wedding coverage capturing every emotion and moment",
				},
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "Portrait Photography",
					description: "Individual, couple, family, or maternity portrait sessions",
				},
			},
			{
				"@type": "Offer",
				itemOffered: {
					"@type": "Service",
					name: "Event Photography",
					description: "Half-day and full-day event photography coverage",
				},
			},
		],
	},
};

export default function ServicesPage() {
	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(servicesStructuredData)}}
			/>
			<main className='bg-background min-h-screen'>
				<ServicesHero />
				<ServicesGrid />
				<PricingSection />
				<ProcessSection />
				<FAQSection />
			</main>
		</>
	);
}
