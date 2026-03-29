"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface DecryptTextProps {
  text: string;
  speedMs?: number;
  durationMs?: number;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function DecryptText({
  text,
  speedMs = 30,
  durationMs = 800,
  className,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAnimating(false);
    setDisplayText(text);
  }, [text]);

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion.current || isAnimating) return;

    setIsAnimating(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(timeElapsed / durationMs, 1);

      // Number of characters to "lock" based on progress
      const lockCount = Math.floor(progress * text.length);

      const nextText = text
        .split("")
        .map((char, index) => {
          // Keep spaces and punctuation fixed
          if (char === " " || char === ".") return char;

          // If index is within the locked range, show original character
          if (index < lockCount) return char;

          // Otherwise show a random character from the set
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (progress >= 1) {
        stopAnimation();
      }
    }, speedMs);
  }, [text, durationMs, speedMs, isAnimating, stopAnimation]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onPointerEnter={startAnimation}
      onPointerLeave={stopAnimation}
      onFocus={startAnimation}
      onBlur={stopAnimation}
      tabIndex={0}
      className={className}
      style={{ outline: "none" }}
    >
      {displayText}
    </span>
  );
}
