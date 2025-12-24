import type {Metadata} from "next";
import AboutSection from "@/components/about";
import AboutQA from "@/components/about-qa";
import Testimonials from "@/components/testimonials";

export const metadata: Metadata = {
	title: "About - Rod16 Photography",
	description: "Learn about Rod16 Photography - a professional wedding and portrait photographer based in Northern VA. Discover the story, philosophy, and passion behind capturing beautiful moments and emotions through photography.",
	keywords: [
		"about Rod16 Photography",
		"Northern VA photographer",
		"wedding photographer about",
		"professional photographer story",
		"photography philosophy",
	],
	openGraph: {
		title: "About - Rod16 Photography",
		description: "Learn about Rod16 Photography - a professional wedding and portrait photographer based in Northern VA. Discover the story and passion behind capturing beautiful moments.",
		url: "https://rod16.vercel.app/about",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "About - Rod16 Photography",
		description: "Learn about Rod16 Photography - a professional wedding and portrait photographer based in Northern VA.",
	},
	alternates: {
		canonical: "https://rod16.vercel.app/about",
	},
};

// Structured Data for About Page
const aboutStructuredData = {
	"@context": "https://schema.org",
	"@type": "AboutPage",
	name: "About Rod16 Photography",
	description: "Learn about Rod16 Photography - a professional wedding and portrait photographer based in Northern VA",
	url: "https://rod16.vercel.app/about",
	mainEntity: {
		"@type": "Person",
		name: "Rod16 Photography",
		jobTitle: "Professional Photographer",
		address: {
			"@type": "PostalAddress",
			addressRegion: "Virginia",
			addressCountry: "US",
		},
		knowsAbout: [
			"Wedding Photography",
			"Portrait Photography",
			"Event Photography",
			"Maternity Photography",
		],
	},
};

export default function AboutPage() {
	return (
		<>
			{/* Structured Data for SEO */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(aboutStructuredData)}}
			/>
			<main className='bg-background min-h-screen'>
				<AboutSection variant='page' />
				<AboutQA />
				<Testimonials />
			</main>
		</>
	);
}
