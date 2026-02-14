"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "./icons";

export function ScrollCue() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out when scrolling down beyond 80px
      if (window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      servicesSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to services section"
      className={`absolute bottom-[-4.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Desktop Mouse Icon */}
      <div className="hidden md:flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-400 p-1">
        <div className="h-2 w-1 rounded-full bg-gray-400 motion-safe:animate-bounce" />
      </div>

      {/* Mobile Chevron */}
      <div className="flex md:hidden">
        <ChevronDownIcon className="h-6 w-6 text-gray-400 motion-safe:animate-bounce" />
      </div>

      <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
        Scroll
      </span>
    </button>
  );
}
