"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { ImageLightbox } from "./ImageLightbox";

const cpuGridImages = [
  "/images/projects/cpu-grid-traffic/cpu-grid-traffic-1.webp",
  "/images/projects/cpu-grid-traffic/cpu-grid-traffic-2.webp",
  "/images/projects/cpu-grid-traffic/cpu-grid-traffic-3.webp",
  "/images/projects/cpu-grid-traffic/cpu-grid-traffic-4.webp",
  "/images/projects/cpu-grid-traffic/cpu-grid-traffic-5.webp",
];

const certifyEaseImages = [
  "/images/projects/certify-ease/certifyease-1.webp",
  "/images/projects/certify-ease/certifyease-2.webp",
  "/images/projects/certify-ease/certifyease-3.webp",
  "/images/projects/certify-ease/certifyease-4.webp",
  "/images/projects/certify-ease/certifyease-5.webp",
];

const copagMdmImages = [
  "/images/projects/mdm/mdm-1.webp",
  "/images/projects/mdm/mdm-2.webp",
  "/images/projects/mdm/mdm-3.webp",
];

const portfolioImages = ["/images/projects/portfolio/portfolio_image.webp"];

export function ProjectHeroCarousel({ slug }: { slug?: string }) {
  let images = cpuGridImages;
  if (slug === "certifyease-language-exam-platform") images = certifyEaseImages;
  if (slug === "copag-mdm") images = copagMdmImages;
  if (slug === "portfolio-website") images = portfolioImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isPaused || isLightboxOpen) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds

    return () => clearInterval(timer);
  }, [isPaused, isLightboxOpen, nextSlide]);

  return (
    <>
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-transparent transition-all duration-300 hover:border-gray-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={images[currentIndex]}
              alt={`Project screenshot ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority={currentIndex === 0}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top-Right Expand Indicator */}
        <div className="absolute right-4 top-4 z-20 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg backdrop-blur-md">
            <Maximize2 className="h-5 w-5" />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-black/5">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={
              isPaused || isLightboxOpen ? { width: "0%" } : { width: "100%" }
            }
            transition={{ duration: 4, ease: "linear" }}
            className="h-full bg-teal-600"
          />
        </div>

        {/* Thumbnail Indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 px-3 py-2 rounded-full bg-black/10 backdrop-blur-md border border-white/10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <ImageLightbox
        src={images[currentIndex]}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        alt={`Project screenshot ${currentIndex + 1}`}
      />
    </>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
