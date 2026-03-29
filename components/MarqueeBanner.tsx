"use client";

import React from "react";

const marqueeItems = [
  "Software Engineer",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Distributed Systems",
  "Open to Internship",
  "Let’s build something great",
];

export function MarqueeBanner() {
  const content = marqueeItems.join(" • ");

  return (
    <div className="relative my-20 w-full select-none overflow-x-clip">
      {/* Tilted Wrapper: wider than viewport to avoid corners, contained by overflow-x-clip on parent */}
      <div
        className="relative left-1/2 w-[120%] -translate-x-1/2 overflow-hidden bg-black py-4 border-y border-white/10"
        style={{ transform: "rotate(var(--marquee-tilt))" }}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform motion-reduce:animate-none">
          {/* Render content 2 times for a perfect seamless loop */}
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center px-4 text-sm font-sans font-bold tracking-wider text-white uppercase sm:text-base"
            >
              {content} •&nbsp;
            </span>
          ))}
        </div>

        {/* Subtle fade edges for premium feel */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </div>
  );
}
