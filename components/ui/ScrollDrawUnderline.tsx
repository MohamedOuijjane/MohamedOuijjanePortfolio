"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrollDrawUnderlineProps {
  text: string;
  inView: boolean;
  delay?: number;
  className?: string;
  pathVariant?: number;
}

const pathDataVariants = [
  "M 2 12 C 40 10, 80 15, 120 12 C 160 9, 180 13, 198 11",
  "M 0 12 C 40 8, 80 15, 120 12 C 160 9, 200 14, 240 12",
  "M 0 15 Q 100 5 200 15 Q 300 25 400 15",
  "M 0 10 L 50 12 L 100 8 L 150 12 L 200 10",
];

export function ScrollDrawUnderline({
  text,
  inView,
  delay = 0,
  className = "",
  pathVariant = 0,
}: ScrollDrawUnderlineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial state
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    if (inView) {
      // Animate in
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
        delay: delay,
      });
    } else {
      // Reset to hidden
      gsap.to(path, {
        strokeDashoffset: length,
        duration: 0.8,
        ease: "power2.in",
      });
    }
  }, [inView, delay]);

  const path = pathDataVariants[pathVariant % pathDataVariants.length];

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-[#0B0F14] font-bold">
        {text}
      </span>
      <svg
        ref={svgRef}
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 w-full h-3 pointer-events-none"
      >
        <path
          ref={pathRef}
          d={path}
          stroke="#0B0F14"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
