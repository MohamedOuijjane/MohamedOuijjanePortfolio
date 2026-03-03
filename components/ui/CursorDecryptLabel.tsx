"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { satoshi } from "@/lib/fonts";

const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

interface CursorDecryptLabelProps {
  text: string;
  children: React.ReactNode;
}

export function CursorDecryptLabel({
  text,
  children,
}: CursorDecryptLabelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const startDecrypt = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    // Fast decryption: roughly 300ms for short labels
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) return char;
            if (char === " ") return " ";
            return RANDOM_CHARS[
              Math.floor(Math.random() * RANDOM_CHARS.length)
            ];
          })
          .join(""),
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1;
    }, 30);

    return () => clearInterval(interval);
  }, [text, prefersReducedMotion]);

  useEffect(() => {
    if (isHovered || isFocused) {
      const cleanup = startDecrypt();
      return cleanup;
    }
  }, [isHovered, isFocused, startDecrypt]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    // Immediate position set to prevent jump from (0,0)
    // Apply correction of ~4cm (152px) if scrolled
    const correctionX = isScrolled ? -152 : 0;
    setMousePos({ x: e.clientX + correctionX, y: e.clientY });
    setIsHovered(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const correctionX = isScrolled ? -152 : 0;
    setMousePos({ x: e.clientX + correctionX, y: e.clientY });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setMousePos(null);
  };

  const isVisible = isHovered || isFocused;

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative inline-block"
    >
      {children}

      <AnimatePresence>
        {isVisible && mousePos && (
          <motion.div
            // Set initial={false} when tracking cursor to prevent animation from top-left
            initial={isFocused ? { opacity: 0, scale: 0.95 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            style={
              isFocused
                ? {
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-8px)",
                  }
                : {
                    position: "fixed",
                    top: mousePos.y + 14,
                    left: mousePos.x + 12,
                    pointerEvents: "none",
                  }
            }
            className="z-[9999] rounded-xl bg-neutral-800/70 backdrop-blur-sm px-3 py-1.5 shadow-2xl border border-white/10"
          >
            <span
              className={`${satoshi.className} text-[15px] font-medium tracking-tight text-white/95 whitespace-nowrap`}
            >
              {displayText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
