import {weeding, portrait, events, maternity, baby_shower, landscape} from "@/constants";

// Selected permanent images for footer gallery (6 images)
// Using diverse selection from different categories for better visual variety
export const footerImages = [
	{
		id: 1,
		src: weeding[3],  // Wedding image 1
		alt: "Wedding photography",
	},
	{
		id: 2,
		src: portrait[7],  // Portrait image
		alt: "Portrait photography",
	},
	{
		id: 3,
		src: weeding[8],  // Wedding image 2
		alt: "Wedding celebration",
	},
	{
		id: 4,
		src: events[5],  // Event image
		alt: "Event photography",
	},
	{
		id: 5,
		src: maternity[5],  // Maternity image (changed from weeding[15] for variety)
		alt: "Maternity photography",
	},
	{
		id: 6,
		src: landscape[8],  // Landscape image (changed from portrait[15] for variety)
		alt: "Landscape photography",
	},
];

export const footerNavItems = [
	{name: "HOME", href: "/"},
	{name: "ABOUT", href: "/about"},
	{name: "SERVICES", href: "/services"},
	{name: "PORTFOLIO", href: "/portfolio"},
	{name: "CONTACT", href: "/contact"},
];
