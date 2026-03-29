"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { satoshi } from "@/lib/fonts";

const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

interface CursorDecryptLabelProps {
  text: string;
  children: React.ReactNode;
  enableScrollCorrection?: boolean;
  sideOffset?: number;
}

export function CursorDecryptLabel({
  text,
  children,
  enableScrollCorrection = false,
  sideOffset = 14,
}: CursorDecryptLabelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > 20;
  });
  const [displayText, setDisplayText] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const decryptCleanupRef = useRef<(() => void) | null>(null);
  const pathname = usePathname();

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

  const stopDecrypt = useCallback(() => {
    if (decryptCleanupRef.current) {
      decryptCleanupRef.current();
      decryptCleanupRef.current = null;
    }
  }, []);

  const triggerDecrypt = useCallback(() => {
    stopDecrypt();
    const cleanup = startDecrypt();
    decryptCleanupRef.current = typeof cleanup === "function" ? cleanup : null;
  }, [startDecrypt, stopDecrypt]);

  const closeTooltip = useCallback(() => {
    setIsHovered(false);
    setIsFocused(false);
    setIsClicking(false);
    setMousePos(null);
    stopDecrypt();
    setDisplayText("");
  }, [stopDecrypt]);

  // Reset all states on navigation
  useEffect(() => {
    closeTooltip();
  }, [pathname, closeTooltip]);

  // Handle window/page visibility changes to prevent stale tooltips
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        closeTooltip();
      }
    };

    const handleWindowBlur = () => {
      closeTooltip();
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handleWindowBlur);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleWindowBlur);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [closeTooltip]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handlePointerDown = () => {
    closeTooltip();
    setIsClicking(true);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    setIsClicking(false);
    // Immediate position set to prevent jump from (0,0)
    // Apply correction of ~4cm (152px) if scrolled AND correction is enabled (for logo)
    const correctionX = enableScrollCorrection && isScrolled ? -152 : 0;
    setMousePos({ x: e.clientX + correctionX, y: e.clientY });
    setIsHovered(true);
    triggerDecrypt();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const correctionX = enableScrollCorrection && isScrolled ? -152 : 0;
    setMousePos({ x: e.clientX + correctionX, y: e.clientY });
  };

  const handlePointerLeave = () => {
    closeTooltip();
  };

  const isVisible = (isHovered || isFocused) && !isClicking;

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onClick={handlePointerDown}
      onFocus={() => {
        // Only show tooltip on focus if NOT triggered by a mouse click
        if (!isClicking) {
          setIsFocused(true);
          triggerDecrypt();
        }
      }}
      onBlur={() => {
        closeTooltip();
      }}
      className="relative inline-block"
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            // Set initial={false} when tracking cursor to prevent animation from top-left
            initial={
              isFocused && !isHovered ? { opacity: 0, scale: 0.95 } : false
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
            style={
              mousePos
                ? {
                    position: "fixed",
                    top: mousePos.y + sideOffset,
                    left: mousePos.x + 12,
                    pointerEvents: "none",
                  }
                : {
                    position: "absolute",
                    bottom: "100%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-8px)",
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
