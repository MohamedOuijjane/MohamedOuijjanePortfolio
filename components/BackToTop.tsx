"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUpIcon } from "./icons";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate progress (0 to 100)
    const progress = (scrollY / height) * 100;
    setScrollProgress(progress);

    // Show button after 350px
    if (scrollY > 350) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // SVG parameters for the progress ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B0F14] shadow-lg border border-gray-100 transition-all duration-300 md:h-12 md:w-12 hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      {/* Progress Ring */}
      <svg
        className="absolute h-full w-full -rotate-90 transform"
        viewBox="0 0 48 48"
      >
        <circle
          className="text-gray-100"
          strokeWidth="2"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="text-teal-700 transition-all duration-150 ease-out"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>

      <ArrowUpIcon className="relative z-10 h-5 w-5" />
    </button>
  );
}
