"use client";

import { useEffect, useRef, useState } from "react";
import Noise from "./ui/noise";

interface AnimatedLinesProps {
  variant?: "light" | "dark";
}

export const AnimatedLines = ({ variant = "light" }: AnimatedLinesProps) => {
  const isDark = variant === "dark";

  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none select-none">
      {/* Drifting Small Grid Layer */}
      <div
        className="absolute inset-0 animate-grid-drift-down"
        style={{
          opacity: isDark ? 0.15 : 0.08,
          backgroundImage: `
            linear-gradient(to right, ${isDark ? "rgba(255,255,255,1)" : "rgba(55,65,81,1)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? "rgba(255,255,255,1)" : "rgba(55,65,81,1)"} 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
        }}
      />
    </div>
  );
};
