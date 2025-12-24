import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import ClientLayout from "@/components/client-layout";
import Footer from "@/components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rod16.vercel.app";
const siteName = "Rod16 Photography";
const siteDescription = "Professional wedding, portrait, and event photography in Northern VA and worldwide. Capturing beautiful moments, emotions, and stories through the lens.";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${siteName} - Professional Wedding & Portrait Photography | Northern VA`,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	keywords: [
		"wedding photography",
		"portrait photography",
		"event photography",
		"maternity photography",
		"baby shower photography",
		"Northern VA photographer",
		"DMV photographer",
		"professional photographer",
		"destination wedding photographer",
		"Rod16 Photography",
	],
	authors: [{name: "Rod16 Photography"}],
	creator: "Rod16 Photography",
	publisher: "Rod16 Photography",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: siteName,
		title: `${siteName} - Professional Wedding & Portrait Photography`,
		description: siteDescription,
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: `${siteName} - Professional Photography Portfolio`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `${siteName} - Professional Wedding & Portrait Photography`,
		description: siteDescription,
		images: ["/og-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "1-qI4mq2f9zEnZRmCMt72sPOS-5lGmy883ASX5puj0o",
		// yandex: "your-yandex-verification-code",
		// bing: "your-bing-verification-code",
	},
	alternates: {
		canonical: siteUrl,
	},
};

// Organization structured data for SEO
const organizationStructuredData = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "Rod16 Photography",
	description: "Professional wedding, portrait, and event photography services in Northern VA and worldwide",
	url: siteUrl,
	logo: `${siteUrl}/logo.png`,
	image: `${siteUrl}/og-image.jpg`,
	address: {
		"@type": "PostalAddress",
		addressRegion: "Virginia",
		addressCountry: "US",
	},
	areaServed: {
		"@type": "GeoCircle",
		geoMidpoint: {
			"@type": "GeoCoordinates",
			latitude: "38.9072",
			longitude: "-77.0369",
		},
	},
	serviceType: [
		"Wedding Photography",
		"Portrait Photography",
		"Event Photography",
		"Maternity Photography",
		"Baby Shower Photography",
		"Landscape Photography",
	],
	sameAs: [
		"https://www.instagram.com/rod16photograpy",
		"https://www.facebook.com/ethiorodphotography",
		"https://www.tiktok.com/@ethio16zedo",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				{/* Organization Structured Data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{__html: JSON.stringify(organizationStructuredData)}}
				/>
			</head>
			<body className='antialiased'>
				<ClientLayout>{children}</ClientLayout>
				<Footer />
			</body>
		</html>
	);
}
