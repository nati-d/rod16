"use client";

import {useState, useEffect} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {baby_shower, events, landscape, maternity, portrait, weeding, commercial} from "@/constants";
import OptimizedImage from "@/components/ui/optimized-image";
import ImageModal from "@/components/image-modal";
import MasonryGrid from "@/components/masonry-grid";

// Portfolio categories
const categories = ["All", "Wedding", "Baby Shower", "Portrait", "Maternity", "Event", "Landscape", "Commercial"];

// Map URL slugs to display names
const categorySlugMap: Record<string, string> = {
	wedding: "Wedding",
	"baby-shower": "Baby Shower",
	portrait: "Portrait",
	maternity: "Maternity",
	event: "Event",
	landscape: "Landscape",
	commercial: "Commercial",
};

// Map display names to URL slugs
const categoryToSlugMap: Record<string, string> = {
	"Wedding": "wedding",
	"Baby Shower": "baby-shower",
	"Portrait": "portrait",
	"Maternity": "maternity",
	"Event": "event",
	"Landscape": "landscape",
	"Commercial": "commercial",
};

// Create portfolio items from imported images
const portfolioItems = [
	...weeding.map((image, index) => ({
		id: `weeding-${index}`,
		category: "Wedding",
		image,
		title: `Wedding Photo ${index + 1}`,
		description: "Capturing beautiful wedding moments",
	})),
	...baby_shower.map((image, index) => ({
		id: `baby-shower-${index}`,
		category: "Baby Shower",
		image,
		title: `Baby Shower Photo ${index + 1}`,
		description: "Celebrating new beginnings",
	})),
	...portrait.map((image, index) => ({
		id: `portrait-${index}`,
		category: "Portrait",
		image,
		title: `Portrait Photo ${index + 1}`,
		description: "Professional portrait photography",
	})),
	...maternity.map((image, index) => ({
		id: `maternity-${index}`,
		category: "Maternity",
		image,
		title: `Maternity Photo ${index + 1}`,
		description: "Celebrating the journey of motherhood",
	})),
	...events.map((image, index) => ({
		id: `events-${index}`,
		category: "Event",
		image,
		title: `Event Photo ${index + 1}`,
		description: "Capturing special moments and celebrations",
	})),
	...landscape.map((image, index) => ({
		id: `landscape-${index}`,
		category: "Landscape",
		image,
		title: `Landscape Photo ${index + 1}`,
		description: "Beautiful landscape photography",
	})),
	...commercial.map((image, index) => ({
		id: `commercial-${index}`,
		category: "Commercial",
		image,
		title: `Commercial Photo ${index + 1}`,
		description: "Professional commercial and fashion photography",
	})),
];

export default function PortfolioClient() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Read category from URL parameter on mount and when it changes
	useEffect(() => {
		const categoryParam = searchParams.get("category");
		if (categoryParam) {
			const categoryName = categorySlugMap[categoryParam.toLowerCase()];
			if (categoryName && categories.includes(categoryName)) {
				setSelectedCategory(categoryName);
			}
		}
	}, [searchParams]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		// Update URL without page reload
		if (category === "All") {
			router.push("/portfolio", {scroll: false});
		} else {
			const slug = categoryToSlugMap[category];
			if (slug) {
				router.push(`/portfolio?category=${slug}`, {scroll: false});
			}
		}
	};

	const filteredItems = selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory);

	const handleImageClick = (index: number) => {
		setCurrentImageIndex(index);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleNextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length);
	};

	const handlePrevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
	};

	const modalImages = filteredItems.map((item) => item.image);

	return (
		<>
			{/* Category Filter + Grid */}
			<section className='py-20 px-4' aria-label='Portfolio gallery'>
				<div className='max-w-5xl mx-auto'>
					<nav className='flex flex-wrap justify-center gap-4 mb-16' aria-label='Portfolio category filter'>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryChange(category)}
								aria-pressed={selectedCategory === category}
								aria-label={`Filter portfolio by ${category}`}
								className={`px-6 py-2 text-sm transition-colors duration-200 cursor-pointer
									${selectedCategory === category ? "bg-primary text-background" : "bg-secondary/20 text-foreground hover:bg-primary/10"}`}
							>
								{category}
							</button>
						))}
					</nav>

					{/* Portfolio Masonry Grid */}
					<div role="list">
						<MasonryGrid gap="md" className="w-full">
							{filteredItems.map((item, index) => (
							<article
								key={item.id}
								role='listitem'
								className='group relative w-full overflow-hidden bg-foreground/5 cursor-pointer rounded-lg'
								onClick={() => handleImageClick(index)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleImageClick(index);
									}
								}}
								tabIndex={0}
								aria-label={`View ${item.title} - ${item.description}`}
							>
								<div className="relative w-full masonry-image-wrapper">
									<OptimizedImage
										src={item.image}
										alt={`${item.title} - ${item.description} by Rod16 Photography. ${item.category} photography portfolio.`}
										width={600}
										height={900}
										className='w-full h-auto transition-transform duration-500 group-hover:scale-105 rounded-lg'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
										loading='lazy'
										quality={85}
									/>
								</div>
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg'>
									<div className='absolute bottom-0 left-0 right-0 p-6 text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
										<h3 className='text-lg font-light mb-1'>{item.title}</h3>
										<p className='text-sm text-background/80'>{item.description}</p>
									</div>
								</div>
							</article>
						))}
						</MasonryGrid>
					</div>
				</div>
			</section>

			{/* Image Modal */}
			<ImageModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				images={modalImages}
				currentIndex={currentImageIndex}
				onNext={handleNextImage}
				onPrev={handlePrevImage}
				alt='Portfolio image'
			/>
		</>
	);
}

