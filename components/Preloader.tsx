"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLines } from "./AnimatedLines";

interface PreloaderProps {
  durationMs?: number;
}

export function Preloader({ durationMs = 3500 }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // If reduced motion is on, skip the long wait
    const effectiveDuration = mediaQuery.matches ? 500 : durationMs;

    const updateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min(
        (elapsed / effectiveDuration) * 100,
        100,
      );

      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setIsComplete(true);
        // Show "Hello World" for a moment before exiting
        setTimeout(
          () => {
            setShouldExit(true);
          },
          mediaQuery.matches ? 200 : 1200,
        );
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [durationMs]);

  return (
    <AnimatePresence>
      {!shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white pointer-events-auto select-none"
        >
          {/* Exact Background Match */}
          <AnimatedLines />

          <div className="relative z-10 flex flex-col items-center w-full max-w-[280px] sm:max-w-sm">
            <div className="h-12 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.span
                    key="percentage"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-2xl font-bold text-[#0B0F14]"
                  >
                    {Math.round(progress)}%
                  </motion.span>
                ) : (
                  <motion.span
                    key="hello"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xl sm:text-2xl font-bold text-[#0B0F14]"
                  >
                    {"<Hello World! />"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Line */}
            <div className="mt-4 h-[2px] w-full bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
