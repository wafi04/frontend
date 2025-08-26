"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

export function BannerHome() {
  const images = [
    "https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fbanner%2Fbannerwebkodepromobulanan-agustus-ezgif.com-optijpeg.jpg&w=1920&q=100",
    "https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fbanner%2Fkaditastarlightbannerweb-ezgif.com-optijpeg.jpg&w=1920&q=100",
    "https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fourastore.com%2Fbanner%2Fgoogleplayvoucherefootballbanner-ezgif.com-optijpeg.jpg&w=1920&q=100",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Keyboard navigation with preventDefault
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if focus is not on input elements
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        prevSlide()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        nextSlide()
      } else if (event.key === " ") {
        event.preventDefault()
        setIsAutoPlaying(!isAutoPlaying)
      }
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false })
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, isAutoPlaying])

  // Animation variants with improved performance
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  // Handle button clicks with preventDefault
  const handlePrevClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    prevSlide()
  }, [prevSlide])

  const handleNextClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    nextSlide()
  }, [nextSlide])

  const handlePlayPauseClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAutoPlaying(!isAutoPlaying)
  }, [isAutoPlaying])

  return (
    <section 
      ref={containerRef}
      className="relative flex items-center overflow-hidden py-4 lg:min-h-[200px] lg:py-6"
      role="region"
      aria-label="Banner carousel"
    >
      <div className="container relative">
        {/* Main Carousel Container */}
        <div className="relative aspect-[16/6] lg:aspect-[24/7] w-full overflow-hidden rounded-2xl bg-gray-100">
          
          {/* Image Carousel */}
          <AnimatePresence 
            initial={false} 
            custom={direction}
            mode="wait"
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  nextSlide()
                } else if (swipe > swipeConfidenceThreshold) {
                  prevSlide()
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`Banner ${currentIndex + 1}`}
                fill
                className="object-cover select-none"
                priority={currentIndex === 0}
                onLoad={() => setIsLoading(false)}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <motion.button
              type="button"
              onClick={handlePrevClick}
              className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <motion.button
              type="button"
              onClick={handleNextClick}
              className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute bottom-4 left-4">
            <motion.button
              type="button"
              onClick={handlePlayPauseClick}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goToSlide(index)
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}