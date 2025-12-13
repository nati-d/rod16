import type {CarouselSlide} from "@/types";
import {landscape, maternity, portrait, weeding} from "@/constants";

// Selected permanent images for hero carousel
const heroImages = [
	weeding[0],      // Wedding image
	portrait[5],     // Portrait image
	maternity[10],    // Maternity image
	landscape[8],    // Landscape image
];

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
		alt: "Wedding photography showcase",
	},
	{
		url: heroImages[1],
		alt: "Portrait photography work",
	},
	{
		url: heroImages[2],
		alt: "Maternity photography collection",
	},
	{
		url: heroImages[3],
		alt: "Landscape photography showcase",
	},
];
