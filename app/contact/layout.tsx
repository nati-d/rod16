import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Contact - Get in Touch | Rod16 Photography",
	description: "Contact Rod16 Photography to book your wedding, portrait, or event photography session. Based in Northern VA, serving the DMV area and worldwide. Let's capture your beautiful moments together!",
	keywords: [
		"contact photographer",
		"book wedding photographer",
		"hire photographer Northern VA",
		"photography consultation",
		"Rod16 Photography contact",
	],
	openGraph: {
		title: "Contact - Get in Touch | Rod16 Photography",
		description: "Contact Rod16 Photography to book your wedding, portrait, or event photography session. Let's capture your beautiful moments together!",
		url: "https://rod16.vercel.app/contact",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact - Get in Touch | Rod16 Photography",
		description: "Contact Rod16 Photography to book your photography session.",
	},
	alternates: {
		canonical: "https://rod16.vercel.app/contact",
	},
};

// Structured Data for Contact Page
const contactStructuredData = {
	"@context": "https://schema.org",
	"@type": "ContactPage",
	name: "Contact Rod16 Photography",
	description: "Get in touch to book your photography session",
	url: "https://rod16.vercel.app/contact",
	mainEntity: {
		"@type": "ProfessionalService",
		name: "Rod16 Photography",
		email: "rod16zedo@gmail.com",
		areaServed: {
			"@type": "GeoCircle",
			geoMidpoint: {
				"@type": "GeoCoordinates",
				latitude: "38.9072",
				longitude: "-77.0369",
			},
		},
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(contactStructuredData)}}
			/>
			{children}
		</>
	);
}

