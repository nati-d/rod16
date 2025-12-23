import {home} from "@/constants/index.home";

// Selected images for footer gallery (6 images from home array)
// Excluding carousel images: 1, 6, 5, 20, 27, 24, 26, 14, 10, 2, 31
// Selected: 3, 7, 11, 17, 21, 28
export const footerImages = [
	{
		id: 1,
		src: home[2],  // Image 3
		alt: "Rod16 Photography - Home image 3",
	},
	{
		id: 2,
		src: home[6],  // Image 7
		alt: "Rod16 Photography - Home image 7",
	},
	{
		id: 3,
		src: home[10], // Image 11
		alt: "Rod16 Photography - Home image 11",
	},
	{
		id: 4,
		src: home[15], // Image 17 (images 17-31 are at indices 15-29)
		alt: "Rod16 Photography - Home image 17",
	},
	{
		id: 5,
		src: home[19], // Image 21
		alt: "Rod16 Photography - Home image 21",
	},
	{
		id: 6,
		src: home[26], // Image 28
		alt: "Rod16 Photography - Home image 28",
	},
];

export const footerNavItems = [
	{name: "HOME", href: "/"},
	{name: "ABOUT", href: "/about"},
	{name: "SERVICES", href: "/services"},
	{name: "PORTFOLIO", href: "/portfolio"},
	{name: "CONTACT", href: "/contact"},
];
