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
        className="absolute inset-0 opacity-[0.11] animate-grid-drift"
        style={{
          backgroundImage: `linear-gradient(rgba(55,65,81,1) 1px, transparent 1px), linear-gradient(90deg, rgba(55,65,81,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0, 0 0",
        }}
      />
    </div>
  );
};
