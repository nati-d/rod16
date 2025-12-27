"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

interface CarouselControlsProps {
  currentSlide: number
  totalSlides: number
  isPlaying: boolean
  onPrevious: () => void
  onNext: () => void
  onGoToSlide: (index: number) => void
  onTogglePlayPause: () => void
}

export default function CarouselControls({
  currentSlide,
  totalSlides,
  isPlaying,
  onPrevious,
  onNext,
  onGoToSlide,
  onTogglePlayPause,
}: CarouselControlsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex flex-col items-center space-y-4">
        {/* Navigation Dots */}
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            className="text-white hover:bg-white/10 p-2 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePlayPause}
            className="text-white hover:bg-white/10 p-2 cursor-pointer"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            className="text-white hover:bg-white/10 p-2 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
