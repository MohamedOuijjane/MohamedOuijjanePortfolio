"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedUnderlineInlineProps {
  isVisible: boolean;
  isHovered: boolean;
  className?: string;
}

export function AnimatedUnderlineInline({
  isVisible,
  isHovered,
  className = "",
}: AnimatedUnderlineInlineProps) {
  // Paths provided by the user
  const defaultPath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10";
  const hoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10";

  return (
    <span className={`absolute left-0 -bottom-1 w-full pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        className="w-full h-2 fill-none"
      >
        <motion.path
          d={isHovered ? hoverPath : defaultPath}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: isVisible ? 1 : 0,
            d: isHovered ? hoverPath : defaultPath
          }}
          transition={{
            pathLength: { duration: 1.5, ease: "easeInOut" },
            d: { duration: 0.4, ease: "easeInOut" }
          }}
        />
      </svg>
    </span>
  );
}
