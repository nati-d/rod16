import {weeding, portrait, events, maternity, baby_shower, landscape} from "@/constants";

// Selected permanent images for footer gallery (6 images)
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
		src: weeding[15],  // Wedding image 3
		alt: "Wedding ceremony",
	},
	{
		id: 6,
		src: portrait[15],  // Portrait image 2
		alt: "Professional portrait",
	},
];

export const footerNavItems = [
	{name: "HOME", href: "/"},
	{name: "ABOUT", href: "/about"},
	{name: "SERVICES", href: "/services"},
	{name: "PORTFOLIO", href: "/portfolio"},
	{name: "CONTACT", href: "/contact"},
];
