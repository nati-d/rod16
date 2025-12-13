"use client";

import {useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";
import {X, ChevronLeft, ChevronRight} from "lucide-react";
import {isCloudinaryUrl} from "@/lib/image-utils";

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	images: string[];
	currentIndex: number;
	onNext: () => void;
	onPrev: () => void;
	alt?: string;
}

export default function ImageModal({isOpen, onClose, images, currentIndex, onNext, onPrev, alt = "Gallery image"}: ImageModalProps) {
	// Handle keyboard navigation
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			} else if (e.key === "ArrowLeft") {
				onPrev();
			} else if (e.key === "ArrowRight") {
				onNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		// Prevent body scroll when modal is open
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose, onNext, onPrev]);

	if (!isOpen || images.length === 0) return null;

	const currentImage = images[currentIndex];

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{duration: 0.3}}
					className='fixed inset-0 z-[100] flex items-center justify-center'
					onClick={onClose}
				>
					{/* Backdrop */}
					<div className='absolute inset-0 bg-white/95 backdrop-blur-md' />

					{/* Modal Content */}
					<motion.div
						initial={{scale: 0.95, opacity: 0}}
						animate={{scale: 1, opacity: 1}}
						exit={{scale: 0.95, opacity: 0}}
						transition={{duration: 0.3}}
						className='relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8'
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className='absolute top-4 right-4 md:top-8 md:right-8 z-20 bg-white/90 hover:bg-white backdrop-blur-md text-foreground rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-foreground/10'
							aria-label='Close modal'
						>
							<X className='h-6 w-6' />
						</button>

						{/* Previous Button */}
						{images.length > 1 && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									onPrev();
								}}
								className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-md text-foreground rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-foreground/10'
								aria-label='Previous image'
							>
								<ChevronLeft className='h-6 w-6' />
							</button>
						)}

						{/* Next Button */}
						{images.length > 1 && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									onNext();
								}}
								className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-md text-foreground rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-foreground/10'
								aria-label='Next image'
							>
								<ChevronRight className='h-6 w-6' />
							</button>
						)}

						{/* Image Counter */}
						{images.length > 1 && (
							<div className='absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-sm shadow-lg border border-foreground/10'>
								<p className='text-xs font-light tracking-wider text-foreground'>
									{String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
								</p>
							</div>
						)}

						{/* Image Container */}
						<div className='relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center'>
							<motion.div
								key={currentIndex}
								initial={{opacity: 0, scale: 0.98}}
								animate={{opacity: 1, scale: 1}}
								exit={{opacity: 0, scale: 0.98}}
								transition={{duration: 0.3}}
								className='relative w-full h-full'
							>
								<Image
									src={currentImage}
									alt={`${alt} ${currentIndex + 1}`}
									fill
									className='object-contain'
									sizes='100vw'
									priority
									unoptimized={isCloudinaryUrl(currentImage)}
								/>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

