import {home} from "@/constants/index.home";

// Selected images for wedding showcase from home array
// Excluding carousel images: 1, 6, 5, 20, 27, 24, 26, 14, 10, 2, 31
// Excluding footer images: 3, 7, 11, 17, 21, 28
// Remaining images: 4, 8, 9, 12, 13, 15, 18, 19, 22, 23, 25, 29, 30
// Selected for showcase: 4, 8, 9, 12, 13, 15, 18, 19, 22, 23, 25, 29, 30

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
	// Left Column (4 images)
	{
		src: home[3],  // Image 4
		alt: "Rod16 Photography - Wedding showcase",
		col: "left",
	},
	{
		src: home[7],  // Image 8
		alt: "Rod16 Photography - Wedding celebration",
		col: "left",
	},
	{
		src: home[11], // Image 12
		alt: "Rod16 Photography - Special moments",
		col: "left",
	},
	{
		src: home[16], // Image 18 (images 17-31 are at indices 15-29)
		alt: "Rod16 Photography - Beautiful memories",
		col: "left",
	},
	// Center Column (5 images)
	{
		src: home[8],  // Image 9
		alt: "Rod16 Photography - Intimate moments",
		col: "center",
	},
	{
		src: home[12], // Image 13
		alt: "Rod16 Photography - Timeless elegance",
		col: "center",
	},
	{
		src: home[14], // Image 15
		alt: "Rod16 Photography - Captured emotions",
		col: "center",
	},
	{
		src: home[17], // Image 19
		alt: "Rod16 Photography - Wedding details",
		col: "center",
	},
	{
		src: home[24], // Image 25
		alt: "Rod16 Photography - Celebration",
		col: "center",
	},
	// Right Column (4 images)
	{
		src: home[21], // Image 22
		alt: "Rod16 Photography - Professional photography",
		col: "right",
	},
	{
		src: home[22], // Image 23
		alt: "Rod16 Photography - Artistic vision",
		col: "right",
	},
	{
		src: home[27], // Image 29
		alt: "Rod16 Photography - Beautiful compositions",
		col: "right",
	},
	{
		src: home[28], // Image 30
		alt: "Rod16 Photography - Memorable moments",
		col: "right",
	},
];
