import type {Metadata} from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rod16.vercel.app";

export const metadata: Metadata = {
	title: "Rod16 Photography - Professional Wedding & Portrait Photographer | Northern VA",
	description: "Rod16 Photography - Award-winning wedding, portrait, and event photographer serving Northern VA, DMV, and worldwide. Specializing in capturing authentic moments, emotions, and stories. Book your session today.",
	keywords: [
		"Rod16 Photography",
		"rod16 photography",
		"wedding photographer Northern VA",
		"portrait photographer DMV",
		"event photographer Virginia",
		"professional photographer",
		"wedding photography",
		"portrait photography",
		"maternity photography",
		"baby shower photography",
		"destination wedding photographer",
	],
	openGraph: {
		title: "Rod16 Photography - Professional Wedding & Portrait Photographer",
		description: "Award-winning wedding, portrait, and event photographer serving Northern VA, DMV, and worldwide. Capturing authentic moments and emotions.",
		url: siteUrl,
		type: "website",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Rod16 Photography - Professional Photography Services",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Rod16 Photography - Professional Wedding & Portrait Photographer",
		description: "Award-winning wedding, portrait, and event photographer serving Northern VA, DMV, and worldwide.",
		images: ["/og-image.jpg"],
	},
	alternates: {
		canonical: siteUrl,
	},
};

// Homepage structured data for SEO
const homepageStructuredData = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"@id": `${siteUrl}#business`,
	name: "Rod16 Photography",
	alternateName: "Rod16",
	description: "Professional wedding, portrait, and event photography services in Northern VA, DMV, and worldwide",
	url: siteUrl,
	logo: `${siteUrl}/logo.png`,
	image: `${siteUrl}/og-image.jpg`,
	telephone: "+1-571-473-2196",
	email: "rod16zedo@gmail.com",
	address: {
		"@type": "PostalAddress",
		addressRegion: "Virginia",
		addressCountry: "US",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: "38.9072",
		longitude: "-77.0369",
	},
	areaServed: [
		{
			"@type": "State",
			name: "Virginia",
		},
		{
			"@type": "State",
			name: "Maryland",
		},
		{
			"@type": "State",
			name: "District of Columbia",
		},
		{
			"@type": "Country",
			name: "Worldwide",
		},
	],
	priceRange: "$$",
	sameAs: [
		"https://www.instagram.com/rod16photograpy",
		"https://www.facebook.com/ethiorodphotography",
		"https://www.tiktok.com/@ethio16zedo",
	],
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "5",
		reviewCount: "50+",
	},
};

export default function HomeLayout({children}: {children: React.ReactNode}) {
	return (
		<>
			{/* Homepage Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(homepageStructuredData)}}
			/>
			{children}
		</>
	);
}

