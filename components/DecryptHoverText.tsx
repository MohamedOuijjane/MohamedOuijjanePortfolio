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
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const restoreIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useRef<boolean>(false);

  // Measure initial width once
  useEffect(() => {
    if (ghostRef.current) {
      const rect = ghostRef.current.getBoundingClientRect();
      setWidth(rect.width);
    }

    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, [text]);

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

  const startRestore = useCallback(() => {
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
        isAnimating.current = false;
      }
    }, stepMs);
  }, [restoreMs, text]);

  const handlePointerEnter = () => {
    if (prefersReducedMotion.current || isAnimating.current) return;
    clearAllIntervals();
    isAnimating.current = true;

    // Start scrambling
    intervalRef.current = setInterval(() => {
      setDisplayText(scramble());
    }, speedMs);

    // After a short delay, start the restoration process automatically
    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startRestore();
    }, 300); // 300ms of scrambling before restore
  };

  const handlePointerLeave = () => {
    // No longer triggers restore, as it happens automatically in handlePointerEnter
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllIntervals();
  }, []);

  return (
    <span
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handlePointerEnter}
      onBlur={handlePointerLeave}
      tabIndex={0}
      className={`inline-grid whitespace-nowrap ${className || ""}`}
      style={{
        outline: "none",
        cursor: "default",
        width: width ? `${width}px` : "auto",
      }}
    >
      <span
        ref={ghostRef}
        className="invisible pointer-events-none [grid-area:1/1] select-none"
        aria-hidden="true"
      >
        {text}
      </span>
      <span className="[grid-area:1/1]">{displayText}</span>
    </span>
  );
}
