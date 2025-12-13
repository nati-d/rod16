import {weeding, portrait, events, maternity, baby_shower, landscape} from "@/constants";

// Selected permanent images for wedding showcase
const showcaseImages = [
	weeding[5],      // Wedding image 1
	weeding[12],     // Wedding image 2
	maternity[8],    // Maternity image
	baby_shower[6],  // Baby shower image
	landscape[5],    // Landscape image
	portrait[12],    // Portrait image
];

export const weddingShowcaseHeader = {
	title: `Every frame.`,
	subtitle: `Carefully composed. Deeply felt.`,
	paragraphs: [
		`Every love story deserves to be told beautifully. I weave light and emotion into every frame,`,
		`creating images that feel both timeless and deeply personal. From intimate moments to grand celebrations,`,
		`I capture the authentic essence of your journey, preserving memories that will be cherished for generations.`,
	],
};

export const weddingShowcaseImages = [
	// Left Column (2)
	{
		src: showcaseImages[0],
		alt: "Wedding photography showcase",
		col: "left",
	},
	{
		src: showcaseImages[1],
		alt: "Wedding celebration moments",
		col: "left",
	},
	// Center Column (3)
	{
		src: showcaseImages[2],
		alt: "Maternity photography",
		col: "center",
	},
	{
		src: showcaseImages[3],
		alt: "Baby shower photography",
		col: "center",
	},
	{
		src: showcaseImages[4],
		alt: "Landscape photography",
		col: "center",
	},
	// Right Column (1)
	{
		src: showcaseImages[5],
		alt: "Professional portrait photography",
		col: "right",
	},
];
