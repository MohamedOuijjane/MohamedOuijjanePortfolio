"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface DecryptHoverTextProps {
  text: string;
  speedMs?: number;
  restoreMs?: number;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function DecryptHoverText({
  text,
  speedMs = 15,
  restoreMs = 600,
  className,
}: DecryptHoverTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const restoreIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useRef<boolean>(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  const scramble = useCallback(() => {
    return text
      .split("")
      .map((char) => {
        if (char === " " || char === ".") return char;
        return getRandomChar();
      })
      .join("");
  }, [text]);

  const clearAllIntervals = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (restoreIntervalRef.current) {
      clearInterval(restoreIntervalRef.current);
      restoreIntervalRef.current = null;
    }
  };

  const handlePointerEnter = () => {
    if (prefersReducedMotion.current) return;
    clearAllIntervals();

    intervalRef.current = setInterval(() => {
      setDisplayText(scramble());
    }, speedMs);
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion.current) return;
    clearAllIntervals();

    let lockIndex = 0;
    const stepMs = restoreMs / text.length;

    restoreIntervalRef.current = setInterval(() => {
      setDisplayText(() => {
        const nextText = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === ".") return char;
            if (index < lockIndex) return char;
            return getRandomChar();
          })
          .join("");
        return nextText;
      });

      lockIndex++;

      if (lockIndex > text.length) {
        if (restoreIntervalRef.current) {
          clearInterval(restoreIntervalRef.current);
          restoreIntervalRef.current = null;
        }
        setDisplayText(text);
      }
    }, stepMs);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllIntervals();
  }, []);

  return (
    <span
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
      tabIndex={0}
      className={className}
      style={{ outline: "none", cursor: "default" }}
    >
      {displayText}
    </span>
  );
}
