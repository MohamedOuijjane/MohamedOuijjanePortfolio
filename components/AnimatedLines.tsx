"use client";

import { useEffect } from "react";

export const AnimatedLines = () => {
  useEffect(() => {
    // No-op: kept to respect motion preferences if needed in future
  }, []);

  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none select-none">
      {/* Subtle Grid - Adjusted for white background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgba(55,65,81,1) 1px, transparent 1px), linear-gradient(90deg, rgba(55,65,81,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated Trend Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" stopOpacity="0" />
            <stop offset="50%" stopColor="#374151" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#374151" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated paths with different timing and positions */}
        <path
          d="M-100 200 Q 250 150 500 250 T 1100 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className="animate-float-slow"
        />
        <path
          d="M-100 450 Q 300 550 600 400 T 1100 500"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          className="animate-float-medium"
        />
        <path
          d="M-100 750 Q 400 650 700 800 T 1100 700"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          className="animate-float-fast"
        />

        {/* Extra lines for density */}
        <path
          d="M-100 100 Q 200 300 500 100 T 1100 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="animate-float-medium"
          style={{ opacity: 0.5 }}
        />
      </svg>
    </div>
  );
};
