"use client";

import { useEffect } from "react";
import Noise from "./ui/noise";

export const AnimatedLines = () => {
  useEffect(() => {
    // No-op: kept to respect motion preferences if needed in future
  }, []);

  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none select-none">
      {/* Drifting Small Grid Layer */}
      <div
        className="absolute inset-0 opacity-[0.08] animate-grid-drift-down"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(55,65,81,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(55,65,81,1) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px", // Tweakable gridSize
          backgroundPosition: "0 0",
        }}
      />

      {/* Canvas-based Noise Background */}
      <Noise
        patternSize={360}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={11}
      />
    </div>
  );
};
