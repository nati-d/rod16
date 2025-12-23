import type {CarouselSlide} from "@/types";
import {home} from "@/constants/index.home";

// Helper function to add Cloudinary transformation parameters to URLs
function addCloudinaryTransformations(url: string | undefined, useFacePriority: boolean = true): string {
	// Handle undefined, null, or non-string values
	if (!url || typeof url !== "string") {
		console.warn("addCloudinaryTransformations: Invalid URL provided", url);
		return url || "";
	}

	if (!url.includes("res.cloudinary.com")) {
		return url;
	}

	// Base transformation: always use the Width-to-height ratio template
	const baseTransformation = "t_Width-to-height%20ratio";
	
	// Additional transformations for smart cropping
	const additionalTransformations = useFacePriority 
		? "c_fill,g_auto:face,q_auto"   // Prioritizes detected faces (largest one first)
		: "c_fill,g_auto,q_auto";       // General auto subject detection

	// Combine: named transformation first, then additional transformations
	const newTransformations = `${baseTransformation},${additionalTransformations}`;

	// Check if URL already has transformations
	// Pattern: /upload/{transformations}/{version or path}
	const uploadMatch = url.match(/\/upload\/([^/]+)\/(.+)$/);
	
	if (uploadMatch) {
		const existingTransformations = uploadMatch[1];
		const restOfPath = uploadMatch[2];
		
		// Check if existing transformations look like a version number (v followed by digits)
		const isVersionNumber = /^v\d+$/.test(existingTransformations);
		
		if (isVersionNumber) {
			// No existing transformations, insert before version number
			return url.replace(/\/upload\/(v\d+)\//, `/upload/${newTransformations}/$1/`);
		} else {
			// Already has transformations
			// Check if it already has the Width-to-height ratio template
			if (existingTransformations.includes("t_Width-to-height")) {
				// If it already has the template, just add the additional transformations
				return url.replace(/\/upload\/([^/]+)\//, `/upload/${existingTransformations},${additionalTransformations}/`);
			} else {
				// Add both the template and additional transformations
				return url.replace(/\/upload\/([^/]+)\//, `/upload/${existingTransformations},${newTransformations}/`);
			}
		}
	}
	
	// Fallback: no match found, use simple replacement
	return url.replace(/\/upload\//, `/upload/${newTransformations}/`);
}

// Selected images for hero carousel from home array
// Order: 1, 6, 5, 20, 27, 24, 26, 14, 10, 2, 31
// Note: Image 16 is missing, so images 17-31 are at indices 15-29
const heroImages = [
	home[0],   // Image 1
	home[5],   // Image 6
	home[4],   // Image 5
	home[18],  // Image 20 (images 17-31 are at indices 15-29, so image 20 = index 18)
	home[25],  // Image 27 (index 25)
	home[22],  // Image 24 (index 22)
	home[24],  // Image 26 (index 24)
	home[13],  // Image 14
	home[9],   // Image 10
	home[1],   // Image 2
	home[29],  // Image 31 (index 29)
].map(url => addCloudinaryTransformations(url, true)); // Use g_auto for automatic subject detection

export const carouselSlides: CarouselSlide[] = [
	{
		id: 1,
		title: "Create Something",
		subtitle: "Extraordinary",
		description: "Transform your vision into reality with our cutting-edge platform. Experience the future of digital innovation today.",
		backgroundImage: "url(/hero-bg.png)",
		primaryCTA: "Get Started",
		secondaryCTA: "Learn More",
	},
	{
		id: 2,
		title: "Build Amazing",
		subtitle: "Experiences",
		description: "Craft stunning digital experiences that captivate your audience. Our tools empower you to bring your wildest ideas to life.",
		backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		primaryCTA: "Start Building",
		secondaryCTA: "View Demo",
	},
	{
		id: 3,
		title: "Scale Your",
		subtitle: "Success",
		description: "From startup to enterprise, our platform grows with you. Join thousands of successful creators who trust our solutions.",
		backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		primaryCTA: "Scale Now",
		secondaryCTA: "See Plans",
	},
	{
		id: 4,
		title: "Innovate",
		subtitle: "Together",
		description: "Collaborate with teams worldwide and push the boundaries of what's possible. Innovation starts here.",
		backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		primaryCTA: "Join Us",
		secondaryCTA: "Explore",
	},
];

export const imageSlides = [
	{
		url: heroImages[0],
		alt: "Rod16 Photography - Hero image 1",
	},
	{
		url: heroImages[1],
		alt: "Rod16 Photography - Hero image 2",
	},
	{
		url: heroImages[2],
		alt: "Rod16 Photography - Hero image 3",
	},
	{
		url: heroImages[3],
		alt: "Rod16 Photography - Hero image 4",
	},
	{
		url: heroImages[4],
		alt: "Rod16 Photography - Hero image 5",
	},
	{
		url: heroImages[5],
		alt: "Rod16 Photography - Hero image 6",
	},
	{
		url: heroImages[6],
		alt: "Rod16 Photography - Hero image 7",
	},
	{
		url: heroImages[7],
		alt: "Rod16 Photography - Hero image 8",
	},
	{
		url: heroImages[8],
		alt: "Rod16 Photography - Hero image 9",
	},
	{
		url: heroImages[9],
		alt: "Rod16 Photography - Hero image 10",
	},
	{
		url: heroImages[10],
		alt: "Rod16 Photography - Hero image 11",
	},
];
